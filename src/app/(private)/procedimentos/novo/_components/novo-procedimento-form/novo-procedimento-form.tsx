"use client";

import { createProcedureAction } from "@/app/(private)/procedimentos/_actions/create-procedure";
import { ProcedureForm } from "@/app/(private)/procedimentos/_components/procedure-form";

export function NovoProcedimentoForm() {
  return (
    <ProcedureForm
      submitLabel="Salvar procedimento"
      loadingText="Salvando..."
      defaultValues={{
        name: "",
        description: "",
        price: 0,
        durationMinutes: 60,
        returnDays: 30,
      }}
      onSubmit={createProcedureAction}
    />
  );
}
