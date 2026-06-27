"use server";

import { revalidatePath } from "next/cache";

import { APP_ROUTES } from "@/common/lib/navigation/routes";
import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { apiClient } from "@/common/services/api/server-client";

export async function deleteClientAction(id: string): Promise<ActionResult> {
  try {
    await apiClient.callRoute("/clients/:id", {
      method: "delete",
      params: { id },
    });
  } catch {
    return { ok: false };
  }

  revalidatePath(APP_ROUTES.clientes.list);

  return { ok: true };
}
