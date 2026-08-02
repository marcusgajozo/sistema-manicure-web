import { z } from "zod";

export const notificationSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sendDate: z.string().optional(),
  createdAt: z.string().optional(),
  date: z.string().optional(),
});

export const notificationsResponseSchema = z.object({
  data: z.array(notificationSchema),
});
