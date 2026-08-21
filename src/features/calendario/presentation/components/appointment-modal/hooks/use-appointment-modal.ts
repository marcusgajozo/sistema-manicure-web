"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { useModal } from "@/common/components/modal";
import { createAppointmentDtoSchema } from "@/common/services/api/appointments/schemas";
import { getAgendamentosUseCases } from "@/features/agendamentos/composition";
import { getClientesUseCases } from "@/features/clientes/composition";
import { getProcedimentosUseCases } from "@/features/procedimentos/composition";

import { createAppointmentAction } from "../../../actions/create-appointment";
import { deleteAppointmentAction } from "../../../actions/delete-appointment";
import { updateAppointmentAction } from "../../../actions/update-appointment";

type AppointmentValues = z.infer<typeof createAppointmentDtoSchema>;

export type AppointmentModalData = {
  mode: "create" | "edit";
  initialData: Record<string, unknown> | null;
};

export function useAppointmentModal(onSuccess?: () => void) {
  const modal = useModal<AppointmentModalData>("appointment-modal");
  const mode = modal.data?.mode || "create";
  const initialData = modal.data?.initialData || null;
  const isCreate = mode === "create";

  const data = initialData as
    | (Partial<AppointmentValues> & {
        id?: string;
      })
    | null;

  const form = useForm<AppointmentValues>({
    resolver: zodResolver(createAppointmentDtoSchema),
    defaultValues: {
      clientName: "",
      phoneClient: "",
      procedureName: "",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
  });

  useEffect(() => {
    if (!modal.isOpen) return;

    async function load() {
      const clients = await getClientesUseCases().list.execute({
        limit: 1000,
      });
      const procedures = await getProcedimentosUseCases().list.execute({
        limit: 1000,
      });

      const clientOptions = clients.items.map((c) => ({
        value: c.id,
        label: c.name,
      }));
      const procedureOptions = procedures.items.map((p) => ({
        value: p.id,
        label: p.name,
      }));

      let values = data;
      if (!isCreate && data?.id) {
        const agendamento = await getAgendamentosUseCases().get.execute(
          data.id,
        );
        values = agendamento.toPlain();
      }

      form.reset({
        clientId: (values as AppointmentValues)?.clientId,
        clientName: (values as AppointmentValues)?.clientName ?? "",
        phoneClient: (values as AppointmentValues)?.phoneClient ?? "",
        procedureId: (values as AppointmentValues)?.procedureId,
        procedureName: (values as AppointmentValues)?.procedureName ?? "",
        procedurePrice: (values as AppointmentValues)?.procedurePrice,
        procedureFollowUpDays: (values as AppointmentValues)
          ?.procedureFollowUpDays,
        startDate:
          (values as AppointmentValues)?.startDate ?? new Date().toISOString(),
        endDate:
          (values as AppointmentValues)?.endDate ?? new Date().toISOString(),
      });

      return { clientOptions, procedureOptions };
    }

    void load();
  }, [modal.isOpen, data, isCreate, form]);

  const selectedClientId = useWatch({
    control: form.control,
    name: "clientId",
  });
  const selectedProcedureId = useWatch({
    control: form.control,
    name: "procedureId",
  });

  const [clientOptions, setClientOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [procedureOptions, setProcedureOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (!modal.isOpen) return;

    async function load() {
      const clients = await getClientesUseCases().list.execute({
        limit: 1000,
      });
      const procedures = await getProcedimentosUseCases().list.execute({
        limit: 1000,
      });

      setClientOptions(
        clients.items.map((c) => ({ value: c.id, label: c.name })),
      );
      setProcedureOptions(
        procedures.items.map((p) => ({ value: p.id, label: p.name })),
      );

      let values = data;
      if (!isCreate && data?.id) {
        const agendamento = await getAgendamentosUseCases().get.execute(
          data.id,
        );
        values = agendamento.toPlain();
      }

      form.reset({
        clientId: (values as AppointmentValues)?.clientId,
        clientName: (values as AppointmentValues)?.clientName ?? "",
        phoneClient: (values as AppointmentValues)?.phoneClient ?? "",
        procedureId: (values as AppointmentValues)?.procedureId,
        procedureName: (values as AppointmentValues)?.procedureName ?? "",
        procedurePrice: (values as AppointmentValues)?.procedurePrice,
        procedureFollowUpDays: (values as AppointmentValues)
          ?.procedureFollowUpDays,
        startDate:
          (values as AppointmentValues)?.startDate ?? new Date().toISOString(),
        endDate:
          (values as AppointmentValues)?.endDate ?? new Date().toISOString(),
      });
    }

    void load();
  }, [modal.isOpen, data, isCreate, form]);

  async function onSubmit(values: AppointmentValues) {
    if (isCreate) {
      const result = await createAppointmentAction(values);
      if (result.ok) {
        toast.success("Agendamento criado!");
        modal.close();
        onSuccess?.();
      } else {
        toast.error("Erro ao criar agendamento.");
      }
    } else {
      const result = await updateAppointmentAction(data?.id as string, values);
      if (result.ok) {
        toast.success("Agendamento atualizado!");
        modal.close();
        onSuccess?.();
      } else {
        toast.error("Erro ao atualizar.");
      }
    }
  }

  async function handleDelete() {
    if (!data?.id) return;
    const result = await deleteAppointmentAction(data.id);
    if (result.ok) {
      toast.success("Agendamento cancelado!");
      modal.close();
      onSuccess?.();
    } else {
      toast.error("Erro ao cancelar.");
    }
  }

  return {
    modal,
    form,
    isCreate,
    clientOptions,
    procedureOptions,
    selectedClientId,
    selectedProcedureId,
    onSubmit,
    handleDelete,
  };
}
