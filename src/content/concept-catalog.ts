import type { PortfolioProject } from "../lib/types";
import { conceptCatalogFr } from "./concept-copy";
export { conceptCatalogEn, conceptCatalogFr, conceptCatalogLn } from "./concept-copy";

export type ConceptCopy = {
  title: string;
  excerpt: string;
  description: string;
};

export type ConceptKind = "mockup" | "carte" | "calendrier" | "document" | "portrait";

export type ConceptMeta = {
  id: `p-cg-${string}`;
  slug: string;
  kind: ConceptKind;
  files: string[];
  sources: string[];
};

const conceptCategory = { id: "cat-conception", name: "Conception graphique", slug: "conception-graphique" };

export const conceptWorkMeta: ConceptMeta[] = [
  {
    id: "p-cg-001",
    slug: "mockup-gilet-georges-congo-service",
    kind: "mockup",
    files: ["cg-001.jpg"],
    sources: ["mockup-CHOISIBLE.jpg"],
  },
  {
    id: "p-cg-002",
    slug: "mockup-tshirt-ajcas",
    kind: "mockup",
    files: ["cg-002.jpg"],
    sources: ["mockup-t-shirt-ajcas.jpg"],
  },
  {
    id: "p-cg-003",
    slug: "mockup-tshirts-mood-in-christ",
    kind: "mockup",
    files: ["cg-003.jpg", "cg-004.jpg", "cg-005.jpg"],
    sources: ["MDC1.jpg", "MDC-2.jpg", "MDC-3.jpg"],
  },
  {
    id: "p-cg-006",
    slug: "mockup-emballage-shomsy-farine-de-manioc",
    kind: "mockup",
    files: ["cg-006.jpg"],
    sources: ["Shomsy-mockup.jpg"],
  },
  {
    id: "p-cg-007",
    slug: "mockup-casquettes-fondation-lona",
    kind: "mockup",
    files: ["cg-007.jpg"],
    sources: ["chapeau-fondation lona-logo-Récupéré.png"],
  },
  {
    id: "p-cg-008",
    slug: "mockup-casquette-kin-poubelle",
    kind: "mockup",
    files: ["cg-008.jpg"],
    sources: ["chapeau-b.jpg"],
  },
  {
    id: "p-cg-009",
    slug: "mockup-casquette-yahweh-me-voici",
    kind: "mockup",
    files: ["cg-009.jpg"],
    sources: ["cap-white-mockup.png"],
  },
  {
    id: "p-cg-010",
    slug: "carte-membre-ajcas",
    kind: "carte",
    files: ["cg-010.jpg", "cg-011.jpg"],
    sources: ["carte de service ajcas.jpg", "carte de service ajcas-BACK.jpg"],
  },
  {
    id: "p-cg-012",
    slug: "carte-membre-action-pour-le-peuple",
    kind: "carte",
    files: ["cg-012.jpg", "cg-013.jpg"],
    sources: ["carte PP-rect5.jpg", "carte PP-verso.png"],
  },
  {
    id: "p-cg-014",
    slug: "carte-visite-mudiongo",
    kind: "carte",
    files: ["cg-014.jpg"],
    sources: ["carte _Mudiongo.jpg"],
  },
  {
    id: "p-cg-015",
    slug: "cartes-visite-gsi",
    kind: "carte",
    files: ["cg-015.jpg", "cg-016.jpg"],
    sources: ["Carte 2024.jpg", "front-ordinaire.jpg"],
  },
  {
    id: "p-cg-017",
    slug: "cartes-visite-shomdree-design",
    kind: "carte",
    files: ["cg-017.jpg", "cg-018.jpg"],
    sources: ["CV1.jpg", "CV2.jpg"],
  },
  {
    id: "p-cg-019",
    slug: "calendrier-gsi-2026",
    kind: "calendrier",
    files: ["cg-019.jpg", "cg-020.jpg", "cg-021.jpg", "cg-022.jpg"],
    sources: ["calendrier2026.jpg", "calendrier2026-myr.jpg", "calendrier2026-mar.jpg", "calendrier2026-ros.jpg"],
  },
  {
    id: "p-cg-023",
    slug: "calendrier-shomdree-design-2023",
    kind: "calendrier",
    files: ["cg-023.jpg"],
    sources: ["Calendrier 2023.jpg"],
  },
  {
    id: "p-cg-024",
    slug: "depliant-gsi",
    kind: "document",
    files: ["cg-024.jpg", "cg-025.jpg"],
    sources: ["Depliant GSI_devant.jpg", "Depliant GSI_derrière.jpg"],
  },
  {
    id: "p-cg-026",
    slug: "infographie-gsi",
    kind: "document",
    files: ["cg-026.jpg"],
    sources: ["Infographics_GSI.jpg"],
  },
  {
    id: "p-cg-027",
    slug: "couverture-syllabus-informatique",
    kind: "document",
    files: ["cg-027.jpg"],
    sources: ["Cover-SYllabus-Info.jpg"],
  },
  {
    id: "p-cg-028",
    slug: "couverture-syllabus-photoshop",
    kind: "document",
    files: ["cg-028.jpg", "cg-029.jpg"],
    sources: ["front-Cover-SYllabus-PS.jpg", "back-Cover-SYllabus-PS.jpg"],
  },
  {
    id: "p-cg-030",
    slug: "visuel-formation-bureautique",
    kind: "document",
    files: ["cg-030.jpg"],
    sources: ["Sa-PSBUR1.jpg"],
  },
  {
    id: "p-cg-031",
    slug: "presentation-kin-poubelle-services",
    kind: "document",
    files: ["cg-031.jpg", "cg-032.jpg", "cg-033.jpg", "cg-034.jpg", "cg-035.jpg", "cg-036.jpg", "cg-037.jpg", "cg-038.jpg"],
    sources: ["B1.jpg", "B2.jpg", "b3.jpg", "B4.jpg", "b5.jpg", "b7.jpg", "b8.jpg", "b9.jpg"],
  },
  {
    id: "p-cg-039",
    slug: "autocollant-kin-poubelle",
    kind: "document",
    files: ["cg-039.jpg"],
    sources: ["autocollants-b.jpg"],
  },
  {
    id: "p-cg-040",
    slug: "menu-mariage",
    kind: "document",
    files: ["cg-040.jpg", "cg-041.jpg", "cg-042.jpg", "cg-043.jpg", "cg-044.jpg", "cg-045.jpg", "cg-046.jpg"],
    sources: ["d1.jpg", "D2.jpg", "D3.jpg", "D4.jpg", "D5.jpg", "DD1.jpg", "DD3.jpg"],
  },
  {
    id: "p-cg-047",
    slug: "visuel-packs-mariage",
    kind: "document",
    files: ["cg-047.jpg"],
    sources: ["SD-PACKS-mariage.jpg"],
  },
  {
    id: "p-cg-048",
    slug: "cv-andreas-mukonda",
    kind: "document",
    files: ["cg-048.jpg"],
    sources: ["CV-Shom2024.jpg"],
  },
  {
    id: "p-cg-049",
    slug: "cv-milla",
    kind: "document",
    files: ["cg-049.jpg"],
    sources: ["cv-milla.jpg"],
  },
  {
    id: "p-cg-050",
    slug: "portraits-studio-gadol-shom",
    kind: "portrait",
    files: ["cg-050.jpg", "cg-051.jpg"],
    sources: ["pictures-gadolshom.jpg", "shom-photo.jpg"],
  },
  {
    id: "p-cg-052",
    slug: "portrait-studio-andreas-mukonda",
    kind: "portrait",
    files: ["cg-052.jpg"],
    sources: ["SHOmd.jpg"],
  },
  {
    id: "p-cg-053",
    slug: "portrait-numerique-rosine",
    kind: "portrait",
    files: ["cg-053.jpg"],
    sources: ["Portrait plageria-1.jpg"],
  },
  {
    id: "p-cg-054",
    slug: "portrait-numerique",
    kind: "portrait",
    files: ["cg-054.jpg"],
    sources: ["Portraits numerique.jpg"],
  },
  {
    id: "p-cg-055",
    slug: "portrait-de-mariage",
    kind: "portrait",
    files: ["cg-055.jpg"],
    sources: ["IMG_3588.jpeg"],
  },
];

export const conceptKindOrder: ConceptKind[] = ["mockup", "carte", "calendrier", "document", "portrait"];

export function conceptCoverSrc(file: string): string {
  return `/images/conception/${encodeURI(file)}`;
}

export function isConceptProject(item?: Pick<PortfolioProject, "id" | "slug"> | null): boolean {
  if (!item) return false;
  if (item.id.startsWith("p-cg-")) return true;
  return conceptWorkMeta.some((meta) => meta.slug === item.slug);
}

export function conceptKindOf(item?: Pick<PortfolioProject, "id" | "slug"> | null): ConceptKind | undefined {
  if (!item) return undefined;
  return conceptWorkMeta.find((meta) => meta.id === item.id || meta.slug === item.slug)?.kind;
}

export function buildConceptProjects(copy: Record<string, ConceptCopy>): PortfolioProject[] {
  return conceptWorkMeta.map((meta) => {
    const text = copy[meta.slug];
    if (!text) throw new Error(`Missing concept copy for ${meta.slug}`);
    const cover = conceptCoverSrc(meta.files[0] ?? "");
    return {
      id: meta.id,
      title: text.title,
      slug: meta.slug,
      excerpt: text.excerpt,
      description: text.description,
      category: conceptCategory,
      client: "",
      year: "",
      challenge: "",
      solution: "",
      servicesDone: [],
      coverImage: cover,
      coverAlt: text.title,
      gallery: meta.files.slice(1).map((file) => ({ url: conceptCoverSrc(file), alt: text.title })),
      videoUrl: null,
      externalUrl: null,
      featured: false,
      results: "",
    };
  });
}

export const catalogConceptProjects = buildConceptProjects(conceptCatalogFr);

const homeConceptSlugs = [
  "mockup-gilet-georges-congo-service",
  "carte-membre-ajcas",
  "calendrier-gsi-2026",
  "menu-mariage",
];

export function homeConceptProjects(projects: PortfolioProject[]): PortfolioProject[] {
  return homeConceptSlugs
    .map((slug) => projects.find((item) => item.slug === slug))
    .filter((item): item is PortfolioProject => Boolean(item));
}

export function withConceptCatalog(projects: PortfolioProject[]): PortfolioProject[] {
  const have = new Set(projects.map((item) => item.slug));
  const extra = catalogConceptProjects.filter((item) => !have.has(item.slug));
  return extra.length ? [...projects, ...extra] : projects;
}
