"use server";

import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/common/lib/navigation/routes";
import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { createProcedureDtoSchema } from "@/common/services/api/procedures/schemas";
import { apiClient } from "@/common/services/api/server-client";

export async function createProcedureAction(
  input: unknown,
): Promise<ActionResult | void> {
  const body = createProcedureDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/procedures", {
      method: "post",
      body,
    });
  } catch {
    return { ok: false };
  }

  redirect(APP_ROUTES.procedimentos.list);
}
