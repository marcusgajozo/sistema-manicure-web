"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { apiClient } from "@/common/services/api/server-client";

export async function deleteAppointmentAction(
  id: string,
): Promise<ActionResult> {
  try {
    await apiClient.callRoute("/appointments/:id", {
      method: "delete",
      params: { id },
    });
  } catch {
    return { ok: false };
  }

  revalidatePath("/calendario");
  return { ok: true };
}
