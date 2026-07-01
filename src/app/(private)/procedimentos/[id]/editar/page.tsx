import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HttpTransportError } from "typed-route-client/core";

import { Page } from "@/common/components/page";
import { APP_ROUTES } from "@/common/lib/navigation/routes";
import { apiClient } from "@/common/services/api/server-client";

import { EditarProcedimentoForm } from "./_components/editar-procedimento-form";

export const metadata: Metadata = {
  title: "Editar procedimento",
};

type EditarProcedimentoPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function loadProcedure(id: string) {
  try {
    return await apiClient.callRoute("/procedures/:id", {
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

export default async function EditarProcedimentoPage({
  params,
}: EditarProcedimentoPageProps) {
  const { id } = await params;
  const { data: procedure } = await loadProcedure(id);

  return (
    <Page.Root>
      <Page.Header
        title="Editar procedimento"
        description="Atualize os dados do procedimento."
        showBackButton
        backHref={APP_ROUTES.procedimentos.list}
      />
      <Page.Content>
        <EditarProcedimentoForm procedure={procedure} />
      </Page.Content>
    </Page.Root>
  );
}
