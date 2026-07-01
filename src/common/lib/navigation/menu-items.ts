import type { MenuItem } from "./menu-types";
import { APP_ROUTES } from "./routes";

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
    type: "group",
    label: "Agendamentos",
    icon: "calendar",
    items: [
      {
        type: "link",
        label: "Lista",
        icon: "list",
        href: APP_ROUTES.agendamentos.list,
      },
      {
        type: "link",
        label: "Novo",
        icon: "plus",
        href: APP_ROUTES.agendamentos.create,
      },
    ],
  },
  {
    type: "group",
    label: "Clientes",
    icon: "users",
    items: [
      {
        type: "link",
        label: "Lista",
        icon: "list",
        href: APP_ROUTES.clientes.list,
      },
      {
        type: "link",
        label: "Novo",
        icon: "plus",
        href: APP_ROUTES.clientes.create,
      },
    ],
  },
  {
    type: "group",
    label: "Procedimentos",
    icon: "scissors",
    items: [
      {
        type: "link",
        label: "Lista",
        icon: "list",
        href: APP_ROUTES.procedimentos.list,
      },
      {
        type: "link",
        label: "Novo",
        icon: "plus",
        href: APP_ROUTES.procedimentos.create,
      },
    ],
  },
  {
    type: "action",
    label: "Sair",
    icon: "logOut",
    actionId: "sign-out",
  },
];
