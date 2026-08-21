import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import { getAgendamentosUseCases } from "@/features/agendamentos/composition";

import {
  AgendamentosTable,
  AgendamentosTableActions,
} from "../components/agendamentos-table";
import { toAgendamentoListViewModel } from "../view-models/agendamento.view-model";

export const metadata: Metadata = {
  title: "Agendamentos",
};

type AgendamentosListPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export async function AgendamentosListPage({
  searchParams,
}: AgendamentosListPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;

  const paginated = await getAgendamentosUseCases().list.execute({
    page,
    limit,
  });

  const viewModel = toAgendamentoListViewModel(paginated);

  return (
    <Page.Root>
      <Page.Header
        title="Agendamentos"
        description="Gerencie os agendamentos do salão."
      >
        <AgendamentosTableActions />
      </Page.Header>
      <Page.Content>
        <AgendamentosTable data={viewModel.items} meta={viewModel.meta} />
      </Page.Content>
    </Page.Root>
  );
}
