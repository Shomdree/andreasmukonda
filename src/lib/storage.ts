import { createServiceSupabase } from "./supabase";
import { logServerError } from "./env";

const BUCKET = "order-attachments";
const SIGNED_TTL_SECONDS = 60 * 60;

export async function signedAttachmentUrl(path: string | null | undefined): Promise<string | null> {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const supabase = createServiceSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, SIGNED_TTL_SECONDS);
  if (error || !data?.signedUrl) {
    logServerError("storage.signedUrl", error?.name);
    return null;
  }
  return data.signedUrl;
}
