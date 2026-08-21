"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { createTimeOffDtoSchema } from "@/common/services/api/time-offs/schemas";
import { getTimeOffsUseCases } from "@/features/time-offs/composition";

export async function createTimeOffAction(
  input: unknown,
): Promise<ActionResult> {
  const body = createTimeOffDtoSchema.parse(input);

  try {
    await getTimeOffsUseCases().create.execute({
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
