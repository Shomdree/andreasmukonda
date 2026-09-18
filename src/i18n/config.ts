export const locales = ["fr", "ln", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  ln: "Lingala",
  en: "English",
};

export const localeHtml: Record<Locale, string> = {
  fr: "fr",
  ln: "ln",
  en: "en",
};

export const localeOg: Record<Locale, string> = {
  fr: "fr_FR",
  ln: "ln_CD",
  en: "en_US",
};

export const COOKIE_LOCALE = "preferred_locale";
export const COOKIE_THEME = "preferred_theme";
export const themes = ["dark", "light"] as const;
export type Theme = (typeof themes)[number];
export const defaultTheme: Theme = "dark";
