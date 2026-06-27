import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/common/components/shadcn-ui/card";

export const metadata: Metadata = {
  title: "Agendamentos",
};

export default function AgendamentosPage() {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-heading text-base leading-snug font-medium">
          Agendamentos
        </h1>
        <CardDescription>Lista de agendamentos do salão.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Página em construção.</p>
      </CardContent>
    </Card>
  );
}
