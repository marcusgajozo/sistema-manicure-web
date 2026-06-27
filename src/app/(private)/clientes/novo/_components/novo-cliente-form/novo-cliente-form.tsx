"use client";

import { createClientAction } from "@/app/(private)/clientes/_actions/create-client";
import { ClientForm } from "@/app/(private)/clientes/_components/client-form";

export function NovoClienteForm() {
  return (
    <ClientForm
      title="Novo cliente"
      description="Cadastre um novo cliente com nome e telefone."
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
