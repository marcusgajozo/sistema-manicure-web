import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Page } from "@/common/components/page";
import { APP_ROUTES } from "@/common/lib/navigation/routes";
import { getAgendamentosUseCases } from "@/features/agendamentos/composition";
import { getClientesUseCases } from "@/features/clientes/composition";
import { getProcedimentosUseCases } from "@/features/procedimentos/composition";

import { EditarAgendamentoForm } from "../components/agendamento-form";
import { toAgendamentoFormViewModel } from "../view-models/agendamento.view-model";

export const metadata: Metadata = {
  title: "Editar agendamento",
};

type AgendamentoEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function AgendamentoEditPage({
  params,
}: AgendamentoEditPageProps) {
  const { id } = await params;

  let agendamento;
  try {
    agendamento = await getAgendamentosUseCases().get.execute(id);
  } catch {
    notFound();
  }

  const [{ items: clients }, { items: procedures }] = await Promise.all([
    getClientesUseCases().list.execute({ limit: 1000 }),
    getProcedimentosUseCases().list.execute({ limit: 1000 }),
  ]);

  const viewModel = toAgendamentoFormViewModel({
    agendamento: agendamento.toPlain(),
    clients,
    procedures,
  });

  return (
    <Page.Root>
      <Page.Header
        title="Editar agendamento"
        description="Atualize os dados do agendamento."
        showBackButton
        backHref={APP_ROUTES.agendamentos.list}
      />
      <Page.Content>
        <EditarAgendamentoForm
          agendamento={agendamento.toPlain()}
          clientOptions={viewModel.clientOptions}
          procedureOptions={viewModel.procedureOptions}
        />
      </Page.Content>
    </Page.Root>
  );
}
