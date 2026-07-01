"use server";

import { revalidatePath } from "next/cache";

import { APP_ROUTES } from "@/common/lib/navigation/routes";
import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { apiClient } from "@/common/services/api/server-client";

export async function deleteProcedureAction(id: string): Promise<ActionResult> {
  try {
    await apiClient.callRoute("/procedures/:id", {
      method: "delete",
      params: { id },
    });
  } catch {
    return { ok: false };
  }

  revalidatePath(APP_ROUTES.procedimentos.list);

  return { ok: true };
}
