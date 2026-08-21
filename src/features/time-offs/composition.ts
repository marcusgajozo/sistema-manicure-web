import { CreateTimeOffUseCase } from "./application/usecases/create-time-off.usecase";
import { DeleteTimeOffUseCase } from "./application/usecases/delete-time-off.usecase";
import { GetTimeOffUseCase } from "./application/usecases/get-time-off.usecase";
import { ListTimeOffsUseCase } from "./application/usecases/list-time-offs.usecase";
import { UpdateTimeOffUseCase } from "./application/usecases/update-time-off.usecase";
import { ApiTimeOffRepository } from "./infrastructure/repositories/api-time-off.repository";

function createTimeOffRepository() {
  return new ApiTimeOffRepository();
}

export function getTimeOffsUseCases() {
  const repository = createTimeOffRepository();

  return {
    list: new ListTimeOffsUseCase(repository),
    get: new GetTimeOffUseCase(repository),
    create: new CreateTimeOffUseCase(repository),
    update: new UpdateTimeOffUseCase(repository),
    delete: new DeleteTimeOffUseCase(repository),
  };
}
