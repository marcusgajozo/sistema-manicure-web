"use server";

import { redirect } from "next/navigation";
import { HttpTransportError } from "typed-route-client/core";

import { signInDtoSchema } from "@/common/services/api/authentication/schemas";
import { apiClient } from "@/common/services/api/server-client";

export type SignInActionState = {
  error?: string;
};

export async function signInAction(input: unknown): Promise<SignInActionState> {
  const body = signInDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/authentication/sign-in", {
      method: "post",
      body,
    });
  } catch (error) {
    if (error instanceof HttpTransportError && error.status === 401) {
      return { error: "E-mail ou senha inválidos." };
    }

    return { error: "Não foi possível entrar. Tente novamente." };
  }

  redirect("/");
}
