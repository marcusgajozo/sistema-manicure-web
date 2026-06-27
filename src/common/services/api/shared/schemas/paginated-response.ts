import { z } from "zod";

import { paginationMetaSchema } from "./pagination-meta";

export function createPaginatedResponseSchema<T extends z.ZodType>(
  itemSchema: T,
) {
  return z.object({
    data: z.array(itemSchema),
    meta: paginationMetaSchema,
  });
}

export type PaginatedResponse<T> = {
  data: T[];
  meta: z.infer<typeof paginationMetaSchema>;
};
