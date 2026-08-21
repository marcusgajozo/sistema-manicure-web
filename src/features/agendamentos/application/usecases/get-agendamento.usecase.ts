import { AgendamentoEntity } from "../../domain/entities/agendamento.entity";
import type { AgendamentoRepository } from "../../domain/repositories/agendamento.repository";

export class GetAgendamentoUseCase {
  constructor(private repository: AgendamentoRepository) {}

  execute(id: string): Promise<AgendamentoEntity> {
    return this.repository.getById(id);
  }
}
