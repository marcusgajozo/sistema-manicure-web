import { TimeOffEntity } from "../../domain/entities/time-off.entity";
import type { TimeOffRepository } from "../../domain/repositories/time-off.repository";

export type CreateTimeOffInput = {
  reason: string;
  startDate: string;
  endDate: string;
};

export class CreateTimeOffUseCase {
  constructor(private repository: TimeOffRepository) {}

  async execute(input: CreateTimeOffInput): Promise<void> {
    const timeOff = new TimeOffEntity({
      id: "",
      reason: input.reason,
      startDate: input.startDate,
      endDate: input.endDate,
    });

    await this.repository.create(timeOff);
  }
}
