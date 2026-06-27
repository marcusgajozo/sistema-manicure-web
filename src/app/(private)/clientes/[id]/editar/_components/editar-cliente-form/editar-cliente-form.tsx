"use client";

import { updateClientAction } from "@/app/(private)/clientes/_actions/update-client";
import { ClientForm } from "@/app/(private)/clientes/_components/client-form";
import type { Client } from "@/common/services/api/clients/schemas";

type EditarClienteFormProps = {
  client: Client;
};

export function EditarClienteForm({ client }: EditarClienteFormProps) {
  return (
    <ClientForm
      title="Editar cliente"
      description="Atualize o nome e o telefone do cliente."
      submitLabel="Salvar alterações"
      loadingText="Salvando..."
      defaultValues={{
        name: client.name,
        phone: client.phone,
      }}
      onSubmit={(values) => updateClientAction(client.id, values)}
    />
  );
}
