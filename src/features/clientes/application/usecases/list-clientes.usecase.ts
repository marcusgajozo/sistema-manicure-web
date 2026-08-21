import type {
  ClienteQuery,
  ClienteRepository,
  PaginatedClientes,
} from "../../domain/repositories/cliente.repository";

export class ListClientesUseCase {
  constructor(private repository: ClienteRepository) {}

  execute(query?: ClienteQuery): Promise<PaginatedClientes> {
    return this.repository.list(query);
  }
}
