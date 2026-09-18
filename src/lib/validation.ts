import { z } from "zod";
import { fr } from "../i18n/fr";
import type { Messages } from "../i18n";

const emptyToUndefined = (value: unknown) => (value === "" || value === undefined ? undefined : value);
type FormErrors = Messages["form"]["errors"];

export function makeContactSchema(e: FormErrors) {
  return z.object({
    fullName: z.string().trim().min(2, e.name).max(80),
    email: z.string().trim().email(e.email).max(120),
    phone: z.string().trim().min(6, e.phone).max(30),
    subject: z.string().trim().min(3, e.subject).max(120),
    message: z.string().trim().min(12, e.message).max(4000),
    preferredContact: z.enum(["email", "whatsapp", "telephone"]),
    consent: z.coerce.boolean().refine((v) => v === true, e.consent),
    website: z.string().max(0).optional().default(""),
    startedAt: z.string().max(20).optional().default(""),
  });
}

export function makeQuestionSchema(e: FormErrors) {
  return z.object({
    fullName: z.string().trim().min(2, e.name).max(80),
    email: z.preprocess(emptyToUndefined, z.string().email(e.email).max(120).optional()),
    whatsapp: z.string().trim().max(30).optional().default(""),
    category: z.string().trim().min(2).max(40),
    question: z.string().trim().min(12, e.question).max(2000),
    consentPublication: z.coerce.boolean().default(false),
    displayAnonymously: z.coerce.boolean().default(false),
    consent: z.coerce.boolean().refine((v) => v === true, e.consent),
    website: z.string().max(0).optional().default(""),
    startedAt: z.string().max(20).optional().default(""),
  });
}

export function makeOrderSchema(e: FormErrors, kind: "design" | "web" | "training" | "generic" = "generic") {
  return z
    .object({
      serviceId: z.string().trim().min(1, e.service).max(80),
      serviceTitle: z.string().trim().max(160).optional().default(""),
      fullName: z.string().trim().min(2, e.name).max(80),
      organization: z.string().trim().max(120).optional().default(""),
      email: z.string().trim().email(e.email).max(120),
      phone: z.string().trim().min(6, e.phone).max(30),
      whatsapp: z.string().trim().max(30).optional().default(""),
      projectType: z.string().trim().max(80).optional().default(""),
      description: z.string().trim().max(5000).optional().default(""),
      budgetRange: z.string().trim().max(40).optional().default(""),
      desiredDeadline: z.string().trim().max(80).optional().default(""),
      contactPreference: z.enum(["whatsapp", "email", "telephone"]),
      consent: z.coerce.boolean().refine((v) => v === true, e.consent),
      website: z.string().max(0).optional().default(""),
      startedAt: z.string().max(20).optional().default(""),
      designKind: z.string().trim().max(40).optional().default(""),
      designKindOther: z.string().trim().max(80).optional().default(""),
      displayName: z.string().trim().max(120).optional().default(""),
      designText: z.string().trim().max(500).optional().default(""),
      designOrigin: z.string().trim().max(40).optional().default(""),
      designColors: z.string().trim().max(200).optional().default(""),
      designStyle: z.string().trim().max(40).optional().default(""),
      designStyleOther: z.string().trim().max(80).optional().default(""),
      designFormat: z.string().trim().max(80).optional().default(""),
      webType: z.string().trim().max(40).optional().default(""),
      webTypeOther: z.string().trim().max(80).optional().default(""),
      webExists: z.string().trim().max(40).optional().default(""),
      webDomain: z.string().trim().max(40).optional().default(""),
      webHosting: z.string().trim().max(40).optional().default(""),
      webFeatures: z.string().trim().max(400).optional().default(""),
      webFeatureOther: z.string().trim().max(80).optional().default(""),
      webContent: z.string().trim().max(40).optional().default(""),
      webIdentity: z.string().trim().max(40).optional().default(""),
      webUrl: z.string().trim().max(200).optional().default(""),
      trainingPick: z.string().trim().max(80).optional().default(""),
      trainingOther: z.string().trim().max(120).optional().default(""),
      trainingLevel: z.string().trim().max(40).optional().default(""),
      trainingGoal: z.string().trim().max(40).optional().default(""),
      trainingGoalOther: z.string().trim().max(80).optional().default(""),
      trainingFormat: z.string().trim().max(40).optional().default(""),
      trainingAudience: z.string().trim().max(40).optional().default(""),
      trainingParticipants: z.string().trim().max(20).optional().default(""),
      trainingDays: z.string().trim().max(80).optional().default(""),
      trainingPeriod: z.string().trim().max(80).optional().default(""),
      trainingAvailability: z.string().trim().max(400).optional().default(""),
    })
    .superRefine((data, ctx) => {
      const need = (field: string, ok: boolean) => {
        if (ok) return;
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: e.required ?? e.generic, path: [field] });
      };
      if (kind === "design") {
        need("designKind", data.designKind.trim().length > 0);
        need("designKindOther", data.designKind !== "autre" || data.designKindOther.trim().length > 1);
        need("displayName", data.displayName.trim().length > 1);
        need("designOrigin", data.designOrigin.trim().length > 0);
        need("designStyleOther", data.designStyle !== "autre" || data.designStyleOther.trim().length > 1);
        const needsFormat = ["affiche", "flyer", "carte", "badge", "bache", "tshirt", "print", "autre"].includes(data.designKind);
        need("designFormat", !needsFormat || data.designFormat.trim().length > 1);
      } else if (kind === "web") {
        need("webType", data.webType.trim().length > 0);
        need("webTypeOther", data.webType !== "autre" || data.webTypeOther.trim().length > 1);
        need("webExists", data.webExists.trim().length > 0);
        need("webDomain", data.webDomain.trim().length > 0);
        need("webHosting", data.webHosting.trim().length > 0);
        need("webContent", data.webContent.trim().length > 0);
        need("webIdentity", data.webIdentity.trim().length > 0);
        need("webFeatureOther", !data.webFeatures.split(",").includes("autre") || data.webFeatureOther.trim().length > 1);
      } else if (kind === "training") {
        need("trainingPick", data.trainingPick.trim().length > 0);
        need("trainingOther", data.trainingPick !== "autre" || data.trainingOther.trim().length > 1);
        need("trainingLevel", data.trainingLevel.trim().length > 0);
        need("trainingGoal", data.trainingGoal.trim().length > 0);
        need("trainingGoalOther", data.trainingGoal !== "autre" || data.trainingGoalOther.trim().length > 1);
        need("trainingFormat", data.trainingFormat.trim().length > 0);
        need("trainingAudience", data.trainingAudience.trim().length > 0);
        const grouped = data.trainingAudience === "groupe" || data.trainingAudience === "organisation";
        need("trainingParticipants", !grouped || /^\d+$/.test(data.trainingParticipants.trim()));
      } else {
        need("projectType", data.projectType.trim().length >= 2);
        if (data.description.trim().length < 20) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: e.message, path: ["description"] });
        }
      }
    });
}

export function makeTrainingRegistrationSchema(e: FormErrors) {
  return z.object({
    trainingId: z.string().trim().min(1),
    fullName: z.string().trim().min(2, e.name).max(80),
    email: z.string().trim().email(e.email).max(120),
    phone: z.string().trim().min(6, e.phone).max(30),
    whatsapp: z.string().trim().max(30).optional().default(""),
    organization: z.string().trim().max(120).optional().default(""),
    message: z.string().trim().max(2000).optional().default(""),
    consent: z.coerce.boolean().refine((v) => v === true, e.consent),
    website: z.string().max(0).optional().default(""),
    startedAt: z.string().max(20).optional().default(""),
  });
}

export function makeConsultationSchema(e: FormErrors) {
  return z.object({
    fullName: z.string().trim().min(2, e.name).max(80),
    phone: z.string().trim().min(6, e.phone).max(30),
    whatsapp: z.string().trim().max(30).optional().default(""),
    email: z.preprocess(emptyToUndefined, z.string().email(e.email).max(120).optional()),
    organization: z.string().trim().max(120).optional().default(""),
    subject: z.string().trim().min(3, e.subject).max(120),
    description: z.string().trim().min(12, e.message).max(4000),
    urgency: z.enum(["normale", "haute", "critique"]),
    availability: z.string().trim().max(200).optional().default(""),
    consent: z.coerce.boolean().refine((v) => v === true, e.consent),
    website: z.string().max(0).optional().default(""),
    startedAt: z.string().max(20).optional().default(""),
  });
}

export const contactSchema = makeContactSchema(fr.form.errors);
export const questionSchema = makeQuestionSchema(fr.form.errors);
export const orderSchema = makeOrderSchema(fr.form.errors);
export const trainingRegistrationSchema = makeTrainingRegistrationSchema(fr.form.errors);
export const consultationSchema = makeConsultationSchema(fr.form.errors);

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8, "Mot de passe trop court."),
});

export function formDataToObject(data: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of data.entries()) {
    if (typeof value === "string") out[key] = value;
  }
  return out;
}

export function checkbox(data: FormData, name: string): boolean {
  const v = data.get(name);
  return v === "on" || v === "true" || v === "1";
}

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const map: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!map[key]) map[key] = issue.message;
  }
  return map;
}

export function sanitizeText(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
}
