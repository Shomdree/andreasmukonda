import {
  catalogCategories as demoCategories,
  catalogFaq as demoFaq,
  catalogLives as demoLives,
  catalogPosts as demoPosts,
  catalogProjects as demoProjects,
  catalogPublicQuestions as demoPublicQuestions,
  catalogServices as demoServices,
  catalogTestimonials as demoTestimonials,
  catalogTrainings as demoTrainings,
} from "../content/demo";
import { withPrintCatalog } from "../content/print-catalog";
import { defaultSettings } from "../content/defaults";
import { envWhatsApp, isSupabaseConfigured, logServerError } from "./env";
import { createBrowserSupabase } from "./supabase";
import type {
  FaqItem,
  LiveItem,
  PortfolioCategory,
  PortfolioProject,
  PostItem,
  PublicQuestion,
  ServiceItem,
  SiteSettings,
  Testimonial,
  TrainingItem,
} from "./types";

function text(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanSocial(value: SiteSettings["socialLinks"]): SiteSettings["socialLinks"] {
  return Object.fromEntries(
    Object.entries(value).filter(([, href]) => typeof href === "string" && href.trim()),
  ) as SiteSettings["socialLinks"];
}

async function fallback<T>(load: () => Promise<T | null | undefined>, demo: T): Promise<T> {
  if (!isSupabaseConfigured()) return demo;
  try {
    const value = await load();
    return value ?? demo;
  } catch {
    return demo;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  return fallback(async () => {
    const supabase = createBrowserSupabase();
    if (!supabase) return defaultSettings;
    const { data, error } = await supabase
      .from("site_settings")
      .select(
        "site_name, legal_name, monogram, professional_title, tagline, positioning, hero_title, hero_subtitle, short_bio, long_bio, philosophy, education, publications_note, ecosystem_intro, email, phone, phone_secondary, whatsapp, whatsapp_secondary, location, availability, portrait_url, logo_url, seo_title, seo_description, social_links",
      )
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return defaultSettings;
    const social = (data.social_links ?? {}) as SiteSettings["socialLinks"];
    const settings: SiteSettings = {
      ...defaultSettings,
      name: text(data.site_name, defaultSettings.name),
      legalName: text(data.legal_name, defaultSettings.legalName),
      monogram: text(data.monogram, defaultSettings.monogram),
      professionalTitle: text(data.professional_title, defaultSettings.professionalTitle),
      tagline: text(data.tagline, defaultSettings.tagline),
      positioning: text(data.positioning, defaultSettings.positioning),
      heroTitle: text(data.hero_title, defaultSettings.heroTitle),
      heroSubtitle: text(data.hero_subtitle, defaultSettings.heroSubtitle),
      shortBio: text(data.short_bio, defaultSettings.shortBio),
      longBio: text(data.long_bio, defaultSettings.longBio),
      philosophy: text(data.philosophy, defaultSettings.philosophy),
      education: text(data.education, defaultSettings.education),
      publicationsNote: text(data.publications_note, defaultSettings.publicationsNote),
      ecosystemIntro: text(data.ecosystem_intro, defaultSettings.ecosystemIntro),
      email: text(data.email, defaultSettings.email),
      phone: text(data.phone, defaultSettings.phone),
      phoneSecondary: text(data.phone_secondary, defaultSettings.phoneSecondary),
      whatsapp: text(data.whatsapp, envWhatsApp() || defaultSettings.whatsapp),
      whatsappSecondary: text(data.whatsapp_secondary, defaultSettings.whatsappSecondary),
      location: text(data.location, defaultSettings.location),
      availability: text(data.availability, defaultSettings.availability),
      portrait: text(data.portrait_url, defaultSettings.portrait),
      aboutPortrait: defaultSettings.aboutPortrait,
      logo: text(data.logo_url, defaultSettings.logo),
      seoTitle: text(data.seo_title, defaultSettings.seoTitle),
      seoDescription: text(data.seo_description, defaultSettings.seoDescription),
      socialLinks: { ...defaultSettings.socialLinks, ...cleanSocial(social) },
    };
    return settings;
  }, { ...defaultSettings, whatsapp: envWhatsApp() || defaultSettings.whatsapp });
}

export async function getCategories(): Promise<PortfolioCategory[]> {
  return fallback(async () => {
    const supabase = createBrowserSupabase();
    if (!supabase) return demoCategories;
    const { data } = await supabase.from("portfolio_categories").select("*").order("name");
    return (data ?? []).map((row) => ({ id: row.id, name: row.name, slug: row.slug }));
  }, demoCategories);
}

export async function getProjects(options?: { featured?: boolean }): Promise<PortfolioProject[]> {
  return fallback(async () => {
    const supabase = createBrowserSupabase();
    if (!supabase) return demoProjects;
    let query = supabase
      .from("portfolio_projects")
      .select("*, portfolio_categories(*), portfolio_media(*)")
      .eq("published", true)
      .order("sort_order");
    if (options?.featured) query = query.eq("featured", true);
    const { data } = await query;
    return (data ?? []).map(mapProject);
  }, options?.featured ? demoProjects.filter((p) => p.featured) : demoProjects);
}

export async function getProject(slug: string): Promise<PortfolioProject | undefined> {
  const all = await getProjects();
  return all.find((item) => item.slug === slug);
}

export async function getServices(): Promise<ServiceItem[]> {
  return fallback(async () => {
    const supabase = createBrowserSupabase();
    if (!supabase) return demoServices;
    const { data, error } = await supabase.from("services").select("*").eq("published", true).order("sort_order");
    if (error) {
      logServerError("query:services", error.code || "db");
      return demoServices;
    }
    const rows = (data ?? []).map(mapService);
    return withPrintCatalog(rows.length ? rows : demoServices);
  }, demoServices);
}

export async function getService(slug: string): Promise<ServiceItem | undefined> {
  const all = await getServices();
  return all.find((item) => item.slug === slug);
}

export async function getTrainings(): Promise<TrainingItem[]> {
  return fallback(async () => {
    const supabase = createBrowserSupabase();
    if (!supabase) return demoTrainings;
    const { data } = await supabase.from("trainings").select("*").eq("published", true).order("start_at", { ascending: true, nullsFirst: false });
    return (data ?? []).map(mapTraining);
  }, demoTrainings);
}

export async function getTraining(slug: string): Promise<TrainingItem | undefined> {
  const all = await getTrainings();
  return all.find((item) => item.slug === slug);
}

export async function getLives(): Promise<LiveItem[]> {
  return fallback(async () => {
    const supabase = createBrowserSupabase();
    if (!supabase) return demoLives;
    const { data } = await supabase.from("live_items").select("*").eq("published", true).order("scheduled_at", { ascending: false });
    return (data ?? []).map(mapLive);
  }, demoLives);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fallback(async () => {
    const supabase = createBrowserSupabase();
    if (!supabase) return demoTestimonials;
    const { data } = await supabase.from("testimonials").select("*").eq("published", true).order("sort_order");
    return (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      organization: row.organization ?? "",
      quote: row.quote,
      collaborationType: row.collaboration_type ?? "",
      photoUrl: row.photo_url,
    }));
  }, demoTestimonials);
}

export async function getPosts(): Promise<PostItem[]> {
  return fallback(async () => {
    const supabase = createBrowserSupabase();
    if (!supabase) return demoPosts;
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    return (data ?? []).map(mapPost);
  }, demoPosts);
}

export async function getPost(slug: string): Promise<PostItem | undefined> {
  const all = await getPosts();
  return all.find((item) => item.slug === slug);
}

export async function getFaq(): Promise<FaqItem[]> {
  return fallback(async () => {
    const supabase = createBrowserSupabase();
    if (!supabase) return demoFaq;
    const { data } = await supabase.from("faq").select("*").eq("published", true).order("sort_order");
    return (data ?? []).map((row) => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
      category: row.category ?? "",
    }));
  }, demoFaq);
}

export async function getPublicQuestions(): Promise<PublicQuestion[]> {
  return fallback(async () => {
    const supabase = createBrowserSupabase();
    if (!supabase) return demoPublicQuestions;
    const { data } = await supabase
      .from("questions")
      .select("*")
      .eq("published", true)
      .eq("status", "publiee")
      .order("answered_at", { ascending: false });
    return (data ?? []).map((row) => ({
      id: row.id,
      displayName: row.display_anonymously ? "Anonyme" : row.full_name.split(" ")[0],
      category: row.category,
      question: row.question,
      answer: row.answer ?? "",
    }));
  }, demoPublicQuestions);
}

function mapProject(row: Record<string, unknown>): PortfolioProject {
  const category = row.portfolio_categories as { id: string; name: string; slug: string } | null;
  const media = (row.portfolio_media as { file_url: string; alt_text: string; media_type: string; sort_order: number }[]) ?? [];
  const gallery = media
    .filter((item) => item.media_type !== "cover")
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => ({ url: item.file_url, alt: item.alt_text }));
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    excerpt: String(row.excerpt ?? ""),
    description: String(row.description ?? ""),
    category: category ? { id: category.id, name: category.name, slug: category.slug } : null,
    client: String(row.client ?? ""),
    year: String(row.year ?? ""),
    challenge: String(row.challenge ?? ""),
    solution: String(row.solution ?? ""),
    servicesDone: Array.isArray(row.services_done) ? (row.services_done as string[]) : [],
    coverImage: String(row.cover_image ?? "/images/covers/branding.svg"),
    coverAlt: String(row.title),
    gallery,
    videoUrl: (row.video_url as string | null) ?? null,
    externalUrl: (row.external_url as string | null) ?? null,
    featured: Boolean(row.featured),
    results: String(row.results ?? ""),
  };
}

function mapService(row: Record<string, unknown>): ServiceItem {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    excerpt: String(row.excerpt ?? ""),
    description: String(row.description ?? ""),
    benefits: Array.isArray(row.benefits) ? (row.benefits as string[]) : [],
    deliverables: Array.isArray(row.deliverables) ? (row.deliverables as string[]) : [],
    turnaround: String(row.turnaround ?? "Sur devis"),
    priceLabel: String(row.price_label ?? "Sur devis"),
    coverImage: String(row.cover_image ?? "/images/covers/branding.svg"),
    featured: Boolean(row.featured),
    ctaLabel: String(row.cta_label ?? "Commander"),
    ctaHref: String(row.cta_href ?? `/commander?service=${row.slug}`),
  };
}

function mapTraining(row: Record<string, unknown>): TrainingItem {
  const start = row.start_at ? String(row.start_at) : null;
  const statusLabel: TrainingItem["statusLabel"] = row.registration_open
    ? start
      ? "prochaine"
      : "disponible"
    : start && new Date(String(start)) < new Date()
      ? "terminee"
      : "sur-demande";
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    excerpt: String(row.excerpt ?? ""),
    description: String(row.description ?? ""),
    audience: String(row.audience ?? ""),
    trainer: String(row.trainer ?? "Andréas Mukonda"),
    program: String(row.program ?? ""),
    level: String(row.level ?? ""),
    format: String(row.format ?? ""),
    duration: String(row.duration ?? ""),
    location: String(row.location ?? ""),
    startAt: start,
    endAt: row.end_at ? String(row.end_at) : null,
    capacity: typeof row.capacity === "number" ? row.capacity : null,
    priceLabel: String(row.price_label ?? "Sur devis"),
    coverImage: String(row.cover_image ?? "/images/covers/affiche.svg"),
    registrationOpen: Boolean(row.registration_open),
    statusLabel,
  };
}

function mapLive(row: Record<string, unknown>): LiveItem {
  return {
    id: String(row.id),
    title: String(row.title),
    platform: String(row.platform),
    url: String(row.url),
    thumbnailUrl: String(row.thumbnail_url ?? "/images/covers/campagne.svg"),
    description: String(row.description ?? ""),
    scheduledAt: row.scheduled_at ? String(row.scheduled_at) : null,
    duration: row.duration ? String(row.duration) : null,
    status: (row.status as LiveItem["status"]) ?? "replay",
  };
}

function mapPost(row: Record<string, unknown>): PostItem {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    coverImage: String(row.cover_image ?? "/images/covers/branding.svg"),
    category: String(row.category ?? "Réflexion"),
    publishedAt: String(row.published_at ?? ""),
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
  };
}
