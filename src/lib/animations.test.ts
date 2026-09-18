import { describe, expect, it } from "vitest";
import { stagger } from "./animations";

describe("animations helpers", () => {
  it("creates a compact stagger", () => {
    expect(stagger(4, 80, 320)).toEqual([0, 80, 160, 240]);
    expect(stagger(8, 80, 320)[7]).toBe(320);
  });
});
