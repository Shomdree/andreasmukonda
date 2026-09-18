import { describe, expect, it } from "vitest";
import { fr } from "../i18n/fr";
import { composeOrderContent, orderKindFromService } from "./order-context";
import { makeOrderSchema } from "./validation";

describe("order context", () => {
  it("maps known services without dropping the others", () => {
    expect(orderKindFromService({ id: "s-design", slug: "design-graphique" })).toBe("design");
    expect(orderKindFromService({ id: "s-web", slug: "sites-web-solutions-numeriques" })).toBe("web");
    expect(orderKindFromService({ id: "s-formation", slug: "formation-professionnelle" })).toBe("training");
    expect(orderKindFromService({ id: "s-consulting", slug: "consulting-accompagnement" })).toBe("generic");
    expect(orderKindFromService({ id: "s-media", slug: "photographie-medias" })).toBe("generic");
  });

  it("composes a readable design request", () => {
    const result = composeOrderContent(
      "design",
      {
        serviceTitle: "Design graphique",
        designKind: "logo",
        displayName: "Studio Alex",
        designOrigin: "nouveau",
        desiredDeadline: "2 semaines",
      },
      fr,
    );
    expect(result.projectType).toBe("Logo");
    expect(result.description).toContain("Studio Alex");
    expect(result.fields["Nom à afficher"]).toBe("Studio Alex");
  });
});

describe("contextual order validation", () => {
  const contact = {
    serviceId: "s-design",
    fullName: "Alex Mukendi",
    email: "alex@studio.test",
    phone: "0990000000",
    contactPreference: "whatsapp",
    consent: true,
  };

  it("still requires a service", () => {
    const result = makeOrderSchema(fr.form.errors).safeParse({
      ...contact,
      serviceId: "",
      projectType: "Logo",
      description: "Nous avons besoin d'un logo et d'une affiche pour un lancement.",
    });
    expect(result.success).toBe(false);
  });

  it("requires design-specific answers", () => {
    const result = makeOrderSchema(fr.form.errors, "design").safeParse(contact);
    expect(result.success).toBe(false);
  });

  it("accepts a complete design request without a long generic description", () => {
    const result = makeOrderSchema(fr.form.errors, "design").safeParse({
      ...contact,
      designKind: "logo",
      displayName: "Studio Alex",
      designOrigin: "nouveau",
    });
    expect(result.success).toBe(true);
  });

  it("accepts a complete web request", () => {
    const result = makeOrderSchema(fr.form.errors, "web").safeParse({
      ...contact,
      serviceId: "s-web",
      webType: "vitrine",
      webExists: "nouveau",
      webDomain: "non",
      webHosting: "non",
      webContent: "aide",
      webIdentity: "non",
      webFeatures: "presenter,contact",
    });
    expect(result.success).toBe(true);
  });

  it("requires participants for a group training", () => {
    const result = makeOrderSchema(fr.form.errors, "training").safeParse({
      ...contact,
      serviceId: "s-formation",
      trainingPick: "unsure",
      trainingLevel: "debutant",
      trainingGoal: "travail",
      trainingFormat: "presentiel",
      trainingAudience: "groupe",
    });
    expect(result.success).toBe(false);
  });
});
