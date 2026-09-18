export type AdminField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "checkbox" | "select" | "url" | "datetime-local" | "number";
  options?: string[];
};

export type AdminCollection = {
  slug: string;
  table: string;
  title: string;
  labelField: string;
  fields: AdminField[];
};

export const adminCollections: AdminCollection[] = [
  {
    slug: "portfolio",
    table: "portfolio_projects",
    title: "Portfolio",
    labelField: "title",
    fields: [
      { name: "title", label: "Titre", type: "text" },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Extrait", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "client", label: "Client", type: "text" },
      { name: "year", label: "Année", type: "text" },
      { name: "challenge", label: "Problématique", type: "textarea" },
      { name: "solution", label: "Solution", type: "textarea" },
      { name: "cover_image", label: "Image de couverture", type: "url" },
      { name: "featured", label: "Mis en avant", type: "checkbox" },
      { name: "published", label: "Publié", type: "checkbox" },
      { name: "sort_order", label: "Ordre", type: "number" },
      { name: "seo_title", label: "SEO titre", type: "text" },
      { name: "seo_description", label: "SEO description", type: "textarea" },
    ],
  },
  {
    slug: "services",
    table: "services",
    title: "Services",
    labelField: "title",
    fields: [
      { name: "title", label: "Nom", type: "text" },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Présentation", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "price_label", label: "Prix affiché (ex. Sur devis)", type: "text" },
      { name: "cta_label", label: "Libellé CTA", type: "text" },
      { name: "cta_href", label: "Lien CTA", type: "text" },
      { name: "turnaround", label: "Délai", type: "text" },
      { name: "cover_image", label: "Image", type: "url" },
      { name: "featured", label: "Mis en avant", type: "checkbox" },
      { name: "published", label: "Publié", type: "checkbox" },
      { name: "sort_order", label: "Ordre", type: "number" },
    ],
  },
  {
    slug: "formations",
    table: "trainings",
    title: "Formations",
    labelField: "title",
    fields: [
      { name: "title", label: "Titre", type: "text" },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Extrait", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "audience", label: "Public", type: "text" },
      { name: "trainer", label: "Formateur", type: "text" },
      { name: "program", label: "Programme", type: "textarea" },
      { name: "level", label: "Niveau", type: "text" },
      { name: "format", label: "Format", type: "text" },
      { name: "duration", label: "Durée", type: "text" },
      { name: "location", label: "Lieu", type: "text" },
      { name: "price_label", label: "Prix", type: "text" },
      { name: "cover_image", label: "Visuel", type: "url" },
      { name: "registration_open", label: "Inscriptions ouvertes", type: "checkbox" },
      { name: "published", label: "Publié", type: "checkbox" },
    ],
  },
  {
    slug: "lives",
    table: "live_items",
    title: "Lives",
    labelField: "title",
    fields: [
      { name: "title", label: "Titre", type: "text" },
      { name: "platform", label: "Plateforme", type: "select", options: ["YouTube", "Facebook", "Instagram", "TikTok", "LinkedIn", "Autre"] },
      { name: "url", label: "URL", type: "url" },
      { name: "thumbnail_url", label: "Miniature", type: "url" },
      { name: "description", label: "Résumé", type: "textarea" },
      { name: "scheduled_at", label: "Date", type: "datetime-local" },
      { name: "duration", label: "Durée", type: "text" },
      { name: "status", label: "Statut", type: "select", options: ["programme", "en-direct", "replay"] },
      { name: "featured", label: "Mis en avant", type: "checkbox" },
      { name: "published", label: "Publié", type: "checkbox" },
    ],
  },
  {
    slug: "temoignages",
    table: "testimonials",
    title: "Témoignages",
    labelField: "name",
    fields: [
      { name: "name", label: "Nom", type: "text" },
      { name: "role", label: "Fonction", type: "text" },
      { name: "organization", label: "Organisation", type: "text" },
      { name: "quote", label: "Citation", type: "textarea" },
      { name: "collaboration_type", label: "Type", type: "text" },
      { name: "photo_url", label: "Photo", type: "url" },
      { name: "published", label: "Publié", type: "checkbox" },
      { name: "sort_order", label: "Ordre", type: "number" },
    ],
  },
  {
    slug: "actualites",
    table: "posts",
    title: "Actualités",
    labelField: "title",
    fields: [
      { name: "title", label: "Titre", type: "text" },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Extrait", type: "textarea" },
      { name: "content", label: "Contenu", type: "textarea" },
      { name: "cover_image", label: "Couverture", type: "url" },
      { name: "category", label: "Catégorie", type: "select", options: ["Design", "Formation", "Communication", "Réflexion", "Coulisses", "Événements"] },
      { name: "published", label: "Publié", type: "checkbox" },
      { name: "seo_title", label: "SEO titre", type: "text" },
      { name: "seo_description", label: "SEO description", type: "textarea" },
    ],
  },
  {
    slug: "faq",
    table: "faq",
    title: "FAQ",
    labelField: "question",
    fields: [
      { name: "question", label: "Question", type: "text" },
      { name: "answer", label: "Réponse", type: "textarea" },
      { name: "category", label: "Catégorie", type: "text" },
      { name: "sort_order", label: "Ordre", type: "number" },
      { name: "published", label: "Publié", type: "checkbox" },
    ],
  },
];

export function collectionBySlug(slug: string) {
  return adminCollections.find((item) => item.slug === slug);
}
