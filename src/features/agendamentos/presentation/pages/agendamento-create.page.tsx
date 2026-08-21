import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import { APP_ROUTES } from "@/common/lib/navigation/routes";
import { getClientesUseCases } from "@/features/clientes/composition";
import { getProcedimentosUseCases } from "@/features/procedimentos/composition";

import { NovoAgendamentoForm } from "../components/agendamento-form";
import { toAgendamentoFormViewModel } from "../view-models/agendamento.view-model";

export const metadata: Metadata = {
  title: "Novo agendamento",
};

export async function AgendamentoCreatePage() {
  const [{ items: clients }, { items: procedures }] = await Promise.all([
    getClientesUseCases().list.execute({ limit: 1000 }),
    getProcedimentosUseCases().list.execute({ limit: 1000 }),
  ]);

  const viewModel = toAgendamentoFormViewModel({ clients, procedures });

  return (
    <Page.Root>
      <Page.Header
        title="Novo agendamento"
        description="Cadastre um novo agendamento."
        showBackButton
        backHref={APP_ROUTES.agendamentos.list}
      />
      <Page.Content>
        <NovoAgendamentoForm
          clientOptions={viewModel.clientOptions}
          procedureOptions={viewModel.procedureOptions}
        />
      </Page.Content>
    </Page.Root>
  );
}
