"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { createAppointmentDtoSchema } from "@/common/services/api/appointments/schemas";
import { apiClient } from "@/common/services/api/server-client";

export async function createAppointmentAction(
  input: unknown,
): Promise<ActionResult> {
  const body = createAppointmentDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/appointments", {
      method: "post",
      body,
    });
  } catch {
    return { ok: false };
  }

  revalidatePath("/calendario");
  return { ok: true };
}
