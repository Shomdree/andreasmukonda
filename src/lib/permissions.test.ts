import { describe, expect, it } from "vitest";
import { CONTACT_UNAVAILABLE, ORDER_UNAVAILABLE, isUnavailableMessage } from "./env";
import { isAdminEmail } from "./auth";
import { hashedClientKey, rateLimit } from "./rate-limit";

describe("unavailable copy", () => {
  it("recognises contact and order fail-safe messages", () => {
    expect(isUnavailableMessage(CONTACT_UNAVAILABLE)).toBe(true);
    expect(isUnavailableMessage(ORDER_UNAVAILABLE)).toBe(true);
    expect(isUnavailableMessage("ok")).toBe(false);
  });
});

describe("admin email gate", () => {
  it("never treats an empty email as admin", () => {
    expect(isAdminEmail(undefined)).toBe(false);
    expect(isAdminEmail("")).toBe(false);
  });
});

describe("rate limit", () => {
  it("allows the first hits then blocks", () => {
    const key = `test-${Date.now()}`;
    expect(rateLimit(key, 2, 60_000)).toBe(true);
    expect(rateLimit(key, 2, 60_000)).toBe(true);
    expect(rateLimit(key, 2, 60_000)).toBe(false);
  });
});

describe("hashed client key", () => {
  it("does not embed the raw IP", () => {
    const request = new Request("https://example.test/", { headers: { "x-forwarded-for": "203.0.113.10" } });
    const hash = hashedClientKey(request, "contact");
    expect(hash).toHaveLength(32);
    expect(hash).not.toContain("203.0.113.10");
    expect(hash).not.toContain("contact");
  });
});
