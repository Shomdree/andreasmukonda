import { createHash } from "node:crypto";
import { createServiceSupabase } from "./supabase";
import { logServerError } from "./env";

type Bucket = { count: number; resetAt: number };

const hits = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 8, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const current = hits.get(key);
  if (!current || current.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export function clientKey(request: Request, suffix: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "local";
  return `${ip}:${suffix}`;
}

/** Hash SHA-256 tronqué — ne pas persister l’IP brute. */
export function hashedClientKey(request: Request, suffix: string): string {
  return createHash("sha256").update(clientKey(request, suffix)).digest("hex").slice(0, 32);
}

export async function consumeRateLimit(id: string, limit: number, windowMs: number): Promise<boolean> {
  const supabase = createServiceSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.rpc("consume_form_rate_limit", {
        p_id: id,
        p_limit: limit,
        p_window_seconds: Math.max(1, Math.ceil(windowMs / 1000)),
      });
      if (!error && typeof data === "boolean") return data;
    } catch {
      logServerError("rate-limit", "rpc");
    }
  }
  return rateLimit(id, limit, windowMs);
}
