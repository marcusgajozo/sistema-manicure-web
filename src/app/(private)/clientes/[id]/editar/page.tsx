import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HttpTransportError } from "typed-route-client/core";

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

  return <EditarClienteForm client={client} />;
}
