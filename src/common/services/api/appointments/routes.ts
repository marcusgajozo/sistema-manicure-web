import { defineApiRoutes } from "typed-route-client/core";

import { apiErrorSchema } from "../shared/schemas/api-error";
import {
  appointmentsPaginatedResponseSchema,
  createAppointmentDtoSchema,
  updateAppointmentDtoSchema,
} from "./schemas";

export const appointmentsRoutes = defineApiRoutes({
  "/appointments": {
    methods: {
      post: {
        bodySchema: createAppointmentDtoSchema,
        errorSchema: apiErrorSchema,
      },
      get: {
        responseSchema: appointmentsPaginatedResponseSchema,
        errorSchema: apiErrorSchema,
      },
    },
  },
  "/appointments/:id": {
    methods: {
      get: {
        errorSchema: apiErrorSchema,
      },
      patch: {
        bodySchema: updateAppointmentDtoSchema,
        errorSchema: apiErrorSchema,
      },
      delete: {
        errorSchema: apiErrorSchema,
      },
    },
  },
});
