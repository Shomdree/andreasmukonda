import { describe, expect, it } from "vitest";
import { PUBLIC_ORIGIN, publicSiteOrigin } from "./env";

describe("publicSiteOrigin", () => {
  it("keeps local development URLs", () => {
    expect(publicSiteOrigin("http://localhost:4321")).toBe("http://localhost:4321");
    expect(publicSiteOrigin("http://127.0.0.1:4321/")).toBe("http://127.0.0.1:4321");
  });

  it("uses the public domain instead of the Render host", () => {
    expect(publicSiteOrigin("https://andreasmukonda.onrender.com")).toBe(PUBLIC_ORIGIN);
    expect(publicSiteOrigin("https://www.andreasmukonda.com/")).toBe(PUBLIC_ORIGIN);
    expect(publicSiteOrigin("http://andreasmukonda.com")).toBe(PUBLIC_ORIGIN);
  });
});
