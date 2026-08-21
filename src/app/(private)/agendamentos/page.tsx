import { AgendamentosListPage } from "@/features/agendamentos/presentation";

export default function Page(props: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  return <AgendamentosListPage {...props} />;
}
