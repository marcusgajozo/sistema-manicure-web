import type { Metadata } from "next";

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
    <Card>
      <CardHeader>
        <h1 className="font-heading text-base leading-snug font-medium">
          Dashboard
        </h1>
        <CardDescription>
          Bem-vinda ao sistema. Use o menu lateral para navegar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Em breve você verá aqui um resumo dos agendamentos e métricas do
          salão.
        </p>
      </CardContent>
    </Card>
  );
}
