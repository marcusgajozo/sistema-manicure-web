import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("renders the main heading", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: /To get started, edit the page\.tsx file\./i,
      }),
    ).toBeVisible();
  });

  test("has navigation links", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "Documentation" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Deploy Now" })).toBeVisible();
  });
});
