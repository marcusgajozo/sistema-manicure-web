"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { apiClient } from "@/common/services/api/server-client";
import { createTimeOffDtoSchema } from "@/common/services/api/time-offs/schemas";

export async function createTimeOffAction(
  input: unknown,
): Promise<ActionResult> {
  const body = createTimeOffDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/time-offs", {
      method: "post",
      body,
    });
  } catch {
    return { ok: false };
  }

  revalidatePath("/calendario");
  return { ok: true };
}
