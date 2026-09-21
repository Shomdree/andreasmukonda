import type { LiveItem } from "../lib/types";
import { videoCatalogEn, videoCatalogFr, videoCatalogLn, videoWorkMeta, type VideoCopy } from "./video-copy";
export { videoCatalogEn, videoCatalogFr, videoCatalogLn, videoWorkMeta } from "./video-copy";
export type { VideoCopy, VideoMeta } from "./video-copy";

export function tiktokWorkUrl(tiktokId: string): string {
  return `https://www.tiktok.com/@andreas_mukonda/video/${tiktokId}`;
}

export function videoPosterSrc(file: string): string {
  return `/images/videos/${encodeURI(file)}`;
}

export function isCatalogVideo(item?: Pick<LiveItem, "id"> | null): boolean {
  if (!item) return false;
  return item.id.startsWith("live-tt-") || videoWorkMeta.some((meta) => meta.id === item.id);
}

export function buildVideoItems(copy: Record<string, VideoCopy>): LiveItem[] {
  return videoWorkMeta.map((meta) => {
    const text = copy[meta.id];
    if (!text) throw new Error(`Missing video copy for ${meta.id}`);
    return {
      id: meta.id,
      title: text.title,
      platform: "TikTok",
      url: tiktokWorkUrl(meta.tiktokId),
      thumbnailUrl: videoPosterSrc(meta.file),
      description: "",
      scheduledAt: null,
      duration: null,
      status: "replay",
    };
  });
}

export const catalogVideoItems = buildVideoItems(videoCatalogFr);

export function withVideoCatalog(lives: LiveItem[]): LiveItem[] {
  const have = new Set(lives.map((item) => item.id));
  const extra = catalogVideoItems.filter((item) => !have.has(item.id));
  return extra.length ? [...extra, ...lives] : lives;
}
