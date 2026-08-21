"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { updateAppointmentDtoSchema } from "@/common/services/api/appointments/schemas";
import { getAgendamentosUseCases } from "@/features/agendamentos/composition";

export async function updateAppointmentAction(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  const body = updateAppointmentDtoSchema.parse(input);

  try {
    await getAgendamentosUseCases().update.execute(id, {
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

  revalidatePath("/calendario");
  return { ok: true };
}
