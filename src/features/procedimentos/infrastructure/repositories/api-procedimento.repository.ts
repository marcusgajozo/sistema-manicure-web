import { apiClient } from "@/common/services/api/server-client";

import { ProcedimentoEntity } from "../../domain/entities/procedimento.entity";
import type {
  PaginatedProcedimentos,
  ProcedimentoQuery,
  ProcedimentoRepository,
} from "../../domain/repositories/procedimento.repository";

export class ApiProcedimentoRepository implements ProcedimentoRepository {
  async list(query?: ProcedimentoQuery): Promise<PaginatedProcedimentos> {
    const response = await apiClient.callRoute("/procedures", {
      method: "get",
      queryParams: {
        page: query?.page,
        limit: query?.limit,
      },
    });

    const data = response.data ?? [];
    const meta = response.meta;

    return {
      items: data.map((item) => new ProcedimentoEntity(item)),
      meta: {
        page: meta?.page ?? query?.page ?? 1,
        limit: meta?.limit ?? query?.limit ?? data.length,
        totalCount: meta?.totalCount ?? data.length,
        totalPages: meta?.totalPages ?? 1,
      },
    };
  }

  async getById(id: string): Promise<ProcedimentoEntity> {
    const response = await apiClient.callRoute("/procedures/:id", {
      method: "get",
      params: { id },
    });

    return new ProcedimentoEntity(response.data);
  }

  async create(procedimento: ProcedimentoEntity): Promise<void> {
    await apiClient.callRoute("/procedures", {
      method: "post",
      body: procedimento.toCreateDto(),
    });
  }

  async update(id: string, procedimento: ProcedimentoEntity): Promise<void> {
    await apiClient.callRoute("/procedures/:id", {
      method: "patch",
      params: { id },
      body: procedimento.toUpdateDto(),
    });
  }

  async delete(id: string): Promise<void> {
    await apiClient.callRoute("/procedures/:id", {
      method: "delete",
      params: { id },
    });
  }
}
