"use client";

import Link from "next/link";

import {
  type DataTableColumn,
  PaginatedList,
} from "@/common/components/paginated-list";
import { Button } from "@/common/components/shadcn-ui/button";
import { APP_ROUTES } from "@/common/lib/navigation/routes";
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
};

export function ClientsTable({ data, meta }: ClientsTableProps) {
  return (
    <PaginatedList
      columns={columns}
      data={data}
      meta={meta}
      getRowKey={(client) => client.id}
      emptyMessage="Nenhum cliente cadastrado."
    />
  );
}

export function ClientsTableActions() {
  return (
    <Button
      nativeButton={false}
      render={<Link href={APP_ROUTES.clientes.create} />}
    >
      Novo cliente
    </Button>
  );
}
