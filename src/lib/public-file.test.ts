import { describe, expect, it } from "vitest";
import { hasOptimizedPublicVariants, publicFileExists, publicImageBase, publicPath } from "./public-file";

describe("public files", () => {
  it("keeps public image paths usable", () => {
    expect(publicPath("/images/services/impression-affiches.jpg")).toBe("/images/services/impression-affiches.jpg");
    expect(publicImageBase("/images/services/impression-affiches.jpg")).toBe("/images/services/impression-affiches");
    expect(publicPath("https://example.com/x.jpg")).toBe("");
  });

  it("finds the print cover and its lighter variants", () => {
    expect(publicFileExists("/images/services/impression-affiches.jpg")).toBe(true);
    expect(hasOptimizedPublicVariants("/images/services/impression-affiches.jpg")).toBe(true);
    expect(publicFileExists("/images/portfolio/aff-001.jpg")).toBe(true);
    expect(hasOptimizedPublicVariants("/images/portfolio/aff-001.jpg")).toBe(true);
    expect(hasOptimizedPublicVariants("/images/missing.jpg")).toBe(false);
  });
});
