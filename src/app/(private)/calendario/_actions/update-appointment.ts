"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { updateAppointmentDtoSchema } from "@/common/services/api/appointments/schemas";
import { apiClient } from "@/common/services/api/server-client";

export async function updateAppointmentAction(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  const body = updateAppointmentDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/appointments/:id", {
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
