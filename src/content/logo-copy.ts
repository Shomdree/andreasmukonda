import type { LogoCopy } from "./logo-catalog";

function markFr(name: string, kind: "logo" | "ecusson" | "etiquette" = "logo"): LogoCopy {
  if (kind === "etiquette") {
    return {
      title: name,
      excerpt: `Présenter ${name} sur un support que l’on reconnaît tout de suite.`,
      description: `Une étiquette rassemble le nom du produit et les informations visibles au même endroit. Cette création donne à ${name} une présentation claire, prête à être reprise sur le produit, sans allonger le message.`,
    };
  }
  if (kind === "ecusson") {
    return {
      title: name,
      excerpt: `Donner à ${name} un signe reconnaissable, facile à reprendre.`,
      description: `Un écusson ou un logo d’établissement permet de reconnaître une école ou une organisation au premier regard. Cette création réunit le nom de ${name} et les éléments qui l’identifient, pour un usage sur différents supports.`,
    };
  }
  return {
    title: name,
    excerpt: `Donner à ${name} une marque que l’on reconnaît au premier regard.`,
    description: `Un logo permet de reconnaître une activité sans longue explication. Cette création donne à ${name} une identité graphique que l’on peut reprendre sur différents supports, tout en gardant le nom lisible.`,
  };
}

function markEn(name: string, kind: "logo" | "ecusson" | "etiquette" = "logo"): LogoCopy {
  if (kind === "etiquette") {
    return {
      title: name,
      excerpt: `Present ${name} on a support that can be recognised at a glance.`,
      description: `A label brings the product name and the visible information together. This design gives ${name} a clear presentation that can be reused on the product, without stretching the message.`,
    };
  }
  if (kind === "ecusson") {
    return {
      title: name,
      excerpt: `Give ${name} a mark that is easy to recognise and reuse.`,
      description: `A crest or school mark helps people recognise an organisation at a glance. This design brings together the name of ${name} and the elements that identify it, ready to be used on different supports.`,
    };
  }
  return {
    title: name,
    excerpt: `Give ${name} a mark that can be recognised at a glance.`,
    description: `A logo helps people recognise an activity without a long explanation. This design gives ${name} a graphic identity that can be reused on different supports, while keeping the name easy to read.`,
  };
}

function markLn(name: string, kind: "logo" | "ecusson" | "etiquette" = "logo"): LogoCopy {
  if (kind === "etiquette") {
    return {
      title: name,
      excerpt: `Kolakisa ${name} na support oyo bato bakoki koyeba noki.`,
      description: `Étiquette esangisi nkombo ya produit mpe ba informations oyo emonana na esika moko. Création oyo epesi ${name} présentation ya polele, oyo ekoki kosalelama na produit, na kotombola message te.`,
    };
  }
  if (kind === "ecusson") {
    return {
      title: name,
      excerpt: `Kopesa ${name} elembo oyo eyebani noki.`,
      description: `Écusson to logo ya établissement esalisaka bato boyeba organisation noki. Création oyo esangisi nkombo ya ${name} mpe ba éléments oyo elakisa yango, mpo na kosalelama na ba supports ndenge na ndenge.`,
    };
  }
  return {
    title: name,
    excerpt: `Kopesa ${name} marque oyo eyebani noki.`,
    description: `Logo esalisaka bato boyeba activité na ntina ya nde te. Création oyo epesi ${name} identité graphique oyo ekoki kosalelama na ba supports ndenge na ndenge, nkombo ezali kaka koyebana.`,
  };
}

const names = {
  "logo-shomdree-design": { name: "SHOMDREE Design", kind: "logo" },
  "logo-shomdree-academia": { name: "SHOMDREE Academia", kind: "logo" },
  "logo-shomdree-business": { name: "SHOMDREE Business", kind: "logo" },
  "logo-andreas-mukonda": { name: "Andréas Mukonda", kind: "logo" },
  "logo-lioness": { name: "Lioness", kind: "logo" },
  "logo-academie-lux": { name: "Académie Lux", kind: "logo" },
  "logo-badrio": { name: "Badrio", kind: "logo" },
  "logo-blk-store": { name: "BLK Store", kind: "logo" },
  "logo-ceae": { name: "CEAE", kind: "logo" },
  "logo-complexe-scolaire-edi-bibwa": { name: "Complexe scolaire EDI-Bibwa", kind: "ecusson" },
  "logo-eufkin": { name: "EUFKIN Lipopo", kind: "logo" },
  "logo-ezali-services": { name: "Ezali Services", kind: "logo" },
  "logo-famea": { name: "Famea", kind: "logo" },
  "logo-fondation-lona": { name: "Fondation Lona", kind: "logo" },
  "logo-foire-ngai-elenge": { name: "Foire Ngai Elenge", kind: "logo" },
  "etiquette-fromages-bio": { name: "Fromages bio", kind: "etiquette" },
  "logo-fraternite-kiema": { name: "Fraternité Kiema", kind: "logo" },
  "etiquette-gredar": { name: "Gred'ar", kind: "etiquette" },
  "logo-groupe-pactole": { name: "Groupe Pactole", kind: "logo" },
  "logo-kin-poubelle-services": { name: "Kin Poubelle Services", kind: "logo" },
  "logo-lustra-services": { name: "Lustra Services", kind: "logo" },
  "logo-centre-evangelique-metanoia": { name: "Centre évangélique Metanoïa", kind: "logo" },
  "logo-modo-cleaning": { name: "Modo Cleaning", kind: "logo" },
  "logo-mood-in-christ": { name: "Mood in Christ", kind: "logo" },
  "logo-plageria-business": { name: "Plageria Business", kind: "logo" },
  "logo-plageria-pharma": { name: "Plageria Pharma", kind: "logo" },
  "logo-souriez": { name: "Souriez", kind: "logo" },
  "logo-teka-butu": { name: "Teka Butu", kind: "logo" },
  "logo-temple-of-redeemed": { name: "Temple of Redeemed", kind: "logo" },
  "logo-un-plus": { name: "Un Plus", kind: "logo" },
} as const;

type Kind = "logo" | "ecusson" | "etiquette";

function build(maker: (name: string, kind?: Kind) => LogoCopy): Record<string, LogoCopy> {
  return Object.fromEntries(
    Object.entries(names).map(([slug, item]) => [slug, maker(item.name, item.kind)]),
  );
}

export const logoCatalogFr = build(markFr);
export const logoCatalogEn = build(markEn);
export const logoCatalogLn = build(markLn);
