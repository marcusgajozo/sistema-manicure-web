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
    type: "action",
    label: "Sair",
    icon: "logOut",
    actionId: "sign-out",
  },
];
