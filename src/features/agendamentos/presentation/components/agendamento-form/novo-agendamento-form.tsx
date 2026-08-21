"use client";

import { createAppointmentAction } from "../../actions/create-appointment";
import { AgendamentoForm } from "./agendamento-form";

type NovoAgendamentoFormProps = {
  clientOptions: { value: string; label: string }[];
  procedureOptions: { value: string; label: string }[];
};

export function NovoAgendamentoForm({
  clientOptions,
  procedureOptions,
}: NovoAgendamentoFormProps) {
  return (
    <AgendamentoForm
      submitLabel="Criar"
      loadingText="Criando..."
      defaultValues={{}}
      clientOptions={clientOptions}
      procedureOptions={procedureOptions}
      onSubmit={async (values) => createAppointmentAction(values)}
    />
  );
}
