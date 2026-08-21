import type { TimeOffRepository } from "../../domain/repositories/time-off.repository";

export class GetTimeOffUseCase {
  constructor(private repository: TimeOffRepository) {}

  execute(
    id: string,
  ): Promise<import("../../domain/entities/time-off.entity").TimeOffEntity> {
    return this.repository.getById(id);
  }
}
