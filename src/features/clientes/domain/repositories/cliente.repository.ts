import type { ClienteEntity } from "../entities/cliente.entity";

export type ClienteQuery = {
  page?: number;
  limit?: number;
};

export type PaginatedClientes = {
  items: ClienteEntity[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
};

export interface ClienteRepository {
  list(query?: ClienteQuery): Promise<PaginatedClientes>;
  getById(id: string): Promise<ClienteEntity>;
  create(cliente: ClienteEntity): Promise<void>;
  update(id: string, cliente: ClienteEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
