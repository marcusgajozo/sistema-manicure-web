"use client";

import { AppSidebar } from "@/common/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
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
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
          </header>
          <div className="flex flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
