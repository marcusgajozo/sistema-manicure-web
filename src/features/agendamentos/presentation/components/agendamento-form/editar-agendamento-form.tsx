"use client";

import type { AgendamentoPlain } from "@/features/agendamentos";

import { updateAppointmentAction } from "../../actions/update-appointment";
import { AgendamentoForm } from "./agendamento-form";

type EditarAgendamentoFormProps = {
  agendamento: AgendamentoPlain;
  clientOptions: { value: string; label: string }[];
  procedureOptions: { value: string; label: string }[];
};

export function EditarAgendamentoForm({
  agendamento,
  clientOptions,
  procedureOptions,
}: EditarAgendamentoFormProps) {
  return (
    <AgendamentoForm
      submitLabel="Salvar"
      loadingText="Salvando..."
      defaultValues={{
        clientId: agendamento.clientId,
        clientName: agendamento.clientName ?? "",
        phoneClient: agendamento.phoneClient ?? "",
        procedureId: agendamento.procedureId,
        procedureName: agendamento.procedureName ?? "",
        procedurePrice: agendamento.procedurePrice,
        procedureFollowUpDays: agendamento.procedureFollowUpDays,
        startDate: agendamento.startDate ?? "",
        endDate: agendamento.endDate ?? "",
      }}
      clientOptions={clientOptions}
      procedureOptions={procedureOptions}
      onSubmit={async (values) =>
        updateAppointmentAction(agendamento.id, values)
      }
    />
  );
}
