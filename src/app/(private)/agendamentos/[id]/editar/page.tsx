import { AgendamentoEditPage } from "@/features/agendamentos/presentation";

export default function Page(props: { params: Promise<{ id: string }> }) {
  return <AgendamentoEditPage {...props} />;
}
