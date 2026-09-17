import { describe, expect, it } from "vitest";
import { en } from "./en";
import { fr } from "./fr";
import { ln } from "./ln";
import { localizeBudget, localizeCategory, localizeService, localizeTraining, trainingStatusLabel } from "./localize";
import { ui } from "./utils";

describe("catalog localization", () => {
  it("keeps the same nested catalog keys", () => {
    expect(Object.keys(ln.catalog)).toEqual(Object.keys(fr.catalog));
    expect(Object.keys(en.catalog)).toEqual(Object.keys(fr.catalog));
    expect(Object.keys(ln.catalog.trainings)).toEqual(Object.keys(fr.catalog.trainings));
    expect(Object.keys(en.catalog.services)).toEqual(Object.keys(fr.catalog.services));
  });

  it("translates training cards by slug", () => {
    const item = {
      id: "t-anglais",
      title: "Anglais",
      slug: "anglais",
      excerpt: "FR",
      description: "FR",
      audience: "FR",
      trainer: "Andréas Mukonda",
      program: "FR",
      level: "FR",
      format: "FR",
      duration: "FR",
      location: "Kinshasa",
      startAt: null,
      endAt: null,
      capacity: null,
      priceLabel: "Sur devis",
      coverImage: "/x.svg",
      registrationOpen: true,
      statusLabel: "sur-demande" as const,
    };
    expect(localizeTraining(item, ui("en")).title).toBe("English");
    expect(localizeTraining(item, ui("ln")).title).toBe("Anglais");
    expect(trainingStatusLabel("sur-demande", ui("en"))).toBe("On request");
  });

  it("translates budget labels without changing stored values", () => {
    expect(localizeBudget("À discuter", ui("en"))).toBe("To discuss");
    expect(localizeBudget("À discuter", ui("fr"))).toBe("À discuter");
  });

  it("translates portfolio categories and services", () => {
    expect(localizeCategory({ id: "1", name: "Photographie", slug: "photographie" }, ui("en")).name).toBe("Photography");
    expect(localizeService({
      id: "s-design",
      title: "FR",
      slug: "design-graphique",
      excerpt: "FR",
      description: "FR",
      benefits: [],
      deliverables: [],
      turnaround: "FR",
      priceLabel: "FR",
      coverImage: "/x.svg",
      featured: true,
      ctaLabel: "FR",
      ctaHref: "/commander",
    }, ui("en")).ctaLabel).toBe("Request a quote");
  });
});
