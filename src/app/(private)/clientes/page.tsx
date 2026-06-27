import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/common/components/shadcn-ui/card";
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
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-heading text-base leading-snug font-medium">
            Clientes
          </h1>
          <CardDescription>Gerencie os clientes do salão.</CardDescription>
        </div>
        <ClientsTableActions />
      </CardHeader>
      <CardContent>
        <ClientsTable data={rows} meta={meta} />
      </CardContent>
    </Card>
  );
}
