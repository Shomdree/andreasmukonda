const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp", "image/avif"]);
const ALLOWED_EXT = new Set(["pdf", "jpg", "jpeg", "png", "webp", "avif"]);
export const MAX_ORDER_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const MAGIC_REJECT = "Formats acceptés : PDF, JPG, PNG ou WebP.";

export function validateOrderAttachment(file: File): string | null {
  if (file.size > MAX_ORDER_ATTACHMENT_BYTES) {
    return "Le fichier dépasse la taille autorisée.";
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXT.has(ext) || (file.type && !ALLOWED_TYPES.has(file.type))) {
    return MAGIC_REJECT;
  }
  return null;
}

export async function verifyAttachmentMagic(file: File): Promise<string | null> {
  const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (header.length < 4) return MAGIC_REJECT;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return looksLikePdf(header) ? null : MAGIC_REJECT;
  if (ext === "jpg" || ext === "jpeg") return looksLikeJpeg(header) ? null : MAGIC_REJECT;
  if (ext === "png") return looksLikePng(header) ? null : MAGIC_REJECT;
  if (ext === "webp") return looksLikeWebp(header) ? null : MAGIC_REJECT;
  if (ext === "avif") return looksLikeAvif(header) ? null : MAGIC_REJECT;
  return MAGIC_REJECT;
}

function looksLikePdf(bytes: Uint8Array): boolean {
  return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
}

function looksLikeJpeg(bytes: Uint8Array): boolean {
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

function looksLikePng(bytes: Uint8Array): boolean {
  return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
}

function looksLikeWebp(bytes: Uint8Array): boolean {
  return (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  );
}

function looksLikeAvif(bytes: Uint8Array): boolean {
  return bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70;
}

export function uniqueAttachmentName(originalName: string): string {
  const ext = originalName.split(".").pop()?.toLowerCase() || "bin";
  const safeExt = ALLOWED_EXT.has(ext) ? ext : "bin";
  return `${crypto.randomUUID()}.${safeExt}`;
}
