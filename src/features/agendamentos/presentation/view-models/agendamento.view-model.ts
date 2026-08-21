import type { AgendamentoPlain } from "../../domain/entities/agendamento.entity";
import type { PaginatedAgendamentos } from "../../domain/repositories/agendamento.repository";

export type AgendamentoListItemViewModel = {
  id: string;
  clientName: string;
  procedureName: string;
  startDate: string;
  endDate: string;
  startDateFormatted: string;
  endDateFormatted: string;
};

export type AgendamentoListViewModel = {
  items: AgendamentoListItemViewModel[];
  meta: PaginatedAgendamentos["meta"];
};

function formatDateTime(value?: string): string {
  if (!value) return "-";
  return new Date(value).toLocaleString("pt-BR");
}

export function toAgendamentoListViewModel(
  paginated: PaginatedAgendamentos,
): AgendamentoListViewModel {
  return {
    items: paginated.items.map((entity) => {
      const plain = entity.toPlain();

      return {
        id: plain.id,
        clientName: plain.clientName ?? "",
        procedureName: plain.procedureName ?? "",
        startDate: plain.startDate ?? "",
        endDate: plain.endDate ?? "",
        startDateFormatted: formatDateTime(plain.startDate),
        endDateFormatted: formatDateTime(plain.endDate),
      };
    }),
    meta: paginated.meta,
  };
}

export type AgendamentoFormViewModel = {
  agendamento: AgendamentoPlain | null;
  clientOptions: { value: string; label: string }[];
  procedureOptions: { value: string; label: string }[];
};

export function toAgendamentoFormViewModel(input: {
  agendamento?: AgendamentoPlain;
  clients: { id: string; name: string }[];
  procedures: { id: string; name: string }[];
}): AgendamentoFormViewModel {
  return {
    agendamento: input.agendamento ?? null,
    clientOptions: input.clients.map((c) => ({
      value: c.id,
      label: c.name,
    })),
    procedureOptions: input.procedures.map((p) => ({
      value: p.id,
      label: p.name,
    })),
  };
}
