import { describe, expect, it } from "vitest";
import { editorialImages, newsKindFromCategory } from "./news-kinds";

describe("news kinds", () => {
  it("maps reflections, advice, articles and the rest", () => {
    expect(newsKindFromCategory("Réflexion")).toBe("reflexion");
    expect(newsKindFromCategory("Reflection")).toBe("reflexion");
    expect(newsKindFromCategory("Conseil")).toBe("conseil");
    expect(newsKindFromCategory("Advice")).toBe("conseil");
    expect(newsKindFromCategory("Article")).toBe("article");
    expect(newsKindFromCategory("Design")).toBe("autre");
    expect(newsKindFromCategory("Événements")).toBe("autre");
  });

  it("keeps generic covers out of the editorial gallery", () => {
    expect(
      editorialImages({
        title: "Test",
        coverImage: "/images/covers/branding.svg",
        images: [],
      }),
    ).toEqual([]);
  });
});
