"use client";

import { AppSidebar } from "@/common/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/common/components/shadcn-ui/sidebar";
import { TooltipProvider } from "@/common/components/shadcn-ui/tooltip";

type PrivateShellProps = {
  children: React.ReactNode;
};

export function PrivateShell({ children }: PrivateShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
