import { CreateClienteUseCase } from "./application/usecases/create-cliente.usecase";
import { DeleteClienteUseCase } from "./application/usecases/delete-cliente.usecase";
import { GetClienteUseCase } from "./application/usecases/get-cliente.usecase";
import { ListClientesUseCase } from "./application/usecases/list-clientes.usecase";
import { UpdateClienteUseCase } from "./application/usecases/update-cliente.usecase";
import { ApiClienteRepository } from "./infrastructure/repositories/api-cliente.repository";

function createClienteRepository() {
  return new ApiClienteRepository();
}

export function getClientesUseCases() {
  const repository = createClienteRepository();

  return {
    list: new ListClientesUseCase(repository),
    get: new GetClienteUseCase(repository),
    create: new CreateClienteUseCase(repository),
    update: new UpdateClienteUseCase(repository),
    delete: new DeleteClienteUseCase(repository),
  };
}
