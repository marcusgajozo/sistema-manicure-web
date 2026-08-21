import { AgendamentoEntity } from "../../domain/entities/agendamento.entity";
import type { AgendamentoRepository } from "../../domain/repositories/agendamento.repository";

export type UpdateAgendamentoInput = {
  clientId?: string;
  clientName?: string;
  phoneClient?: string;
  procedureId?: string;
  procedureName?: string;
  procedurePrice?: number;
  procedureFollowUpDays?: number;
  startDate?: string;
  endDate?: string;
};

export class UpdateAgendamentoUseCase {
  constructor(private repository: AgendamentoRepository) {}

  async execute(id: string, input: UpdateAgendamentoInput): Promise<void> {
    const agendamento = new AgendamentoEntity({
      id,
      ...input,
    });

    await this.repository.update(id, agendamento);
  }
}
