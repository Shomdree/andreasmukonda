import type { AstroCookies } from "astro";
import { memoryRows, patchMemoryRow, removeMemoryRow } from "./actions";
import { allowMemoryFallback } from "./env";
import { createCookieSupabase } from "./supabase";

export async function adminClient(request: Request, cookies: AstroCookies) {
  return createCookieSupabase(request, cookies);
}

export async function countTable(
  request: Request,
  cookies: AstroCookies,
  table: string,
  filters?: Record<string, string | boolean>,
): Promise<number> {
  const supabase = await adminClient(request, cookies);
  if (!supabase) {
    return allowMemoryFallback()
      ? memoryRows(table).filter((row) => {
          if (!filters) return true;
          return Object.entries(filters).every(([key, value]) => row[key] === value);
        }).length
      : 0;
  }
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }
  }
  const { count } = await query;
  return count ?? 0;
}

export async function listRows<T extends Record<string, unknown>>(
  request: Request,
  cookies: AstroCookies,
  table: string,
  options: { order?: string; ascending?: boolean; limit?: number; eq?: Record<string, string | boolean> } = {},
): Promise<T[]> {
  const supabase = await adminClient(request, cookies);
  if (!supabase) {
    if (!allowMemoryFallback()) return [];
    let rows = memoryRows(table) as T[];
    if (options.eq) {
      rows = rows.filter((row) => Object.entries(options.eq!).every(([k, v]) => row[k] === v));
    }
    return rows.slice(0, options.limit ?? 50);
  }
  let query = supabase.from(table).select("*");
  if (options.eq) {
    for (const [key, value] of Object.entries(options.eq)) query = query.eq(key, value);
  }
  if (options.order) query = query.order(options.order, { ascending: options.ascending ?? false });
  if (options.limit) query = query.limit(options.limit);
  const { data } = await query;
  return (data ?? []) as T[];
}

export async function updateRow(
  request: Request,
  cookies: AstroCookies,
  table: string,
  id: string,
  patch: Record<string, unknown>,
): Promise<boolean> {
  const supabase = await adminClient(request, cookies);
  if (!supabase) {
    return allowMemoryFallback() ? patchMemoryRow(table, id, patch) : false;
  }
  const { error } = await supabase.from(table).update(patch).eq("id", id);
  return !error;
}

export async function deleteRow(
  request: Request,
  cookies: AstroCookies,
  table: string,
  id: string,
): Promise<boolean> {
  const supabase = await adminClient(request, cookies);
  if (!supabase) {
    return allowMemoryFallback() ? removeMemoryRow(table, id) : false;
  }
  const { error } = await supabase.from(table).delete().eq("id", id);
  return !error;
}
