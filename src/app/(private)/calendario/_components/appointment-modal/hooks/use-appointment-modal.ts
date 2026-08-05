import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { useModal } from "@/common/components/modal";
import { createAppointmentDtoSchema } from "@/common/services/api/appointments/schemas";
import { apiClient } from "@/common/services/api/server-client";

type AppointmentValues = z.infer<typeof createAppointmentDtoSchema>;

export type AppointmentModalData = {
  appointmentId?: string;
  date?: string;
};

export function useAppointmentModal() {
  const modal = useModal<AppointmentModalData>("appointment-modal");

  const form = useForm({
    resolver: zodResolver(createAppointmentDtoSchema),
  });

  const appointmentData = apiClient.callRoute("/appointments/:id", {
    params: { id: modal.data?.appointmentId },
  });

  useEffect(() => {
    if (modal.isOpen) {
      form.reset({
        clientId: appointmentData?.clientId || undefined,
        clientName: appointmentData?.clientName || "",
        phoneClient: appointmentData?.phoneClient || "",
        procedureId: appointmentData?.procedureId || undefined,
        procedureName: appointmentData?.procedureName || "",
        procedurePrice: appointmentData?.procedurePrice || undefined,
        procedureFollowUpDays:
          appointmentData?.procedureFollowUpDays || undefined,
        startDate: appointmentData?.startDate || new Date().toISOString(),
        endDate: appointmentData?.endDate || new Date().toISOString(),
      });
    }
  }, [modal.isOpen, data, form]);

  const selectedClientId = useWatch({
    control: form.control,
    name: "clientId",
  });

  const selectedProcedureId = useWatch({
    control: form.control,
    name: "procedureId",
  });

  async function onSubmit(values: AppointmentValues) {
    if (isCreate) {
      const { createAppointmentAction } =
        await import("../../_actions/create-appointment");
      const result = await createAppointmentAction(values);
      if (result.ok) {
        toast.success("Agendamento criado!");
        onSuccess();
        modal.close();
      } else {
        toast.error("Erro ao criar agendamento.");
      }
    } else {
      const { updateAppointmentAction } =
        await import("../../_actions/update-appointment");
      const result = await updateAppointmentAction(data?.id as string, values);
      if (result.ok) {
        toast.success("Agendamento atualizado!");
        onSuccess();
        modal.close();
      } else {
        toast.error("Erro ao atualizar.");
      }
    }
  }

  async function handleDelete() {
    if (!initialData?.id) return;
    const { deleteAppointmentAction } =
      await import("../../_actions/delete-appointment");
    const result = await deleteAppointmentAction(data?.id as string);
    if (result.ok) {
      toast.success("Agendamento cancelado!");
      onSuccess();
      modal.close();
    } else {
      toast.error("Erro ao cancelar.");
    }
  }

  return {
    modal,
    form,
    isCreate,
    selectedClientId,
    selectedProcedureId,
    onSubmit,
    handleDelete,
  };
}
