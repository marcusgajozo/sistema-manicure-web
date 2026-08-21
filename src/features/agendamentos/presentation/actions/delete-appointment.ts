"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { getAgendamentosUseCases } from "@/features/agendamentos/composition";

export async function deleteAppointmentAction(
  id: string,
): Promise<ActionResult> {
  try {
    await getAgendamentosUseCases().delete.execute(id);
  } catch {
    return { ok: false };
  }

  revalidatePath("/agendamentos");
  return { ok: true };
}
