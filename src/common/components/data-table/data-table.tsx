"use client";

import { PaginationControls } from "@/common/components/pagination-controls";
import { cn } from "@/common/lib/utils";
import type { PaginationMeta } from "@/common/services/api/shared/schemas/pagination-meta";

import { DataTableBody } from "./data-table-body";
import type { DataTableColumn } from "./data-table-types";

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  meta: PaginationMeta;
  getPageHref: (page: number) => string;
  getRowKey?: (row: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  meta,
  getPageHref,
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
      <PaginationControls meta={meta} getPageHref={getPageHref} />
    </div>
  );
}
