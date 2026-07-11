import { flexRender, type Row } from "@tanstack/react-table";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/shadcn-ui/card";

type PaginatedListDefaultCardProps<TData> = {
  row: Row<TData>;
};

export function PaginatedListDefaultCard<TData>({
  row,
}: PaginatedListDefaultCardProps<TData>) {
  const visibleCells = row.getVisibleCells();
  const [titleCell, ...fieldCells] = visibleCells;

  if (!titleCell) {
    return null;
  }

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>
          {flexRender(titleCell.column.columnDef.cell, titleCell.getContext())}
        </CardTitle>
      </CardHeader>
      {fieldCells.length > 0 ? (
        <CardContent className="flex flex-col gap-2">
          {fieldCells.map((cell) => {
            const headerContent = cell.column.columnDef.header;
            const headerString =
              typeof headerContent === "string"
                ? headerContent
                : cell.column.id;

            return (
              <div
                key={cell.id}
                className="flex items-start justify-between gap-4"
              >
                <span className="shrink-0 text-muted-foreground">
                  {headerString}
                </span>
                <span className="text-right">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              </div>
            );
          })}
        </CardContent>
      ) : null}
    </Card>
  );
}
