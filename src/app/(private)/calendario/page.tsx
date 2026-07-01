import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import { apiClient } from "@/common/services/api/server-client";

import { FullCalendarView } from "./_components/full-calendar-view";

export const metadata: Metadata = {
  title: "Calendário",
};

export default async function CalendarioPage() {
  const [clientsRes, proceduresRes] = await Promise.all([
    apiClient.callRoute("/clients", {
      method: "get",
      queryParams: { limit: 100 },
    }),
    apiClient.callRoute("/procedures", {
      method: "get",
      queryParams: { limit: 100 },
    }),
  ]);

  const clients =
    clientsRes.data?.map((c) => ({ label: c.name, value: c.id })) ?? [];
  const procedures =
    proceduresRes.data?.map((p) => ({ label: p.name, value: p.id })) ?? [];

  return (
    <Page.Root className="h-full">
      <Page.Header
        title="Calendário"
        description="Visualize seus agendamentos, ausências e horários disponíveis."
      />
      <Page.Content className="h-full flex-1">
        <FullCalendarView clients={clients} procedures={procedures} />
      </Page.Content>
    </Page.Root>
  );
}
