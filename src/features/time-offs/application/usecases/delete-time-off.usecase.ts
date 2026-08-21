import type { TimeOffRepository } from "../../domain/repositories/time-off.repository";

export class DeleteTimeOffUseCase {
  constructor(private repository: TimeOffRepository) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
