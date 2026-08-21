import type { DeepRouteValues } from "./generate-url";

export const APP_ROUTES = {
  dashboard: "/",
  calendario: "/calendario",
  login: "/entrar",
  agendamentos: {
    list: "/agendamentos",
    create: "/agendamentos/novo",
    edit: "/agendamentos/:id/editar",
  },
  clientes: {
    list: "/clientes",
    create: "/clientes/novo",
    edit: "/clientes/:id/editar",
  },
  procedimentos: {
    list: "/procedimentos",
    create: "/procedimentos/novo",
    edit: "/procedimentos/:id/editar",
  },
} as const;

export type { DeepRouteValues, RouteParamsFor } from "./generate-url";
export { generateUrl } from "./generate-url";

export type AppRoutePattern = DeepRouteValues<typeof APP_ROUTES>;

export const PUBLIC_ROUTE_PATHS = [APP_ROUTES.login] as const;

export function isPublicPath(pathname: string) {
  return PUBLIC_ROUTE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function buildLoginPath(callbackUrl?: string) {
  if (!callbackUrl) {
    return APP_ROUTES.login;
  }

  const searchParams = new URLSearchParams({ callbackUrl });

  return `${APP_ROUTES.login}?${searchParams.toString()}`;
}
