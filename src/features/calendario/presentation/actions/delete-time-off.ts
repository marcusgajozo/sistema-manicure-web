"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { getTimeOffsUseCases } from "@/features/time-offs/composition";

export async function deleteTimeOffAction(id: string): Promise<ActionResult> {
  try {
    await getTimeOffsUseCases().delete.execute(id);
  } catch {
    return { ok: false };
  }

  revalidatePath("/calendario");
  return { ok: true };
}
