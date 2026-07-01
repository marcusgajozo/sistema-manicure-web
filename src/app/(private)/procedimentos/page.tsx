import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import { apiClient } from "@/common/services/api/server-client";

import {
  ProceduresTable,
  ProceduresTableActions,
} from "./_components/procedures-table";

export const metadata: Metadata = {
  title: "Procedimentos",
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const emptyMeta = {
  page: 1,
  limit: 10,
  totalCount: 0,
  totalPages: 0,
};

type ProcedimentosPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

export default async function ProcedimentosPage({
  searchParams,
}: ProcedimentosPageProps) {
  const params = await searchParams;
  const page = parsePositiveInt(params.page, 1);
  const limit = parsePositiveInt(params.limit, 10);

  let response = null;

  try {
    response = await apiClient.callRoute("/procedures", {
      method: "get",
      queryParams: { page, limit },
    });
  } catch {
    response = null;
  }

  const data = response?.data ?? [];
  const meta = response?.meta ?? { ...emptyMeta, page, limit };
  const rows = data.map((procedure) => ({
    ...procedure,
    priceLabel: currencyFormatter.format(procedure.price),
    durationLabel: `${procedure.durationMinutes} min`,
  }));

  return (
    <Page.Root>
      <Page.Header
        title="Procedimentos"
        description="Gerencie os procedimentos do salão."
      >
        <ProceduresTableActions />
      </Page.Header>
      <Page.Content>
        <ProceduresTable data={rows} meta={meta} />
      </Page.Content>
    </Page.Root>
  );
}
