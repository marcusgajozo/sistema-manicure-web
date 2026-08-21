import { AgendamentoEntity } from "../entities/agendamento.entity";

export type AgendamentoQuery = {
  page?: number;
  limit?: number;
};

export type PaginatedAgendamentos = {
  items: AgendamentoEntity[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
};

export interface AgendamentoRepository {
  list(query?: AgendamentoQuery): Promise<PaginatedAgendamentos>;
  getById(id: string): Promise<AgendamentoEntity>;
  create(agendamento: AgendamentoEntity): Promise<void>;
  update(id: string, agendamento: AgendamentoEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
