import { test, expect, type Page } from "@playwright/test";

async function continueOrder(page: Page) {
  await page.locator("form.js-order [data-next]:visible").click();
}

async function fillOrderContact(page: Page, email: string) {
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", email);
  await page.fill("#phone", "0990000000");
}

async function sendOrder(page: Page) {
  await page.check("input[name=consent]");
  await page.locator("form.js-order [data-submit]:visible").click();
}

async function chooseService(page: Page, kind: "design" | "web" | "training" | "generic") {
  const value = await page.locator(`#serviceId option[data-kind="${kind}"]`).first().getAttribute("value");
  await page.selectOption("#serviceId", value || { index: 1 });
}

async function completeDesignOrder(page: Page, email: string) {
  await chooseService(page, "design");
  await continueOrder(page);
  await page.selectOption("#designKind", "logo");
  await page.fill("#displayName", "Studio Alex");
  await page.selectOption("#designOrigin", "nouveau");
  await continueOrder(page);
  await fillOrderContact(page, email);
  await continueOrder(page);
  await sendOrder(page);
}

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
  await completeDesignOrder(page, "alex@studio.test");
  await expect(page.getByText("Votre demande est bien arrivée.")).toBeVisible();
  await expect(page.getByText(/Référence : AM-\d{4}-\d{4}/)).toBeVisible();
  await expect(page.getByRole("link", { name: /WhatsApp/i }).first()).toBeVisible();
});

test("commande site web", async ({ page }) => {
  await page.goto("/commander");
  await chooseService(page, "web");
  await continueOrder(page);
  await page.selectOption("#webType", "vitrine");
  await page.selectOption("#webExists", "nouveau");
  await page.selectOption("#webDomain", "non");
  await page.selectOption("#webHosting", "non");
  await page.locator('input[name=webFeatures][value=presenter]').check();
  await page.locator('input[name=webFeatures][value=contact]').check();
  await page.selectOption("#webContent", "aide");
  await page.selectOption("#webIdentity", "non");
  await continueOrder(page);
  await fillOrderContact(page, "alex-web@studio.test");
  await continueOrder(page);
  await sendOrder(page);
  await expect(page.getByText("Votre demande est bien arrivée.")).toBeVisible();
});

test("commande formation", async ({ page }) => {
  await page.goto("/commander");
  await chooseService(page, "training");
  await continueOrder(page);
  await page.selectOption("#trainingPick", "unsure");
  await page.selectOption("#trainingLevel", "debutant");
  await page.selectOption("#trainingGoal", "travail");
  await page.selectOption("#trainingFormat", "presentiel");
  await page.selectOption("#trainingAudience", "individuelle");
  await continueOrder(page);
  await fillOrderContact(page, "alex-training@studio.test");
  await continueOrder(page);
  await sendOrder(page);
  await expect(page.getByText("Votre demande est bien arrivée.")).toBeVisible();
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
  await continueOrder(page);
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
  await chooseService(page, "design");
  await continueOrder(page);
  await page.selectOption("#designKind", "logo");
  await page.fill("#displayName", "Studio Alex");
  await page.selectOption("#designOrigin", "nouveau");
  await continueOrder(page);
  await page.fill("#fullName", "");
  await page.fill("#email", "pas-un-email");
  await continueOrder(page);
  await expect(page.locator("#fullName")).toBeFocused();
});

test("order rejects empty project", async ({ page }) => {
  await page.goto("/commander");
  await chooseService(page, "design");
  await continueOrder(page);
  await continueOrder(page);
  await expect(page.locator("#designKind")).toBeFocused();
});

test("order rejects invalid attachment", async ({ page }) => {
  await page.goto("/commander");
  await chooseService(page, "design");
  await continueOrder(page);
  await page.selectOption("#designKind", "logo");
  await page.fill("#displayName", "Studio Alex");
  await page.selectOption("#designOrigin", "nouveau");
  await page.setInputFiles("#attachment", {
    name: "setup.exe",
    mimeType: "application/x-msdownload",
    buffer: Buffer.from([0x4d, 0x5a, 0x90, 0x00]),
  });
  await continueOrder(page);
  await fillOrderContact(page, "alex-file@studio.test");
  await continueOrder(page);
  await sendOrder(page);
  await expect(page.getByText(/Formats acceptés|n'a pas pu être envoyé|type de fichier n’est pas accepté/i)).toBeVisible();
});

test("order duplicate is rejected", async ({ page }) => {
  await page.goto("/commander");
  await completeDesignOrder(page, "alex-order-dup@studio.test");
  await expect(page.getByText("Votre demande est bien arrivée.")).toBeVisible();
  await page.goto("/commander");
  await completeDesignOrder(page, "alex-order-dup@studio.test");
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
