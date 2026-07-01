"use client";

import { createClientAction } from "@/app/(private)/clientes/_actions/create-client";
import { ClientForm } from "@/app/(private)/clientes/_components/client-form";

export function NovoClienteForm() {
  return (
    <ClientForm
      submitLabel="Salvar cliente"
      loadingText="Salvando..."
      defaultValues={{
        name: "",
        phone: "",
      }}
      onSubmit={createClientAction}
    />
  );
}
