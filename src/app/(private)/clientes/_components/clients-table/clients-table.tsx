"use client";

import Link from "next/link";

import {
  type DataTableColumn,
  PaginatedList,
} from "@/common/components/paginated-list";
import { Button } from "@/common/components/shadcn-ui/button";
import { Client } from "@/common/services/api/clients/schemas";
import type { PaginationMeta } from "@/common/services/api/shared/schemas/pagination-meta";

export type ClientTableRow = Client & {
  createdAtLabel: string;
};

const columns: DataTableColumn<ClientTableRow>[] = [
  {
    id: "name",
    header: "Nome",
    cell: (client) => client.name,
  },
  {
    id: "phone",
    header: "Telefone",
    cell: (client) => client.phone,
  },
  {
    id: "createdAt",
    header: "Cadastro",
    cell: (client) => client.createdAtLabel,
  },
];

type ClientsTableProps = {
  data: ClientTableRow[];
  meta: PaginationMeta;
  limit: number;
};

function buildClientesPageHref(page: number, limit: number) {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  if (limit !== 10) {
    params.set("limit", String(limit));
  }

  const query = params.toString();

  return query ? `/clientes?${query}` : "/clientes";
}

export function ClientsTable({ data, meta, limit }: ClientsTableProps) {
  return (
    <PaginatedList
      columns={columns}
      data={data}
      meta={meta}
      getRowKey={(client) => client.id}
      getPageHref={(page) => buildClientesPageHref(page, limit)}
      emptyMessage="Nenhum cliente cadastrado."
    />
  );
}

export function ClientsTableActions() {
  return (
    <Button nativeButton={false} render={<Link href="/clientes/novo" />}>
      Novo cliente
    </Button>
  );
}
