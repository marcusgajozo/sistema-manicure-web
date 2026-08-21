import { ProcedimentoEntity } from "../../domain/entities/procedimento.entity";
import type { ProcedimentoRepository } from "../../domain/repositories/procedimento.repository";

export type UpdateProcedimentoInput = {
  name?: string;
  description?: string;
  price?: number;
  returnDays?: number;
  durationMinutes?: number;
};

export class UpdateProcedimentoUseCase {
  constructor(private repository: ProcedimentoRepository) {}

  async execute(id: string, input: UpdateProcedimentoInput): Promise<void> {
    const procedimento = new ProcedimentoEntity({
      id,
      name: input.name ?? "",
      description: input.description,
      price: input.price ?? 0,
      returnDays: input.returnDays ?? 0,
      durationMinutes: input.durationMinutes ?? 0,
    });

    await this.repository.update(id, procedimento);
  }
}
