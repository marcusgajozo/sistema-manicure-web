import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/common/components/shadcn-ui/card";

import { ClientsTable, ClientsTableActions } from "./_components/clients-table";
import { listClients } from "./_lib/clients-queries";

export const metadata: Metadata = {
  title: "Clientes",
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

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

  const { data, meta } = await listClients({ page, limit });
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
