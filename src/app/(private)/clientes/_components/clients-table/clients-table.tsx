"use client";

import Link from "next/link";

import {
  type DataTableColumn,
  PaginatedList,
  PaginatedListDefaultCard,
} from "@/common/components/paginated-list";
import { Button } from "@/common/components/shadcn-ui/button";
import { APP_ROUTES } from "@/common/lib/navigation/routes";
import type {
  Client,
  GetClientsPaginatedResponse,
} from "@/common/services/api/clients/schemas";

import { ClientRowActions } from "./client-row-actions";

const columns: DataTableColumn<Client>[] = [
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
    cell: (client) => client.createdAt,
  },
  {
    id: "actions",
    header: "Ações",
    className: "w-[1%] text-right",
    cell: (client) => <ClientRowActions client={client} />,
  },
];

type ClientsTableProps = {
  data: GetClientsPaginatedResponse["data"];
  meta: GetClientsPaginatedResponse["meta"];
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
          <PaginatedListDefaultCard row={client} columns={columns} />
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
