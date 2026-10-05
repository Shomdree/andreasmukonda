import { publicFileExists } from "../lib/public-file";
import type { PostItem } from "../lib/types";

export const newsKinds = ["reflexion", "conseil", "article", "autre"] as const;
export type NewsKind = (typeof newsKinds)[number];

const kindByLabel: Record<string, NewsKind> = {
  reflexion: "reflexion",
  réflexion: "reflexion",
  reflection: "reflexion",
  conseil: "conseil",
  conseils: "conseil",
  advice: "conseil",
  article: "article",
  articles: "article",
};

export function newsKindFromCategory(category?: string | null): NewsKind {
  const key = category?.trim().toLowerCase() ?? "";
  return kindByLabel[key] ?? "autre";
}

export function isEditorialImage(src?: string | null): boolean {
  const value = src?.trim() ?? "";
  if (!value) return false;
  if (value.startsWith("/images/covers/")) return false;
  if (value.startsWith("/")) return publicFileExists(value);
  return /^https?:\/\//i.test(value);
}

export function editorialImages(post: Pick<PostItem, "title" | "coverImage" | "images">): { url: string; alt: string }[] {
  const listed = post.images.filter((item) => isEditorialImage(item.url));
  if (listed.length) return listed;
  if (isEditorialImage(post.coverImage)) return [{ url: post.coverImage, alt: post.title }];
  return [];
}
