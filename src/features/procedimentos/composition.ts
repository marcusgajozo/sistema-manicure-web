import { CreateProcedimentoUseCase } from "./application/usecases/create-procedimento.usecase";
import { DeleteProcedimentoUseCase } from "./application/usecases/delete-procedimento.usecase";
import { GetProcedimentoUseCase } from "./application/usecases/get-procedimento.usecase";
import { ListProcedimentosUseCase } from "./application/usecases/list-procedimentos.usecase";
import { UpdateProcedimentoUseCase } from "./application/usecases/update-procedimento.usecase";
import { ApiProcedimentoRepository } from "./infrastructure/repositories/api-procedimento.repository";

function createProcedimentoRepository() {
  return new ApiProcedimentoRepository();
}

export function getProcedimentosUseCases() {
  const repository = createProcedimentoRepository();

  return {
    list: new ListProcedimentosUseCase(repository),
    get: new GetProcedimentoUseCase(repository),
    create: new CreateProcedimentoUseCase(repository),
    update: new UpdateProcedimentoUseCase(repository),
    delete: new DeleteProcedimentoUseCase(repository),
  };
}
