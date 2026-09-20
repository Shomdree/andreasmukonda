import { existsSync } from "node:fs";
import { resolve } from "node:path";

export function publicPath(src: string): string {
  if (!src.startsWith("/")) return "";
  const clean = src.split("?")[0] ?? "";
  try {
    return decodeURI(clean);
  } catch {
    return clean;
  }
}

export function publicFileExists(src: string): boolean {
  const decoded = publicPath(src);
  if (!decoded) return false;
  return existsSync(resolve(process.cwd(), "public", decoded.replace(/^\//, "")));
}

export function publicImageBase(src: string): string {
  return publicPath(src).replace(/\.(jpe?g|png|webp|avif)$/i, "");
}

export function hasOptimizedPublicVariants(src: string): boolean {
  const base = publicImageBase(src);
  return Boolean(base) && publicFileExists(`${base}-720.webp`);
}
