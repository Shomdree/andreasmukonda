import { describe, expect, it } from "vitest";
import {
  catalogTestimonialsProof,
  featuredTestimonials,
  testimonialsFor,
  testimonialWorkMeta,
} from "./testimonial-catalog";
import { testimonialCatalogEn, testimonialCatalogFr, testimonialCatalogLn } from "./testimonial-copy";

describe("testimonial catalog", () => {
  it("keeps six unique proofs with three featured items", () => {
    expect(testimonialWorkMeta).toHaveLength(6);
    expect(catalogTestimonialsProof).toHaveLength(6);
    expect(new Set(testimonialWorkMeta.map((item) => item.id)).size).toBe(6);
    expect(featuredTestimonials("fr")).toHaveLength(3);
    expect(featuredTestimonials("fr").map((item) => item.id)).toEqual(["t-1", "t-2", "t-5"]);
  });

  it("keeps the same ids in FR, LN and EN", () => {
    const ids = testimonialWorkMeta.map((item) => item.id).sort();
    expect([...Object.keys(testimonialCatalogFr)].sort()).toEqual(ids);
    expect([...Object.keys(testimonialCatalogLn)].sort()).toEqual(ids);
    expect([...Object.keys(testimonialCatalogEn)].sort()).toEqual(ids);
  });

  it("localizes titles without inventing a client identity", () => {
    expect(testimonialsFor("en").find((item) => item.id === "t-2")?.title).toBe(
      "Visual communication that convinces",
    );
    expect(testimonialsFor("ln").find((item) => item.id === "t-5")?.category).toBe("Institutionnel");
    expect(testimonialsFor("fr").every((item) => item.alt.includes("Capture"))).toBe(true);
  });
});
