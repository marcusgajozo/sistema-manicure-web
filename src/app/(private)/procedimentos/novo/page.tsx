import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import { APP_ROUTES } from "@/common/lib/navigation/routes";

import { NovoProcedimentoForm } from "./_components/novo-procedimento-form";

export const metadata: Metadata = {
  title: "Novo procedimento",
};

export default function NovoProcedimentoPage() {
  return (
    <Page.Root>
      <Page.Header
        title="Novo procedimento"
        description="Cadastre um novo procedimento com nome, preço e duração."
        showBackButton
        backHref={APP_ROUTES.procedimentos.list}
      />
      <Page.Content>
        <NovoProcedimentoForm />
      </Page.Content>
    </Page.Root>
  );
}
