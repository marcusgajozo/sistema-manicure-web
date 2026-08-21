"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { createAppointmentDtoSchema } from "@/common/services/api/appointments/schemas";
import { getAgendamentosUseCases } from "@/features/agendamentos/composition";

export async function createAppointmentAction(
  input: unknown,
): Promise<ActionResult> {
  const body = createAppointmentDtoSchema.parse(input);

  try {
    await getAgendamentosUseCases().create.execute({
      clientId: body.clientId,
      clientName: body.clientName,
      phoneClient: body.phoneClient,
      procedureId: body.procedureId,
      procedureName: body.procedureName,
      procedurePrice: body.procedurePrice,
      procedureFollowUpDays: body.procedureFollowUpDays,
      startDate: body.startDate,
      endDate: body.endDate,
    });
  } catch {
    return { ok: false };
  }

  revalidatePath("/agendamentos");
  return { ok: true };
}
