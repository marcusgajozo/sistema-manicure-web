import type { IconName } from "@/common/components/icon";

export type MenuLink = {
  type: "link";
  label: string;
  icon: IconName;
  href: string;
};

export type MenuAction = {
  type: "action";
  label: string;
  icon: IconName;
  actionId: string;
};

export type MenuGroup = {
  type: "group";
  label: string;
  icon: IconName;
  items: Array<MenuLink | MenuAction>;
};

export type MenuItem = MenuLink | MenuAction | MenuGroup;

export type MenuLeafItem = MenuLink | MenuAction;
