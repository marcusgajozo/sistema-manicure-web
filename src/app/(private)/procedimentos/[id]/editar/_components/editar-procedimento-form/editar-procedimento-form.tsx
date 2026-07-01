"use client";

import { updateProcedureAction } from "@/app/(private)/procedimentos/_actions/update-procedure";
import { ProcedureForm } from "@/app/(private)/procedimentos/_components/procedure-form";
import type { Procedure } from "@/common/services/api/procedures/schemas";

type EditarProcedimentoFormProps = {
  procedure: Procedure;
};

export function EditarProcedimentoForm({
  procedure,
}: EditarProcedimentoFormProps) {
  return (
    <ProcedureForm
      submitLabel="Salvar alterações"
      loadingText="Salvando..."
      defaultValues={{
        name: procedure.name,
        description: procedure.description ?? "",
        price: procedure.price,
        durationMinutes: procedure.durationMinutes,
        returnDays: procedure.returnDays,
      }}
      onSubmit={(values) => updateProcedureAction(procedure.id, values)}
    />
  );
}
