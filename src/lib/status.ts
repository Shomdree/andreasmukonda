export const contactStatuses = ["nouvelle", "lue", "repondue", "archivee"] as const;
export const orderStatuses = [
  "nouvelle",
  "en_analyse",
  "devis_envoye",
  "confirmee",
  "en_production",
  "en_attente_client",
  "terminee",
  "annulee",
] as const;

export type ContactStatus = (typeof contactStatuses)[number];
export type OrderStatus = (typeof orderStatuses)[number];

const labels: Record<string, string> = {
  nouvelle: "Nouvelle",
  lue: "Lue",
  repondue: "Répondue",
  archivee: "Archivée",
  publiee: "Publiée",
  en_analyse: "En analyse",
  devis_envoye: "Devis envoyé",
  confirmee: "Confirmée",
  en_production: "En cours",
  en_attente_client: "En attente client",
  terminee: "Terminée",
  annulee: "Annulée",
  new: "Nouvelle",
  read: "Lue",
  replied: "Répondue",
  archived: "Archivée",
  reviewing: "En analyse",
  quote_sent: "Devis envoyé",
  confirmed: "Confirmée",
  in_progress: "En cours",
  waiting_client: "En attente client",
  completed: "Terminée",
  cancelled: "Annulée",
};

export function statusLabel(status: string): string {
  return labels[status] ?? status;
}

export function visitorLocaleLabel(locale: unknown): string {
  if (locale === "ln") return "Langue : Lingala";
  if (locale === "en") return "Langue : English";
  return "Langue : Français";
}
