import { COOKIE_LOCALE, defaultLocale, locales, type Locale } from "./config";
import { en } from "./en";
import { fr } from "./fr";
import { ln } from "./ln";
import type { Messages } from "./types";

const catalog: Record<Locale, Messages> = { fr, ln, en };

export type { Messages };

export function isLocale(value: string | undefined | null): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value));
}

export function parseLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function ui(locale: Locale): Messages {
  return catalog[locale];
}

export function localizedPath(locale: Locale, path: string): string {
  const [rawPath, query] = path.split("?");
  let clean = rawPath || "/";
  if (!clean.startsWith("/")) clean = `/${clean}`;
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);
  const base = locale === "fr" ? (clean === "" ? "/" : clean) : clean === "/" ? `/${locale}` : `/${locale}${clean}`;
  return query ? `${base}?${query}` : base;
}

export function stripLocalePrefix(pathname: string): { locale: Locale; path: string } {
  const match = pathname.match(/^\/(ln|en)(?=\/|$)/);
  if (!match) return { locale: defaultLocale, path: pathname || "/" };
  const rest = pathname.slice(match[0].length) || "/";
  return { locale: match[1] as Locale, path: rest.startsWith("/") ? rest : `/${rest}` };
}

export function localeFromCookie(cookieHeader: string | null): Locale | null {
  if (!cookieHeader) return null;
  const part = cookieHeader.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${COOKIE_LOCALE}=`));
  if (!part) return null;
  const value = decodeURIComponent(part.slice(COOKIE_LOCALE.length + 1));
  return isLocale(value) ? value : null;
}

export function hreflangLinks(origin: string, pathWithoutLocale: string): { lang: string; href: string }[] {
  const path = pathWithoutLocale || "/";
  return [
    { lang: "fr", href: `${origin}${localizedPath("fr", path)}` },
    { lang: "ln", href: `${origin}${localizedPath("ln", path)}` },
    { lang: "en", href: `${origin}${localizedPath("en", path)}` },
    { lang: "x-default", href: `${origin}${localizedPath("fr", path)}` },
  ];
}
