# Mapeamento e Tipagem da API

Este documento detalha o padrão adotado para o consumo de APIs dentro do diretório `src/common/services/api/`. Seguimos uma abordagem baseada em inferência de tipos automáticos, utilizando Zod e `typed-route-client/core`.

## Motivação

A prática de realizar `castings` de tipo manualmente (por exemplo, `(res as { data: T })?.data as T`) ignora a validação e quebra a checagem de tipos estática do TypeScript.
Ao declarar explicitamente schemas para o formato de retorno da API, o cliente HTTP consegue inferir o formato exato da resposta e de seus atributos, permitindo um desenvolvimento sem "any" ou typecasts.

## Como Mapear uma Nova Resposta da API

Para mapear e inferir automaticamente a resposta da chamada de API para uso em componentes e actions, você deve realizar dois passos fundamentais:

### 1. Declarar o Schema Zod (`schemas.ts`)

No arquivo `schemas.ts` pertencente ao domínio ou feature (ex: `src/common/services/api/appointments/schemas.ts`), defina a estrutura da resposta. Geralmente o backend retorna os objetos envelopados em uma propriedade `data`.

```typescript
import { z } from "zod";

// 1. Defina a estrutura base da entidade
export const appointmentSchema = z.object({
  id: z.string(),
  clientName: z.string(),
  procedureName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

// 2. Defina o schema correspondente ao Payload de Resposta (envelopado)
export const appointmentsResponseSchema = z.object({
  data: z.array(appointmentSchema),
});
```

### 2. Atribuir ao Mapeamento de Rota (`routes.ts`)

No arquivo de definição das rotas (`routes.ts` do mesmo domínio), importe o `responseSchema` recém-criado e associe-o à definição do verbo HTTP correspondente.

```typescript
import { defineApiRoutes } from "typed-route-client/core";
import { appointmentsResponseSchema } from "./schemas";
import { apiErrorSchema } from "../shared/schemas/api-error";

export const appointmentsRoutes = defineApiRoutes({
  "/appointments": {
    methods: {
      get: {
        // Associe o schema da resposta aqui:
        responseSchema: appointmentsResponseSchema,
        errorSchema: apiErrorSchema,
      },
      // post: { ... }
    },
  },
});
```

## Consumo da Rota

Ao efetuar essa configuração, qualquer chamada para esta rota com o `apiClient` inferirá estaticamente que a propriedade `data` existe e é tipada como `Array<{ id: string, clientName: string, ... }>`:

```typescript
import { apiClient } from "@/common/services/api/server-client";

async function fetchAppointments() {
  const response = await apiClient
    .callRoute("/appointments", { method: "get" })
    .catch(() => null);

  // Sem necessidade de casting manual:
  const appointments = response?.data ?? [];

  return appointments;
}
```

Dessa forma, caso existam mudanças no schema em um único local (`schemas.ts`), toda a aplicação alertará erros de tipagem em caso de divergência de uso, mantendo o código altamente sustentável.
