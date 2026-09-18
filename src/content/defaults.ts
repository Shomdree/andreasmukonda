import type { SiteSettings } from "../lib/types";
import { identity } from "../i18n/identity";

export const WHATSAPP_PRIMARY = identity.whatsapp;
export const WHATSAPP_SECONDARY = identity.whatsappSecondary;

export const officialSocials = { ...identity.socials };

export const defaultSettings: SiteSettings = {
  name: identity.name,
  legalName: identity.legalName,
  monogram: "AM",
  professionalTitle: "Graphic Designer · Formateur · Consultant · Entrepreneur digital",
  tagline: "Créer aujourd’hui les solutions qui feront la différence demain.",
  positioning: "Je vous aide à donner vie à vos idées grâce au design, au digital, à la formation et à des conseils adaptés à vos besoins.",
  heroTitle: "Créer aujourd’hui les solutions qui feront la différence demain.",
  heroSubtitle: "Je vous aide à donner vie à vos idées grâce au design, au digital, à la formation et à des conseils adaptés à vos besoins.",
  shortBio:
    "Je suis Andréas Mukonda. Je travaille dans plusieurs domaines qui se complètent : le design, le digital, la formation, le conseil et les médias.\n\nCe qui m’intéresse avant tout, c’est de comprendre une idée et de trouver une manière simple de la rendre visible, utile et concrète.\n\nEn 2022, j’ai créé Global SHOMDREE Industries pour réunir mes différentes activités dans une même vision.",
  longBio:
    "Je suis Andréas Mukonda Eke-Shomba, basé à Kinshasa.\n\nJe suis Graphic Designer, Formateur, Consultant et Entrepreneur digital.\n\nJ’ai toujours été attiré par les technologies, la création et la manière dont une bonne idée peut devenir quelque chose de concret.",
  philosophy: "Créer aujourd’hui les solutions qui feront la différence demain.",
  education: identity.education,
  publicationsNote: "Auteur de deux ouvrages d’inspiration chrétienne.",
  ecosystemIntro: "Global SHOMDREE Industries réunit quatre pôles qui me permettent de répondre à différents besoins.",
  email: identity.email,
  phone: identity.phone,
  phoneSecondary: identity.phoneSecondary,
  whatsapp: identity.whatsapp,
  whatsappSecondary: identity.whatsappSecondary,
  location: identity.locationFr,
  availability: "Sur rendez-vous — réponses sous quelques jours ouvrés.",
  portrait: identity.portrait,
  aboutPortrait: identity.aboutPortrait,
  logo: identity.logo,
  seoTitle: "Andréas Mukonda — Graphic Designer, Formateur & Consultant à Kinshasa",
  seoDescription: "Je vous aide à donner vie à vos idées grâce au design, au digital, à la formation et à des conseils adaptés à vos besoins.",
  socialLinks: { ...identity.socials },
};

export const expertiseItems = ["Design", "Digital", "Formation", "Consulting", "Médias"] as const;

export const audiences =
  "Les prestations s’adressent notamment aux particuliers, entrepreneurs, entreprises, organisations, écoles, églises, associations et porteurs de projets.";

export const ecosystemBranches = [
  {
    brand: "SHOMDREE Academia",
    title: "Développer des compétences utiles et directement applicables.",
    href: "/formations",
    cta: "Découvrir les formations",
    text: "SHOMDREE Academia constitue le pôle de formation de l’écosystème GSI. Il propose des apprentissages pratiques orientés vers le développement des compétences professionnelles, numériques et entrepreneuriales.",
    items: [
      "anglais",
      "informatique",
      "bureautique",
      "design graphique",
      "photographie",
      "comptabilité",
      "gestion financière",
    ],
  },
  {
    brand: "SHOMDREE Business",
    title: "Transformer les idées en activités structurées.",
    href: "/consulting",
    cta: "Demander un accompagnement",
    text: "SHOMDREE Business accompagne les entrepreneurs, organisations et porteurs de projets dans la structuration, le développement et l’amélioration de leurs activités.",
    items: [
      "consulting",
      "développement de projet",
      "structuration d’activité",
      "stratégie",
      "communication",
      "accompagnement entrepreneurial",
    ],
  },
  {
    brand: "SHOMDREE Design",
    title: "Créer une identité qui attire, convainc et positionne.",
    href: "/commander?service=design-graphique",
    cta: "Commander un design",
    text: "SHOMDREE Design accompagne les entreprises, organisations, événements et particuliers dans la conception de leur identité visuelle et de leurs supports de communication.",
    items: [
      "logos",
      "identité visuelle",
      "branding",
      "affiches",
      "flyers",
      "supports réseaux sociaux",
      "bâches",
      "badges",
      "calendriers",
      "cartes de visite",
      "cartes de service",
      "T-shirts",
      "impressions",
      "supports promotionnels",
    ],
  },
  {
    brand: "SHOMDREE Medias",
    title: "Faire vivre les histoires par l’image.",
    href: "/commander?service=photographie-medias",
    cta: "Demander une prestation",
    text: "SHOMDREE Medias développe des contenus photographiques et audiovisuels destinés aux particuliers, marques, événements et organisations.",
    items: [
      "photographie",
      "shooting",
      "photographie événementielle",
      "couverture d’événements",
      "captation vidéo",
      "montage vidéo",
      "production audiovisuelle",
      "contenus pour réseaux sociaux",
    ],
  },
] as const;

export const questionCategories = [
  "Design",
  "Formation",
  "Digital",
  "Carrière",
  "Entrepreneuriat",
  "Consulting",
  "Médias",
  "Autre",
] as const;

export const budgetRanges = [
  "À discuter",
  "Moins de 50 USD",
  "50–100 USD",
  "100–250 USD",
  "250–500 USD",
  "500 USD et plus",
] as const;

export const serviceProcess = [
  { title: "Comprendre", text: "Écoute du besoin, du contexte et des contraintes." },
  { title: "Concevoir", text: "Orientation claire, pistes et choix visuels ou stratégiques." },
  { title: "Produire", text: "Exécution soignée, adaptée au support et à l’usage." },
  { title: "Livrer", text: "Fichiers, conseils d’usage et suite éventuelle." },
] as const;

export const consultingSteps = [
  { title: "Comprendre", text: "Clarifier l’idée, le contexte et l’objectif." },
  { title: "Structurer", text: "Mettre de l’ordre dans l’offre, la communication ou l’activité." },
  { title: "Développer", text: "Passer à des actions concrètes, adaptées à vos moyens." },
] as const;

export const formationPath = ["Apprendre", "Pratiquer", "Maîtriser"] as const;
