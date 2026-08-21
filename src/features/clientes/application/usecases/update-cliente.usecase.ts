import { ClienteEntity } from "../../domain/entities/cliente.entity";
import type { ClienteRepository } from "../../domain/repositories/cliente.repository";

export type UpdateClienteInput = {
  name?: string;
  phone?: string;
};

export class UpdateClienteUseCase {
  constructor(private repository: ClienteRepository) {}

  async execute(id: string, input: UpdateClienteInput): Promise<void> {
    const cliente = new ClienteEntity({
      id,
      name: input.name ?? "",
      phone: input.phone ?? "",
    });

    await this.repository.update(id, cliente);
  }
}
