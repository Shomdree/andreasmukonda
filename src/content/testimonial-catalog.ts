/** Add a testimonial: drop the original in Photos/Temoignages, map it here, add FR/EN/LN copy, then run `npm run optimize:testimonials`. */
import {
  testimonialCatalogEn,
  testimonialCatalogFr,
  testimonialCatalogLn,
  type TestimonialCopy,
} from "./testimonial-copy";

export { testimonialCatalogEn, testimonialCatalogFr, testimonialCatalogLn };
export type { TestimonialCopy };

export type TestimonialMeta = {
  id: string;
  source: string;
  file: string;
  featured: boolean;
  order: number;
  width: number;
  height: number;
};

export type TestimonialProof = {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  alt: string;
  featured: boolean;
  order: number;
  width: number;
  height: number;
};

const DISPLAY_WIDTH = 720;
const DISPLAY_HEIGHT = 1018;

export const testimonialWorkMeta: TestimonialMeta[] = [
  { id: "t-1", source: "t-1.jpg", file: "t-1.jpg", featured: true, order: 1, width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT },
  { id: "t-2", source: "T-2.jpg", file: "t-2.jpg", featured: true, order: 2, width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT },
  { id: "t-3", source: "T-3.jpg", file: "t-3.jpg", featured: false, order: 3, width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT },
  { id: "t-4", source: "T-4.jpg", file: "t-4.jpg", featured: false, order: 4, width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT },
  { id: "t-5", source: "T-5.jpg", file: "t-5.jpg", featured: true, order: 5, width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT },
  { id: "t-6", source: "t-6.jpg", file: "t-6.jpg", featured: false, order: 6, width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT },
];

const copyByLocale: Record<string, Record<string, TestimonialCopy>> = {
  fr: testimonialCatalogFr,
  en: testimonialCatalogEn,
  ln: testimonialCatalogLn,
};

export function testimonialCoverSrc(file: string): string {
  return `/images/testimonials/${encodeURI(file)}`;
}

export function buildTestimonials(copy: Record<string, TestimonialCopy>): TestimonialProof[] {
  return [...testimonialWorkMeta]
    .sort((left, right) => left.order - right.order)
    .map((meta) => {
      const text = copy[meta.id];
      if (!text) throw new Error(`Missing testimonial copy for ${meta.id}`);
      return {
        id: meta.id,
        image: testimonialCoverSrc(meta.file),
        title: text.title,
        description: text.description,
        category: text.category,
        alt: text.alt,
        featured: meta.featured,
        order: meta.order,
        width: meta.width,
        height: meta.height,
      };
    });
}

export function testimonialsFor(locale: string): TestimonialProof[] {
  return buildTestimonials(copyByLocale[locale] ?? testimonialCatalogFr);
}

export function featuredTestimonials(locale: string): TestimonialProof[] {
  return testimonialsFor(locale).filter((item) => item.featured);
}

export const catalogTestimonialsProof = buildTestimonials(testimonialCatalogFr);
