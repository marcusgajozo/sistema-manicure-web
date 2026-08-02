import { defineApiRoutes } from "typed-route-client/core";

import { apiErrorSchema } from "../shared/schemas/api-error";
import {
  appointmentsResponseSchema,
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
        responseSchema: appointmentsResponseSchema,
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
