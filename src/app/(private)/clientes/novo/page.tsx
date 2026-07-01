import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import { APP_ROUTES } from "@/common/lib/navigation/routes";

import { NovoClienteForm } from "./_components/novo-cliente-form";

export const metadata: Metadata = {
  title: "Novo cliente",
};

export default function NovoClientePage() {
  return (
    <Page.Root>
      <Page.Header
        title="Novo cliente"
        description="Cadastre um novo cliente com nome e telefone."
        showBackButton
        backHref={APP_ROUTES.clientes.list}
      />
      <Page.Content>
        <NovoClienteForm />
      </Page.Content>
    </Page.Root>
  );
}
