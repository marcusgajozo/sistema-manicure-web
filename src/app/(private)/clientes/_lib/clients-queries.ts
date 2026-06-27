import "server-only";

import { redirect } from "next/navigation";
import { HttpTransportError } from "typed-route-client/core";

import { APP_ROUTES } from "@/common/lib/navigation/routes";
import { createClientDtoSchema } from "@/common/services/api/clients/schemas";
import { apiClient } from "@/common/services/api/server-client";

type ListClientsParams = {
  page?: number;
  limit?: number;
};

function handleUnauthorized(error: unknown) {
  if (error instanceof HttpTransportError && error.status === 401) {
    redirect(APP_ROUTES.login);
  }
}

export async function listClients(params: ListClientsParams = {}) {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  try {
    return await apiClient.callRoute("/clients", {
      method: "get",
      queryParams: { page, limit },
    });
  } catch (error) {
    handleUnauthorized(error);
    throw error;
  }
}

export async function createClient(input: unknown): Promise<void> {
  const body = createClientDtoSchema.parse(input);

  try {
    await apiClient.callRoute("/clients", {
      method: "post",
      body,
    });
  } catch (error) {
    handleUnauthorized(error);
    throw error;
  }
}
