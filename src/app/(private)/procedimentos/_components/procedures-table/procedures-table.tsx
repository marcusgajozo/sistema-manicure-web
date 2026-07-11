"use client";

import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import {
  PaginatedList,
  PaginatedListDefaultCard,
} from "@/common/components/paginated-list";
import { Button } from "@/common/components/shadcn-ui/button";
import { APP_ROUTES } from "@/common/lib/navigation/routes";
import type { Procedure } from "@/common/services/api/procedures/schemas";
import type { PaginationMeta } from "@/common/services/api/shared/schemas/pagination-meta";

import { ProcedureRowActions } from "../procedure-row-actions";

export type ProcedureTableRow = Procedure & {
  priceLabel: string;
  durationLabel: string;
};

const dataColumns: ColumnDef<ProcedureTableRow>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "price",
    header: "Preço",
    cell: ({ row }) => row.original.priceLabel,
  },
  {
    id: "durationMinutes",
    header: "Duração",
    cell: ({ row }) => row.original.durationLabel,
  },
  {
    id: "returnDays",
    header: "Retorno",
    cell: ({ row }) => `${row.original.returnDays} dias`,
  },
];

const columns: ColumnDef<ProcedureTableRow>[] = [
  ...dataColumns,
  {
    id: "actions",
    header: "Ações",
    meta: {
      className: "w-[1%] text-right",
    },
    cell: ({ row }) => <ProcedureRowActions procedure={row.original} />,
  },
];

type ProceduresTableProps = {
  data: ProcedureTableRow[];
  meta: PaginationMeta;
};

export function ProceduresTable({ data, meta }: ProceduresTableProps) {
  return (
    <PaginatedList
      columns={columns}
      data={data}
      meta={meta}
      emptyMessage="Nenhum procedimento cadastrado."
      renderCard={(row) => (
        <div className="flex flex-col gap-3">
          <PaginatedListDefaultCard row={row} />
          <ProcedureRowActions procedure={row.original} />
        </div>
      )}
    />
  );
}

export function ProceduresTableActions() {
  return (
    <Button
      nativeButton={false}
      render={<Link href={APP_ROUTES.procedimentos.create} />}
    >
      Novo procedimento
    </Button>
  );
}
