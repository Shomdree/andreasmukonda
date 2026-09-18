import type { Locale, Messages } from "./index";
import { localizedPath, parseLocale, ui } from "./index";

export function pageI18n(locals: App.Locals) {
  const locale: Locale = parseLocale(locals.locale);
  const path = locals.pathWithoutLocale || "/";
  const t: Messages = ui(locale);
  const href = (target: string) => localizedPath(locale, target);
  return { locale, path, t, href };
}
