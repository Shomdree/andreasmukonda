import { expect, test } from "@playwright/test";

const mobiles = [
  { name: "390x844", width: 390, height: 844 },
  { name: "360x800", width: 360, height: 800 },
  { name: "430x932", width: 430, height: 932 },
];

for (const device of mobiles) {
  test.describe(`mobile ${device.name}`, () => {
    test.use({ viewport: { width: device.width, height: device.height } });

    test("hero, menu, language and no horizontal overflow", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("img", { name: /Portrait professionnel/i }).first()).toBeVisible();
      await page.getByLabel("Ouvrir le menu").click();
      await expect(page.getByText("Langue").first()).toBeVisible();
      await expect(page.getByRole("link", { name: "À propos", exact: true }).first()).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(2);
    });

    test("contact, commander and WhatsApp without dock", async ({ page }) => {
      await page.goto("/contact");
      await expect(page.getByRole("heading", { name: "Parlons." })).toBeVisible();
      await expect(page.getByRole("link", { name: /\+243|WhatsApp/i }).first()).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Actions rapides" })).toHaveCount(0);
      await page.goto("/commander");
      await expect(page.getByRole("heading", { name: /Parlez-moi de votre projet/i })).toBeVisible();
      await expect(page.getByRole("link", { name: "Commander" }).first()).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Actions rapides" })).toHaveCount(0);
      const design = await page.locator('#serviceId option[data-kind="design"]').first().getAttribute("value");
      await page.selectOption("#serviceId", design || { index: 1 });
      await page.locator("form.js-order [data-next]:visible").click();
      await expect(page.locator("#designKind")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(2);
    });
  });
}
