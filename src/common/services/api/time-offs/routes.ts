import { defineApiRoutes } from "typed-route-client/core";

import { apiErrorSchema } from "../shared/schemas/api-error";
import {
  createTimeOffDtoSchema,
  timeOffsResponseSchema,
  updateTimeOffDtoSchema,
} from "./schemas";

export const timeOffsRoutes = defineApiRoutes({
  "/time-offs": {
    methods: {
      post: {
        bodySchema: createTimeOffDtoSchema,
        errorSchema: apiErrorSchema,
      },
      get: {
        responseSchema: timeOffsResponseSchema,
        errorSchema: apiErrorSchema,
      },
    },
  },
  "/time-offs/:id": {
    methods: {
      get: {
        errorSchema: apiErrorSchema,
      },
      patch: {
        bodySchema: updateTimeOffDtoSchema,
        errorSchema: apiErrorSchema,
      },
      delete: {
        errorSchema: apiErrorSchema,
      },
    },
  },
});
