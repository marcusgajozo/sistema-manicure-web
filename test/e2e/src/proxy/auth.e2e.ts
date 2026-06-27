import { expect, test } from "@playwright/test";

import { APP_ROUTES, buildLoginPath } from "@/common/lib/navigation/routes";

test.describe("Auth proxy", () => {
  test("redirects unauthenticated users to login", async ({ page }) => {
    await page.goto(APP_ROUTES.dashboard);

    await expect(page).toHaveURL(buildLoginPath(APP_ROUTES.dashboard));
    await expect(
      page.getByRole("heading", { name: "Entrar", level: 1 }),
    ).toBeVisible();
  });
});
