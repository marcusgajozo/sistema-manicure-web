import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import { apiClient } from "@/common/services/api/server-client";

import { ClientsTable, ClientsTableActions } from "./_components/clients-table";

export const metadata: Metadata = {
  title: "Clientes",
};

type ClientesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function ClientesPage({
  searchParams,
}: ClientesPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;

  const response = await apiClient.callRoute("/clients", {
    method: "get",
    queryParams: { page, limit },
  });

  // TODO: criar uma page 404
  // TODO: criar um skeleton para carregamento de pages no sistema

  const data = response.data ?? [];
  const meta = response.meta;

  return (
    <Page.Root>
      <Page.Header
        title="Clientes"
        description="Gerencie os clientes do salão."
      >
        <ClientsTableActions />
      </Page.Header>
      <Page.Content>
        <ClientsTable data={data} meta={meta} />
      </Page.Content>
    </Page.Root>
  );
}
