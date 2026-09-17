import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AstroCookies } from "astro";
import { isSupabaseConfigured } from "./env";

export function createBrowserSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  return createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function createServiceSupabase(): SupabaseClient | null {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  // Clé serveur uniquement — jamais préfixée PUBLIC_, jamais importée depuis un script client.
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function createCookieSupabase(request: Request, cookies: AstroCookies) {
  if (!isSupabaseConfigured()) return null;
  return createServerClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "").map((cookie) => ({
          name: cookie.name,
          value: cookie.value ?? "",
        }));
      },
      setAll(incoming) {
        incoming.forEach(({ name, value, options }) => {
          cookies.set(name, value, options);
        });
      },
    },
  });
}
