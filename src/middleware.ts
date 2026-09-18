import { defineMiddleware } from "astro:middleware";
import { COOKIE_LOCALE } from "./i18n/config";
import { isLocale, stripLocalePrefix } from "./i18n/utils";
import { requireAdmin } from "./lib/auth";
import { readServerEnv, siteUrl, logServerError } from "./lib/env";

const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-XSS-Protection": "0",
};

function skipLocale(pathname: string): boolean {
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/_")) return true;
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt") return true;
  return /\.[a-z0-9]+$/i.test(pathname);
}

function withSecurity(response: Response): Response {
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  let supabaseHost = "";
  try {
    const supabaseUrl = readServerEnv("PUBLIC_SUPABASE_URL");
    if (supabaseUrl) supabaseHost = new URL(supabaseUrl).origin;
  } catch {
    supabaseHost = "";
  }
  const analytics = readServerEnv("PUBLIC_ANALYTICS_SRC");
  let analyticsOrigin = "";
  try {
    if (analytics) analyticsOrigin = ` ${new URL(analytics, siteUrl()).origin}`;
  } catch {
    analyticsOrigin = "";
  }
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "img-src 'self' data: blob: https:",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      `connect-src 'self' ${supabaseHost}`.trim(),
      `script-src 'self'${analyticsOrigin}`,
      "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://www.facebook.com https://www.tiktok.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  );
  return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const headerLocale = context.request.headers.get("x-app-locale");

  if (!context.locals.locale && isLocale(headerLocale)) {
    context.locals.locale = headerLocale;
    context.locals.pathWithoutLocale = context.request.headers.get("x-app-path") || "/";
  }

  if (!context.locals.locale) {
    if (skipLocale(pathname)) {
      context.locals.locale = "fr";
      context.locals.pathWithoutLocale = pathname;
    } else {
      const parsed = stripLocalePrefix(pathname);
      context.locals.locale = parsed.locale;
      context.locals.pathWithoutLocale = parsed.path;
      context.cookies.set(COOKIE_LOCALE, parsed.locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        httpOnly: true,
        secure: context.url.protocol === "https:",
      });
      if (parsed.locale !== "fr") {
        const nextUrl = new URL(context.url);
        nextUrl.pathname = parsed.path;
        const headers = new Headers(context.request.headers);
        headers.set("x-app-locale", parsed.locale);
        headers.set("x-app-path", parsed.path);
        const init: RequestInit & { duplex?: "half" } = {
          method: context.request.method,
          headers,
        };
        if (context.request.method !== "GET" && context.request.method !== "HEAD") {
          init.body = context.request.body;
          init.duplex = "half";
        }
        return withSecurity(await context.rewrite(new Request(nextUrl, init)));
      }
    }
  }

  const isAdmin = pathname.startsWith("/admin") && pathname !== "/admin/login";
  if (isAdmin) {
    const admin = await requireAdmin(context.request, context.cookies);
    if (!admin) {
      const dest = new URL("/admin/login", context.url);
      dest.searchParams.set("next", pathname);
      return context.redirect(dest.toString());
    }
  }

  try {
    return withSecurity(await next());
  } catch {
    logServerError("middleware", "next");
    if (context.request.method === "POST") {
      const dest = new URL(context.url);
      dest.searchParams.set("err", "1");
      dest.searchParams.delete("ok");
      return withSecurity(context.redirect(`${dest.pathname}${dest.search}`));
    }
    throw new Error("page_render");
  }
