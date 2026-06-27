import {
  CalendarIcon,
  LayoutDashboardIcon,
  ListIcon,
  Loader2Icon,
  LogOutIcon,
  type LucideProps,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
import type { ComponentType } from "react";

export const icons = {
  calendar: CalendarIcon,
  layoutDashboard: LayoutDashboardIcon,
  list: ListIcon,
  loader2: Loader2Icon,
  logOut: LogOutIcon,
  pencil: PencilIcon,
  plus: PlusIcon,
  trash2: Trash2Icon,
  users: UsersIcon,
} as const satisfies Record<string, ComponentType<LucideProps>>;

export type IconName = keyof typeof icons;
