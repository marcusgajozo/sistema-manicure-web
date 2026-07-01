# Componente Page — Padrão de Páginas

Todas as páginas da área privada devem usar o componente `Page` com **composition pattern**. Ele padroniza o layout, o cabeçalho e o conteúdo de cada página.

## Importação

```tsx
import { Page } from "@/common/components/page";
```

## Partes do componente

| Parte          | Responsabilidade                                                    |
| -------------- | ------------------------------------------------------------------- |
| `Page.Root`    | Wrapper externo — define padding, gap e direção `flex-col`          |
| `Page.Header`  | Cabeçalho com título, descrição opcional e botão de voltar opcional |
| `Page.Content` | Área de conteúdo principal                                          |

## Props do `Page.Header`

| Prop             | Tipo        | Obrigatório | Descrição                                                      |
| ---------------- | ----------- | ----------- | -------------------------------------------------------------- |
| `title`          | `string`    | ✅          | Título da página (renderizado como `<h1>`)                     |
| `description`    | `string`    | ❌          | Subtítulo/descrição abaixo do título                           |
| `showBackButton` | `boolean`   | ❌          | Exibe o botão de voltar (chevron esquerdo)                     |
| `backHref`       | `string`    | ❌          | Rota para o botão de voltar; se omitido, usa `router.back()`   |
| `children`       | `ReactNode` | ❌          | Slot para ações à direita (ex.: botões de criar, filtrar etc.) |
| `className`      | `string`    | ❌          | Classe extra para o wrapper do header                          |

## Exemplos

### Página de listagem simples

```tsx
export default function AgendamentosPage() {
  return (
    <Page.Root>
      <Page.Header
        title="Agendamentos"
        description="Lista de agendamentos do salão."
      />
      <Page.Content>{/* tabela, lista etc. */}</Page.Content>
    </Page.Root>
  );
}
```

### Página de listagem com ação no header

```tsx
export default function ClientesPage() {
  return (
    <Page.Root>
      <Page.Header
        title="Clientes"
        description="Gerencie os clientes do salão."
      >
        <Button asChild>
          <Link href="/clientes/novo">Novo cliente</Link>
        </Button>
      </Page.Header>
      <Page.Content>
        <ClientesTable />
      </Page.Content>
    </Page.Root>
  );
}
```

### Página de formulário com botão de voltar (rota explícita)

```tsx
export default function NovoClientePage() {
  return (
    <Page.Root>
      <Page.Header
        title="Novo cliente"
        description="Cadastre um novo cliente com nome e telefone."
        showBackButton
        backHref="/clientes"
      />
      <Page.Content>
        <NovoClienteForm />
      </Page.Content>
    </Page.Root>
  );
}
```

### Página de formulário com botão de voltar (histórico do browser)

```tsx
export default function EditarClientePage() {
  return (
    <Page.Root>
      <Page.Header
        title="Editar cliente"
        showBackButton
        {/* sem backHref → usa router.back() */}
      />
      <Page.Content>
        <EditarClienteForm />
      </Page.Content>
    </Page.Root>
  );
}
```

## Regras de uso

- **Sempre use `Page.Root` como wrapper** — nunca adicione padding/gap manual diretamente na `page.tsx`.
- **O `<h1>` deve estar no `Page.Header`** — não adicione `<h1>` dentro de `Page.Content` ou dentro de componentes filhos.
- **Título/descrição ficam na `page.tsx`**, não dentro de componentes de formulário ou listagem.
- **`showBackButton` é obrigatório em sub-páginas** (novo, editar, detalhes). Use `backHref` para rota explícita ou omita para usar o histórico.
- **A página pública `/entrar` é exceção** — usa um layout de autenticação próprio e não precisa do `Page` wrapper.

## Arquivos do componente

```
src/common/components/page/
  page-root.tsx     → Page.Root
  page-header.tsx   → Page.Header  (usa "use client" por conta do router)
  page-content.tsx  → Page.Content
  page.tsx          → composição do objeto Page
  index.ts          → barrel export
```
