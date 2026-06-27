"use server";

import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/common/lib/navigation/routes";
import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { updateClientDtoSchema } from "@/common/services/api/clients/schemas";
import { apiClient } from "@/common/services/api/server-client";

export async function updateClientAction(
  id: string,
  input: unknown,
): Promise<ActionResult | void> {
  const body = updateClientDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/clients/:id", {
      method: "patch",
      params: { id },
      body,
    });
  } catch {
    return { ok: false };
  }

  redirect(APP_ROUTES.clientes.list);
}
