/**
 * Montants historiques issus de l'ancien site.
 * Non publiés comme tarifs officiels. À confirmer dans l'administration (price_label).
 */
export const historicalPricing = {
  formation: { label: "Formation professionnelle", amount: "20 USD" },
  logo: { label: "Logo", amount: "20 USD" },
  photo: { label: "Photo", amount: "2 USD" },
  anniversaire: { label: "Anniversaire", amount: "10 USD/heure" },
  mariage: { label: "Mariage complet", amount: "220 USD" },
  shooting: { label: "Shooting", amount: "2 USD/photo" },
  logicielSimple: { label: "Logiciel simple", amount: "150 USD" },
  logicielDynamique: { label: "Logiciel dynamique", amount: "250 USD" },
  siteSimple: { label: "Site web simple", amount: "150 USD" },
  siteDynamique: { label: "Site web dynamique", amount: "250 USD" },
} as const;
