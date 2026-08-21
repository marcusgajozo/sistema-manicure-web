import { ProcedimentoEntity } from "../../domain/entities/procedimento.entity";
import type { ProcedimentoRepository } from "../../domain/repositories/procedimento.repository";

export type CreateProcedimentoInput = {
  name: string;
  description?: string;
  price: number;
  returnDays: number;
  durationMinutes: number;
};

export class CreateProcedimentoUseCase {
  constructor(private repository: ProcedimentoRepository) {}

  async execute(input: CreateProcedimentoInput): Promise<void> {
    const procedimento = new ProcedimentoEntity({
      id: "",
      name: input.name,
      description: input.description,
      price: input.price,
      returnDays: input.returnDays,
      durationMinutes: input.durationMinutes,
    });

    await this.repository.create(procedimento);
  }
}
