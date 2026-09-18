export function readServerEnv(name: string): string {
  const fromVite = (import.meta.env as Record<string, string | undefined>)[name];
  const fromNode = typeof process !== "undefined" ? process.env[name] : undefined;
  return String(fromVite ?? fromNode ?? "").trim();
}

export function isSupabaseConfigured(): boolean {
  return Boolean(readServerEnv("PUBLIC_SUPABASE_URL") && readServerEnv("PUBLIC_SUPABASE_ANON_KEY"));
}

export function siteUrl(): string {
  return (readServerEnv("PUBLIC_SITE_URL") || "http://localhost:4321").replace(/\/$/, "");
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
