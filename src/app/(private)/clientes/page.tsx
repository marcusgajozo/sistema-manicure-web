import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import { apiClient } from "@/common/services/api/server-client";

import { ClientsTable, ClientsTableActions } from "./_components/clients-table";

export const metadata: Metadata = {
  title: "Clientes",
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const emptyMeta = {
  page: 1,
  limit: 10,
  totalCount: 0,
  totalPages: 0,
};

type ClientesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

export default async function ClientesPage({
  searchParams,
}: ClientesPageProps) {
  const params = await searchParams;
  const page = parsePositiveInt(params.page, 1);
  const limit = parsePositiveInt(params.limit, 10);

  let response = null;
  // TODO: verificar por que o respose está any
  try {
    response = await apiClient.callRoute("/clients", {
      method: "get",
      queryParams: { page, limit },
    });
  } catch {
    response = null;
  }

  const data = response?.data ?? [];
  const meta = response?.meta ?? { ...emptyMeta, page, limit };
  const rows = data.map((client) => ({
    ...client,
    createdAtLabel: dateFormatter.format(new Date(client.createdAt)),
  }));

  return (
    <Page.Root>
      <Page.Header
        title="Clientes"
        description="Gerencie os clientes do salão."
      >
        <ClientsTableActions />
      </Page.Header>
      <Page.Content>
        <ClientsTable data={rows} meta={meta} />
      </Page.Content>
    </Page.Root>
  );
}
