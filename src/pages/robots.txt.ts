import type { APIRoute } from "astro";
import { siteUrl } from "../lib/env";

export const GET: APIRoute = async () => {
  const body = `User-agent: *
Allow: /
Disallow: /admin
Sitemap: ${siteUrl()}/sitemap.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
