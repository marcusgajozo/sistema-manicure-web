import { AgendamentoEntity } from "../../domain/entities/agendamento.entity";
import type { AgendamentoRepository } from "../../domain/repositories/agendamento.repository";

export type CreateAgendamentoInput = {
  clientId?: string;
  clientName?: string;
  phoneClient?: string;
  procedureId?: string;
  procedureName?: string;
  procedurePrice?: number;
  procedureFollowUpDays?: number;
  startDate: string;
  endDate: string;
};

export class CreateAgendamentoUseCase {
  constructor(private repository: AgendamentoRepository) {}

  async execute(input: CreateAgendamentoInput): Promise<void> {
    const agendamento = new AgendamentoEntity({
      id: "",
      ...input,
    });

    await this.repository.create(agendamento);
  }
}
