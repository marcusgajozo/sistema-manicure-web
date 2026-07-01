"use server";

import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/common/lib/navigation/routes";
import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { updateProcedureDtoSchema } from "@/common/services/api/procedures/schemas";
import { apiClient } from "@/common/services/api/server-client";

export async function updateProcedureAction(
  id: string,
  input: unknown,
): Promise<ActionResult | void> {
  const body = updateProcedureDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/procedures/:id", {
      method: "patch",
      params: { id },
      body,
    });
  } catch {
    return { ok: false };
  }

  redirect(APP_ROUTES.procedimentos.list);
}
