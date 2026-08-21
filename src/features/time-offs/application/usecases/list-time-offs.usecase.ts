import type {
  PaginatedTimeOffs,
  TimeOffQuery,
  TimeOffRepository,
} from "../../domain/repositories/time-off.repository";

export class ListTimeOffsUseCase {
  constructor(private repository: TimeOffRepository) {}

  execute(query?: TimeOffQuery): Promise<PaginatedTimeOffs> {
    return this.repository.list(query);
  }
}
