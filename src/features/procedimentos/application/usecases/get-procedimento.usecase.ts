import type { ProcedimentoRepository } from "../../domain/repositories/procedimento.repository";

export class GetProcedimentoUseCase {
  constructor(private repository: ProcedimentoRepository) {}

  execute(
    id: string,
  ): Promise<
    import("../../domain/entities/procedimento.entity").ProcedimentoEntity
  > {
    return this.repository.getById(id);
  }
}
