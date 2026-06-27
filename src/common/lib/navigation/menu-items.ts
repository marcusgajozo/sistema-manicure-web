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
    type: "group",
    label: "Clientes",
    icon: "users",
    items: [
      {
        type: "link",
        label: "Lista",
        icon: "list",
        href: "/clientes",
      },
      {
        type: "link",
        label: "Novo",
        icon: "plus",
        href: "/clientes/novo",
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
