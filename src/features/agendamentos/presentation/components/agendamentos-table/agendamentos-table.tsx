"use client";

import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import {
  PaginatedList,
  PaginatedListDefaultCard,
} from "@/common/components/paginated-list";
import { Button } from "@/common/components/shadcn-ui/button";
import { APP_ROUTES } from "@/common/lib/navigation/routes";

import type { AgendamentoListViewModel } from "../../view-models/agendamento.view-model";
import { AgendamentoRowActions } from "./agendamento-row-actions";

const columns: ColumnDef<AgendamentoListViewModel["items"][number]>[] = [
  {
    accessorKey: "clientName",
    header: "Cliente",
  },
  {
    accessorKey: "procedureName",
    header: "Serviço",
  },
  {
    accessorKey: "startDate",
    header: "Início",
    cell: ({ row }) => row.original.startDateFormatted,
  },
  {
    accessorKey: "endDate",
    header: "Fim",
    cell: ({ row }) => row.original.endDateFormatted,
  },
  {
    id: "actions",
    header: "Ações",
    meta: {
      className: "w-[1%] text-right",
    },
    cell: ({ row }) => <AgendamentoRowActions agendamento={row.original} />,
  },
];

type AgendamentosTableProps = {
  data: AgendamentoListViewModel["items"];
  meta: AgendamentoListViewModel["meta"];
};

export function AgendamentosTable({ data, meta }: AgendamentosTableProps) {
  return (
    <PaginatedList
      columns={columns}
      data={data}
      meta={meta}
      emptyMessage="Nenhum agendamento encontrado."
      renderCard={(row) => (
        <div className="flex flex-col gap-3">
          <PaginatedListDefaultCard row={row} />
          <AgendamentoRowActions agendamento={row.original} />
        </div>
      )}
    />
  );
}

export function AgendamentosTableActions() {
  return (
    <Button
      nativeButton={false}
      render={<Link href={APP_ROUTES.agendamentos.create} />}
    >
      Novo agendamento
    </Button>
  );
}
