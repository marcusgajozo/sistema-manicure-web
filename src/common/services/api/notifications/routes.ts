import { defineApiRoutes } from "typed-route-client/core";

import { apiErrorSchema } from "../shared/schemas/api-error";

export const notificationsRoutes = defineApiRoutes({
  "/notifications": {
    methods: {
      get: {
        errorSchema: apiErrorSchema,
      },
    },
  },
});
