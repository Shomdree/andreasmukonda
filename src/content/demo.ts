import type {
  FaqItem,
  LiveItem,
  PortfolioCategory,
  PortfolioProject,
  PostItem,
  PublicQuestion,
  ServiceItem,
  Testimonial,
  TrainingItem,
} from "../lib/types";
import { catalogPrintServices } from "./print-catalog";
import { catalogPosterProjects } from "./poster-catalog";

export const catalogCategories: PortfolioCategory[] = [
  { id: "cat-design", name: "Design", slug: "design" },
  { id: "cat-branding", name: "Branding", slug: "branding" },
  { id: "cat-photo", name: "Photographie", slug: "photographie" },
  { id: "cat-web", name: "Web & logiciels", slug: "web-logiciels" },
  { id: "cat-livres", name: "Livres", slug: "livres" },
  { id: "cat-medias", name: "Médias", slug: "medias" },
];

export const catalogProjects: PortfolioProject[] = catalogPosterProjects;

const cover = (seed: string) => `/images/covers/${seed}.svg`;

export const catalogServices: ServiceItem[] = [
  {
    id: "s-design",
    title: "Design graphique & identité visuelle",
    slug: "design-graphique",
    excerpt:
      "Création de supports visuels professionnels permettant aux marques, entreprises, organisations et projets de renforcer leur identité, leur visibilité et leur crédibilité.",
    description:
      "Création de supports visuels professionnels permettant aux marques, entreprises, organisations et projets de renforcer leur identité, leur visibilité et leur crédibilité.",
    benefits: ["Lisibilité", "Cohérence visuelle", "Supports print et digital"],
    deliverables: [
      "logos",
      "branding",
      "affiches",
      "flyers",
      "supports réseaux sociaux",
      "cartes",
      "impressions",
    ],
    turnaround: "Selon périmètre — sur devis",
    priceLabel: "Sur devis",
    coverImage: cover("branding"),
    featured: true,
    ctaLabel: "Commander un design",
    ctaHref: "/commander?service=design-graphique",
  },
  {
    id: "s-web",
    title: "Sites web & solutions numériques",
    slug: "sites-web-solutions-numeriques",
    excerpt:
      "Conception de sites web et de solutions numériques adaptés aux entreprises, organisations, écoles, églises, associations et porteurs de projets.",
    description:
      "Conception de sites web et de solutions numériques adaptés aux entreprises, organisations, écoles, églises, associations et porteurs de projets.",
    benefits: ["Présence en ligne claire", "Outils adaptés au besoin", "Accompagnement de projet"],
    deliverables: ["site vitrine", "site dynamique", "solutions web", "applications", "outils numériques"],
    turnaround: "Selon périmètre — sur devis",
    priceLabel: "Sur devis",
    coverImage: cover("logo"),
    featured: true,
    ctaLabel: "Présenter mon projet",
    ctaHref: "/commander?service=sites-web-solutions-numeriques",
  },
  {
    id: "s-formation",
    title: "Formation professionnelle",
    slug: "formation-professionnelle",
    excerpt:
      "Des formations orientées vers la pratique afin de développer des compétences immédiatement exploitables dans les environnements professionnels et entrepreneuriaux.",
    description:
      "Des formations orientées vers la pratique afin de développer des compétences immédiatement exploitables dans les environnements professionnels et entrepreneuriaux.",
    benefits: ["Compétences applicables", "Approche pratique", "Domaines complémentaires"],
    deliverables: [
      "informatique",
      "bureautique",
      "design graphique",
      "anglais",
      "photographie",
      "gestion",
      "comptabilité",
    ],
    turnaround: "Selon agenda — sur devis",
    priceLabel: "Sur devis",
    coverImage: cover("affiche"),
    featured: true,
    ctaLabel: "Découvrir les formations",
    ctaHref: "/formations",
  },
  {
    id: "s-consulting",
    title: "Consulting & accompagnement",
    slug: "consulting-accompagnement",
    excerpt:
      "Accompagnement stratégique destiné aux entrepreneurs et porteurs de projets souhaitant structurer leurs idées, améliorer leur communication ou développer leurs activités.",
    description:
      "Accompagnement stratégique destiné aux entrepreneurs et porteurs de projets souhaitant structurer leurs idées, améliorer leur communication ou développer leurs activités.",
    benefits: ["Structuration", "Décisions plus claires", "Suivi selon le besoin"],
    deliverables: [
      "accompagnement entrepreneurial",
      "consulting",
      "structuration de projet",
      "développement commercial",
      "conseils stratégiques",
    ],
    turnaround: "Selon disponibilité — sur devis",
    priceLabel: "Sur devis",
    coverImage: cover("campagne"),
    featured: true,
    ctaLabel: "Demander une consultation",
    ctaHref: "/consulting#demande",
  },
  {
    id: "s-media",
    title: "Photographie & médias",
    slug: "photographie-medias",
    excerpt:
      "Création de contenus photographiques et audiovisuels destinés aux événements, marques, organisations et particuliers.",
    description:
      "Création de contenus photographiques et audiovisuels destinés aux événements, marques, organisations et particuliers.",
    benefits: ["Image soignée", "Couverture d'événements", "Contenus utilisables"],
    deliverables: [
      "photographie événementielle",
      "shooting",
      "vidéo",
      "montage",
      "couverture média",
    ],
    turnaround: "Selon le type de prestation — sur devis",
    priceLabel: "Sur devis",
    coverImage: cover("campagne"),
    featured: true,
    ctaLabel: "Réserver une prestation",
    ctaHref: "/commander?service=photographie-medias",
  },
  ...catalogPrintServices,
];

export const catalogTrainings: TrainingItem[] = [
  {
    id: "t-anglais",
    title: "Anglais",
    slug: "anglais",
    excerpt: "Formation pratique en anglais, proposée sur demande.",
    description:
      "Formation pratique en anglais, dans le cadre de SHOMDREE Academia. Dates et format se confirment à l'inscription.",
    audience: "Particuliers, professionnels et porteurs de projets",
    trainer: "Andréas Mukonda",
    program: "Programme précisé selon le niveau et l'objectif des participants.",
    level: "Selon profil",
    format: "Présentiel / selon organisation",
    duration: "À confirmer",
    location: "Kinshasa",
    startAt: null,
    endAt: null,
    capacity: null,
    priceLabel: "Sur devis",
    coverImage: cover("affiche"),
    registrationOpen: true,
    statusLabel: "sur-demande",
  },
  {
    id: "t-informatique",
    title: "Informatique",
    slug: "informatique",
    excerpt: "Formation pratique en informatique, proposée sur demande.",
    description:
      "Formation pratique en informatique. Le programme est adapté aux besoins exprimés lors de l'inscription.",
    audience: "Particuliers, professionnels et porteurs de projets",
    trainer: "Andréas Mukonda",
    program: "Programme précisé selon le besoin.",
    level: "Selon profil",
    format: "Présentiel / selon organisation",
    duration: "À confirmer",
    location: "Kinshasa",
    startAt: null,
    endAt: null,
    capacity: null,
    priceLabel: "Sur devis",
    coverImage: cover("logo"),
    registrationOpen: true,
    statusLabel: "sur-demande",
  },
  {
    id: "t-bureautique",
    title: "Bureautique",
    slug: "bureautique",
    excerpt: "Formation pratique en bureautique, proposée sur demande.",
    description: "Formation pratique en bureautique, orientée vers un usage professionnel immédiat.",
    audience: "Particuliers, professionnels et porteurs de projets",
    trainer: "Andréas Mukonda",
    program: "Programme précisé selon le besoin.",
    level: "Selon profil",
    format: "Présentiel / selon organisation",
    duration: "À confirmer",
    location: "Kinshasa",
    startAt: null,
    endAt: null,
    capacity: null,
    priceLabel: "Sur devis",
    coverImage: cover("branding"),
    registrationOpen: true,
    statusLabel: "sur-demande",
  },
  {
    id: "t-design",
    title: "Design graphique",
    slug: "design-graphique",
    excerpt: "Formation pratique en design graphique, proposée sur demande.",
    description: "Formation pratique en design graphique, dans le cadre de SHOMDREE Academia.",
    audience: "Particuliers, professionnels et porteurs de projets",
    trainer: "Andréas Mukonda",
    program: "Programme précisé selon le niveau et l'objectif des participants.",
    level: "Selon profil",
    format: "Présentiel / selon organisation",
    duration: "À confirmer",
    location: "Kinshasa",
    startAt: null,
    endAt: null,
    capacity: null,
    priceLabel: "Sur devis",
    coverImage: cover("branding"),
    registrationOpen: true,
    statusLabel: "sur-demande",
  },
  {
    id: "t-photo",
    title: "Photographie",
    slug: "photographie",
    excerpt: "Formation pratique en photographie, proposée sur demande.",
    description: "Formation pratique en photographie. Dates et format se confirment à l'inscription.",
    audience: "Particuliers, professionnels et porteurs de projets",
    trainer: "Andréas Mukonda",
    program: "Programme précisé selon le besoin.",
    level: "Selon profil",
    format: "Présentiel / selon organisation",
    duration: "À confirmer",
    location: "Kinshasa",
    startAt: null,
    endAt: null,
    capacity: null,
    priceLabel: "Sur devis",
    coverImage: cover("campagne"),
    registrationOpen: true,
    statusLabel: "sur-demande",
  },
  {
    id: "t-compta",
    title: "Comptabilité",
    slug: "comptabilite",
    excerpt: "Formation pratique en comptabilité, proposée sur demande.",
    description: "Formation pratique en comptabilité, orientée vers un usage applicable.",
    audience: "Particuliers, professionnels et porteurs de projets",
    trainer: "Andréas Mukonda",
    program: "Programme précisé selon le besoin.",
    level: "Selon profil",
    format: "Présentiel / selon organisation",
    duration: "À confirmer",
    location: "Kinshasa",
    startAt: null,
    endAt: null,
    capacity: null,
    priceLabel: "Sur devis",
    coverImage: cover("affiche"),
    registrationOpen: true,
    statusLabel: "sur-demande",
  },
  {
    id: "t-gestion",
    title: "Gestion financière",
    slug: "gestion-financiere",
    excerpt: "Formation pratique en gestion financière, proposée sur demande.",
    description: "Formation pratique en gestion financière. Le calendrier officiel n'est pas encore publié.",
    audience: "Particuliers, professionnels et porteurs de projets",
    trainer: "Andréas Mukonda",
    program: "Programme précisé selon le besoin.",
    level: "Selon profil",
    format: "Présentiel / selon organisation",
    duration: "À confirmer",
    location: "Kinshasa",
    startAt: null,
    endAt: null,
    capacity: null,
    priceLabel: "Sur devis",
    coverImage: cover("logo"),
    registrationOpen: true,
    statusLabel: "sur-demande",
  },
];

export const catalogLives: LiveItem[] = [];
export const catalogTestimonials: Testimonial[] = [];
export const catalogPosts: PostItem[] = [];
export const catalogPublicQuestions: PublicQuestion[] = [];

export const catalogFaq: FaqItem[] = [
  {
    id: "f1",
    question: "Comment commander un projet ?",
    answer:
      "Utilisez la page Commander. Vous recevez une référence du type AM-2026-0001. Un devis suit après analyse. Aucun paiement n'est pris sur le site pour le moment.",
    category: "Commandes",
  },
  {
    id: "f2",
    question: "Où se trouve Andréas Mukonda ?",
    answer: "Kinshasa, République démocratique du Congo. Les modalités de collaboration se précisent au devis.",
    category: "Collaboration",
  },
  {
    id: "f3",
    question: "Les tarifs sont-ils en ligne ?",
    answer:
      "Les prestations sont indiquées « sur devis ». Les montants peuvent être mis à jour depuis l'administration lorsqu'ils sont confirmés.",
    category: "Tarifs",
  },
  {
    id: "f4",
    question: "Qu'est-ce que Global SHOMDREE Industries ?",
    answer:
      "C'est l'écosystème fondé en 2022 par Andréas Mukonda, organisé autour de SHOMDREE Academia, SHOMDREE Business, SHOMDREE Design et SHOMDREE Medias.",
    category: "Marque",
  },
];

/** @deprecated use catalog* names */
export const demoCategories = catalogCategories;
export const demoProjects = catalogProjects;
export const demoServices = catalogServices;
export const demoTrainings = catalogTrainings;
export const demoLives = catalogLives;
export const demoTestimonials = catalogTestimonials;
export const demoPosts = catalogPosts;
export const demoFaq = catalogFaq;
export const demoPublicQuestions = catalogPublicQuestions;
