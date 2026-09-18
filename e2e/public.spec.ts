import { test, expect } from "@playwright/test";

test("homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Andréas Mukonda").first()).toBeVisible();
  await expect(page.getByText(/Créer aujourd’hui les solutions/i).first()).toBeVisible();
});

test("portfolio", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Quelques projets/i);
});

test("contact form", async ({ page }) => {
  await page.goto("/contact");
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex@studio.test");
  await page.fill("#phone", "0841197130");
  await page.fill("#subject", "Collaboration");
  await page.fill("#message", "Bonjour Andréas, je souhaite échanger sur un projet d'identité visuelle.");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Envoyer le message" }).click();
  await expect(page.getByText("Merci. Votre message a bien été envoyé.")).toBeVisible();
});

test("contact validation", async ({ page }) => {
  await page.goto("/contact");
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "pas-un-email");
  await page.fill("#phone", "0841197130");
  await page.fill("#subject", "Collaboration");
  await page.fill("#message", "Trop court");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Envoyer le message" }).click();
  await expect(page.getByText(/email valide|message un peu plus long/i).first()).toBeVisible();
});

test("demande de commande", async ({ page }) => {
  await page.goto("/commander");
  await page.selectOption("#serviceId", { index: 1 });
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex@studio.test");
  await page.fill("#phone", "0990000000");
  await page.fill("#projectType", "Logo");
  await page.fill("#description", "Nous avons besoin d'un logo et d'une affiche pour un lancement.");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(page.getByText("Votre demande est bien arrivée.")).toBeVisible();
  await expect(page.getByText(/Référence : AM-\d{4}-\d{4}/)).toBeVisible();
  await expect(page.getByRole("link", { name: /WhatsApp/i }).first()).toBeVisible();
});

test("question", async ({ page }) => {
  await page.goto("/questions");
  await page.fill("#q-name", "Alex Test");
  await page.fill("#q-text", "Comment composer une affiche lisible en ville ?");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Poser ma question" }).click();
  await expect(page.getByText("Merci. Votre question a bien été envoyée.")).toBeVisible();
});

test("admin messages without session", async ({ page }) => {
  await page.goto("/admin/messages");
  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(page.getByRole("heading", { name: "Administration" })).toBeVisible();
  await expect(page.getByText(/nouveau message|contact_messages/i)).toHaveCount(0);
});

test("contact rejects empty name", async ({ page }) => {
  await page.goto("/contact");
  await page.fill("#email", "alex@studio.test");
  await page.fill("#phone", "0841197130");
  await page.fill("#subject", "Collaboration");
  await page.fill("#message", "Bonjour Andréas, je souhaite échanger sur un projet d'identité visuelle.");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Envoyer le message" }).click();
  await expect(page.getByText(/Indiquez votre nom/i)).toBeVisible();
});

test("contact rejects missing consent", async ({ page }) => {
  await page.goto("/contact");
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex@studio.test");
  await page.fill("#phone", "0841197130");
  await page.fill("#subject", "Collaboration");
  await page.fill("#message", "Bonjour Andréas, je souhaite échanger sur un projet d'identité visuelle.");
  await page.getByRole("button", { name: "Envoyer le message" }).click();
  await expect(page.getByText(/consentement est requis/i)).toBeVisible();
});

test("contact honeypot does not confirm", async ({ page }) => {
  await page.goto("/contact");
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex@studio.test");
  await page.fill("#phone", "0841197130");
  await page.fill("#subject", "Collaboration");
  await page.fill("#message", "Bonjour Andréas, je souhaite échanger sur un projet d'identité visuelle.");
  await page.check("input[name=consent]");
  await page.locator("input[name=website]").fill("https://spam.example", { force: true });
  await page.getByRole("button", { name: "Envoyer le message" }).click();
  await expect(page.locator("body")).not.toContainText("500");
  await expect(page.getByText("Merci. Votre message a bien été envoyé.")).toHaveCount(0);
});

test("contact duplicate is rejected", async ({ page }) => {
  await page.goto("/contact");
  const fill = async () => {
    await page.fill("#fullName", "Alex Mukendi");
    await page.fill("#email", "alex-dup@studio.test");
    await page.fill("#phone", "0841197130");
    await page.fill("#subject", "Collaboration");
    await page.fill("#message", "Bonjour Andréas, message identique pour tester le doublon du formulaire.");
    await page.check("input[name=consent]");
    await page.getByRole("button", { name: "Envoyer le message" }).click();
  };
  await fill();
  await expect(page.getByText("Merci. Votre message a bien été envoyé.")).toBeVisible();
  await page.goto("/contact");
  await fill();
  await expect(page.getByText(/déjà été envoyée/i)).toBeVisible();
});

test("order rejects missing service", async ({ page }) => {
  await page.goto("/commander");
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex@studio.test");
  await page.fill("#phone", "0990000000");
  await page.fill("#projectType", "Logo");
  await page.fill("#description", "Nous avons besoin d'un logo et d'une affiche pour un lancement.");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(page.getByText(/Choisissez un service/i)).toBeVisible();
});

test("contact rejects empty message", async ({ page }) => {
  await page.goto("/contact");
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex@studio.test");
  await page.fill("#phone", "0841197130");
  await page.fill("#subject", "Collaboration");
  await page.fill("#message", "");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Envoyer le message" }).click();
  await expect(page.getByText(/message un peu plus long/i)).toBeVisible();
});

test("order rejects missing contact", async ({ page }) => {
  await page.goto("/commander");
  await page.selectOption("#serviceId", { index: 1 });
  await page.fill("#fullName", "");
  await page.fill("#email", "pas-un-email");
  await page.fill("#phone", "0990000000");
  await page.fill("#projectType", "Logo");
  await page.fill("#description", "Nous avons besoin d'un logo et d'une affiche pour un lancement.");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(page.getByText(/Indiquez votre nom|email valide/i).first()).toBeVisible();
});

test("order rejects empty project", async ({ page }) => {
  await page.goto("/commander");
  await page.selectOption("#serviceId", { index: 1 });
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex@studio.test");
  await page.fill("#phone", "0990000000");
  await page.fill("#projectType", "Logo");
  await page.fill("#description", "");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(page.getByText(/message un peu plus long/i)).toBeVisible();
});

test("order rejects invalid attachment", async ({ page }) => {
  await page.goto("/commander");
  await page.selectOption("#serviceId", { index: 1 });
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex-file@studio.test");
  await page.fill("#phone", "0990000000");
  await page.fill("#projectType", "Logo");
  await page.fill("#description", "Nous avons besoin d'un logo et d'une affiche pour un lancement.");
  await page.setInputFiles("#attachment", {
    name: "setup.exe",
    mimeType: "application/x-msdownload",
    buffer: Buffer.from([0x4d, 0x5a, 0x90, 0x00]),
  });
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(page.getByText(/Formats acceptés|n'a pas pu être envoyé|type de fichier n’est pas accepté/i)).toBeVisible();
});

test("order duplicate is rejected", async ({ page }) => {
  await page.goto("/commander");
  const fill = async () => {
    await page.selectOption("#serviceId", { index: 1 });
    await page.fill("#fullName", "Alex Mukendi");
    await page.fill("#email", "alex-order-dup@studio.test");
    await page.fill("#phone", "0990000000");
    await page.fill("#projectType", "Logo");
    await page.fill("#description", "Nous avons besoin d'un logo identique pour tester le doublon de commande.");
    await page.check("input[name=consent]");
    await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  };
  await fill();
  await expect(page.getByText("Votre demande est bien arrivée.")).toBeVisible();
  await page.goto("/commander");
  await fill();
  await expect(page.getByText(/déjà été envoyée/i)).toBeVisible();
});

test("admin dashboard without session", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
});

test("encoded WhatsApp links on public pages", async ({ page }) => {
  await page.goto("/contact");
  const href = await page.getByRole("link", { name: /WhatsApp|\+243/i }).first().getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/243841197130\?text=/);
  expect(href).toContain(encodeURIComponent("Bonjour Andréas"));
});

test("public navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Services", exact: true }).first().click();
  await expect(page).toHaveURL(/\/services/);
  await page.goto("/a-propos");
  await expect(page.getByRole("heading", { name: /Bonjour, je suis Andréas/i })).toBeVisible();
});
