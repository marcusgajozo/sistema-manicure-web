import { defineApiRoutes } from "typed-route-client/core";

import { apiErrorSchema } from "../shared/schemas/api-error";
import { notificationsResponseSchema } from "./schemas";

export const notificationsRoutes = defineApiRoutes({
  "/notifications": {
    methods: {
      get: {
        responseSchema: notificationsResponseSchema,
        errorSchema: apiErrorSchema,
      },
    },
  },
  "/notification-templates": {
    methods: {
      get: {
        errorSchema: apiErrorSchema,
      },
    },
  },
});
