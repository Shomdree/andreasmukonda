import type { PostItem } from "../lib/types";
import {
  articleCatalogEn,
  articleCatalogFr,
  articleCatalogLn,
  articleWorkMeta,
  type ArticleCopy,
} from "./article-copy";

export { articleCatalogEn, articleCatalogFr, articleCatalogLn, articleWorkMeta } from "./article-copy";
export type { ArticleCopy, ArticleMeta } from "./article-copy";

export function isCatalogArticle(item?: Pick<PostItem, "id" | "slug"> | null): boolean {
  if (!item) return false;
  return articleWorkMeta.some((meta) => meta.id === item.id || meta.slug === item.slug);
}

export function buildArticleItems(copy: Record<string, ArticleCopy>): PostItem[] {
  return articleWorkMeta.map((meta) => {
    const text = copy[meta.id];
    if (!text) throw new Error(`Missing article copy for ${meta.id}`);
    return {
      id: meta.id,
      title: text.title,
      slug: meta.slug,
      excerpt: text.excerpt,
      content: text.content,
      coverImage: "/images/covers/branding.svg",
      category: text.category,
      publishedAt: meta.publishedAt,
      tags: [],
    };
  });
}

export const catalogArticleItems = buildArticleItems(articleCatalogFr);

export function withArticleCatalog(posts: PostItem[]): PostItem[] {
  const have = new Set(posts.flatMap((item) => [item.id, item.slug]));
  const extra = catalogArticleItems.filter((item) => !have.has(item.id) && !have.has(item.slug));
  return extra.length ? [...extra, ...posts] : posts;
}
