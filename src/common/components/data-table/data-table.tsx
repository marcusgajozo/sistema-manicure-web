"use client";

import { Suspense } from "react";

import { PaginationControls } from "@/common/components/pagination-controls";
import { cn } from "@/common/lib/utils";
import type { PaginationMeta } from "@/common/services/api/shared/schemas/pagination-meta";

import { DataTableBody } from "./data-table-body";
import type { DataTableColumn } from "./data-table-types";

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  meta: PaginationMeta;
  getRowKey?: (row: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  meta,
  getRowKey,
  emptyMessage = "Nenhum registro encontrado.",
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <DataTableBody
        columns={columns}
        data={data}
        getRowKey={getRowKey}
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
