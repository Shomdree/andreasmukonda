function pick(...values: unknown[]): string {
  for (const value of values) {
    const text = String(value ?? "").trim();
    if (text) return text;
  }
  return "";
}

function nodeEnv(name: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  switch (name) {
    case "PUBLIC_SITE_URL":
      return process.env.PUBLIC_SITE_URL;
    case "PUBLIC_SUPABASE_URL":
      return process.env.PUBLIC_SUPABASE_URL;
    case "PUBLIC_SUPABASE_ANON_KEY":
      return process.env.PUBLIC_SUPABASE_ANON_KEY;
    case "PUBLIC_WHATSAPP_NUMBER":
      return process.env.PUBLIC_WHATSAPP_NUMBER;
    case "PUBLIC_ANALYTICS_SRC":
      return process.env.PUBLIC_ANALYTICS_SRC;
    case "PUBLIC_ANALYTICS_DOMAIN":
      return process.env.PUBLIC_ANALYTICS_DOMAIN;
    case "SUPABASE_SERVICE_ROLE_KEY":
      return process.env.SUPABASE_SERVICE_ROLE_KEY;
    case "ADMIN_EMAIL":
      return process.env.ADMIN_EMAIL;
    case "EMAIL_PROVIDER_API_KEY":
      return process.env.EMAIL_PROVIDER_API_KEY;
    case "EMAIL_FROM":
      return process.env.EMAIL_FROM;
    default:
      return process.env[name];
  }
}

export function readServerEnv(name: string): string {
  if (!import.meta.env.SSR && name !== "PUBLIC_SITE_URL" && name !== "PUBLIC_SUPABASE_URL" && name !== "PUBLIC_SUPABASE_ANON_KEY" && name !== "PUBLIC_WHATSAPP_NUMBER" && name !== "PUBLIC_ANALYTICS_SRC" && name !== "PUBLIC_ANALYTICS_DOMAIN") {
    return "";
  }
  switch (name) {
    case "PUBLIC_SITE_URL":
      return pick(import.meta.env.PUBLIC_SITE_URL, nodeEnv(name));
    case "PUBLIC_SUPABASE_URL":
      return pick(import.meta.env.PUBLIC_SUPABASE_URL, nodeEnv(name));
    case "PUBLIC_SUPABASE_ANON_KEY":
      return pick(import.meta.env.PUBLIC_SUPABASE_ANON_KEY, nodeEnv(name));
    case "PUBLIC_WHATSAPP_NUMBER":
      return pick(import.meta.env.PUBLIC_WHATSAPP_NUMBER, nodeEnv(name));
    case "PUBLIC_ANALYTICS_SRC":
      return pick(import.meta.env.PUBLIC_ANALYTICS_SRC, nodeEnv(name));
    case "PUBLIC_ANALYTICS_DOMAIN":
      return pick(import.meta.env.PUBLIC_ANALYTICS_DOMAIN, nodeEnv(name));
    case "SUPABASE_SERVICE_ROLE_KEY":
      return pick(nodeEnv(name), import.meta.env.SSR ? import.meta.env.SUPABASE_SERVICE_ROLE_KEY : "");
    case "ADMIN_EMAIL":
      return pick(nodeEnv(name), import.meta.env.SSR ? import.meta.env.ADMIN_EMAIL : "");
    case "EMAIL_PROVIDER_API_KEY":
      return pick(nodeEnv(name), import.meta.env.SSR ? import.meta.env.EMAIL_PROVIDER_API_KEY : "");
    case "EMAIL_FROM":
      return pick(nodeEnv(name), import.meta.env.SSR ? import.meta.env.EMAIL_FROM : "");
    default:
      return pick(nodeEnv(name));
  }
}

export function isSupabaseConfigured(): boolean {
  return Boolean(readServerEnv("PUBLIC_SUPABASE_URL") && readServerEnv("PUBLIC_SUPABASE_ANON_KEY"));
}

export const PUBLIC_ORIGIN = "https://andreasmukonda.com";

export function publicSiteOrigin(configured: string): string {
  const value = (configured || "http://localhost:4321").replace(/\/$/, "");
  try {
    const host = new URL(value).hostname;
    if (host === "andreasmukonda.com" || host === "www.andreasmukonda.com" || host.endsWith(".onrender.com")) {
      return PUBLIC_ORIGIN;
    }
  } catch {
    return value;
  }
  return value;
}

export function siteUrl(): string {
  return publicSiteOrigin(readServerEnv("PUBLIC_SITE_URL") || "http://localhost:4321");
}

export function envWhatsApp(): string {
  return readServerEnv("PUBLIC_WHATSAPP_NUMBER").replace(/\D/g, "");
}

/** Mémoire processus : uniquement `astro dev`, jamais un build de production. */
export function allowMemoryFallback(): boolean {
  return Boolean(import.meta.env.DEV) && !import.meta.env.PROD;
}

import { en } from "../i18n/en";
import { fr } from "../i18n/fr";
import { ln } from "../i18n/ln";

export const CONTACT_UNAVAILABLE = fr.form.unavailableContact;
export const SERVICE_UNAVAILABLE = fr.form.unavailableGeneric;
export const ORDER_UNAVAILABLE = fr.form.unavailableOrder;

const unavailableMessages = new Set<string>([
  CONTACT_UNAVAILABLE,
  SERVICE_UNAVAILABLE,
  ORDER_UNAVAILABLE,
  fr.contact.error,
  ln.contact.error,
  en.contact.error,
  fr.form.unavailableContact,
  ln.form.unavailableContact,
  en.form.unavailableContact,
  fr.form.unavailableOrder,
  ln.form.unavailableOrder,
  en.form.unavailableOrder,
  fr.form.unavailableGeneric,
  ln.form.unavailableGeneric,
  en.form.unavailableGeneric,
]);

export function isUnavailableMessage(message: string | undefined): boolean {
  return Boolean(message && unavailableMessages.has(message));
}

export function logServerError(scope: string, code?: string): void {
  const suffix = code ? ` code=${code}` : "";
  console.error(`[${scope}]${suffix}`);
}
