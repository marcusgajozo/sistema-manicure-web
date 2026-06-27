"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Icon } from "@/common/components/icon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/common/components/shadcn-ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/shadcn-ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/common/components/shadcn-ui/sidebar";
import { MENU_ITEMS } from "@/common/lib/navigation/menu-items";
import type {
  MenuAction,
  MenuGroup,
  MenuItem,
  MenuLeafItem,
  MenuLink,
} from "@/common/lib/navigation/menu-types";

function isPathActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function useMenuActionHandler() {
  const router = useRouter();

  return (actionId: string) => {
    if (actionId === "sign-out") {
      router.push("/entrar");
    }
  };
}

function MenuLinkItem({ item }: { item: MenuLink }) {
  const pathname = usePathname();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={item.href} />}
        tooltip={item.label}
        isActive={isPathActive(pathname, item.href)}
      >
        <Icon name={item.icon} />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function MenuActionItem({ item }: { item: MenuAction }) {
  const handleAction = useMenuActionHandler();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.label}
        onClick={() => handleAction(item.actionId)}
      >
        <Icon name={item.icon} />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function MenuGroupCollapsed({ item }: { item: MenuGroup }) {
  const pathname = usePathname();
  const handleAction = useMenuActionHandler();
  const isActive = item.items.some(
    (subItem) =>
      subItem.type === "link" && isPathActive(pathname, subItem.href),
  );

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuButton tooltip={item.label} isActive={isActive} />
          }
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="min-w-48">
          {item.items.map((subItem) =>
            subItem.type === "link" ? (
              <DropdownMenuItem
                key={subItem.href}
                render={<Link href={subItem.href} />}
              >
                <Icon name={subItem.icon} />
                {subItem.label}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                key={subItem.actionId}
                onClick={() => handleAction(subItem.actionId)}
              >
                <Icon name={subItem.icon} />
                {subItem.label}
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}

function MenuGroupExpanded({ item }: { item: MenuGroup }) {
  const pathname = usePathname();
  const handleAction = useMenuActionHandler();
  const isActive = item.items.some(
    (subItem) =>
      subItem.type === "link" && isPathActive(pathname, subItem.href),
  );

  return (
    <Collapsible defaultOpen={isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger
          render={
            <SidebarMenuButton tooltip={item.label} isActive={isActive} />
          }
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
          <ChevronRightIcon className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={getLeafKey(subItem)}>
                {subItem.type === "link" ? (
                  <SidebarMenuSubButton
                    render={<Link href={subItem.href} />}
                    isActive={isPathActive(pathname, subItem.href)}
                  >
                    <span>{subItem.label}</span>
                  </SidebarMenuSubButton>
                ) : (
                  <SidebarMenuSubButton
                    render={<button type="button" />}
                    onClick={() => handleAction(subItem.actionId)}
                  >
                    <span>{subItem.label}</span>
                  </SidebarMenuSubButton>
                )}
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function MenuGroupItem({ item }: { item: MenuGroup }) {
  const { state, isMobile } = useSidebar();

  if (state === "collapsed" && !isMobile) {
    return <MenuGroupCollapsed item={item} />;
  }

  return <MenuGroupExpanded item={item} />;
}

function getLeafKey(item: MenuLeafItem) {
  return item.type === "link" ? item.href : item.actionId;
}

function renderMenuItem(item: MenuItem) {
  switch (item.type) {
    case "link":
      return <MenuLinkItem key={item.href} item={item} />;
    case "action":
      return <MenuActionItem key={item.actionId} item={item} />;
    case "group":
      return <MenuGroupItem key={item.label} item={item} />;
  }
}

export function AppSidebar() {
  const mainItems = MENU_ITEMS.filter((item) => item.type !== "action");
  const footerItems = MENU_ITEMS.filter((item) => item.type === "action");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" />}
              tooltip="Sistema Manicure"
              size="lg"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                SM
              </span>
              <span className="truncate font-semibold">Sistema Manicure</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{mainItems.map(renderMenuItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {footerItems.length > 0 ? (
        <SidebarFooter>
          <SidebarMenu>{footerItems.map(renderMenuItem)}</SidebarMenu>
        </SidebarFooter>
      ) : null}
      <SidebarRail />
    </Sidebar>
  );
}
