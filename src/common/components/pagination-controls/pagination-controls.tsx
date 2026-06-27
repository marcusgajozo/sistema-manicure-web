"use client";

import { usePathname, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/common/components/shadcn-ui/pagination";
import { cn } from "@/common/lib/utils";
import type { PaginationMeta } from "@/common/services/api/shared/schemas/pagination-meta";

import { buildPaginatedPath } from "./build-paginated-path";
import { getPaginationRange } from "./get-pagination-range";

type PaginationControlsProps = {
  meta: PaginationMeta;
  className?: string;
};

export function PaginationControls({
  meta,
  className,
}: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { page, limit, totalPages, totalCount } = meta;
  const paginationRange = getPaginationRange(page, totalPages);
  const showPagination = totalPages > 1;

  function getPageHref(targetPage: number) {
    return buildPaginatedPath({
      pathname,
      searchParams: new URLSearchParams(searchParams.toString()),
      page: targetPage,
      limit,
    });
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">
        {totalCount === 0
          ? "Nenhum registro"
          : `${totalCount} registro${totalCount === 1 ? "" : "s"}`}
      </p>

      {showPagination ? (
        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={getPageHref(Math.max(1, page - 1))}
                aria-disabled={page <= 1}
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                text="Anterior"
              />
            </PaginationItem>

            {paginationRange.map((item, index) =>
              item === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    href={getPageHref(item)}
                    isActive={item === page}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                href={getPageHref(Math.min(totalPages, page + 1))}
                aria-disabled={page >= totalPages}
                className={
                  page >= totalPages ? "pointer-events-none opacity-50" : ""
                }
                text="Próxima"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
}
