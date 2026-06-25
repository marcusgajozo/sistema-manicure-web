# Estrutura do projeto (feature-first)

O projeto segue organização **feature-first**: código específico de uma rota/feature fica colado à página; código reutilizável fica em `common`.

## Visão geral

```
src/
  app/
    entrar/
      _components/       # componentes só da rota /entrar
      _hooks/
      page.tsx
  common/
    components/
      shadcn-ui/           # primitivos shadcn (padrão do CLI)
      meu-componente/      # outros componentes compartilhados
    lib/
    hooks/
```

## Duas convenções de componente

O projeto usa **dois padrões diferentes**, conforme o tipo do componente.

### 1. Componentes de feature e `common` (não shadcn)

Pastas **kebab-case** com `index.ts` que apenas reexporta:

```
nome-do-componente/
  nome-do-componente.tsx
  index.ts
```

```ts
// index.ts
export { LoginForm } from "./login-form";
```

**Feature (`_components`):**

```
src/app/entrar/_components/login-form/
  login-form.tsx
  index.ts
```

```tsx
import { LoginForm } from "./_components/login-form";
```

**Compartilhado (`common/components`):**

```
src/common/components/app-header/
  app-header.tsx
  index.ts
```

```tsx
import { AppHeader } from "@/common/components/app-header";
```

### 2. Componentes shadcn (`common/components/shadcn-ui/`)

Seguem o **padrão oficial do shadcn/ui** — arquivo único na raiz da pasta, **sem** subpasta nem `index.ts`:

```
src/common/components/shadcn-ui/
  button.tsx
  card.tsx
  field.tsx
  input.tsx
  dialog.tsx   # adicionado via CLI
```

```tsx
import { Button } from "@/common/components/shadcn-ui/button";
import { Card, CardHeader } from "@/common/components/shadcn-ui/card";
```

|                | Feature / `common`               | shadcn                       |
| -------------- | -------------------------------- | ---------------------------- |
| Estrutura      | `pasta/arquivo.tsx` + `index.ts` | `arquivo.tsx` direto         |
| Nome da pasta  | kebab-case                       | — (sem pasta por componente) |
| Gerenciado por | manual                           | `pnpm dlx shadcn@latest add` |

**Não** reorganize componentes shadcn em pastas com `index.ts` — isso quebra o fluxo do CLI e diverge da documentação do shadcn.

## Colocation na rota (`_components`, `_hooks`, …)

Pastas com prefixo `_` ficam **ao lado da `page.tsx`**:

| Pasta          | Uso                                                 |
| -------------- | --------------------------------------------------- |
| `_components/` | Componentes usados apenas naquela rota ou sub-rotas |
| `_hooks/`      | Hooks específicos da feature                        |
| `_lib/`        | Helpers só da feature (opcional)                    |
| `_types/`      | Tipos só da feature (opcional)                      |

**Exemplo:** login em `/entrar`

```
src/app/entrar/
  _components/
    login-form/
      login-form.tsx
      index.ts
  page.tsx
```

## `common/` — código compartilhado

| Pasta                          | Uso                                                              |
| ------------------------------ | ---------------------------------------------------------------- |
| `common/components/shadcn-ui/` | Primitivos de UI (shadcn) — padrão flat do CLI                   |
| `common/components/`           | Componentes de negócio reutilizáveis — padrão pasta + `index.ts` |
| `common/hooks/`                | Hooks reutilizáveis                                              |
| `common/lib/`                  | Utilitários (`cn`, formatters, etc.)                             |

## O que não fazer

- Não criar `src/components/auth/` para código usado só em `/entrar` — use `_components`.
- Não colocar em `common/` algo usado por uma única rota.
- Não aplicar pasta + `index.ts` em componentes shadcn.
- Não misturar lógica de feature dentro de `shadcn-ui/` (apenas primitivos de UI).

## Sub-rotas

```
src/app/agendamentos/
  _components/
    agendamentos-list/
      agendamentos-list.tsx
      index.ts
  page.tsx
  novo/
    _components/
      novo-agendamento-form/
        novo-agendamento-form.tsx
        index.ts
    page.tsx
```

## shadcn/ui

Configurado em `components.json` para instalar em `src/common/components/shadcn-ui/`:

```bash
pnpm dlx shadcn@latest add dialog
# gera: src/common/components/shadcn-ui/dialog.tsx
```

## Testes

A estrutura de `test/e2e/` espelha `src/app/`:

```
src/app/entrar/page.tsx  →  test/e2e/app/entrar/page.e2e.ts
```

Veja [testing-guide.md](./testing-guide.md).
