import type { Metadata } from "next";

import { Page } from "@/common/components/page";

import { FullCalendarView } from "../components/full-calendar-view";

export const metadata: Metadata = {
  title: "Calendário",
};

export function CalendarioPage() {
  return (
    <Page.Root className="h-full">
      <Page.Header
        title="Calendário"
        description="Visualize seus agendamentos, ausências e horários disponíveis."
      />
      <Page.Content className="h-full flex-1">
        <FullCalendarView />
      </Page.Content>
    </Page.Root>
  );
}
