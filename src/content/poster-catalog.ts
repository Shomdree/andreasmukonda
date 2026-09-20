import type { PortfolioProject } from "../lib/types";
import { posterCatalogFr } from "./poster-copy";
export { posterCatalogEn, posterCatalogFr, posterCatalogLn } from "./poster-copy";

export type PosterCopy = {
  title: string;
  excerpt: string;
  description: string;
};

export type PosterMeta = {
  id: `p-aff-${string}`;
  slug: string;
  files: string[];
  sources: string[];
  featured?: boolean;
};

const designCategory = { id: "cat-design", name: "Design", slug: "design" };

export const posterWorkMeta: PosterMeta[] = [
  { id: "p-aff-001", slug: "affiche-biographique-presentation-d-un-auteur", files: ["aff-001.jpg"], sources: ["Bio-grace-2 - Copie - Copie.jpg"] },
  { id: "p-aff-002", slug: "acces-2026-trois-jours-de-jeune-et-de-priere", files: ["aff-002.jpg", "aff-003.jpg", "aff-051.jpg", "aff-057.jpg"], sources: ["3days-1.jpg", "3days-2.jpg", "jj-2 - Copie - Copie - Copie.jpg", "Mercredi------ - Copie - Copie - Copie.jpg"] },
  { id: "p-aff-004", slug: "seminaire-delivre-pour-servir", files: ["aff-004.jpg"], sources: ["6days - Copie - Copie - Copie - Copie.jpg"] },
  { id: "p-aff-005", slug: "culte-special-preservation-des-familles", files: ["aff-005.jpg"], sources: ["6days-b - Copie - Copie - Copie.jpg"] },
  { id: "p-aff-006", slug: "nuit-de-priere-rencontre-autour-des-familles", files: ["aff-006.jpg"], sources: ["6days-noche.jpg"] },
  { id: "p-aff-007", slug: "rencontre-chretienne-l-impact-de-l-onction", files: ["aff-007.jpg"], sources: ["a4ee.jpg"] },
  { id: "p-aff-008", slug: "shomdree-design-presentation-des-services-graphiques", files: ["aff-008.jpg", "aff-009.jpg"], sources: ["A4NewSD-aff.jpg", "A4NewSD-aff2.jpg"], featured: true },
  { id: "p-aff-010", slug: "affiche-publicitaire-installation-de-cameras", files: ["aff-010.jpg"], sources: ["A4NewSD-cam.jpg"] },
  { id: "p-aff-011", slug: "affiche-publicitaire-formation-professionnelle", files: ["aff-011.jpg"], sources: ["A4NewSD-form.jpg"] },
  { id: "p-aff-012", slug: "affiche-publicitaire-conception-de-logiciels", files: ["aff-012.jpg"], sources: ["A4NewSD-log.jpg"] },
  { id: "p-aff-013", slug: "affiche-publicitaire-photographie-evenementielle", files: ["aff-013.jpg"], sources: ["A4NewSD-photo.jpg"] },
  { id: "p-aff-014", slug: "shomdree-design-presentation-des-modalites-de-travail", files: ["aff-014.jpg"], sources: ["A4-ROI - Copie - Copie - Copie.jpg"] },
  { id: "p-aff-015", slug: "epikaizo-l-esprit-d-adoption", files: ["aff-015.jpg"], sources: ["AEBN6.jpg"] },
  { id: "p-aff-016", slug: "retraite-teshoua-annonce-de-la-rencontre", files: ["aff-016.jpg"], sources: ["aksanti-2 - Copie - Copie.jpg"] },
  { id: "p-aff-017", slug: "programme-de-priere-au-commencement-dieu", files: ["aff-017.jpg"], sources: ["Au commencement.jpg"] },
  { id: "p-aff-018", slug: "banniere-d-hommage-memoire-d-un-proche", files: ["aff-018.jpg"], sources: ["bache-espe.jpg"] },
  { id: "p-aff-019", slug: "visuel-de-souvenir-hommage-familial", files: ["aff-019.jpg"], sources: ["bache-RIP-leon.jpg"] },
  { id: "p-aff-020", slug: "visuel-de-mariage-celebrer-une-union", files: ["aff-020.jpg"], sources: ["Belesi.jpg"] },
  { id: "p-aff-021", slug: "quatre-heures-de-priere-la-detresse-ne-paraitra-pas-deux-fois", files: ["aff-021.jpg", "aff-042.jpg"], sources: ["genda-fin.jpg", "genda-fin-2.jpg"] },
  { id: "p-aff-022", slug: "maquette-publicitaire-voyages-au-bresil-et-en-turquie", files: ["aff-022.jpg"], sources: ["bresil - Copie.jpg"] },
  { id: "p-aff-023", slug: "journee-de-compassion-visite-a-l-orphelinat", files: ["aff-023.jpg"], sources: ["Compassion-2.jpg"] },
  { id: "p-aff-024", slug: "shomdree-design-pourquoi-nous-choisir", files: ["aff-024.jpg"], sources: ["design7$-pourquoi nous choisir2 - Copie - Copie - Copie.jpg"], featured: true },
  { id: "p-aff-025", slug: "shomdree-design-faire-connaitre-la-creation-d-affiches", files: ["aff-025.jpg", "aff-026.jpg"], sources: ["design7$-prix - Copie - Copie - Copie.jpg", "design7$-red - Copie - Copie - Copie.jpg"] },
  { id: "p-aff-027", slug: "marathon-de-prieres-ce-que-dieu-desire", files: ["aff-027.jpg"], sources: ["Eda-janv-1.jpg"] },
  { id: "p-aff-028", slug: "nuit-de-priere-detruire-l-instabilite", files: ["aff-028.jpg"], sources: ["EDA-JUILLET.jpg"] },
  { id: "p-aff-029", slug: "grande-montagne-programme-de-rencontres", files: ["aff-029.jpg"], sources: ["eda-nov-2.jpg"] },
  { id: "p-aff-030", slug: "affiche-universitaire-presentation-d-une-soutenance", files: ["aff-030.jpg"], sources: ["emma.jpg"] },
  { id: "p-aff-031", slug: "affiche-de-service-demande-de-rendez-vous-schengen", files: ["aff-031.jpg"], sources: ["excellencia-5.jpg"] },
  { id: "p-aff-032", slug: "retraite-des-femmes-presentation-du-programme", files: ["aff-032.jpg"], sources: ["Femmes-3.jpg"] },
  { id: "p-aff-033", slug: "shomdree-academia-annonce-de-formation-en-bureautique", files: ["aff-033.jpg", "aff-034.jpg"], sources: ["FormSA.jpg", "FormSA-2.jpg"] },
  { id: "p-aff-035", slug: "village-ngai-elenge-jeux-pour-enfants", files: ["aff-035.jpg"], sources: ["Game.jpg"] },
  { id: "p-aff-036", slug: "theme-annuel-conquete-et-enfantement", files: ["aff-036.jpg"], sources: ["GD2026.jpg"] },
  { id: "p-aff-037", slug: "regne-dans-ton-domaine-annonce-de-lancement", files: ["aff-037.jpg", "aff-038.jpg"], sources: ["gd-cOMING SOON-1.jpg", "gd-cOMING SOON-2.jpg"] },
  { id: "p-aff-039", slug: "rencontre-thematique-levons-nous-rebatissons", files: ["aff-039.jpg"], sources: ["GENDA6WEEK.jpg"] },
  { id: "p-aff-040", slug: "affiche-thematique-ou-va-mon-argent", files: ["aff-040.jpg"], sources: ["GENDA6WEEK---.jpg"] },
  { id: "p-aff-041", slug: "affiche-de-presentation-politique", files: ["aff-041.jpg"], sources: ["MR_Franklin_f.jpg"] },
  { id: "p-aff-043", slug: "nuit-de-priere-preservation-des-familles", files: ["aff-043.jpg"], sources: ["GENDA-NOV-2.jpg"] },
  { id: "p-aff-044", slug: "affiche-publicitaire-etudes-en-turquie", files: ["aff-044.jpg"], sources: ["gRACEB-2.jpg"] },
  { id: "p-aff-045", slug: "happy-hour-presentation-de-forfaits-mobiles", files: ["aff-045.jpg"], sources: ["Happy-Africell.jpg"] },
  { id: "p-aff-046", slug: "anniversaire-un-message-de-voeux-collectif", files: ["aff-046.jpg"], sources: ["hbd mm.jpg"] },
  { id: "p-aff-047", slug: "anniversaire-reunir-plusieurs-souvenirs", files: ["aff-047.jpg"], sources: ["HBD PSB.jpg"] },
  { id: "p-aff-048", slug: "anniversaire-un-portrait-et-quelques-mots", files: ["aff-048.jpg"], sources: ["hbd-Perle.jpg"] },
  { id: "p-aff-049", slug: "voeux-de-fete-nationale", files: ["aff-049.jpg", "aff-050.jpg"], sources: ["Independance.jpg", "Independanceb-.jpg"] },
  { id: "p-aff-052", slug: "lioness-affiche-de-promotion-saisonniere", files: ["aff-052.jpg"], sources: ["Lioness-Juin.jpg"] },
  { id: "p-aff-053", slug: "maranatha-ou-etes-vous", files: ["aff-053.jpg", "aff-054.jpg"], sources: ["MARANATHA.jpg", "MARANATHA-----.jpg"] },
  { id: "p-aff-055", slug: "epikaizo-annonce-de-vingt-quatre-heures-de-priere", files: ["aff-055.jpg"], sources: ["MaTADi-2.jpg"] },
  { id: "p-aff-056", slug: "culte-du-mercredi-rappel-hebdomadaire", files: ["aff-056.jpg"], sources: ["Mercredi- - Copie - Copie - Copie.jpg"] },
  { id: "p-aff-058", slug: "seminaire-de-l-esprit-presentation-d-une-semaine", files: ["aff-058.jpg"], sources: ["Metanoia.jpg"] },
  { id: "p-aff-059", slug: "soiree-de-gloire-d-ikabod-a-kabod", files: ["aff-059.jpg"], sources: ["Metanoia-Kabod.jpg"] },
  { id: "p-aff-060", slug: "seminaire-des-familles-les-maisons-enflammees", files: ["aff-060.jpg"], sources: ["METAnoiA-SEFA.jpg"] },
  { id: "p-aff-061", slug: "best-strong-plus-mise-en-avant-d-un-produit", files: ["aff-061.jpg"], sources: ["PRES PRODUIT-best +.jpg"] },
  { id: "p-aff-062", slug: "recit-retraite-du-ciel-sur-la-terre", files: ["aff-062.jpg"], sources: ["Myra2b.jpg"] },
  { id: "p-aff-063", slug: "matinee-le-temps-de-ma-delivrance-est-arrive", files: ["aff-063.jpg"], sources: ["Myra-final-mai.jpg"] },
  { id: "p-aff-064", slug: "matinee-je-le-delivrerai-et-je-le-glorifierai", files: ["aff-064.jpg"], sources: ["Myra-MAI-2 - Copie.jpg"] },
  { id: "p-aff-065", slug: "lioness-presentation-de-la-gamme-teint-clair", files: ["aff-065.jpg"], sources: ["NEW-kit.jpg"] },
  { id: "p-aff-066", slug: "lioness-presentation-d-une-offre-de-lotions", files: ["aff-066.jpg"], sources: ["NEW-lotion-a.jpg"] },
  { id: "p-aff-067", slug: "shomdree-design-presenter-son-offre-de-creation-d-affiches", files: ["aff-067.jpg"], sources: ["New-Shom-SD-1.jpg"], featured: true },
  { id: "p-aff-068", slug: "night-of-grace-annonce-d-une-nuit-de-louange", files: ["aff-068.jpg"], sources: ["NIght of grace--final - Copie.jpg"] },
  { id: "p-aff-069", slug: "action-solidaire-distribution-de-kits-scolaires", files: ["aff-069.jpg"], sources: ["Orphan.jpg"] },
  { id: "p-aff-070", slug: "programme-mensuel-ma-famille-est-un-projet-de-dieu", files: ["aff-070.jpg"], sources: ["Osha-MARS2-final.jpg"] },
  { id: "p-aff-071", slug: "pactole-pure-communication-autour-du-football", files: ["aff-071.jpg", "aff-072.jpg"], sources: ["PACtol léoprad-1.jpg", "PACtol léoprad-3.jpg"] },
  { id: "p-aff-073", slug: "shomdree-design-creation-d-affiches-pour-les-eglises", files: ["aff-073.jpg"], sources: ["Partenaire-GSI-Remastered.jpg"] },
  { id: "p-aff-074", slug: "maquette-publicitaire-assistance-pour-un-passeport", files: ["aff-074.jpg"], sources: ["passeport - Copie.jpg"] },
  { id: "p-aff-075", slug: "molongi-14-les-portes-spirituelles", files: ["aff-075.jpg"], sources: ["pdk-portes.jpg"] },
  { id: "p-aff-076", slug: "visuel-thematique-passeport-diplomatique-sans-frontieres", files: ["aff-076.jpg"], sources: ["pdt.jpg"] },
  { id: "p-aff-077", slug: "affiche-d-anniversaire-une-attention-a-conserver", files: ["aff-077.jpg"], sources: ["perle.jpg"] },
  { id: "p-aff-078", slug: "shomdree-presentation-du-service-de-photographie", files: ["aff-078.jpg"], sources: ["photo7$.jpg"] },
  { id: "p-aff-080", slug: "ciel-ouvert-quatre-jours-de-priere", files: ["aff-080.jpg"], sources: ["ppdavid-.jpg"] },
  { id: "p-aff-081", slug: "shomdree-design-une-affiche-pour-presenter-votre-activite", files: ["aff-081.jpg"], sources: ["YOU SD-sd.jpg"], featured: true },
  { id: "p-aff-082", slug: "best-strong-presentation-d-une-reference-produit", files: ["aff-082.jpg"], sources: ["PRES PRODUIT-best strong.jpg"] },
  { id: "p-aff-083", slug: "best-life-plus-presentation-d-une-declinaison", files: ["aff-083.jpg"], sources: ["PRES PRODUIT-life.jpg"] },
  { id: "p-aff-084", slug: "best-life-affiche-de-presentation-produit", files: ["aff-084.jpg"], sources: ["PRES PRODUIT-life+.jpg"] },
  { id: "p-aff-085", slug: "rentree-scolaire-affiche-pour-des-sacs-personnalises", files: ["aff-085.jpg"], sources: ["PROMO SACS.jpg"] },
  { id: "p-aff-086", slug: "soiree-d-adoration-pres-du-pere", files: ["aff-086.jpg"], sources: ["SAD.jpg"] },
  { id: "p-aff-087", slug: "shomdree-academia-annonce-d-une-formation-en-design", files: ["aff-087.jpg"], sources: ["Sa-PS-1.jpg"] },
  { id: "p-aff-088", slug: "shomdree-academia-presenter-plusieurs-formats-de-formation", files: ["aff-088.jpg"], sources: ["Sa-PSSHOM.jpg"] },
  { id: "p-aff-089", slug: "mariage-coutumier-annonce-de-date", files: ["aff-089.jpg"], sources: ["SAVE THE DATE-ema.jpg"] },
  { id: "p-aff-090", slug: "shomdree-design-visuel-d-encouragement-sportif", files: ["aff-090.jpg"], sources: ["SD-CD.jpg"] },
  { id: "p-aff-091", slug: "shomdree-design-presentation-d-un-bilan-de-creations", files: ["aff-091.jpg"], sources: ["SD-confiance- - Copie - Copie - Copie.jpg"] },
  { id: "p-aff-092", slug: "shomdree-design-mieux-expliquer-une-offre-en-ligne", files: ["aff-092.jpg"], sources: ["SD-confiance-achat - Copie - Copie - Copie.jpg"] },
  { id: "p-aff-093", slug: "retraite-teshoua-presentation-des-intervenants", files: ["aff-093.jpg"], sources: ["Teshoua-2.jpg"] },
  { id: "p-aff-094", slug: "shomdree-academia-faire-connaitre-ses-formations", files: ["aff-094.jpg", "aff-095.jpg"], sources: ["YOU SD-form.jpg", "YOU SD-formb.jpg"] },
  { id: "p-aff-096", slug: "shomdree-medias-presentation-du-service-photo", files: ["aff-096.jpg"], sources: ["YOU SD-photo.jpg"] },
];

export function posterCoverSrc(file: string): string {
  return `/images/portfolio/${encodeURI(file)}`;
}

export function isPosterProject(item?: Pick<PortfolioProject, "id" | "slug"> | null): boolean {
  if (!item) return false;
  if (item.id.startsWith("p-aff-")) return true;
  return posterWorkMeta.some((meta) => meta.slug === item.slug);
}

export function buildPosterProjects(copy: Record<string, PosterCopy>): PortfolioProject[] {
  return posterWorkMeta.map((meta) => {
    const text = copy[meta.slug];
    if (!text) throw new Error(`Missing poster copy for ${meta.slug}`);
    const cover = posterCoverSrc(meta.files[0] ?? "");
    return {
      id: meta.id,
      title: text.title,
      slug: meta.slug,
      excerpt: text.excerpt,
      description: text.description,
      category: designCategory,
      client: "",
      year: "",
      challenge: "",
      solution: "",
      servicesDone: [],
      coverImage: cover,
      coverAlt: text.title,
      gallery: meta.files.slice(1).map((file) => ({ url: posterCoverSrc(file), alt: text.title })),
      videoUrl: null,
      externalUrl: null,
      featured: Boolean(meta.featured),
      results: "",
    };
  });
}

export const catalogPosterProjects = buildPosterProjects(posterCatalogFr);

export function withPosterCatalog(projects: PortfolioProject[]): PortfolioProject[] {
  const have = new Set(projects.map((item) => item.slug));
  const extra = catalogPosterProjects.filter((item) => !have.has(item.slug));
  return extra.length ? [...projects, ...extra] : projects;
}
