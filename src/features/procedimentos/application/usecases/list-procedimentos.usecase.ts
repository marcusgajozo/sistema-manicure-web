import type {
  PaginatedProcedimentos,
  ProcedimentoQuery,
  ProcedimentoRepository,
} from "../../domain/repositories/procedimento.repository";

export class ListProcedimentosUseCase {
  constructor(private repository: ProcedimentoRepository) {}

  execute(query?: ProcedimentoQuery): Promise<PaginatedProcedimentos> {
    return this.repository.list(query);
  }
}
