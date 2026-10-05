import { describe, expect, it } from "vitest";
import { catalogArticleItems, isCatalogArticle, withArticleCatalog } from "./article-catalog";
import { articleCatalogEn, articleCatalogFr, articleCatalogLn, articleWorkMeta } from "./article-copy";

describe("article catalog", () => {
  it("keeps one published article with the same id in FR, LN and EN", () => {
    expect(articleWorkMeta).toHaveLength(1);
    expect(catalogArticleItems).toHaveLength(1);
    const ids = articleWorkMeta.map((item) => item.id);
    expect([...Object.keys(articleCatalogFr)].sort()).toEqual([...ids].sort());
    expect([...Object.keys(articleCatalogLn)].sort()).toEqual([...ids].sort());
    expect([...Object.keys(articleCatalogEn)].sort()).toEqual([...ids].sort());
  });

  it("does not duplicate an article already present", () => {
    expect(withArticleCatalog(catalogArticleItems)).toHaveLength(1);
    expect(isCatalogArticle({ id: "post-rdc-numerique-opportunites", slug: "autre" })).toBe(true);
    expect(isCatalogArticle({ id: "other", slug: "autre" })).toBe(false);
  });
});
