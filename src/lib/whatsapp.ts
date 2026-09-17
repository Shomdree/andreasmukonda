import type { Locale } from "../i18n/config";
import { ui } from "../i18n/utils";

export function whatsappUrl(number: string, text: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function genericWhatsAppMessage(locale: Locale = "fr"): string {
  return ui(locale).whatsapp.generic;
}

export const WHATSAPP_GENERIC_MESSAGE = genericWhatsAppMessage("fr");

export function orderWhatsAppMessage(reference: string, locale: Locale = "fr"): string {
  return `${ui(locale).whatsapp.order} ${reference}.`;
}
