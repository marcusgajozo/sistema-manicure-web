"use client";

import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import {
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

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "createdAt",
    header: "Cadastro",
  },
  {
    id: "actions",
    header: "Ações",
    meta: {
      className: "w-[1%] text-right",
    },
    cell: ({ row }) => <ClientRowActions client={row.original} />,
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
      emptyMessage="Nenhum cliente cadastrado."
      renderCard={(row) => (
        <div className="flex flex-col gap-3">
          <PaginatedListDefaultCard row={row} />
          <ClientRowActions client={row.original} />
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
