import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/shadcn-ui/card";

import type { DataTableColumn } from "../data-table/data-table-types";

type PaginatedListDefaultCardProps<T> = {
  row: T;
  columns: DataTableColumn<T>[];
};

export function PaginatedListDefaultCard<T>({
  row,
  columns,
}: PaginatedListDefaultCardProps<T>) {
  const [titleColumn, ...fieldColumns] = columns;

  if (!titleColumn) {
    return null;
  }

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{titleColumn.cell(row)}</CardTitle>
      </CardHeader>
      {fieldColumns.length > 0 ? (
        <CardContent className="flex flex-col gap-2">
          {fieldColumns.map((column) => (
            <div
              key={column.id}
              className="flex items-start justify-between gap-4"
            >
              <span className="shrink-0 text-muted-foreground">
                {column.header}
              </span>
              <span className="text-right">{column.cell(row)}</span>
            </div>
          ))}
        </CardContent>
      ) : null}
    </Card>
  );
}
