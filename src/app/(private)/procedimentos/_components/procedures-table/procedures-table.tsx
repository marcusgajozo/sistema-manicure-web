"use client";

import Link from "next/link";

import {
  type DataTableColumn,
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

const dataColumns: DataTableColumn<ProcedureTableRow>[] = [
  {
    id: "name",
    header: "Nome",
    cell: (procedure) => procedure.name,
  },
  {
    id: "price",
    header: "Preço",
    cell: (procedure) => procedure.priceLabel,
  },
  {
    id: "durationMinutes",
    header: "Duração",
    cell: (procedure) => procedure.durationLabel,
  },
  {
    id: "returnDays",
    header: "Retorno",
    cell: (procedure) => `${procedure.returnDays} dias`,
  },
];

const columns: DataTableColumn<ProcedureTableRow>[] = [
  ...dataColumns,
  {
    id: "actions",
    header: "Ações",
    className: "w-[1%] text-right",
    cell: (procedure) => <ProcedureRowActions procedure={procedure} />,
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
      getRowKey={(procedure) => procedure.id}
      emptyMessage="Nenhum procedimento cadastrado."
      renderCard={(procedure) => (
        <div className="flex flex-col gap-3">
          <PaginatedListDefaultCard row={procedure} columns={dataColumns} />
          <ProcedureRowActions procedure={procedure} />
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
