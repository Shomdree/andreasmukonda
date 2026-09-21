import { describe, expect, it } from "vitest";
import {
  catalogVideoItems,
  isCatalogVideo,
  tiktokWorkUrl,
  withVideoCatalog,
} from "./video-catalog";
import { videoCatalogEn, videoCatalogFr, videoCatalogLn, videoWorkMeta } from "./video-copy";

describe("video catalog", () => {
  it("keeps the five confirmed TikTok works without duplicates", () => {
    expect(videoWorkMeta).toHaveLength(5);
    expect(catalogVideoItems).toHaveLength(5);
    expect(new Set(videoWorkMeta.map((item) => item.tiktokId)).size).toBe(5);
    expect(new Set(catalogVideoItems.map((item) => item.url)).size).toBe(5);
  });

  it("uses canonical TikTok URLs for Andréas Mukonda", () => {
    expect(catalogVideoItems.map((item) => item.url)).toEqual([
      tiktokWorkUrl("7614529648487091463"),
      tiktokWorkUrl("7614530779720224018"),
      tiktokWorkUrl("7614653368669146375"),
      tiktokWorkUrl("7614883680766397703"),
      tiktokWorkUrl("7614886022807129351"),
    ]);
  });

  it("keeps the same ids in FR, LN and EN", () => {
    const ids = videoWorkMeta.map((item) => item.id);
    expect([...Object.keys(videoCatalogFr)].sort()).toEqual([...ids].sort());
    expect([...Object.keys(videoCatalogLn)].sort()).toEqual([...ids].sort());
    expect([...Object.keys(videoCatalogEn)].sort()).toEqual([...ids].sort());
  });

  it("does not duplicate videos already present", () => {
    expect(withVideoCatalog(catalogVideoItems)).toHaveLength(5);
    expect(isCatalogVideo({ id: "live-tt-001" })).toBe(true);
    expect(isCatalogVideo({ id: "other" })).toBe(false);
  });
});
