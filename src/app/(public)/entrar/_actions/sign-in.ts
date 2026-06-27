"use server";

import { redirect } from "next/navigation";
import { HttpTransportError } from "typed-route-client/core";

import { APP_ROUTES } from "@/common/lib/navigation/routes";
import { signInDtoSchema } from "@/common/services/api/authentication/schemas";
import { apiClient } from "@/common/services/api/server-client";
import { readHttpErrorMessage } from "@/common/services/api/server-transport";

export type SignInActionState = {
  error?: string;
};

export async function signInAction(input: unknown): Promise<SignInActionState> {
  const body = signInDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/authentication/sign-in", {
      method: "post",
      body,
      context: { showToast: false, skipAuthRedirect: true },
    });
  } catch (error) {
    if (error instanceof HttpTransportError && error.status === 401) {
      return { error: "E-mail ou senha inválidos." };
    }

    return {
      error: readHttpErrorMessage(
        error,
        "Não foi possível entrar. Tente novamente.",
      ),
    };
  }

  redirect(APP_ROUTES.dashboard);
}
