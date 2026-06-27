"use server";

import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/common/lib/navigation/routes";
import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { createClientDtoSchema } from "@/common/services/api/clients/schemas";
import { apiClient } from "@/common/services/api/server-client";

export async function createClientAction(
  input: unknown,
): Promise<ActionResult | void> {
  const body = createClientDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/clients", {
      method: "post",
      body,
    });
  } catch {
    return { ok: false };
  }

  redirect(APP_ROUTES.clientes.list);
}
