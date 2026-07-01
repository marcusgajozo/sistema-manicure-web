import type { Metadata } from "next";

import { Page } from "@/common/components/page";

export const metadata: Metadata = {
  title: "Agendamentos",
};

export default function AgendamentosPage() {
  return (
    <Page.Root>
      <Page.Header
        title="Agendamentos"
        description="Lista de agendamentos do salão."
      />
      <Page.Content>
        <p className="text-sm text-muted-foreground">Página em construção.</p>
      </Page.Content>
    </Page.Root>
  );
}
