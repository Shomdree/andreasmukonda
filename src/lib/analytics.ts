export function analyticsSnippet(): { src: string; domain: string } | null {
  const src = import.meta.env.PUBLIC_ANALYTICS_SRC;
  const domain = import.meta.env.PUBLIC_ANALYTICS_DOMAIN;
  if (!src || !domain) return null;
  return { src, domain };
}
