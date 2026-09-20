import { designKindFromService, isPrintService } from "../content/print-catalog";
import type { Messages } from "../i18n";
import type { ServiceItem } from "./types";

export { designKindFromService, isPrintService };

export type OrderKind = "design" | "web" | "training" | "generic";

export const DESIGN_KINDS = [
  "logo",
  "identite",
  "affiche",
  "flyer",
  "social",
  "carte",
  "badge",
  "bache",
  "tshirt",
  "print",
  "autre",
] as const;

export const DESIGN_ORIGINS = ["nouveau", "amelioration"] as const;
export const DESIGN_STYLES = [
  "moderne",
  "elegant",
  "minimaliste",
  "professionnel",
  "creatif",
  "religieux",
  "institutionnel",
  "autre",
] as const;
export const DESIGN_FORMAT_KINDS = ["affiche", "flyer", "carte", "badge", "bache", "tshirt", "print", "autre"] as const;

export const WEB_TYPES = [
  "vitrine",
  "professionnel",
  "entreprise",
  "portfolio",
  "blog",
  "organisation",
  "eglise",
  "formation",
  "application",
  "unsure",
  "autre",
] as const;
export const WEB_EXISTS = ["nouveau", "ameliorer", "refaire"] as const;
export const WEB_DOMAIN = ["oui", "non", "unsure"] as const;
export const WEB_HOSTING = ["oui", "non", "unsure"] as const;
export const WEB_FEATURES = [
  "presenter",
  "contact",
  "whatsapp",
  "portfolio",
  "blog",
  "reservation",
  "commande",
  "paiement",
  "formation",
  "membres",
  "i18n",
  "autre",
] as const;
export const WEB_CONTENT = ["pret", "partiel", "aide"] as const;
export const WEB_IDENTITY = ["oui", "non"] as const;
export const WEB_EXISTING = ["ameliorer", "refaire"] as const;

export const TRAINING_LEVELS = ["debutant", "intermediaire", "avance", "unsure"] as const;
export const TRAINING_GOALS = ["travail", "etudes", "activite", "perfectionner", "decouvrir", "autre"] as const;
export const TRAINING_FORMATS = ["presentiel", "en_ligne", "peu_importe"] as const;
export const TRAINING_AUDIENCES = ["individuelle", "groupe", "organisation", "unsure"] as const;
export const TRAINING_GROUP = ["groupe", "organisation"] as const;
export const TRAINING_SPECIAL = ["autre", "unsure"] as const;

export type OrderAnswers = Record<string, string | undefined>;

type Labeled = Record<string, string>;

function mapOf(value: unknown): Labeled {
  return value && typeof value === "object" ? (value as Labeled) : {};
}

function pick(map: unknown, key: string): string {
  if (!key) return "";
  return mapOf(map)[key] || key;
}

function line(label: string, value?: string): string {
  const text = (value ?? "").trim();
  if (!text) return "";
  return `${label} : ${text}`;
}

export function orderKindFromService(item?: Pick<ServiceItem, "id" | "slug"> | null, fallbackId = ""): OrderKind {
  const id = (item?.id || fallbackId).toLowerCase();
  const slug = (item?.slug || fallbackId).toLowerCase();
  const blob = `${id} ${slug}`;
  if (
    id === "s-design" ||
    slug === "design-graphique" ||
    slug.includes("design-graphique") ||
    isPrintService(item) ||
    isPrintService({ id: fallbackId, slug: fallbackId })
  ) {
    return "design";
  }
  if (id === "s-web" || slug === "sites-web-solutions-numeriques" || slug.includes("sites-web") || slug.includes("solutions-numeriques")) {
    return "web";
  }
  if (id === "s-formation" || slug === "formation-professionnelle" || /(^|[\s-])formation/.test(blob)) return "training";
  return "generic";
}

export function designNeedsFormat(kind: string): boolean {
  return (DESIGN_FORMAT_KINDS as readonly string[]).includes(kind);
}

export function webNeedsUrl(exists: string): boolean {
  return (WEB_EXISTING as readonly string[]).includes(exists);
}

export function trainingNeedsParticipants(audience: string): boolean {
  return (TRAINING_GROUP as readonly string[]).includes(audience);
}

export function joinedFormValues(data: FormData, name: string): string {
  return data
    .getAll(name)
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .join(",");
}

export function selectedList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function composeOrderContent(
  kind: OrderKind,
  data: OrderAnswers,
  t: Messages,
  trainings: Array<{ id: string; slug: string; title: string }> = [],
): { projectType: string; description: string; fields: Record<string, string> } {
  const o = t.order;
  const fields: Record<string, string> = {};
  const add = (label: string, value?: string) => {
    const text = (value ?? "").trim();
    if (!text) return;
    fields[label] = text;
  };

  if (kind === "design") {
    const typeKey = data.designKind === "autre" ? data.designKindOther || "autre" : data.designKind || "";
    const typeLabel = data.designKind === "autre" ? typeKey : pick(o.designKinds, data.designKind || "");
    const styleLabel =
      data.designStyle === "autre" ? data.designStyleOther || pick(o.designStyles, "autre") : pick(o.designStyles, data.designStyle || "");
    add(o.reviewService, data.serviceTitle);
    add(o.designKind, typeLabel);
    add(o.displayName, data.displayName);
    add(o.designText, data.designText);
    add(o.designOrigin, pick(o.designOrigins, data.designOrigin || ""));
    add(o.designColors, data.designColors);
    add(o.designStyle, styleLabel);
    add(o.designFormat, data.designFormat);
    add(o.deadline, data.desiredDeadline);
    add(o.details, data.description);
    const projectType = (typeLabel || o.designKind).slice(0, 80);
    const description = [
      line(o.designKind, typeLabel),
      line(o.displayName, data.displayName),
      line(o.designText, data.designText),
      line(o.designOrigin, pick(o.designOrigins, data.designOrigin || "")),
      line(o.designColors, data.designColors),
      line(o.designStyle, styleLabel),
      line(o.designFormat, data.designFormat),
      line(o.deadline, data.desiredDeadline),
      line(o.details, data.description),
    ]
      .filter(Boolean)
      .join("\n");
    return { projectType, description: description || typeLabel || o.designKind, fields };
  }

  if (kind === "web") {
    const typeLabel = data.webType === "autre" ? data.webTypeOther || pick(o.webTypes, "autre") : pick(o.webTypes, data.webType || "");
    const featureKeys = selectedList(data.webFeatures);
    const featureLabels = featureKeys
      .map((key) => (key === "autre" ? data.webFeatureOther || pick(o.webFeatureOptions, "autre") : pick(o.webFeatureOptions, key)))
      .filter(Boolean)
      .join(", ");
    add(o.reviewService, data.serviceTitle);
    add(o.webType, typeLabel);
    add(o.webExists, pick(o.webExistsOptions, data.webExists || ""));
    add(o.webUrl, data.webUrl);
    add(o.webDomain, pick(o.webDomainOptions, data.webDomain || ""));
    add(o.webHosting, pick(o.webHostingOptions, data.webHosting || ""));
    add(o.webFeatures, featureLabels);
    add(o.webContent, pick(o.webContentOptions, data.webContent || ""));
    add(o.webIdentity, pick(o.webIdentityOptions, data.webIdentity || ""));
    add(o.deadline, data.desiredDeadline);
    add(o.budget, data.budgetRange);
    add(o.details, data.description);
    const projectType = (typeLabel || o.webType).slice(0, 80);
    const description = [
      line(o.webType, typeLabel),
      line(o.webExists, pick(o.webExistsOptions, data.webExists || "")),
      line(o.webUrl, data.webUrl),
      line(o.webDomain, pick(o.webDomainOptions, data.webDomain || "")),
      line(o.webHosting, pick(o.webHostingOptions, data.webHosting || "")),
      line(o.webFeatures, featureLabels),
      line(o.webContent, pick(o.webContentOptions, data.webContent || "")),
      line(o.webIdentity, pick(o.webIdentityOptions, data.webIdentity || "")),
      line(o.details, data.description),
    ]
      .filter(Boolean)
      .join("\n");
    return { projectType, description: description || typeLabel || o.webType, fields };
  }

  if (kind === "training") {
    const picked = trainings.find((item) => item.id === data.trainingPick || item.slug === data.trainingPick);
    let trainingLabel = picked?.title || "";
    if (data.trainingPick === "autre") trainingLabel = data.trainingOther || pick(o.trainingSpecial, "autre");
    if (data.trainingPick === "unsure") trainingLabel = pick(o.trainingSpecial, "unsure");
    const goalLabel =
      data.trainingGoal === "autre" ? data.trainingGoalOther || pick(o.trainingGoals, "autre") : pick(o.trainingGoals, data.trainingGoal || "");
    add(o.reviewService, data.serviceTitle);
    add(o.trainingPick, trainingLabel);
    add(o.trainingLevel, pick(o.trainingLevels, data.trainingLevel || ""));
    add(o.trainingGoal, goalLabel);
    add(o.trainingFormat, pick(o.trainingFormats, data.trainingFormat || ""));
    add(o.trainingAudience, pick(o.trainingAudiences, data.trainingAudience || ""));
    add(o.trainingParticipants, data.trainingParticipants);
    add(o.trainingDays, data.trainingDays);
    add(o.trainingPeriod, data.trainingPeriod);
    add(o.trainingAvailability, data.trainingAvailability);
    add(o.details, data.description);
    const projectType = (trainingLabel || o.trainingPick).slice(0, 80);
    const description = [
      line(o.trainingPick, trainingLabel),
      line(o.trainingLevel, pick(o.trainingLevels, data.trainingLevel || "")),
      line(o.trainingGoal, goalLabel),
      line(o.trainingFormat, pick(o.trainingFormats, data.trainingFormat || "")),
      line(o.trainingAudience, pick(o.trainingAudiences, data.trainingAudience || "")),
      line(o.trainingParticipants, data.trainingParticipants),
      line(o.trainingDays, data.trainingDays),
      line(o.trainingPeriod, data.trainingPeriod),
      line(o.trainingAvailability, data.trainingAvailability),
      line(o.details, data.description),
    ]
      .filter(Boolean)
      .join("\n");
    return { projectType, description: description || trainingLabel || o.trainingPick, fields };
  }

  add(o.reviewService, data.serviceTitle);
  add(o.projectType, data.projectType);
  add(o.details, data.description);
  add(o.deadline, data.desiredDeadline);
  add(o.budget, data.budgetRange);
  return {
    projectType: (data.projectType || "").slice(0, 80),
    description: data.description || "",
    fields,
  };
}
