import type { TimeOffEntity } from "../entities/time-off.entity";

export type TimeOffQuery = {
  page?: number;
  limit?: number;
};

export type PaginatedTimeOffs = {
  items: TimeOffEntity[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
};

export interface TimeOffRepository {
  list(query?: TimeOffQuery): Promise<PaginatedTimeOffs>;
  getById(id: string): Promise<TimeOffEntity>;
  create(timeOff: TimeOffEntity): Promise<void>;
  update(id: string, timeOff: TimeOffEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
