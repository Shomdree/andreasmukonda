import { describe, expect, it } from "vitest";
import {
  catalogLogoProjects,
  isLogoProject,
  logoWorkMeta,
  withLogoCatalog,
} from "./logo-catalog";
import { logoCatalogEn, logoCatalogFr, logoCatalogLn } from "./logo-copy";

describe("logo catalog", () => {
  it("keeps unique slugs and grouped variants without the draft file", () => {
    expect(logoWorkMeta).toHaveLength(30);
    expect(catalogLogoProjects).toHaveLength(30);
    expect(new Set(logoWorkMeta.map((item) => item.slug)).size).toBe(30);
    expect(logoWorkMeta.every((item) => item.files.length === item.sources.length)).toBe(true);
    expect(logoWorkMeta.flatMap((item) => item.sources).some((source) => /draft/i.test(source))).toBe(false);
  });

  it("groups EDI-Bibwa, Groupe Pactole, Lustra and Metanoïa", () => {
    const school = logoWorkMeta.find((item) => item.slug === "logo-complexe-scolaire-edi-bibwa");
    expect(school?.files).toEqual(["logo-edi-bibwa.jpg", "logo-edi-bibwa-2.jpg", "logo-edi-bibwa-3.jpg"]);
    const pactole = logoWorkMeta.find((item) => item.slug === "logo-groupe-pactole");
    expect(pactole?.files).toEqual(["logo-groupe-pactole.jpg", "logo-groupe-pactole-2.jpg"]);
    const lustra = logoWorkMeta.find((item) => item.slug === "logo-lustra-services");
    expect(lustra?.files).toEqual(["logo-lustra-services.jpg", "logo-lustra-services-2.jpg"]);
    const metanoia = logoWorkMeta.find((item) => item.slug === "logo-centre-evangelique-metanoia");
    expect(metanoia?.files).toEqual(["logo-metanoia.jpg", "logo-metanoia-2.jpg"]);
  });

  it("keeps the same slugs in FR, LN and EN", () => {
    const slugs = logoWorkMeta.map((item) => item.slug);
    expect([...Object.keys(logoCatalogFr)].sort()).toEqual([...slugs].sort());
    expect([...Object.keys(logoCatalogLn)].sort()).toEqual([...slugs].sort());
    expect([...Object.keys(logoCatalogEn)].sort()).toEqual([...slugs].sort());
  });

  it("does not duplicate logo projects already present", () => {
    expect(withLogoCatalog(catalogLogoProjects)).toHaveLength(30);
    expect(isLogoProject({ id: "p-logo-001", slug: "logo-shomdree-design" })).toBe(true);
    expect(isLogoProject({ id: "p-aff-001", slug: "affiche-biographique-presentation-d-un-auteur" })).toBe(false);
  });
});
