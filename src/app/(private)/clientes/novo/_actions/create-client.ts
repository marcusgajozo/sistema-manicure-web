"use server";

import { redirect } from "next/navigation";
import { HttpTransportError } from "typed-route-client/core";

import { createClient } from "../../_lib/clients-queries";

export type CreateClientActionState = {
  error?: string;
};

export async function createClientAction(
  input: unknown,
): Promise<CreateClientActionState> {
  try {
    await createClient(input);
  } catch (error) {
    if (error instanceof HttpTransportError) {
      if (error.status === 401) {
        redirect("/entrar");
      }

      if (error.status === 400 || error.status === 409) {
        return {
          error: "Não foi possível cadastrar o cliente. Verifique os dados.",
        };
      }
    }

    return { error: "Não foi possível cadastrar o cliente. Tente novamente." };
  }

  redirect("/clientes");
}
