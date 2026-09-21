import { describe, expect, it } from "vitest";
import { COOKIE_LOCALE } from "./config";
import { en } from "./en";
import { fr } from "./fr";
import { ln } from "./ln";
import { hreflangLinks, localizedPath, parseLocale, stripLocalePrefix, ui } from "./utils";

describe("i18n utils", () => {
  it("keeps French unprefixed", () => {
    expect(localizedPath("fr", "/services")).toBe("/services");
    expect(localizedPath("fr", "/")).toBe("/");
  });

  it("prefixes Lingala and English", () => {
    expect(localizedPath("ln", "/services")).toBe("/ln/services");
    expect(localizedPath("en", "/")).toBe("/en");
    expect(localizedPath("en", "/contact")).toBe("/en/contact");
  });

  it("strips locale prefixes", () => {
    expect(stripLocalePrefix("/ln/services")).toEqual({ locale: "ln", path: "/services" });
    expect(stripLocalePrefix("/en")).toEqual({ locale: "en", path: "/" });
    expect(stripLocalePrefix("/a-propos")).toEqual({ locale: "fr", path: "/a-propos" });
  });

  it("falls back to French", () => {
    expect(parseLocale("de")).toBe("fr");
    expect(parseLocale("ln")).toBe("ln");
  });

  it("builds hreflang links", () => {
    const links = hreflangLinks("https://example.com", "/contact");
    expect(links).toEqual([
      { lang: "fr", href: "https://example.com/contact" },
      { lang: "ln", href: "https://example.com/ln/contact" },
      { lang: "en", href: "https://example.com/en/contact" },
      { lang: "x-default", href: "https://example.com/contact" },
    ]);
  });

  it("keeps home hreflang without a trailing slash", () => {
    const links = hreflangLinks("https://andreasmukonda.com", "/");
    expect(links).toEqual([
      { lang: "fr", href: "https://andreasmukonda.com" },
      { lang: "ln", href: "https://andreasmukonda.com/ln" },
      { lang: "en", href: "https://andreasmukonda.com/en" },
      { lang: "x-default", href: "https://andreasmukonda.com" },
    ]);
  });

  it("exposes the same dictionary keys", () => {
    expect(Object.keys(ln)).toEqual(Object.keys(fr));
    expect(Object.keys(en)).toEqual(Object.keys(fr));
    expect(ui("ln").hero.ctaWork).toBeTruthy();
    expect(ui("en").catalog.trainings.anglais.title).toBe("English");
    expect(ui("en").theme.light).toBe("Light");
    expect(Object.keys(ln.portfolio)).toEqual(Object.keys(fr.portfolio));
    expect(Object.keys(en.order)).toEqual(Object.keys(fr.order));
    expect(Object.keys(ln.order)).toEqual(Object.keys(fr.order));
    expect(Object.keys(en.questions)).toEqual(Object.keys(fr.questions));
    expect(Object.keys(ln.consultingPage)).toEqual(Object.keys(fr.consultingPage));
    expect(Object.keys(en.trainings)).toEqual(Object.keys(fr.trainings));
    expect(Object.keys(ln.lives)).toEqual(Object.keys(fr.lives));
    expect(Object.keys(en.news)).toEqual(Object.keys(fr.news));
    expect(Object.keys(ln.servicesPage)).toEqual(Object.keys(fr.servicesPage));
    expect(Object.keys(en.servicesPage)).toEqual(Object.keys(fr.servicesPage));
    expect(COOKIE_LOCALE).toBe("preferred_locale");
  });
});
