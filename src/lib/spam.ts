const MIN_DWELL_MS = 1000;

export function isTooFast(startedAt: string | undefined, now = Date.now(), minMs = MIN_DWELL_MS): boolean {
  if (!startedAt) return false;
  const started = Number(startedAt);
  if (!Number.isFinite(started) || started <= 0) return false;
  return now - started < minMs;
}

export function honeypotFilled(website: string | undefined): boolean {
  return Boolean(website && website.trim());
}

export function spamReason(data: FormData, now = Date.now()): "honeypot" | "too_fast" | null {
  if (honeypotFilled(String(data.get("website") ?? ""))) return "honeypot";
  if (isTooFast(String(data.get("startedAt") ?? ""), now)) return "too_fast";
  return null;
}
