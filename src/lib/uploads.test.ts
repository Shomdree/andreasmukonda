import { describe, expect, it } from "vitest";
import { MAX_ORDER_ATTACHMENT_BYTES, uniqueAttachmentName, validateOrderAttachment, verifyAttachmentMagic } from "./uploads";

describe("order attachments", () => {
  it("rejects a file that is too large", () => {
    const file = new File([new Uint8Array(MAX_ORDER_ATTACHMENT_BYTES + 1)], "brief.pdf", { type: "application/pdf" });
    expect(validateOrderAttachment(file)).toBe("Le fichier dépasse la taille autorisée.");
  });

  it("rejects an executable", () => {
    const file = new File([new Uint8Array(12)], "setup.exe", { type: "application/x-msdownload" });
    expect(validateOrderAttachment(file)).toBe("Formats acceptés : PDF, JPG, PNG ou WebP.");
  });

  it("never keeps the client filename", () => {
    const name = uniqueAttachmentName("Mon Brief Final.PDF");
    expect(name.endsWith(".pdf")).toBe(true);
    expect(name.includes("Mon Brief")).toBe(false);
  });

  it("rejects a PDF extension whose bytes are not a PDF", async () => {
    const file = new File([new Uint8Array([0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00])], "brief.pdf", {
      type: "application/pdf",
    });
    expect(validateOrderAttachment(file)).toBeNull();
    expect(await verifyAttachmentMagic(file)).toBe("Formats acceptés : PDF, JPG, PNG ou WebP.");
  });

  it("accepts a real PDF header", async () => {
    const file = new File([new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37])], "brief.pdf", {
      type: "application/pdf",
    });
    expect(await verifyAttachmentMagic(file)).toBeNull();
  });
});
