"use client";

import Link from "next/link";

import {
  type DataTableColumn,
  PaginatedList,
  PaginatedListDefaultCard,
} from "@/common/components/paginated-list";
import { Button } from "@/common/components/shadcn-ui/button";
import { APP_ROUTES } from "@/common/lib/navigation/routes";
import type { Client } from "@/common/services/api/clients/schemas";
import type { PaginationMeta } from "@/common/services/api/shared/schemas/pagination-meta";

import { ClientRowActions } from "../client-row-actions";

export type ClientTableRow = Client & {
  createdAtLabel: string;
};

const dataColumns: DataTableColumn<ClientTableRow>[] = [
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

const columns: DataTableColumn<ClientTableRow>[] = [
  ...dataColumns,
  {
    id: "actions",
    header: "Ações",
    className: "w-[1%] text-right",
    cell: (client) => <ClientRowActions client={client} />,
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
      renderCard={(client) => (
        <div className="flex flex-col gap-3">
          <PaginatedListDefaultCard row={client} columns={dataColumns} />
          <ClientRowActions client={client} />
        </div>
      )}
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
