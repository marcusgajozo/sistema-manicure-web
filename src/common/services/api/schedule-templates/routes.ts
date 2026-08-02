import { defineApiRoutes } from "typed-route-client/core";

import { apiErrorSchema } from "../shared/schemas/api-error";
import {
  createScheduleTemplateDtoSchema,
  scheduleTemplatesResponseSchema,
  updateScheduleTemplateDtoSchema,
} from "./schemas";

export const scheduleTemplatesRoutes = defineApiRoutes({
  "/schedule-templates": {
    methods: {
      post: {
        bodySchema: createScheduleTemplateDtoSchema,
        errorSchema: apiErrorSchema,
      },
      get: {
        responseSchema: scheduleTemplatesResponseSchema,
        errorSchema: apiErrorSchema,
      },
    },
  },
  "/schedule-templates/:id": {
    methods: {
      get: {
        errorSchema: apiErrorSchema,
      },
      patch: {
        bodySchema: updateScheduleTemplateDtoSchema,
        errorSchema: apiErrorSchema,
      },
      delete: {
        errorSchema: apiErrorSchema,
      },
    },
  },
});
