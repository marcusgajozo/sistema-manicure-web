# Guia de testes

Este documento define como organizar e executar testes no projeto.

## Visão geral

| Tipo     | Pasta         | Sufixo do arquivo        | Comando          |
| -------- | ------------- | ------------------------ | ---------------- |
| Unitário | `src/**`      | `.test.ts` / `.test.tsx` | `pnpm test:unit` |
| E2E      | `test/e2e/**` | `.e2e.ts`                | `pnpm test:e2e`  |
| Todos    | —             | —                        | `pnpm test:all`  |

## Testes E2E (Playwright)

### Localização

Os testes E2E ficam em `test/e2e/` e **espelham a estrutura de `src/`**.

```
src/
  app/
    page.tsx
    layout.tsx

test/e2e/
  app/
    page.e2e.ts
    layout.e2e.ts
```

### Convenção de nomenclatura

- Use o sufixo **`.e2e.ts`** em todos os arquivos de teste E2E.
- O nome do arquivo deve corresponder ao que está sendo testado em `src/`.
- Não use `.spec.ts` nem `.test.ts` para E2E neste projeto.

| Arquivo em `src/`              | Teste E2E correspondente               |
| ------------------------------ | -------------------------------------- |
| `src/app/page.tsx`             | `test/e2e/app/page.e2e.ts`             |
| `src/app/layout.tsx`           | `test/e2e/app/layout.e2e.ts`           |
| `src/components/ui/button.tsx` | `test/e2e/components/ui/button.e2e.ts` |

### Exemplo

```ts
// test/e2e/app/page.e2e.ts
import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("renders the main heading", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
```

### Comandos

```bash
pnpm test:e2e          # executa todos os E2E
pnpm test:e2e:ui       # interface visual do Playwright
pnpm test:e2e:headed   # navegador visível
pnpm test:e2e:report   # abre relatório HTML
```

O Playwright sobe o servidor de desenvolvimento automaticamente (`pnpm dev`) antes dos testes.

## Testes unitários (Vitest)

### Localização

Ficam junto ao código ou em pastas de teste dentro de `src/`:

```
src/
  lib/
    format.ts
    format.test.ts
  __tests__/
    smoke.test.ts
```

### Convenção de nomenclatura

- Use `.test.ts` ou `.test.tsx`.
- Não use `.e2e.ts` para testes unitários.

### Comandos

```bash
pnpm test:unit         # executa uma vez
pnpm test:unit:watch   # modo watch
```

## Fluxo recomendado

Após alterar código em `src/` ou testes:

```bash
pnpm test:all
```

Isso executa testes unitários e E2E em sequência.

## Configuração

| Ferramenta | Arquivo de config      |
| ---------- | ---------------------- |
| Playwright | `playwright.config.ts` |
| Vitest     | `vitest.config.ts`     |
