export type SocialKey =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "pinterest"
  | "linkedin"
  | "x"
  | "behance"
  | "whatsapp";

export type SocialLinks = Partial<Record<SocialKey, string>>;

export type SiteSettings = {
  name: string;
  legalName: string;
  monogram: string;
  professionalTitle: string;
  tagline: string;
  positioning: string;
  heroTitle: string;
  heroSubtitle: string;
  shortBio: string;
  longBio: string;
  philosophy: string;
  education: string;
  publicationsNote: string;
  ecosystemIntro: string;
  email: string;
  phone: string;
  phoneSecondary: string;
  whatsapp: string;
  whatsappSecondary: string;
  location: string;
  availability: string;
  portrait: string;
  aboutPortrait: string;
  logo: string;
  seoTitle: string;
  seoDescription: string;
  socialLinks: SocialLinks;
};

export type PortfolioCategory = {
  id: string;
  name: string;
  slug: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  category: PortfolioCategory | null;
  client: string;
  year: string;
  challenge: string;
  solution: string;
  servicesDone: string[];
  coverImage: string;
  coverAlt: string;
  gallery: { url: string; alt: string }[];
  videoUrl: string | null;
  externalUrl: string | null;
  featured: boolean;
  results: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  benefits: string[];
  deliverables: string[];
  turnaround: string;
  priceLabel: string;
  coverImage: string;
  featured: boolean;
  ctaLabel: string;
  ctaHref: string;
};

export type TrainingItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  audience: string;
  trainer: string;
  program: string;
  level: string;
  format: string;
  duration: string;
  location: string;
  startAt: string | null;
  endAt: string | null;
  capacity: number | null;
  priceLabel: string;
  coverImage: string;
  registrationOpen: boolean;
  statusLabel: "disponible" | "prochaine" | "terminee" | "sur-demande";
};

export type LiveItem = {
  id: string;
  title: string;
  platform: string;
  url: string;
  thumbnailUrl: string;
  description: string;
  scheduledAt: string | null;
  duration: string | null;
  status: "programme" | "en-direct" | "replay";
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  collaborationType: string;
  photoUrl: string | null;
};

export type PostItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  tags: string[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type PublicQuestion = {
  id: string;
  displayName: string;
  category: string;
  question: string;
  answer: string;
};

export type OrderStatus =
  | "nouvelle"
  | "en_analyse"
  | "devis_envoye"
  | "confirmee"
  | "en_production"
  | "en_attente_client"
  | "terminee"
  | "annulee";
