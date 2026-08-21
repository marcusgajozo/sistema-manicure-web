import type { AgendamentoRepository } from "../../domain/repositories/agendamento.repository";

export class DeleteAgendamentoUseCase {
  constructor(private repository: AgendamentoRepository) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
