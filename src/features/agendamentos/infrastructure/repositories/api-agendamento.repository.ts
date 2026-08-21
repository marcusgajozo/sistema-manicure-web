import { z } from "zod";

import {
  createAppointmentDtoSchema,
  updateAppointmentDtoSchema,
} from "@/common/services/api/appointments/schemas";
import { apiClient } from "@/common/services/api/server-client";

import { AgendamentoEntity } from "../../domain/entities/agendamento.entity";
import type {
  AgendamentoQuery,
  AgendamentoRepository,
  PaginatedAgendamentos,
} from "../../domain/repositories/agendamento.repository";

export class ApiAgendamentoRepository implements AgendamentoRepository {
  async list(query?: AgendamentoQuery): Promise<PaginatedAgendamentos> {
    const response = await apiClient.callRoute("/appointments", {
      method: "get",
      queryParams: {
        page: query?.page,
        limit: query?.limit,
      },
    });

    const data = response.data ?? [];
    const meta = response.meta;

    return {
      items: data.map((item) => new AgendamentoEntity(item)),
      meta: {
        page: meta?.page ?? query?.page ?? 1,
        limit: meta?.limit ?? query?.limit ?? data.length,
        totalCount: meta?.totalCount ?? data.length,
        totalPages: meta?.totalPages ?? 1,
      },
    };
  }

  async getById(id: string): Promise<AgendamentoEntity> {
    const appointment = await apiClient.callRoute("/appointments/:id", {
      method: "get",
      params: { id },
    });

    return new AgendamentoEntity(appointment);
  }

  async create(agendamento: AgendamentoEntity): Promise<void> {
    await apiClient.callRoute("/appointments", {
      method: "post",
      body: agendamento.toCreateDto() as z.infer<
        typeof createAppointmentDtoSchema
      >,
    });
  }

  async update(id: string, agendamento: AgendamentoEntity): Promise<void> {
    await apiClient.callRoute("/appointments/:id", {
      method: "patch",
      params: { id },
      body: agendamento.toUpdateDto() as z.infer<
        typeof updateAppointmentDtoSchema
      >,
    });
  }

  async delete(id: string): Promise<void> {
    await apiClient.callRoute("/appointments/:id", {
      method: "delete",
      params: { id },
    });
  }
}
