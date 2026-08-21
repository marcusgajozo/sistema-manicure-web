import { z } from "zod";

import { createPaginatedResponseSchema } from "../shared/schemas/paginated-response";

export const createAppointmentDtoSchema = z.object({
  procedureId: z.uuid().optional(),
  procedureName: z.string().optional(),
  procedurePrice: z.number().optional(),
  procedureFollowUpDays: z.number().optional(),
  clientId: z.uuid().optional(),
  clientName: z.string().optional(),
  phoneClient: z.string().optional(),
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime(),
});

export const updateAppointmentDtoSchema = z.object({
  notifyReturnClient: z
    .enum(["not_notify", "notified", "pending_notification"])
    .optional(),
  statusAppointment: z
    .enum(["pending_status", "scheduled", "canceled", "done"])
    .optional(),
  procedureId: z.uuid().optional(),
  procedureName: z.string().optional(),
  procedurePrice: z.number().optional(),
  procedureFollowUpDays: z.number().optional(),
  clientId: z.uuid().optional(),
  clientName: z.string().optional(),
  phoneClient: z.string().optional(),
  startDate: z.iso.datetime().optional(),
  endDate: z.iso.datetime().optional(),
});

export const appointmentSchema = z.object({
  id: z.string(),
  clientName: z.string(),
  procedureName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const appointmentDetailSchema = z.object({
  id: z.string(),
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  phoneClient: z.string().optional(),
  procedureId: z.string().optional(),
  procedureName: z.string().optional(),
  procedurePrice: z.number().optional(),
  procedureFollowUpDays: z.number().optional(),
  startDate: z.string(),
  endDate: z.string(),
});

export const appointmentsPaginatedResponseSchema =
  createPaginatedResponseSchema(appointmentSchema);

export type Appointment = z.infer<typeof appointmentSchema>;
export type AppointmentDetail = z.infer<typeof appointmentDetailSchema>;
export type GetAppointmentsPaginatedResponse = z.infer<
  typeof appointmentsPaginatedResponseSchema
>;
