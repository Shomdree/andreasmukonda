import { identity } from "../i18n/identity";
import { ui, type Locale } from "../i18n";
import { siteUrl } from "./env";
import type { SiteSettings } from "./types";

export function personJsonLd(settings: SiteSettings, locale: Locale = "fr") {
  const t = ui(locale);
  const sameAs = Object.values({ ...identity.socials, ...settings.socialLinks }).filter(Boolean);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: identity.legalName,
      alternateName: identity.name,
      jobTitle: t.hero.roles.replace(/ · /g, ", "),
      description: `${t.about.intro} ${t.about.p1}`,
      url: siteUrl(),
      email: identity.email,
      telephone: identity.phone,
      image: identity.portrait,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kinshasa",
        addressCountry: "CD",
      },
      affiliation: {
        "@type": "Organization",
        name: identity.gsi,
      },
      sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: identity.gsi,
      alternateName: identity.gsiShort,
      founder: {
        "@type": "Person",
        name: identity.legalName,
        alternateName: identity.name,
      },
      foundingDate: String(identity.foundedYear),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kinshasa",
        addressCountry: "CD",
      },
    },
  ];
}
