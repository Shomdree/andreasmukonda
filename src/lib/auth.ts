import type { AstroCookies } from "astro";
import { createCookieSupabase } from "./supabase";

export async function getSessionUser(request: Request, cookies: AstroCookies) {
  const supabase = createCookieSupabase(request, cookies);
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export function isAdminEmail(email: string | undefined): boolean {
  const expected = import.meta.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!email || !expected) return false;
  return email.toLowerCase() === expected;
}

export async function getProfileRole(
  request: Request,
  cookies: AstroCookies,
  userId: string,
): Promise<string | null> {
  const supabase = createCookieSupabase(request, cookies);
  if (!supabase) return null;
  const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).maybeSingle();
  if (error || !data) return null;
  return typeof data.role === "string" ? data.role : null;
}

export async function requireAdmin(request: Request, cookies: AstroCookies) {
  const user = await getSessionUser(request, cookies);
  if (!user) return null;
  const role = await getProfileRole(request, cookies, user.id);
  if (role !== "admin") return null;
  const allowlist = import.meta.env.ADMIN_EMAIL?.trim();
  if (allowlist && !isAdminEmail(user.email)) return null;
  return user;
}
