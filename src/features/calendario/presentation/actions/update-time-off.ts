"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { updateTimeOffDtoSchema } from "@/common/services/api/time-offs/schemas";
import { getTimeOffsUseCases } from "@/features/time-offs/composition";

export async function updateTimeOffAction(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  const body = updateTimeOffDtoSchema.parse(input);

  try {
    await getTimeOffsUseCases().update.execute(id, {
      reason: body.reason,
      startDate: body.startDate,
      endDate: body.endDate,
    });
  } catch {
    return { ok: false };
  }

  revalidatePath("/calendario");
  return { ok: true };
}
