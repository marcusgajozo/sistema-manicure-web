import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import { apiClient } from "@/common/services/api/server-client";

import { FullCalendarView } from "./_components/full-calendar-view";

export const metadata: Metadata = {
  title: "Calendário",
};

export default async function CalendarioPage() {
  const [appointments, timeOffs] = await Promise.all([
    apiClient.callRoute("/appointments", { method: "get" }),
    apiClient.callRoute("/time-offs", { method: "get" }),
  ]);

  return (
    <Page.Root className="h-full">
      <Page.Header
        title="Calendário"
        description="Visualize seus agendamentos, ausências e horários disponíveis."
      />
      <Page.Content className="h-full flex-1">
        <FullCalendarView
          appointments={appointments["data"]}
          timeOffs={timeOffs["data"]}
        />
      </Page.Content>
    </Page.Root>
  );
}
