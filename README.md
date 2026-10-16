# Sistema Manicure Web

Interface web do sistema de gestão de salão de manicure. Consome a API REST do [api-sistema-manicure](https://github.com/marcusgajozo/api-sistema-manicure) e cobre agenda, clientes, procedimentos, folgas e notificações.

## Stack

- Next.js 16 com App Router, React 19 e TypeScript
- Tailwind CSS 4
- FullCalendar na agenda e TanStack Table nas listagens
- react-hook-form na validação de formulário
- Playwright nos testes de ponta a ponta
- pnpm, commitlint e lint-staged

## Cliente da API gerado do Swagger

Os schemas de validação em Zod e as rotas tipadas não são escritos à mão. Eles saem do Swagger da API:

```bash
pnpm api:generate
```

Para rodar, a API precisa estar no ar e `API_URL` e `SWAGGER_URL` no `.env` precisam apontar para ela. Quando o contrato da API muda, este comando regenera os tipos, e uma incompatibilidade aparece no build em vez de virar erro em produção.

## Organização das rotas

O App Router está dividido em dois grupos, cada um com o seu layout: `(public)`, com as telas abertas, e `(private)`, com o que exige sessão.

## Como rodar

```bash
pnpm install
cp .env.example .env      # aponte API_URL para a API rodando
pnpm dev
```

A aplicação sobe em `http://localhost:3000`.

## Testes

```bash
pnpm test:e2e          # Playwright, ponta a ponta
pnpm test:e2e:ui       # com a interface do Playwright
```

Os testes em `test/e2e/` espelham a estrutura de `src/app/`, incluindo o fluxo de autenticação.

## Projeto relacionado

- API: [api-sistema-manicure](https://github.com/marcusgajozo/api-sistema-manicure)
