import type { Page } from "@playwright/test";

import { APP_ROUTES, buildLoginPath } from "@/common/lib/navigation/routes";

const seedEmail = process.env.SEED_USER_EMAIL ?? "admin@example.com";
const seedPassword = process.env.SEED_USER_PASSWORD ?? "password123";

export async function loginAsSeedUser(page: Page) {
  await page.goto(APP_ROUTES.login);
  await page.getByLabel("E-mail").fill(seedEmail);
  await page.getByLabel("Senha").fill(seedPassword);
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL(APP_ROUTES.dashboard);
}

export { APP_ROUTES, buildLoginPath };
