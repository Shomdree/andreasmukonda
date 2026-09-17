import { describe, expect, it } from "vitest";
import { contactSchema, orderSchema, questionSchema } from "./validation";

describe("form validation", () => {
  it("rejects a short contact message", () => {
    const result = contactSchema.safeParse({
      fullName: "A",
      email: "bad",
      phone: "0990000000",
      subject: "Hi",
      message: "short",
      preferredContact: "email",
      consent: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email with a clear message", () => {
    const result = contactSchema.safeParse({
      fullName: "Alex Mukendi",
      email: "pas-un-email",
      phone: "0990000000",
      subject: "Collaboration",
      message: "Bonjour, je souhaite échanger sur un projet d'identité.",
      preferredContact: "email",
      consent: true,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message.includes("email"))).toBe(true);
    }
  });

  it("rejects a missing phone number", () => {
    const result = contactSchema.safeParse({
      fullName: "Alex Mukendi",
      email: "alex@studio.test",
      phone: "",
      subject: "Collaboration",
      message: "Bonjour, je souhaite échanger sur un projet d'identité.",
      preferredContact: "whatsapp",
      consent: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing consent even when sent as the string false", () => {
    const result = contactSchema.safeParse({
      fullName: "Alex Mukendi",
      email: "alex@studio.test",
      phone: "0990000000",
      subject: "Collaboration",
      message: "Bonjour, je souhaite échanger sur un projet d'identité.",
      preferredContact: "whatsapp",
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid contact payload", () => {
    const result = contactSchema.safeParse({
      fullName: "Alex Mukendi",
      email: "alex@studio.test",
      phone: "0990000000",
      subject: "Collaboration",
      message: "Bonjour, je souhaite échanger sur un projet d'identité.",
      preferredContact: "whatsapp",
      consent: true,
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("blocks honeypot content", () => {
    const result = questionSchema.safeParse({
      fullName: "Alex",
      category: "Design",
      question: "Comment composer une affiche lisible en ville ?",
      consentPublication: false,
      displayAnonymously: true,
      consent: true,
      website: "http://spam.test",
    });
    expect(result.success).toBe(false);
  });

  it("requires a service on orders", () => {
    const result = orderSchema.safeParse({
      serviceId: "",
      fullName: "Alex Mukendi",
      email: "alex@studio.test",
      phone: "0990000000",
      projectType: "Logo",
      description: "Nous avons besoin d'un logo et d'une affiche pour un lancement.",
      budgetRange: "À discuter",
      contactPreference: "whatsapp",
      consent: true,
    });
    expect(result.success).toBe(false);
  });
});
