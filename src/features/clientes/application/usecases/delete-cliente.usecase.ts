import type { ClienteRepository } from "../../domain/repositories/cliente.repository";

export class DeleteClienteUseCase {
  constructor(private repository: ClienteRepository) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
