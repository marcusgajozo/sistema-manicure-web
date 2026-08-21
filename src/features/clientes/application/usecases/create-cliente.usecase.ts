import { ClienteEntity } from "../../domain/entities/cliente.entity";
import type { ClienteRepository } from "../../domain/repositories/cliente.repository";

export type CreateClienteInput = {
  name: string;
  phone: string;
};

export class CreateClienteUseCase {
  constructor(private repository: ClienteRepository) {}

  async execute(input: CreateClienteInput): Promise<void> {
    const cliente = new ClienteEntity({
      id: "",
      name: input.name,
      phone: input.phone,
    });

    await this.repository.create(cliente);
  }
}
