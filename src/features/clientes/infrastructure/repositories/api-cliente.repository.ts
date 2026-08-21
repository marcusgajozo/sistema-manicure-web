import { apiClient } from "@/common/services/api/server-client";

import { ClienteEntity } from "../../domain/entities/cliente.entity";
import type {
  ClienteQuery,
  ClienteRepository,
  PaginatedClientes,
} from "../../domain/repositories/cliente.repository";

export class ApiClienteRepository implements ClienteRepository {
  async list(query?: ClienteQuery): Promise<PaginatedClientes> {
    const response = await apiClient.callRoute("/clients", {
      method: "get",
      queryParams: {
        page: query?.page,
        limit: query?.limit,
      },
    });

    const data = response.data ?? [];
    const meta = response.meta;

    return {
      items: data.map((item) => new ClienteEntity(item)),
      meta: {
        page: meta?.page ?? query?.page ?? 1,
        limit: meta?.limit ?? query?.limit ?? data.length,
        totalCount: meta?.totalCount ?? data.length,
        totalPages: meta?.totalPages ?? 1,
      },
    };
  }

  async getById(id: string): Promise<ClienteEntity> {
    const response = await apiClient.callRoute("/clients/:id", {
      method: "get",
      params: { id },
    });

    return new ClienteEntity(response.data);
  }

  async create(cliente: ClienteEntity): Promise<void> {
    await apiClient.callRoute("/clients", {
      method: "post",
      body: cliente.toCreateDto(),
    });
  }

  async update(id: string, cliente: ClienteEntity): Promise<void> {
    await apiClient.callRoute("/clients/:id", {
      method: "patch",
      params: { id },
      body: cliente.toUpdateDto(),
    });
  }

  async delete(id: string): Promise<void> {
    await apiClient.callRoute("/clients/:id", {
      method: "delete",
      params: { id },
    });
  }
}
