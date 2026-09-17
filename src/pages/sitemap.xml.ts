import type { APIRoute } from "astro";
import { localizedPath } from "../i18n/utils";
import { locales } from "../i18n/config";
import { getPosts, getProjects, getServices, getTrainings } from "../lib/queries";
import { siteUrl } from "../lib/env";

export const GET: APIRoute = async () => {
  const origin = siteUrl();
  const [projects, services, trainings, posts] = await Promise.all([
    getProjects(),
    getServices(),
    getTrainings(),
    getPosts(),
  ]);
  const paths = [
    "/",
    "/a-propos",
    "/portfolio",
    "/services",
    "/formations",
    "/consulting",
    "/lives",
    "/questions",
    "/commander",
    "/contact",
    "/actualites",
    "/faq",
    "/mentions-legales",
    "/confidentialite",
    ...projects.map((p) => `/portfolio/${p.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...trainings.map((t) => `/formations/${t.slug}`),
    ...posts.map((p) => `/actualites/${p.slug}`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths
  .map((path) => {
    const loc = `${origin}${localizedPath("fr", path) === "/" ? "" : localizedPath("fr", path)}`;
    const links = locales
      .map((locale) => {
        const href = `${origin}${localizedPath(locale, path) === "/" ? "" : localizedPath(locale, path)}`;
        return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}" />`;
      })
      .join("\n");
    return `  <url>
    <loc>${loc}</loc>
${links}
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />
  </url>`;
  })
  .join("\n")}
</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
