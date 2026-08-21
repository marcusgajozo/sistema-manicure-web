import type { ProcedimentoEntity } from "../entities/procedimento.entity";

export type ProcedimentoQuery = {
  page?: number;
  limit?: number;
};

export type PaginatedProcedimentos = {
  items: ProcedimentoEntity[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
};

export interface ProcedimentoRepository {
  list(query?: ProcedimentoQuery): Promise<PaginatedProcedimentos>;
  getById(id: string): Promise<ProcedimentoEntity>;
  create(procedimento: ProcedimentoEntity): Promise<void>;
  update(id: string, procedimento: ProcedimentoEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
