import { describe, expect, it } from "vitest";
import { orderWhatsAppMessage, whatsappUrl } from "./whatsapp";

describe("whatsapp", () => {
  it("returns null without a number", () => {
    expect(whatsappUrl("", "hello")).toBeNull();
  });

  it("builds a wa.me link", () => {
    expect(whatsappUrl("+243 800 000 000", "Bonjour")).toBe(
      "https://wa.me/243800000000?text=Bonjour",
    );
  });

  it("encodes a generic message", () => {
    const url = whatsappUrl("243841197130", "Bonjour Andréas, je vous contacte depuis votre site.");
    expect(url).toContain("https://wa.me/243841197130?text=");
    expect(url).toContain(encodeURIComponent("Bonjour Andréas"));
  });

  it("builds the order follow-up message", () => {
    expect(orderWhatsAppMessage("AM-2026-0001")).toBe(
      "Bonjour Andréas, je vous contacte depuis votre site au sujet de la commande AM-2026-0001.",
    );
  });
});
