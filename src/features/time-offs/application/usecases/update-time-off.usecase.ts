import { TimeOffEntity } from "../../domain/entities/time-off.entity";
import type { TimeOffRepository } from "../../domain/repositories/time-off.repository";

export type UpdateTimeOffInput = {
  reason?: string;
  startDate?: string;
  endDate?: string;
};

export class UpdateTimeOffUseCase {
  constructor(private repository: TimeOffRepository) {}

  async execute(id: string, input: UpdateTimeOffInput): Promise<void> {
    const timeOff = new TimeOffEntity({
      id,
      reason: input.reason ?? "",
      startDate: input.startDate,
      endDate: input.endDate,
    });

    await this.repository.update(id, timeOff);
  }
}
