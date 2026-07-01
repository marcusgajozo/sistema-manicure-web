import type { Metadata } from "next";

import { Page } from "@/common/components/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/common/components/shadcn-ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Painel do sistema manicure",
};

export default function DashboardPage() {
  return (
    <Page.Root>
      <Page.Header title="Dashboard" description="Bem-vinda ao sistema." />
      <Page.Content>
        <Card>
          <CardHeader>
            <CardDescription>Use o menu lateral para navegar.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Em breve você verá aqui um resumo dos agendamentos e métricas do
              salão.
            </p>
          </CardContent>
        </Card>
      </Page.Content>
    </Page.Root>
  );
}
