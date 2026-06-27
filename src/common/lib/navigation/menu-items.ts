import type { MenuItem } from "./menu-types";

export const MENU_ITEMS: MenuItem[] = [
  {
    type: "link",
    label: "Dashboard",
    icon: "layoutDashboard",
    href: "/",
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
        href: "/agendamentos",
      },
      {
        type: "link",
        label: "Novo",
        icon: "plus",
        href: "/agendamentos/novo",
      },
    ],
  },
  {
    type: "link",
    label: "Clientes",
    icon: "users",
    href: "/clientes",
  },
  {
    type: "action",
    label: "Sair",
    icon: "logOut",
    actionId: "sign-out",
  },
];
