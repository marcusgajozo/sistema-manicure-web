import { z } from "zod";

import { createPaginatedResponseSchema } from "../shared/schemas/paginated-response";

export const createClientDtoSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export const updateClientDtoSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

export const clientSchema = z.object({
  id: z.uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  name: z.string(),
  phone: z.string(),
  userId: z.uuid(),
});

export const getClientsResponseSchema =
  createPaginatedResponseSchema(clientSchema);

export type Client = z.infer<typeof clientSchema>;
export type GetClientsResponse = z.infer<typeof getClientsResponseSchema>;
