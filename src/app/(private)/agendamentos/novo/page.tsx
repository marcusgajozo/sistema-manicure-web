import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/common/components/shadcn-ui/card";

export const metadata: Metadata = {
  title: "Novo agendamento",
};

export default function NovoAgendamentoPage() {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-heading text-base leading-snug font-medium">
          Novo agendamento
        </h1>
        <CardDescription>Cadastre um novo agendamento.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Página em construção.</p>
      </CardContent>
    </Card>
  );
}
