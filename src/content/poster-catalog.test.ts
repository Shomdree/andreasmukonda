import { describe, expect, it } from "vitest";
import {
  catalogPosterProjects,
  isPosterProject,
  posterWorkMeta,
  withPosterCatalog,
} from "./poster-catalog";
import { posterCatalogEn, posterCatalogFr, posterCatalogLn } from "./poster-copy";

describe("poster catalog", () => {
  it("keeps unique slugs and files without inventing extra works", () => {
    expect(posterWorkMeta).toHaveLength(83);
    expect(catalogPosterProjects).toHaveLength(83);
    expect(new Set(posterWorkMeta.map((item) => item.slug)).size).toBe(83);
    expect(posterWorkMeta.every((item) => item.files.length === item.sources.length)).toBe(true);
  });

  it("groups Accès 2026, prayer variants and identical photo files", () => {
    const acces = posterWorkMeta.find((item) => item.slug === "acces-2026-trois-jours-de-jeune-et-de-priere");
    expect(acces?.files).toEqual(["aff-002.jpg", "aff-003.jpg", "aff-051.jpg", "aff-057.jpg"]);
    const prayer = posterWorkMeta.find(
      (item) => item.slug === "quatre-heures-de-priere-la-detresse-ne-paraitra-pas-deux-fois",
    );
    expect(prayer?.files).toEqual(["aff-021.jpg", "aff-042.jpg"]);
    const photo = posterWorkMeta.find((item) => item.slug === "shomdree-presentation-du-service-de-photographie");
    expect(photo?.files).toEqual(["aff-078.jpg"]);
    expect(photo?.sources).toEqual(["photo7$.jpg"]);
  });

  it("keeps the same slugs in FR, LN and EN", () => {
    const slugs = posterWorkMeta.map((item) => item.slug);
    expect([...Object.keys(posterCatalogFr)].sort()).toEqual([...slugs].sort());
    expect([...Object.keys(posterCatalogLn)].sort()).toEqual([...slugs].sort());
    expect([...Object.keys(posterCatalogEn)].sort()).toEqual([...slugs].sort());
  });

  it("does not duplicate poster projects already present", () => {
    expect(withPosterCatalog(catalogPosterProjects)).toHaveLength(83);
    expect(isPosterProject({ id: "p-aff-001", slug: "affiche-biographique-presentation-d-un-auteur" })).toBe(true);
    expect(isPosterProject({ id: "other", slug: "autre" })).toBe(false);
  });
});
