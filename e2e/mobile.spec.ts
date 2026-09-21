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
      const sheet = page.locator("details.nav-mobile .sheet");
      const scroll = await sheet.evaluate((el) => {
        const style = getComputedStyle(el);
        el.scrollTop = 160;
        return {
          overflowY: style.overflowY,
          canScroll: el.scrollHeight - el.clientHeight > 8,
          scrollTop: el.scrollTop,
        };
      });
      expect(["auto", "scroll", "overlay"]).toContain(scroll.overflowY);
      if (scroll.canScroll) expect(scroll.scrollTop).toBeGreaterThan(0);
      await page.mouse.click(28, Math.min(device.height - 80, 520));
      await expect(page.locator("details.nav-mobile")).not.toHaveAttribute("open");
      await expect(page.locator("html")).not.toHaveClass(/nav-open/);
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.getByLabel("Ouvrir le menu").click();
      const sheetBox = await sheet.boundingBox();
      expect(sheetBox, "menu stays in the viewport after a long scroll").toBeTruthy();
      expect(sheetBox.y).toBeGreaterThanOrEqual(0);
      expect(sheetBox.y).toBeLessThan(device.height * 0.45);
      await expect(page.getByRole("link", { name: "À propos", exact: true }).first()).toBeVisible();
      await page.locator("[data-nav-dismiss]").click({ position: { x: 12, y: 200 }, force: true });
      await expect(page.locator("details.nav-mobile")).not.toHaveAttribute("open");
      expect(await page.evaluate(() => getComputedStyle(document.body).position)).not.toBe("fixed");
      await page.getByRole("link", { name: "Commander" }).first().click();
      await expect(page).toHaveURL(/commander/);
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
