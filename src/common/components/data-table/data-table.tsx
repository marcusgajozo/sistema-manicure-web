"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Suspense } from "react";

import { PaginationControls } from "@/common/components/pagination-controls";
import { cn } from "@/common/lib/utils";
import type { PaginationMeta } from "@/common/services/api/shared/schemas/pagination-meta";

import { DataTableBody } from "./data-table-body";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: PaginationMeta;
  emptyMessage?: string;
  className?: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  emptyMessage = "Nenhum registro encontrado.",
  className,
}: DataTableProps<TData, TValue>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <DataTableBody
        table={table}
        columnsCount={columns.length}
        emptyMessage={emptyMessage}
      />
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
