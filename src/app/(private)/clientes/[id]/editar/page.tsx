import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HttpTransportError } from "typed-route-client/core";

import { Page } from "@/common/components/page";
import { APP_ROUTES } from "@/common/lib/navigation/routes";
import { apiClient } from "@/common/services/api/server-client";

import { EditarClienteForm } from "./_components/editar-cliente-form";

export const metadata: Metadata = {
  title: "Editar cliente",
};

type EditarClientePageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function loadClient(id: string) {
  try {
    return await apiClient.callRoute("/clients/:id", {
      method: "get",
      params: { id },
    });
  } catch (error) {
    if (error instanceof HttpTransportError && error.status === 404) {
      notFound();
    }

    notFound();
  }
}

export default async function EditarClientePage({
  params,
}: EditarClientePageProps) {
  const { id } = await params;
  const { data: client } = await loadClient(id);

  return (
    <Page.Root>
      <Page.Header
        title="Editar cliente"
        description="Atualize o nome e o telefone do cliente."
        showBackButton
        backHref={APP_ROUTES.clientes.list}
      />
      <Page.Content>
        <EditarClienteForm client={client} />
      </Page.Content>
    </Page.Root>
  );
}
