import { apiClient } from "@/common/services/api/server-client";

import type { TimeOffProps } from "../../domain/entities/time-off.entity";
import { TimeOffEntity } from "../../domain/entities/time-off.entity";
import type {
  PaginatedTimeOffs,
  TimeOffQuery,
  TimeOffRepository,
} from "../../domain/repositories/time-off.repository";

export class ApiTimeOffRepository implements TimeOffRepository {
  async list(query?: TimeOffQuery): Promise<PaginatedTimeOffs> {
    const response = await apiClient.callRoute("/time-offs", {
      method: "get",
      queryParams: {
        page: query?.page,
        limit: query?.limit,
      },
    });

    const data = response.data ?? [];
    const meta = response.meta;

    return {
      items: data.map((item) => new TimeOffEntity(item)),
      meta: {
        page: meta?.page ?? query?.page ?? 1,
        limit: meta?.limit ?? query?.limit ?? data.length,
        totalCount: meta?.totalCount ?? data.length,
        totalPages: meta?.totalPages ?? 1,
      },
    };
  }

  async getById(id: string): Promise<TimeOffEntity> {
    const timeOff = await apiClient.callRoute("/time-offs/:id", {
      method: "get",
      params: { id },
    });

    return new TimeOffEntity(timeOff as TimeOffProps);
  }

  async create(timeOff: TimeOffEntity): Promise<void> {
    await apiClient.callRoute("/time-offs", {
      method: "post",
      body: timeOff.toCreateDto(),
    });
  }

  async update(id: string, timeOff: TimeOffEntity): Promise<void> {
    await apiClient.callRoute("/time-offs/:id", {
      method: "patch",
      params: { id },
      body: timeOff.toUpdateDto(),
    });
  }

  async delete(id: string): Promise<void> {
    await apiClient.callRoute("/time-offs/:id", {
      method: "delete",
      params: { id },
    });
  }
}
