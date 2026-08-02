# Componente Select

Um componente customizado de seleção (Select) construído usando a primitiva Combobox do `@base-ui/react`. Ele suporta filtro de busca por padrão, acessibilidade total via teclado e utiliza CSS modules padrão para estilização.

## Dependências

Para utilizar o componente `Select`, você precisa instalar a seguinte biblioteca no seu projeto:

- `@base-ui/react`: Fornece componentes acessíveis não estilizados (utilizado o componente combobox).
- `react-hook-form` (Opcional): Necessária apenas se for utilizar a versão de formulário (`FormSelect`).

**Instalação:**

```bash
npm install @base-ui/react react-hook-form
# ou
yarn add @base-ui/react react-hook-form
# ou
pnpm add @base-ui/react react-hook-form
```

Após instalar a dependência, basta copiar a pasta `select` para dentro de `src/features/` do seu projeto.

## Estrutura

- `index.ts`: Arquivo de exportação (API pública).
- `select.tsx`: Arquivo principal do componente.
- `select-trigger.tsx`: Subcomponente responsável pelo botão de gatilho (trigger).
- `select-dropdown.tsx`: Subcomponente responsável pelo menu suspenso (popup/dropdown).
- `theme.css`: **API de Design!** Contém todos os tokens de design (variáveis CSS) para o componente. Edite este arquivo para customizar cores, bordas, tipografia, etc. facilmente.
- `select.module.css`: Estilos estruturais base (contêiner, rótulo).
- `select-trigger.module.css`: Estilos estruturais específicos do gatilho (trigger).
- `select-dropdown.module.css`: Estilos estruturais específicos do menu suspenso (dropdown).

## Como Usar

```tsx
import { Select } from "@/features/select/ui";

const options = [
  { value: "apple", label: "Maçã" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Laranja", disabled: true },
];

export function MyForm() {
  return (
    <Select
      label="Escolha uma fruta"
      options={options}
      onChange={(value) => console.log(value)}
    />
  );
}
```
