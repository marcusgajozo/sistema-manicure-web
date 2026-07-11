"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  type Row,
  useReactTable,
} from "@tanstack/react-table";
import { type ReactNode, Suspense } from "react";

import { PaginationControls } from "@/common/components/pagination-controls";
import { cn } from "@/common/lib/utils";
import type { PaginationMeta } from "@/common/services/api/shared/schemas/pagination-meta";

import { DataTableBody } from "../data-table/data-table-body";
import { PaginatedListDefaultCard } from "./paginated-list-default-card";

type PaginatedListProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: PaginationMeta;
  renderCard?: (row: Row<TData>) => ReactNode;
  emptyMessage?: string;
  className?: string;
};

export function PaginatedList<TData, TValue>({
  columns,
  data,
  meta,
  renderCard,
  emptyMessage = "Nenhum registro encontrado.",
  className,
}: PaginatedListProps<TData, TValue>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="hidden md:block">
        <DataTableBody
          table={table}
          columnsCount={columns.length}
          emptyMessage={emptyMessage}
        />
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        ) : (
          rows.map((row) => (
            <div key={row.id}>
              {renderCard ? (
                renderCard(row)
              ) : (
                <PaginatedListDefaultCard row={row} />
              )}
            </div>
          ))
        )}
      </div>

      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">
            {meta.totalCount === 0
              ? "Nenhum registro"
              : `${meta.totalCount} registro${meta.totalCount === 1 ? "" : "s"}`}
          </p>
        }
      >
        <PaginationControls meta={meta} />
      </Suspense>
    </div>
  );
}
