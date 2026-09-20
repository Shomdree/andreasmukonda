import { describe, expect, it } from "vitest";
import {
  catalogPrintServices,
  designKindFromService,
  isPrintService,
  printCatalogEn,
  printCatalogFr,
  printCatalogLn,
  printServiceMeta,
  withPrintCatalog,
} from "./print-catalog";

describe("print catalog", () => {
  it("keeps fifteen print services with unique slugs and files", () => {
    expect(printServiceMeta).toHaveLength(15);
    expect(new Set(printServiceMeta.map((item) => item.slug)).size).toBe(15);
    expect(new Set(printServiceMeta.map((item) => item.file)).size).toBe(15);
    expect(catalogPrintServices).toHaveLength(15);
  });

  it("keeps the same slugs in FR, LN and EN", () => {
    const slugs = printServiceMeta.map((item) => item.slug);
    expect(Object.keys(printCatalogFr)).toEqual(slugs);
    expect(Object.keys(printCatalogLn)).toEqual(slugs);
    expect(Object.keys(printCatalogEn)).toEqual(slugs);
  });

  it("maps print items to the design order form", () => {
    expect(isPrintService({ id: "s-imp-001", slug: "creation-d-affiches" })).toBe(true);
    expect(designKindFromService({ id: "s-imp-001", slug: "creation-d-affiches" })).toBe("affiche");
    expect(designKindFromService({ id: "s-imp-015", slug: "t-shirts-personnalises" })).toBe("tshirt");
    expect(isPrintService({ id: "s-design", slug: "design-graphique" })).toBe(false);
  });

  it("does not duplicate print services already present", () => {
    const merged = withPrintCatalog(catalogPrintServices);
    expect(merged).toHaveLength(15);
  });
});
