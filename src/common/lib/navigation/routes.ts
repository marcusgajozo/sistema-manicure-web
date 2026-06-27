export const APP_ROUTES = {
  dashboard: "/",
  login: "/entrar",
  agendamentos: {
    list: "/agendamentos",
    create: "/agendamentos/novo",
  },
  clientes: {
    list: "/clientes",
    create: "/clientes/novo",
  },
} as const;

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
