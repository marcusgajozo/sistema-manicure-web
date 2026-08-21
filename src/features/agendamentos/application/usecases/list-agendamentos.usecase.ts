import type {
  AgendamentoQuery,
  AgendamentoRepository,
  PaginatedAgendamentos,
} from "../../domain/repositories/agendamento.repository";

export class ListAgendamentosUseCase {
  constructor(private repository: AgendamentoRepository) {}

  execute(query?: AgendamentoQuery): Promise<PaginatedAgendamentos> {
    return this.repository.list(query);
  }
}
