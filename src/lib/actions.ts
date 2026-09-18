import type { AstroCookies } from "astro";
import { requireAdmin } from "./auth";
import {
  CONTACT_UNAVAILABLE,
  ORDER_UNAVAILABLE,
  SERVICE_UNAVAILABLE,
  allowMemoryFallback,
  logServerError,
  readServerEnv,
} from "./env";
import { parseLocale, ui } from "../i18n";
import type { Locale, Messages } from "../i18n";
import { notifyAfterSave } from "./notifications";
import { isOrderReference, nextOrderReference } from "./order-reference";
import { consumeRateLimit, hashedClientKey } from "./rate-limit";
import { composeOrderContent, joinedFormValues, orderKindFromService } from "./order-context";
import { getServices, getTrainings } from "./queries";
import { spamReason } from "./spam";
import { createCookieSupabase, createServiceSupabase } from "./supabase";
import { uniqueAttachmentName, validateOrderAttachment, verifyAttachmentMagic } from "./uploads";
import {
  checkbox,
  fieldErrors,
  formDataToObject,
  loginSchema,
  makeConsultationSchema,
  makeContactSchema,
  makeOrderSchema,
  makeQuestionSchema,
  makeTrainingRegistrationSchema,
  sanitizeText,
} from "./validation";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: Record<string, string>; values: Record<string, string> };

const FORM_ERROR = "Une erreur est survenue. Votre demande n'a pas été envoyée.";

function formLocale(data: FormData): Locale {
  return parseLocale(String(data.get("locale") || "fr"));
}

function messagesFor(data: FormData): Messages {
  return ui(formLocale(data));
}

/** Écritures métier : service role uniquement. Jamais la clé anon depuis le navigateur. */
function persistClient() {
  return createServiceSupabase();
}

function unavailableFor(table: "orders" | "contact_messages" | string, t?: Messages): string {
  if (table === "orders") return t?.form.unavailableOrder ?? ORDER_UNAVAILABLE;
  if (table === "contact_messages") return t?.form.unavailableContact ?? CONTACT_UNAVAILABLE;
  return t?.form.unavailableGeneric ?? SERVICE_UNAVAILABLE;
}

function valuesFrom(data: FormData): Record<string, string> {
  const values = formDataToObject(data);
  const features = joinedFormValues(data, "webFeatures");
  if (features) values.webFeatures = features;
  delete values.website;
  delete values.consent;
  delete values.startedAt;
  return values;
}

async function tooMany(request: Request, bucket: string, t?: Messages): Promise<ActionResult<never> | null> {
  const limit = allowMemoryFallback() ? 40 : 8;
  const allowed = await consumeRateLimit(hashedClientKey(request, bucket), limit, 10 * 60 * 1000);
  if (!allowed) {
    return {
      ok: false,
      errors: { form: t?.form.errors.tooMany ?? "Trop de tentatives. Réessayez dans quelques minutes." },
      values: {},
    };
  }
  return null;
}

async function duplicate(request: Request, bucket: string, signature: string, t?: Messages): Promise<ActionResult<never> | null> {
  const allowed = await consumeRateLimit(hashedClientKey(request, `${bucket}:${signature}`), 1, 2 * 60 * 1000);
  if (!allowed) {
    return {
      ok: false,
      errors: { form: t?.form.alreadySent ?? "Cette demande a déjà été envoyée. Merci de patienter un instant." },
      values: {},
    };
  }
  return null;
}

function spamBlock(data: FormData, t?: Messages): ActionResult<never> | null {
  const reason = spamReason(data);
  if (reason === "honeypot") {
    return { ok: false, errors: { form: t?.form.errors.generic ?? FORM_ERROR }, values: valuesFrom(data) };
  }
  if (reason === "too_fast" && !allowMemoryFallback()) {
    return { ok: false, errors: { form: t?.form.errors.generic ?? FORM_ERROR }, values: valuesFrom(data) };
  }
  return null;
}

export async function submitContact(request: Request, data: FormData): Promise<ActionResult<{ id: string }>> {
  const t = messagesFor(data);
  try {
  const locale = formLocale(data);
  const raw = { ...formDataToObject(data), consent: checkbox(data, "consent") };
  const parsed = makeContactSchema(t.form.errors).safeParse(raw);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error), values: valuesFrom(data) };
  const bait = spamBlock(data, t);
  if (bait) return bait;
  const limited = await tooMany(request, "contact", t);
  if (limited) return limited;
  const dup = await duplicate(request, "contact-sig", `${parsed.data.email}:${parsed.data.message.slice(0, 80)}`, t);
  if (dup) return dup;
  const payload = {
    full_name: sanitizeText(parsed.data.fullName),
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: sanitizeText(parsed.data.subject),
    message: sanitizeText(parsed.data.message),
    preferred_contact: parsed.data.preferredContact,
    status: "nouvelle",
    locale,
  };
  const inserted = await insertRow("contact_messages", payload, undefined, t);
  if (!inserted.ok) return { ok: false, errors: { form: inserted.error }, values: valuesFrom(data) };
  await notifyAfterSave({
    type: "contact",
    title: "Nouveau message de contact",
    body: `${payload.full_name} — ${payload.subject}`,
    replyTo: payload.email,
    inboxPath: `/admin/messages/${inserted.id}`,
    fields: {
      Nom: payload.full_name,
      Email: payload.email,
      Téléphone: payload.phone,
      Sujet: payload.subject,
      "Contact préféré": payload.preferred_contact,
      Message: payload.message,
    },
  });
  return { ok: true, data: { id: inserted.id } };
  } catch {
    logServerError("contact", "throw");
    return { ok: false, errors: { form: t.form.unavailableContact }, values: valuesFrom(data) };
  }
}

export async function submitQuestion(request: Request, data: FormData): Promise<ActionResult<{ id: string }>> {
  const t = messagesFor(data);
  const locale = formLocale(data);
  const raw = {
    ...formDataToObject(data),
    consent: checkbox(data, "consent"),
    consentPublication: checkbox(data, "consentPublication"),
    displayAnonymously: checkbox(data, "displayAnonymously"),
  };
  const parsed = makeQuestionSchema(t.form.errors).safeParse(raw);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error), values: valuesFrom(data) };
  const bait = spamBlock(data, t);
  if (bait) return bait;
  const limited = await tooMany(request, "question", t);
  if (limited) return limited;
  const payload = {
    full_name: sanitizeText(parsed.data.fullName),
    email: parsed.data.email ?? null,
    whatsapp: parsed.data.whatsapp || null,
    category: parsed.data.category,
    question: sanitizeText(parsed.data.question),
    consent_publication: parsed.data.consentPublication,
    display_anonymously: parsed.data.displayAnonymously,
    status: "nouvelle",
    published: false,
    locale,
  };
  const inserted = await insertRow("questions", payload, undefined, t);
  if (!inserted.ok) return { ok: false, errors: { form: inserted.error }, values: valuesFrom(data) };
  await notifyAfterSave({
    type: "question",
    title: "Nouvelle question",
    body: payload.question.slice(0, 180),
    replyTo: payload.email ?? undefined,
    inboxPath: `/admin/questions/${inserted.id}`,
    fields: {
      Nom: payload.full_name,
      Email: payload.email,
      WhatsApp: payload.whatsapp,
      Catégorie: payload.category,
      Question: payload.question,
    },
  });
  return { ok: true, data: { id: inserted.id } };
}

export async function submitOrder(request: Request, data: FormData): Promise<ActionResult<{ reference: string; serviceTitle: string }>> {
  const t = messagesFor(data);
  try {
  const locale = formLocale(data);
  const fields = formDataToObject(data);
  const raw = {
    ...fields,
    consent: checkbox(data, "consent"),
    webFeatures: joinedFormValues(data, "webFeatures"),
  };
  const catalog = await getServices().catch(() => []);
  const trainings = await getTrainings().catch(() => []);
  const serviceId = fields.serviceId || "";
  const chosen = catalog.find((item) => item.id === serviceId || item.slug === serviceId);
  const kind = orderKindFromService(chosen, serviceId);
  const parsed = makeOrderSchema(t.form.errors, kind).safeParse(raw);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error), values: valuesFrom(data) };
  const bait = spamBlock(data, t);
  if (bait) return bait;
  const limited = await tooMany(request, "order", t);
  if (limited) return limited;

  const attachment = data.get("attachment");
  let attachmentUrl: string | null = null;
  if (attachment instanceof File && attachment.size > 0) {
    const uploaded = await uploadOrderAttachment(attachment);
    if (!uploaded.ok) {
      return { ok: false, errors: { form: uploaded.error }, values: valuesFrom(data) };
    }
    attachmentUrl = uploaded.url;
  }

  const serviceTitle = sanitizeText(parsed.data.serviceTitle || chosen?.title || parsed.data.projectType);
  const { consent: _consent, ...answers } = parsed.data;
  const composed = composeOrderContent(kind, { ...answers, serviceTitle }, t, trainings);
  const projectType = sanitizeText(composed.projectType || parsed.data.projectType);
  const description = sanitizeText(composed.description || parsed.data.description);
  const dup = await duplicate(request, "order-sig", `${parsed.data.email}:${description.slice(0, 80)}`, t);
  if (dup) return dup;

  let lastError = unavailableFor("orders", t);
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const allocated = await allocateOrderReference(t);
    if (!allocated.ok) {
      return { ok: false, errors: { form: allocated.error }, values: valuesFrom(data) };
    }
    const reference = allocated.reference;
    const payload = {
      reference,
      service_id: isUuid(parsed.data.serviceId) ? parsed.data.serviceId : null,
      service_title: serviceTitle,
      full_name: sanitizeText(parsed.data.fullName),
      organization: parsed.data.organization || null,
      email: parsed.data.email,
      phone: parsed.data.phone,
      whatsapp: parsed.data.whatsapp || null,
      project_type: projectType,
      description,
      budget_range: kind === "training" ? null : parsed.data.budgetRange || "À discuter",
      desired_deadline: parsed.data.desiredDeadline || parsed.data.trainingPeriod || null,
      contact_preference: parsed.data.contactPreference,
      attachment_url: attachmentUrl,
      status: "nouvelle",
      locale,
    };
    const inserted = await insertRow("orders", payload, undefined, t);
    if (inserted.ok) {
      await notifyAfterSave({
        type: "order",
        title: `Commande ${reference}`,
        body: `${payload.full_name} — ${payload.service_title}`,
        replyTo: payload.email,
        inboxPath: `/admin/commandes/${inserted.id}`,
        fields: {
          Référence: reference,
          Nom: payload.full_name,
          Organisation: payload.organization,
          Email: payload.email,
          Téléphone: payload.phone,
          WhatsApp: payload.whatsapp,
          Service: payload.service_title,
          "Type de projet": payload.project_type,
          ...composed.fields,
          Description: payload.description,
          Budget: payload.budget_range,
          Délai: payload.desired_deadline,
          "Contact préféré": payload.contact_preference,
          Fichier: payload.attachment_url,
        },
      });
      return { ok: true, data: { reference, serviceTitle } };
    }
    lastError = inserted.error;
    if (!inserted.unique) break;
  }
  return { ok: false, errors: { form: lastError }, values: valuesFrom(data) };
  } catch {
    logServerError("order", "throw");
    return { ok: false, errors: { form: t.form.unavailableOrder }, values: valuesFrom(data) };
  }
}

export async function submitTraining(request: Request, data: FormData): Promise<ActionResult<{ id: string }>> {
  const t = messagesFor(data);
  const locale = formLocale(data);
  const raw = { ...formDataToObject(data), consent: checkbox(data, "consent") };
  const parsed = makeTrainingRegistrationSchema(t.form.errors).safeParse(raw);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error), values: valuesFrom(data) };
  const bait = spamBlock(data, t);
  if (bait) return bait;
  const limited = await tooMany(request, "training", t);
  if (limited) return limited;
  const payload = {
    training_id: isUuid(parsed.data.trainingId) ? parsed.data.trainingId : null,
    training_slug: parsed.data.trainingId,
    full_name: sanitizeText(parsed.data.fullName),
    email: parsed.data.email,
    phone: parsed.data.phone,
    whatsapp: parsed.data.whatsapp || null,
    organization: parsed.data.organization || null,
    message: parsed.data.message ? sanitizeText(parsed.data.message) : null,
    status: "nouvelle",
    locale,
  };
  const inserted = await insertRow("training_registrations", payload, undefined, t);
  if (!inserted.ok) return { ok: false, errors: { form: inserted.error }, values: valuesFrom(data) };
  await notifyAfterSave({
    type: "registration",
    title: "Inscription formation",
    body: payload.full_name,
    replyTo: payload.email,
    inboxPath: "/admin",
    fields: {
      Nom: payload.full_name,
      Email: payload.email,
      Téléphone: payload.phone,
      WhatsApp: payload.whatsapp,
      Organisation: payload.organization,
      Formation: payload.training_slug,
      Message: payload.message,
    },
  });
  return { ok: true, data: { id: inserted.id } };
}

export async function submitConsultation(request: Request, data: FormData): Promise<ActionResult<{ id: string }>> {
  const t = messagesFor(data);
  const locale = formLocale(data);
  const raw = { ...formDataToObject(data), consent: checkbox(data, "consent") };
  const parsed = makeConsultationSchema(t.form.errors).safeParse(raw);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error), values: valuesFrom(data) };
  const bait = spamBlock(data, t);
  if (bait) return bait;
  const limited = await tooMany(request, "consultation", t);
  if (limited) return limited;
  const payload = {
    full_name: sanitizeText(parsed.data.fullName),
    phone: parsed.data.phone,
    whatsapp: parsed.data.whatsapp || null,
    email: parsed.data.email ?? null,
    organization: parsed.data.organization || null,
    subject: sanitizeText(parsed.data.subject),
    description: sanitizeText(parsed.data.description),
    urgency: parsed.data.urgency,
    availability: parsed.data.availability || null,
    status: "nouvelle",
    locale,
  };
  const inserted = await insertRow("consultations", payload, undefined, t);
  if (!inserted.ok) return { ok: false, errors: { form: inserted.error }, values: valuesFrom(data) };
  await notifyAfterSave({
    type: "consultation",
    title: "Demande de consultation",
    body: `${payload.full_name} — ${payload.subject}`,
    replyTo: payload.email ?? undefined,
    inboxPath: "/admin",
    fields: {
      Nom: payload.full_name,
      Téléphone: payload.phone,
      WhatsApp: payload.whatsapp,
      Email: payload.email,
      Organisation: payload.organization,
      Sujet: payload.subject,
      Urgence: payload.urgency,
      Description: payload.description,
    },
  });
  return { ok: true, data: { id: inserted.id } };
}

export async function submitLogin(
  request: Request,
  cookies: AstroCookies,
  data: FormData,
): Promise<ActionResult<{ ok: true }>> {
  const limited = await tooMany(request, "login");
  if (limited) return limited;
  const parsed = loginSchema.safeParse(formDataToObject(data));
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error), values: valuesFrom(data) };
  const supabase = createCookieSupabase(request, cookies);
  if (!supabase) {
    return {
      ok: false,
      errors: { form: "Supabase n'est pas encore configuré. Renseignez les variables d'environnement." },
      values: valuesFrom(data),
    };
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });
  if (error) {
    return { ok: false, errors: { form: "Identifiants incorrects." }, values: valuesFrom(data) };
  }
  const admin = await requireAdmin(request, cookies);
  if (!admin) {
    await supabase.auth.signOut();
    return { ok: false, errors: { form: "Accès refusé." }, values: valuesFrom(data) };
  }
  return { ok: true, data: { ok: true } };
}

const memoryStore = new Map<string, Record<string, unknown>[]>();

type InsertOk = { ok: true; id: string };
type InsertFail = { ok: false; error: string; unique?: boolean };

async function insertRow(table: string, payload: Record<string, unknown>, knownId?: string, t?: Messages): Promise<InsertOk | InsertFail> {
  const id = knownId ?? crypto.randomUUID();
  const client = persistClient();
  if (client) {
    try {
      const { error } = await client.from(table).insert({ id, ...payload });
      if (!error) return { ok: true, id };
      if (payload.locale && (error.code === "42703" || /locale/i.test(error.message))) {
        const { locale: _locale, ...rest } = payload;
        const retry = await client.from(table).insert({ id, ...rest });
        if (!retry.error) return { ok: true, id };
      }
      const unique = error.code === "23505" || /duplicate|unique/i.test(error.message);
      logServerError(`insert:${table}`, error.code || "db");
      return { ok: false, error: unique ? (t?.form.errors.generic ?? FORM_ERROR) : unavailableFor(table, t), unique };
    } catch {
      logServerError(`insert:${table}`, "throw");
      return { ok: false, error: unavailableFor(table, t) };
    }
  }
  if (allowMemoryFallback()) {
    const row = { id, ...payload, created_at: new Date().toISOString() };
    const list = memoryStore.get(table) ?? [];
    list.unshift(row);
    memoryStore.set(table, list);
    return { ok: true, id: String(row.id) };
  }
  const hasUrl = Boolean(readServerEnv("PUBLIC_SUPABASE_URL"));
  const hasService = Boolean(readServerEnv("SUPABASE_SERVICE_ROLE_KEY"));
  logServerError(`insert:${table}`, !hasUrl ? "missing_url" : !hasService ? "missing_service_role" : "client_init");
  return { ok: false, error: unavailableFor(table, t) };
}

export function memoryRows(table: string): Record<string, unknown>[] {
  return memoryStore.get(table) ?? [];
}

export function insertMemoryRow(table: string, row: Record<string, unknown>): void {
  const list = memoryStore.get(table) ?? [];
  list.unshift(row);
  memoryStore.set(table, list);
}

export function patchMemoryRow(table: string, id: string, patch: Record<string, unknown>): boolean {
  const list = memoryStore.get(table) ?? [];
  const index = list.findIndex((row) => String(row.id) === id);
  if (index < 0) return false;
  list[index] = { ...list[index], ...patch, updated_at: new Date().toISOString() };
  memoryStore.set(table, list);
  return true;
}

export function removeMemoryRow(table: string, id: string): boolean {
  const list = memoryStore.get(table) ?? [];
  const next = list.filter((row) => String(row.id) !== id);
  if (next.length === list.length) return false;
  memoryStore.set(table, next);
  return true;
}

async function allocateOrderReference(t?: Messages): Promise<{ ok: true; reference: string } | { ok: false; error: string }> {
  const client = createServiceSupabase();
  if (client) {
    try {
      const rpc = await client.rpc("next_order_reference");
      if (!rpc.error && typeof rpc.data === "string" && isOrderReference(rpc.data)) {
        return { ok: true, reference: rpc.data };
      }
      logServerError("order.reference", rpc.error?.code || "rpc");
    } catch {
      logServerError("order.reference", "throw");
    }
  } else if (!allowMemoryFallback()) {
    logServerError("order.reference", "supabase_unconfigured");
    return { ok: false, error: unavailableFor("orders", t) };
  }
  const latest = await latestOrderReference();
  return { ok: true, reference: nextOrderReference(latest) };
}

async function latestOrderReference(): Promise<string | null> {
  const client = persistClient();
  if (client) {
    const { data } = await client.from("orders").select("reference").order("created_at", { ascending: false }).limit(1);
    return data?.[0]?.reference ?? null;
  }
  if (!allowMemoryFallback()) return null;
  const first = memoryRows("orders")[0];
  return typeof first?.reference === "string" ? first.reference : null;
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

async function uploadOrderAttachment(file: File): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const invalid = validateOrderAttachment(file);
  if (invalid) return { ok: false, error: invalid };
  const magic = await verifyAttachmentMagic(file);
  if (magic) return { ok: false, error: magic };
  const supabase = createServiceSupabase();
  if (!supabase) {
    if (allowMemoryFallback()) return { ok: true, url: "" };
    logServerError("storage.upload", "supabase_unconfigured");
    return { ok: false, error: "Le fichier n'a pas pu être envoyé. Contactez-nous sur WhatsApp." };
  }
  const path = uniqueAttachmentName(file.name);
  const { error } = await supabase.storage.from("order-attachments").upload(path, file, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) {
    logServerError("storage.upload", error.name);
    return { ok: false, error: "Le fichier n'a pas pu être envoyé." };
  }
  return { ok: true, url: path };
}
