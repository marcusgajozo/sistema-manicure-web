import "server-only";

import { createRouteClient } from "typed-route-client/core";

import { apiRoutes } from "./routes";
import { createServerHttpTransport } from "./server-transport";

export const apiClient = createRouteClient({
  routes: apiRoutes,
  transport: createServerHttpTransport(),
});
