import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AstroCookies } from "astro";
import WS from "ws";
import { readServerEnv } from "./env";

/** Node 20 n'a pas WebSocket natif ; supabase-js 2.x le exige à la création du client. */
function ensureNodeWebSocket(): void {
  if (typeof globalThis.WebSocket === "undefined") {
    globalThis.WebSocket = WS as unknown as typeof globalThis.WebSocket;
  }
}

function publicSupabase() {
  const url = readServerEnv("PUBLIC_SUPABASE_URL");
  const anon = readServerEnv("PUBLIC_SUPABASE_ANON_KEY");
  return { url, anon };
}

function authOptions() {
  return { persistSession: false, autoRefreshToken: false };
}

function realtimeOptions() {
  ensureNodeWebSocket();
  return { transport: globalThis.WebSocket };
}

export function createBrowserSupabase(): SupabaseClient | null {
  const { url, anon } = publicSupabase();
  if (!url || !anon) return null;
  try {
    return createClient(url, anon, {
      auth: authOptions(),
      realtime: realtimeOptions(),
    });
  } catch {
    return null;
  }
}

export function createServiceSupabase(): SupabaseClient | null {
  const url = readServerEnv("PUBLIC_SUPABASE_URL");
  const key = readServerEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return null;
  // Clé serveur uniquement — jamais préfixée PUBLIC_, jamais importée depuis un script client.
  try {
    return createClient(url, key, {
      auth: authOptions(),
      realtime: realtimeOptions(),
    });
  } catch {
    return null;
  }
}

export function createCookieSupabase(request: Request, cookies: AstroCookies) {
  const { url, anon } = publicSupabase();
  if (!url || !anon) return null;
  try {
    return createServerClient(url, anon, {
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
      realtime: realtimeOptions(),
    });
  } catch {
    return null;
  }
}
