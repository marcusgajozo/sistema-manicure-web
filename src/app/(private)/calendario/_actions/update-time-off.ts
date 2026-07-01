"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { apiClient } from "@/common/services/api/server-client";
import { updateTimeOffDtoSchema } from "@/common/services/api/time-offs/schemas";

export async function updateTimeOffAction(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  const body = updateTimeOffDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/time-offs/:id", {
      method: "patch",
      params: { id },
      body,
    });
  } catch {
    return { ok: false };
  }

  revalidatePath("/calendario");
  return { ok: true };
}
