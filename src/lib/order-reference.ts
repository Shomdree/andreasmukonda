const PREFIX = "AM";

export function formatOrderReference(year: number, sequence: number): string {
  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    throw new Error("Année invalide");
  }
  if (!Number.isInteger(sequence) || sequence < 1 || sequence > 9999) {
    throw new Error("Séquence invalide");
  }
  return `${PREFIX}-${year}-${String(sequence).padStart(4, "0")}`;
}

export function nextOrderReference(latest: string | null, now = new Date()): string {
  const year = now.getFullYear();
  const match = latest?.match(/^AM-(\d{4})-(\d{4})$/);
  if (!match || Number(match[1]) !== year) {
    return formatOrderReference(year, 1);
  }
  return formatOrderReference(year, Number(match[2]) + 1);
}

export function isOrderReference(value: string): boolean {
  return /^AM-\d{4}-\d{4}$/.test(value);
}
