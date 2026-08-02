import { mergeApiRoutes } from "typed-route-client/core";

import { appointmentsRoutes } from "./appointments/routes";
import { authenticationRoutes } from "./authentication/routes";
import { clientsRoutes } from "./clients/routes";
import { notificationsRoutes } from "./notifications/routes";
import { proceduresRoutes } from "./procedures/routes";
import { scheduleTemplatesRoutes } from "./schedule-templates/routes";
import { timeOffsRoutes } from "./time-offs/routes";

export const apiRoutes = mergeApiRoutes(
  appointmentsRoutes,
  authenticationRoutes,
  clientsRoutes,
  notificationsRoutes,
  proceduresRoutes,
  scheduleTemplatesRoutes,
  timeOffsRoutes,
);
