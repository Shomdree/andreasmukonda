import type { PortfolioProject } from "../lib/types";
import { logoCatalogFr } from "./logo-copy";
export { logoCatalogEn, logoCatalogFr, logoCatalogLn } from "./logo-copy";

export type LogoCopy = {
  title: string;
  excerpt: string;
  description: string;
};

export type LogoMeta = {
  id: `p-logo-${string}`;
  slug: string;
  files: string[];
  sources: string[];
};

const brandingCategory = { id: "cat-branding", name: "Branding", slug: "branding" };

export const logoWorkMeta: LogoMeta[] = [
  { id: "p-logo-001", slug: "logo-shomdree-design", files: ["logo-shomdree-design.jpg"], sources: ["new logo SD.png"] },
  { id: "p-logo-002", slug: "logo-shomdree-academia", files: ["logo-shomdree-academia.jpg"], sources: ["site-logo.png.jpg"] },
  { id: "p-logo-003", slug: "logo-shomdree-business", files: ["logo-shomdree-business.jpg"], sources: ["New_logo Sb.jpg"] },
  { id: "p-logo-004", slug: "logo-andreas-mukonda", files: ["logo-andreas-mukonda.jpg"], sources: ["logo-shom-DTF.jpg"] },
  { id: "p-logo-005", slug: "logo-lioness", files: ["logo-lioness.jpg"], sources: ["A4-logo lioness.jpg"] },
  { id: "p-logo-006", slug: "logo-academie-lux", files: ["logo-academie-lux.jpg"], sources: ["logo lux.jpg"] },
  { id: "p-logo-007", slug: "logo-badrio", files: ["logo-badrio.jpg"], sources: ["badrio-2.jpg"] },
  { id: "p-logo-008", slug: "logo-blk-store", files: ["logo-blk-store.jpg"], sources: ["blk.png"] },
  { id: "p-logo-009", slug: "logo-ceae", files: ["logo-ceae.jpg"], sources: ["logo cabinet-1.jpg"] },
  { id: "p-logo-010", slug: "logo-complexe-scolaire-edi-bibwa", files: ["logo-edi-bibwa.jpg", "logo-edi-bibwa-2.jpg", "logo-edi-bibwa-3.jpg"], sources: ["Ecussoon-1.jpg", "Ecussoon-2.jpg", "ecus.jpg"] },
  { id: "p-logo-011", slug: "logo-eufkin", files: ["logo-eufkin.jpg"], sources: ["Eufkin.jpg"] },
  { id: "p-logo-012", slug: "logo-ezali-services", files: ["logo-ezali-services.jpg"], sources: ["logo-ezali.jpg"] },
  { id: "p-logo-013", slug: "logo-famea", files: ["logo-famea.jpg"], sources: ["LOGO FAMEA.jpg"] },
  { id: "p-logo-014", slug: "logo-fondation-lona", files: ["logo-fondation-lona.jpg"], sources: ["SD-fondation lona-logo.jpg"] },
  { id: "p-logo-015", slug: "logo-foire-ngai-elenge", files: ["logo-foire-ngai-elenge.jpg"], sources: ["front.jpg"] },
  { id: "p-logo-016", slug: "etiquette-fromages-bio", files: ["logo-fromages-bio.jpg"], sources: ["fromage.jpg"] },
  { id: "p-logo-017", slug: "logo-fraternite-kiema", files: ["logo-fraternite-kiema.jpg"], sources: ["LOGO Kiema.jpg"] },
  { id: "p-logo-018", slug: "etiquette-gredar", files: ["logo-gredar.jpg"], sources: ["gredar-3.png"] },
  { id: "p-logo-019", slug: "logo-groupe-pactole", files: ["logo-groupe-pactole.jpg", "logo-groupe-pactole-2.jpg"], sources: ["GP-Logo-finaal.jpg", "GP-Logo-2.jpg"] },
  { id: "p-logo-020", slug: "logo-kin-poubelle-services", files: ["logo-kin-poubelle-services.jpg"], sources: ["kps-logo copie.jpg"] },
  { id: "p-logo-021", slug: "logo-lustra-services", files: ["logo-lustra-services.jpg", "logo-lustra-services-2.jpg"], sources: ["Logo Lustra_final.jpg", "Logo Lustra 2_final.jpg"] },
  { id: "p-logo-022", slug: "logo-centre-evangelique-metanoia", files: ["logo-metanoia.jpg", "logo-metanoia-2.jpg"], sources: ["Logo metanoia-.jpg", "metanoi1.jpg"] },
  { id: "p-logo-023", slug: "logo-modo-cleaning", files: ["logo-modo-cleaning.jpg"], sources: ["logo-omodo.jpg"] },
  { id: "p-logo-024", slug: "logo-mood-in-christ", files: ["logo-mood-in-christ.jpg"], sources: ["mdc-.jpg"] },
  { id: "p-logo-025", slug: "logo-plageria-business", files: ["logo-plageria-business.jpg"], sources: ["Logo Plageria.jpg"] },
  { id: "p-logo-026", slug: "logo-plageria-pharma", files: ["logo-plageria-pharma.jpg"], sources: ["Logo Plageria Pharma.jpg"] },
  { id: "p-logo-027", slug: "logo-souriez", files: ["logo-souriez.jpg"], sources: ["souriez2--.jpg"] },
  { id: "p-logo-028", slug: "logo-teka-butu", files: ["logo-teka-butu.jpg"], sources: ["New-logo-Teka butu-FINAL.jpg"] },
  { id: "p-logo-029", slug: "logo-temple-of-redeemed", files: ["logo-temple-of-redeemed.jpg"], sources: ["rd1.png"] },
  { id: "p-logo-030", slug: "logo-un-plus", files: ["logo-un-plus.jpg"], sources: ["UN+.png"] },
];

export function logoCoverSrc(file: string): string {
  return `/images/logos/${encodeURI(file)}`;
}

export function isLogoProject(item?: Pick<PortfolioProject, "id" | "slug"> | null): boolean {
  if (!item) return false;
  if (item.id.startsWith("p-logo-")) return true;
  return logoWorkMeta.some((meta) => meta.slug === item.slug);
}

export function buildLogoProjects(copy: Record<string, LogoCopy>): PortfolioProject[] {
  return logoWorkMeta.map((meta) => {
    const text = copy[meta.slug];
    if (!text) throw new Error(`Missing logo copy for ${meta.slug}`);
    const cover = logoCoverSrc(meta.files[0] ?? "");
    return {
      id: meta.id,
      title: text.title,
      slug: meta.slug,
      excerpt: text.excerpt,
      description: text.description,
      category: brandingCategory,
      client: "",
      year: "",
      challenge: "",
      solution: "",
      servicesDone: [],
      coverImage: cover,
      coverAlt: text.title,
      gallery: meta.files.slice(1).map((file) => ({ url: logoCoverSrc(file), alt: text.title })),
      videoUrl: null,
      externalUrl: null,
      featured: false,
      results: "",
    };
  });
}

export const catalogLogoProjects = buildLogoProjects(logoCatalogFr);

export function withLogoCatalog(projects: PortfolioProject[]): PortfolioProject[] {
  const have = new Set(projects.map((item) => item.slug));
  const extra = catalogLogoProjects.filter((item) => !have.has(item.slug));
  return extra.length ? [...projects, ...extra] : projects;
}
