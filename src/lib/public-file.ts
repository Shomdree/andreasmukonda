import { existsSync } from "node:fs";
import { resolve } from "node:path";

export function publicFileExists(src: string): boolean {
  if (!src.startsWith("/")) return false;
  const clean = src.split("?")[0] ?? "";
  let decoded = clean;
  try {
    decoded = decodeURI(clean);
  } catch {
    decoded = clean;
  }
  return existsSync(resolve(process.cwd(), "public", decoded.replace(/^\//, "")));
}
