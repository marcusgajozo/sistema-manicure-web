import { z } from "zod";

import { createPaginatedResponseSchema } from "../shared/schemas/paginated-response";

export const createTimeOffDtoSchema = z.object({
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime(),
  reason: z.string(),
});

export const updateTimeOffDtoSchema = z.object({
  startDate: z.iso.datetime().optional(),
  endDate: z.iso.datetime().optional(),
  reason: z.string().optional(),
});

export const timeOffSchema = z.object({
  id: z.string(),
  reason: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const timeOffsResponseSchema =
  createPaginatedResponseSchema(timeOffSchema);
