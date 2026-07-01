import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import { APP_ROUTES } from "@/common/lib/navigation/routes";

export const metadata: Metadata = {
  title: "Novo agendamento",
};

export default function NovoAgendamentoPage() {
  return (
    <Page.Root>
      <Page.Header
        title="Novo agendamento"
        description="Cadastre um novo agendamento."
        showBackButton
        backHref={APP_ROUTES.agendamentos.list}
      />
      <Page.Content>
        <p className="text-sm text-muted-foreground">Página em construção.</p>
      </Page.Content>
    </Page.Root>
  );
}
