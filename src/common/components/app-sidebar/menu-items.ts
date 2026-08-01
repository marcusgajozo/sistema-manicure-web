import { APP_ROUTES } from "@/common/lib/navigation/routes";

import type { MenuItem } from "./menu-types";

export const MENU_ITEMS: MenuItem[] = [
  {
    type: "link",
    label: "Dashboard",
    icon: "layoutDashboard",
    href: APP_ROUTES.dashboard,
  },
  {
    type: "link",
    label: "Calendário",
    icon: "calendar",
    href: APP_ROUTES.calendario,
  },
  {
    type: "link",
    label: "Agendamentos",
    icon: "calendar",
    href: APP_ROUTES.agendamentos.list,
  },
  {
    type: "link",
    label: "Clientes",
    icon: "users",
    href: APP_ROUTES.clientes.list,
  },
  {
    type: "link",
    label: "Procedimentos",
    icon: "scissors",
    href: APP_ROUTES.procedimentos.list,
  },
  {
    type: "action",
    label: "Sair",
    icon: "logOut",
    actionId: "sign-out",
  },
];
