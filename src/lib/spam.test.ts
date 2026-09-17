import { describe, expect, it } from "vitest";
import { honeypotFilled, isTooFast, spamReason } from "./spam";

describe("anti-spam", () => {
  it("flags a filled honeypot", () => {
    expect(honeypotFilled("https://spam.test")).toBe(true);
    expect(honeypotFilled("")).toBe(false);
  });

  it("flags a form submitted too quickly", () => {
    const started = String(Date.now() - 200);
    expect(isTooFast(started, Date.now(), 1000)).toBe(true);
    expect(isTooFast(String(Date.now() - 1500), Date.now(), 1000)).toBe(false);
    expect(isTooFast("", Date.now())).toBe(false);
  });

  it("reads suspicion from form data", () => {
    const fast = new FormData();
    fast.set("startedAt", String(Date.now()));
    expect(spamReason(fast)).toBe("too_fast");

    const bait = new FormData();
    bait.set("website", "bot");
    bait.set("startedAt", String(Date.now() - 5000));
    expect(spamReason(bait)).toBe("honeypot");
  });
});
