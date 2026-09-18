import { test, expect, type Page } from "@playwright/test";

async function continueOrder(page: Page) {
  await page.locator("form.js-order [data-next]:visible").click();
}

async function chooseDesign(page: Page) {
  const value = await page.locator('#serviceId option[data-kind="design"]').first().getAttribute("value");
  await page.selectOption("#serviceId", value || { index: 1 });
}

test("homepage FR", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Créer aujourd’hui les solutions/i);
  await expect(page.getByRole("link", { name: "FR", exact: true }).first()).toHaveAttribute("aria-current", "true");
});

test("homepage LN", async ({ page }) => {
  await page.goto("/ln");
  await expect(page.locator("html")).toHaveAttribute("lang", "ln");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Kosala lelo ba solutions/i);
  await expect(page).toHaveURL(/\/ln\/?$/);
});

test("homepage EN", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Creating today the solutions/i);
});

test("language switch FR to LN keeps route", async ({ page }) => {
  await page.goto("/services");
  await page.getByRole("link", { name: "LN", exact: true }).first().click();
  await expect(page).toHaveURL(/\/ln\/services\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ln");
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute("href", /\/services/);
  await expect(page.locator('link[rel="alternate"][hreflang="ln"]')).toHaveAttribute("href", /\/ln\/services/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/services/);
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
});

test("language switch LN to EN keeps route", async ({ page }) => {
  await page.goto("/ln/contact");
  await page.getByRole("link", { name: "EN", exact: true }).first().click();
  await expect(page).toHaveURL(/\/en\/contact\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("stores preferred_locale cookie", async ({ page, context }) => {
  await page.goto("/en/a-propos");
  const cookies = await context.cookies();
  expect(cookies.some((cookie) => cookie.name === "preferred_locale" && cookie.value === "en")).toBe(true);
});

test("contact LN submits", async ({ page }) => {
  await page.goto("/ln/contact");
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex-ln@studio.test");
  await page.fill("#phone", "0841197130");
  await page.fill("#subject", "Projet");
  await page.fill("#message", "Mbote Andréas, nazali na posa ya logo mpe flyer.");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Tinda message" }).click();
  await expect(page.getByText("Matondo. Message na yo etindami malamu.")).toBeVisible();
});

test("contact EN submits", async ({ page }) => {
  await page.goto("/en/contact");
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex-en@studio.test");
  await page.fill("#phone", "0841197130");
  await page.fill("#subject", "Project");
  await page.fill("#message", "Hello Andréas, I would like to talk about a logo project.");
  await page.check("input[name=consent]");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Thank you. Your message has been sent.")).toBeVisible();
});

test("order LN submits", async ({ page }) => {
  await page.goto("/ln/commander");
  await chooseDesign(page);
  await continueOrder(page);
  await page.selectOption("#designKind", "logo");
  await page.fill("#displayName", "Studio Alex");
  await page.selectOption("#designOrigin", "nouveau");
  await continueOrder(page);
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex-ln-order@studio.test");
  await page.fill("#phone", "0990000000");
  await continueOrder(page);
  await page.check("input[name=consent]");
  await page.locator("form.js-order [data-submit]:visible").click();
  await expect(page.getByText("Demande na yo ekomi malamu.")).toBeVisible();
});

test("order EN submits", async ({ page }) => {
  await page.goto("/en/commander");
  await chooseDesign(page);
  await continueOrder(page);
  await page.selectOption("#designKind", "logo");
  await page.fill("#displayName", "Studio Alex");
  await page.selectOption("#designOrigin", "nouveau");
  await continueOrder(page);
  await page.fill("#fullName", "Alex Mukendi");
  await page.fill("#email", "alex-en-order@studio.test");
  await page.fill("#phone", "0990000000");
  await continueOrder(page);
  await page.check("input[name=consent]");
  await page.locator("form.js-order [data-submit]:visible").click();
  await expect(page.getByText("Your request has been received.")).toBeVisible();
});
