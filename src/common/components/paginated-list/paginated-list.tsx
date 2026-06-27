"use client";

import type { ReactNode } from "react";

import { PaginationControls } from "@/common/components/pagination-controls";
import { cn } from "@/common/lib/utils";
import type { PaginationMeta } from "@/common/services/api/shared/schemas/pagination-meta";

import { DataTableBody } from "../data-table/data-table-body";
import type { DataTableColumn } from "../data-table/data-table-types";
import { PaginatedListDefaultCard } from "./paginated-list-default-card";

type PaginatedListProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  meta: PaginationMeta;
  getPageHref: (page: number) => string;
  getRowKey?: (row: T, index: number) => string | number;
  renderCard?: (row: T) => ReactNode;
  emptyMessage?: string;
  className?: string;
};

export function PaginatedList<T>({
  columns,
  data,
  meta,
  getPageHref,
  getRowKey,
  renderCard,
  emptyMessage = "Nenhum registro encontrado.",
  className,
}: PaginatedListProps<T>) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="hidden md:block">
        <DataTableBody
          columns={columns}
          data={data}
          getRowKey={getRowKey}
          emptyMessage={emptyMessage}
        />
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {data.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        ) : (
          data.map((row, rowIndex) => (
            <div key={getRowKey?.(row, rowIndex) ?? rowIndex}>
              {renderCard ? (
                renderCard(row)
              ) : (
                <PaginatedListDefaultCard row={row} columns={columns} />
              )}
            </div>
          ))
        )}
      </div>

      <PaginationControls meta={meta} getPageHref={getPageHref} />
    </div>
  );
}
