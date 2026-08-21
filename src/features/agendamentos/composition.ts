import { CreateAgendamentoUseCase } from "./application/usecases/create-agendamento.usecase";
import { DeleteAgendamentoUseCase } from "./application/usecases/delete-agendamento.usecase";
import { GetAgendamentoUseCase } from "./application/usecases/get-agendamento.usecase";
import { ListAgendamentosUseCase } from "./application/usecases/list-agendamentos.usecase";
import { UpdateAgendamentoUseCase } from "./application/usecases/update-agendamento.usecase";
import { ApiAgendamentoRepository } from "./infrastructure/repositories/api-agendamento.repository";

function createAgendamentoRepository() {
  return new ApiAgendamentoRepository();
}

export function getAgendamentosUseCases() {
  const repository = createAgendamentoRepository();

  return {
    list: new ListAgendamentosUseCase(repository),
    get: new GetAgendamentoUseCase(repository),
    create: new CreateAgendamentoUseCase(repository),
    update: new UpdateAgendamentoUseCase(repository),
    delete: new DeleteAgendamentoUseCase(repository),
  };
}
