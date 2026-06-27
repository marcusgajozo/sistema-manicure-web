import { expect, test } from "@playwright/test";

test.describe("Dashboard page", () => {
  test("renders the dashboard", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Dashboard", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByText("Bem-vinda ao sistema. Use o menu lateral para navegar."),
    ).toBeVisible();
  });

  test("shows the sidebar navigation", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Toggle Sidebar" }),
    ).toBeVisible();
  });
});
