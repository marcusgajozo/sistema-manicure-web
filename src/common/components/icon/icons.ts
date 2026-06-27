import {
  CalendarIcon,
  LayoutDashboardIcon,
  ListIcon,
  Loader2Icon,
  LogOutIcon,
  type LucideProps,
  PlusIcon,
  UsersIcon,
} from "lucide-react";
import type { ComponentType } from "react";

export const icons = {
  calendar: CalendarIcon,
  layoutDashboard: LayoutDashboardIcon,
  list: ListIcon,
  loader2: Loader2Icon,
  logOut: LogOutIcon,
  plus: PlusIcon,
  users: UsersIcon,
} as const satisfies Record<string, ComponentType<LucideProps>>;

export type IconName = keyof typeof icons;
