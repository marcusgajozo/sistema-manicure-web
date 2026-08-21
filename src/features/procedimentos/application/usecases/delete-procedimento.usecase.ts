import type { ProcedimentoRepository } from "../../domain/repositories/procedimento.repository";

export class DeleteProcedimentoUseCase {
  constructor(private repository: ProcedimentoRepository) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
