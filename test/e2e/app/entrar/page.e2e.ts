import { expect, test } from "@playwright/test";

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/entrar");
  });

  test("displays the login form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Entrar", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByText("Acesse o sistema com seu e-mail e senha."),
    ).toBeVisible();
    await expect(page.getByLabel("E-mail")).toBeVisible();
    await expect(page.getByLabel("Senha")).toBeVisible();
    await expect(page.getByRole("button", { name: "Entrar" })).toBeVisible();
  });

  test("requires email and password before submit", async ({ page }) => {
    await page.getByRole("button", { name: "Entrar" }).click();

    const emailIsInvalid = await page
      .getByLabel("E-mail")
      .evaluate((input) => !(input as HTMLInputElement).validity.valid);

    expect(emailIsInvalid).toBe(true);
  });

  test("accepts user input in email and password fields", async ({ page }) => {
    await page.getByLabel("E-mail").fill("usuario@exemplo.com");
    await page.getByLabel("Senha").fill("senha-segura");

    await expect(page.getByLabel("E-mail")).toHaveValue("usuario@exemplo.com");
    await expect(page.getByLabel("Senha")).toHaveValue("senha-segura");
  });

  test("shows an error message for invalid credentials", async ({ page }) => {
    await page.getByLabel("E-mail").fill("usuario@exemplo.com");
    await page.getByLabel("Senha").fill("senha-invalida");
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page.getByText("E-mail ou senha inválidos.")).toBeVisible();
  });
});
