import { describe, expect, it } from "vitest";
import { formatOrderReference, isOrderReference, nextOrderReference } from "./order-reference";

describe("order references", () => {
  it("pads sequences", () => {
    expect(formatOrderReference(2026, 1)).toBe("AM-2026-0001");
    expect(formatOrderReference(2026, 12)).toBe("AM-2026-0012");
  });

  it("increments within the same year", () => {
    expect(nextOrderReference("AM-2026-0001", new Date("2026-09-16"))).toBe("AM-2026-0002");
  });

  it("resets on a new year", () => {
    expect(nextOrderReference("AM-2025-0099", new Date("2026-01-02"))).toBe("AM-2026-0001");
  });

  it("starts at 0001 without history", () => {
    expect(nextOrderReference(null, new Date("2026-03-01"))).toBe("AM-2026-0001");
  });

  it("validates shape", () => {
    expect(isOrderReference("AM-2026-0001")).toBe(true);
    expect(isOrderReference("am-2026-1")).toBe(false);
  });
});
