# Estrutura do projeto (feature-first)

O projeto segue organização **feature-first**: código específico de uma rota/feature fica colado à página; código reutilizável fica em `common`.

## Visão geral

```
src/
  app/
    entrar/
      _components/       # componentes só da rota /entrar
        login-form.tsx
      _hooks/            # hooks só da rota /entrar (quando existirem)
      page.tsx
    page.tsx
  common/
    components/
      shadcn-ui/         # design system (shadcn)
    lib/                 # utilitários compartilhados
    hooks/               # hooks compartilhados
```

## Regras

### Colocation na rota (`_components`, `_hooks`, …)

Pastas com prefixo `_` ficam **ao lado da `page.tsx`** da feature:

| Pasta          | Uso                                                 |
| -------------- | --------------------------------------------------- |
| `_components/` | Componentes usados apenas naquela rota ou sub-rotas |
| `_hooks/`      | Hooks específicos da feature                        |
| `_lib/`        | Funções/helpers só da feature (opcional)            |
| `_types/`      | Tipos só da feature (opcional)                      |

**Exemplo:** login em `/entrar`

```
src/app/entrar/
  _components/
    login-form.tsx
  page.tsx
```

Import na página:

```tsx
import { LoginForm } from "./_components/login-form";
```

### `common/` — código compartilhado

Tudo que é usado por **duas ou mais features** vai para `common/`:

| Pasta                          | Uso                                               |
| ------------------------------ | ------------------------------------------------- |
| `common/components/shadcn-ui/` | Componentes de UI do design system (shadcn)       |
| `common/components/`           | Outros componentes reutilizáveis (fora do shadcn) |
| `common/hooks/`                | Hooks reutilizáveis                               |
| `common/lib/`                  | Utilitários (`cn`, formatters, etc.)              |

Import:

```tsx
import { Button } from "@/common/components/shadcn-ui/button";
import { cn } from "@/common/lib/utils";
```

### O que não fazer

- Não criar `src/components/auth/` para código usado só em `/entrar` — use `_components`.
- Não colocar em `common/` algo usado por uma única rota.
- Não misturar lógica de feature dentro de `common/components/shadcn-ui/` (apenas primitivos de UI).

## Sub-rotas

Features com sub-rotas podem ter `_components` em cada nível ou compartilhar na pasta pai:

```
src/app/agendamentos/
  _components/
    agendamentos-list.tsx
  page.tsx
  novo/
    _components/
      novo-agendamento-form.tsx
    page.tsx
```

Prefira `_components` no nível mais específico; promova para o pai ou para `common/` quando houver reuso.

## shadcn/ui

O CLI está configurado em `components.json` para instalar em `src/common/components/shadcn-ui/`:

```bash
pnpm dlx shadcn@latest add dialog
```

## Testes

A estrutura de `test/e2e/` espelha `src/app/`:

```
src/app/entrar/page.tsx     →  test/e2e/app/entrar/page.e2e.ts
```

Veja também [testing-guide.md](./testing-guide.md).
