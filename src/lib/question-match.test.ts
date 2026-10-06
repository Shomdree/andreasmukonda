import { describe, expect, it } from "vitest";
import { collectKnownQuestions, findKnownQuestion, normalizeQuestion, questionSimilarity } from "./question-match";

const faq = [
  { q: "Comment connaître le prix d’un service ?", a: "Expliquez-moi votre besoin et je vous proposerai un devis." },
  { q: "Comment passer une commande ?", a: "Utilisez la page Commander." },
  { q: "Ma question sera-t-elle publiée ?", a: "Non, pas automatiquement." },
];

const known = collectKnownQuestions({
  faqDisplay: faq,
  faqNeedles: [
    ["How can I know the price of a service?", "Ndenge nini nakoki koyeba prix ?"],
    ["How do I place an order?", "Ndenge nini nakoki kosala commande ?"],
    ["Will my question be published?", "Motuna na ngai ekobima ?"],
  ],
  publicQuestions: [
    { id: "q1", question: "Que préparer pour une affiche ?", answer: "Le texte, les images et la date souhaitée." },
  ],
});

describe("question matching", () => {
  it("normalizes punctuation and accents", () => {
    expect(normalizeQuestion("Prix d’un service ?")).toBe("prix d un service");
  });

  it("recognises a frequent question already answered in the FAQ", () => {
    const match = findKnownQuestion("c’est combien un service ?", known);
    expect(match?.id).toBe("faq-0");
    expect(match?.answer).toContain("devis");
  });

  it("recognises the same FAQ question in English or Lingala", () => {
    expect(findKnownQuestion("How can I know the price of a service?", known)?.id).toBe("faq-0");
    expect(findKnownQuestion("Ndenge nini nakoki kosala commande ?", known)?.id).toBe("faq-1");
  });

  it("recognises a question already published", () => {
    const match = findKnownQuestion("Que dois-je préparer pour une affiche ?", known);
    expect(match?.id).toBe("public-q1");
  });

  it("does not treat a different question as a duplicate", () => {
    expect(findKnownQuestion("Pouvez-vous concevoir un logo pour une école ?", known)).toBeUndefined();
    expect(questionSimilarity("logo pour une ecole", "comment passer une commande")).toBeLessThan(0.4);
  });

  it("skips extra FAQ items that already exist", () => {
    const extra = collectKnownQuestions({
      faqDisplay: faq,
      faqNeedles: [[], [], []],
      publicQuestions: [],
      extraFaq: [{ id: "x", question: "Comment connaître le prix d’un service ?", answer: "Autre texte." }],
    });
    expect(extra.filter((item) => item.source === "faq")).toHaveLength(3);
  });
});
