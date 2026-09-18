import { expect, test } from "@playwright/test";

test("editorial pages keep their titles and a useful action", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Quelques projets/i);
  await expect(page.getByRole("link", { name: /Créer quelque chose de similaire/i }).first()).toBeVisible();

  await page.goto("/formations");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Apprendre quelque chose/i);
  await expect(page.getByRole("link", { name: "Je veux me former" }).first()).toHaveAttribute(
    "href",
    /commander\?service=formation-professionnelle/,
  );

  await page.goto("/lives");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/contenus et mes interventions/i);

  await page.goto("/actualites");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Ce que j’apprends/i);

  await page.goto("/consulting");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Parlons de votre projet/i);
  await expect(page.getByRole("link", { name: "Demander une consultation" }).first()).toHaveAttribute("href", /#demande/);
  await expect(page.locator("#fullName")).toBeVisible();

  await page.goto("/questions");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Vous avez une question/i);
  await expect(page.getByRole("link", { name: "Trouver une réponse" })).toBeVisible();
  await expect(page.getByText(/Exemple d.utilisation/)).toBeHidden();
  await page.getByText("Voir un exemple").click();
  await expect(page.getByText(/Exemple d.utilisation/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Poser ma question" })).toBeVisible();
});

test("editorial pages exist in English and Lingala", async ({ page }) => {
  await page.goto("/en/portfolio");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/A few projects/i);
  await page.goto("/ln/questions");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Ozali na motuna/i);
  await expect(page.getByText("Exemple ya kosalela — message etindami te")).toBeHidden();
});

test("editorial pages do not overflow at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  for (const path of ["/portfolio", "/formations", "/lives", "/actualites", "/consulting", "/questions"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(2);
  }
});

test("questions demo does not send a message", async ({ page }) => {
  await page.goto("/questions");
  await page.getByText("Voir un exemple").click();
  await expect(page.getByText("Je souhaite commander une affiche")).toBeVisible();
  await expect(page.getByRole("button", { name: "Poser ma question" })).toHaveCount(1);
  await expect(page).not.toHaveURL(/\?ok=1/);
});
