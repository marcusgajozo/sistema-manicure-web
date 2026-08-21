import type { ClienteRepository } from "../../domain/repositories/cliente.repository";

export class GetClienteUseCase {
  constructor(private repository: ClienteRepository) {}

  execute(
    id: string,
  ): Promise<import("../../domain/entities/cliente.entity").ClienteEntity> {
    return this.repository.getById(id);
  }
}
