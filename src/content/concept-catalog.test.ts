import { describe, expect, it } from "vitest";
import {
  catalogConceptProjects,
  conceptKindOrder,
  conceptWorkMeta,
  homeConceptProjects,
  isConceptProject,
  withConceptCatalog,
} from "./concept-catalog";
import { conceptCatalogEn, conceptCatalogFr, conceptCatalogLn } from "./concept-copy";
import { publicFileExists } from "../lib/public-file";

describe("concept catalog", () => {
  it("keeps unique slugs and grouped variants without skipped files", () => {
    expect(conceptWorkMeta).toHaveLength(30);
    expect(catalogConceptProjects).toHaveLength(30);
    expect(new Set(conceptWorkMeta.map((item) => item.slug)).size).toBe(30);
    expect(conceptWorkMeta.every((item) => item.files.length === item.sources.length)).toBe(true);
    const sources = conceptWorkMeta.flatMap((item) => item.sources);
    expect(sources.some((source) => /\.pdf$/i.test(source) || /\.docx$/i.test(source))).toBe(false);
    expect(sources).not.toContain("sa-logo.png");
    expect(sources).not.toContain("b7.png");
  });

  it("groups calendars, leaflets, cards, menus and presentation pages", () => {
    const calendar = conceptWorkMeta.find((item) => item.slug === "calendrier-gsi-2026");
    expect(calendar?.files).toHaveLength(4);
    const leaflet = conceptWorkMeta.find((item) => item.slug === "depliant-gsi");
    expect(leaflet?.files).toEqual(["cg-024.jpg", "cg-025.jpg"]);
    const ajcas = conceptWorkMeta.find((item) => item.slug === "carte-membre-ajcas");
    expect(ajcas?.files).toHaveLength(2);
    const menu = conceptWorkMeta.find((item) => item.slug === "menu-mariage");
    expect(menu?.files).toHaveLength(7);
    const kps = conceptWorkMeta.find((item) => item.slug === "presentation-kin-poubelle-services");
    expect(kps?.files).toHaveLength(8);
    expect(conceptKindOrder).toEqual(["mockup", "carte", "calendrier", "document", "portrait"]);
  });

  it("keeps the same slugs in FR, LN and EN", () => {
    const slugs = conceptWorkMeta.map((item) => item.slug);
    expect([...Object.keys(conceptCatalogFr)].sort()).toEqual([...slugs].sort());
    expect([...Object.keys(conceptCatalogLn)].sort()).toEqual([...slugs].sort());
    expect([...Object.keys(conceptCatalogEn)].sort()).toEqual([...slugs].sort());
  });

  it("does not duplicate concept projects already present", () => {
    expect(withConceptCatalog(catalogConceptProjects)).toHaveLength(30);
    expect(isConceptProject({ id: "p-cg-001", slug: "mockup-gilet-georges-congo-service" })).toBe(true);
    expect(isConceptProject({ id: "p-aff-001", slug: "affiche-biographique-presentation-d-un-auteur" })).toBe(false);
    expect(homeConceptProjects(catalogConceptProjects).map((item) => item.slug)).toEqual([
      "mockup-gilet-georges-congo-service",
      "carte-membre-ajcas",
      "calendrier-gsi-2026",
      "menu-mariage",
    ]);
  });

  it("has a public image for every catalog file", () => {
    const files = conceptWorkMeta.flatMap((item) => item.files);
    expect(files).toHaveLength(55);
    for (const file of files) {
      expect(publicFileExists(`/images/conception/${file}`), file).toBe(true);
    }
  });
});
