/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { AppButton } from "@/common/components/app-button";
import { FormDatePicker } from "@/common/components/form-date-picker";
import { FormInput } from "@/common/components/form-input";
import { FormSelect } from "@/common/components/form-select";
import { Modal } from "@/common/components/modal";
import { FieldGroup } from "@/common/components/shadcn-ui/field";
import { createAppointmentDtoSchema } from "@/common/services/api/appointments/schemas";
import { createTimeOffDtoSchema } from "@/common/services/api/time-offs/schemas";

// I'll fix imports later

type EventModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  modalState: {
    mode: "create" | "edit";
    eventType: "appointment" | "time-off" | "select-type" | "notification";
    initialData: Record<string, unknown> | null;
  };
  setModalState: (state: {
    isOpen: boolean;
    mode: "create" | "edit";
    eventType: "appointment" | "time-off" | "select-type" | "notification";
    initialData: Record<string, unknown> | null;
  }) => void;
  onSuccess: () => void;
  clients: { label: string; value: string }[];
  procedures: { label: string; value: string }[];
};

export function EventModal({
  isOpen,
  onOpenChange,
  modalState,
  setModalState,
  onSuccess,
  clients,
  procedures,
}: EventModalProps) {
  const isCreate = modalState.mode === "create";

  return (
    <Modal.Root open={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content className="sm:max-w-md">
        <Modal.Header>
          <Modal.Title>
            {modalState.eventType === "select-type" && "Novo Evento"}
            {modalState.eventType === "time-off" &&
              (isCreate ? "Nova Ausência" : "Editar Ausência")}
            {modalState.eventType === "appointment" &&
              (isCreate ? "Novo Agendamento" : "Editar Agendamento")}
            {modalState.eventType === "notification" && "Enviar Notificação"}
          </Modal.Title>
          <Modal.Description>
            {modalState.eventType === "select-type" &&
              "Escolha o tipo de evento que deseja criar."}
          </Modal.Description>
        </Modal.Header>

        {modalState.eventType === "select-type" && (
          <div className="flex flex-col gap-3 py-4">
            <AppButton
              variant="outline"
              onClick={() =>
                setModalState({
                  ...modalState,
                  eventType: "appointment",
                  isOpen: true,
                })
              }
            >
              Agendamento
            </AppButton>
            <AppButton
              variant="outline"
              onClick={() =>
                setModalState({
                  ...modalState,
                  eventType: "time-off",
                  isOpen: true,
                })
              }
            >
              Ausência (Bloquear agenda)
            </AppButton>
          </div>
        )}

        {modalState.eventType === "time-off" && (
          <TimeOffForm
            isCreate={isCreate}
            initialData={modalState.initialData}
            onSuccess={() => {
              onSuccess();
              onOpenChange(false);
            }}
          />
        )}

        {modalState.eventType === "appointment" && (
          <AppointmentForm
            isCreate={isCreate}
            initialData={modalState.initialData}
            clients={clients}
            procedures={procedures}
            onSuccess={() => {
              onSuccess();
              onOpenChange(false);
            }}
          />
        )}

        {modalState.eventType === "notification" && (
          <NotificationForm
            initialData={modalState.initialData}
            onSuccess={() => {
              onSuccess();
              onOpenChange(false);
            }}
          />
        )}
      </Modal.Content>
    </Modal.Root>
  );
}

// --- TimeOff Form ---
type TimeOffValues = z.infer<typeof createTimeOffDtoSchema>;

function TimeOffForm({
  isCreate,
  initialData,
  onSuccess,
}: {
  isCreate: boolean;
  initialData: Record<string, unknown> | null;
  onSuccess: () => void;
}) {
  const data = initialData as any;
  const form = useForm<TimeOffValues>({
    resolver: zodResolver(createTimeOffDtoSchema),
    defaultValues: {
      startDate: data?.startDate || new Date().toISOString(),
      endDate: data?.endDate || new Date().toISOString(),
      reason: data?.reason || "",
    },
  });

  async function onSubmit(values: TimeOffValues) {
    if (isCreate) {
      const { createTimeOffAction } =
        await import("../../_actions/create-time-off");
      const result = await createTimeOffAction(values);
      if (result.ok) {
        toast.success("Ausência criada com sucesso!");
        onSuccess();
      } else {
        toast.error("Erro ao criar ausência.");
      }
    } else {
      const { updateTimeOffAction } =
        await import("../../_actions/update-time-off");
      const result = await updateTimeOffAction((initialData as any).id, values);
      if (result.ok) {
        toast.success("Ausência atualizada!");
        onSuccess();
      } else {
        toast.error("Erro ao atualizar.");
      }
    }
  }

  async function handleDelete() {
    if (!initialData?.id) return;
    const { deleteTimeOffAction } =
      await import("../../_actions/delete-time-off");
    const result = await deleteTimeOffAction((initialData as any).id);
    if (result.ok) {
      toast.success("Ausência removida!");
      onSuccess();
    } else {
      toast.error("Erro ao remover.");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit as any)}
      className="flex flex-col flex-1 overflow-hidden gap-4 py-2"
    >
      <div className="flex-1 overflow-y-auto px-1 -mx-1 space-y-4">
        <FieldGroup>
          <FormInput
            control={form.control as any}
            name="reason"
            label="Motivo"
            placeholder="Ex: Almoço, Férias..."
            required
          />
          <FormDatePicker
            control={form.control as any}
            name="startDate"
            label="Data/Hora Início"
            required
          />
          <FormDatePicker
            control={form.control as any}
            name="endDate"
            label="Data/Hora Fim"
            required
          />
        </FieldGroup>
      </div>

      <Modal.Footer className="mt-4 flex-col sm:flex-row gap-2 shrink-0">
        {!isCreate && (
          <AppButton
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="sm:mr-auto"
          >
            Excluir
          </AppButton>
        )}
        <Modal.Close render={<AppButton type="button" variant="outline" />}>
          Cancelar
        </Modal.Close>
        <AppButton
          type="submit"
          loading={form.formState.isSubmitting}
          loadingText="Salvando..."
        >
          {isCreate ? "Criar" : "Salvar"}
        </AppButton>
      </Modal.Footer>
    </form>
  );
}

// --- Appointment Form ---
type AppointmentValues = z.infer<typeof createAppointmentDtoSchema>;

function AppointmentForm({
  isCreate,
  initialData,
  onSuccess,
  clients,
  procedures,
}: {
  isCreate: boolean;
  initialData: Record<string, unknown> | null;
  onSuccess: () => void;
  clients: { label: string; value: string }[];
  procedures: { label: string; value: string }[];
}) {
  const data = initialData as any;
  const form = useForm<AppointmentValues>({
    resolver: zodResolver(createAppointmentDtoSchema),
    defaultValues: {
      clientId: data?.clientId || undefined,
      clientName: data?.clientName || "",
      phoneClient: data?.phoneClient || "",
      procedureId: data?.procedureId || undefined,
      procedureName: data?.procedureName || "",
      procedurePrice: data?.procedurePrice || undefined,
      procedureFollowUpDays: data?.procedureFollowUpDays || undefined,
      startDate: data?.startDate || new Date().toISOString(),
      endDate: data?.endDate || new Date().toISOString(),
    },
  });

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
      } else {
        toast.error("Erro ao criar agendamento.");
      }
    } else {
      const { updateAppointmentAction } =
        await import("../../_actions/update-appointment");
      const result = await updateAppointmentAction(
        (initialData as any).id,
        values,
      );
      if (result.ok) {
        toast.success("Agendamento atualizado!");
        onSuccess();
      } else {
        toast.error("Erro ao atualizar.");
      }
    }
  }

  async function handleDelete() {
    if (!initialData?.id) return;
    const { deleteAppointmentAction } =
      await import("../../_actions/delete-appointment");
    const result = await deleteAppointmentAction((initialData as any).id);
    if (result.ok) {
      toast.success("Agendamento cancelado!");
      onSuccess();
    } else {
      toast.error("Erro ao cancelar.");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit as any)}
      className="flex flex-col flex-1 overflow-hidden gap-4 py-2"
    >
      <div className="flex-1 overflow-y-auto px-1 -mx-1 space-y-4">
        <FieldGroup>
          <FormSelect
            control={form.control as any}
            name="clientId"
            label="Cliente Cadastrado"
            options={clients}
            placeholder="Selecione ou deixe em branco para avulso"
            searchPlaceholder="Buscar cliente..."
            emptyText="Nenhum cliente encontrado."
          />
          {!selectedClientId && (
            <div className="flex gap-4">
              <FormInput
                control={form.control as any}
                name="clientName"
                label="Nome do Cliente (Avulso)"
                placeholder="Ex: Maria"
              />
              <FormInput
                control={form.control as any}
                name="phoneClient"
                label="Telefone (Opcional)"
                placeholder="(11) 99999-9999"
              />
            </div>
          )}

          <FormSelect
            control={form.control as any}
            name="procedureId"
            label="Serviço Cadastrado"
            options={procedures}
            placeholder="Selecione ou preencha manualmente"
            searchPlaceholder="Buscar serviço..."
            emptyText="Nenhum serviço encontrado."
          />
          {!selectedProcedureId && (
            <>
              <FormInput
                control={form.control as any}
                name="procedureName"
                label="Nome do Serviço (Avulso)"
                placeholder="Ex: Manicure Simples"
              />
              <div className="flex gap-4">
                <FormInput
                  control={form.control as any}
                  name="procedurePrice"
                  label="Preço (Opcional)"
                  type="number"
                  placeholder="Ex: 50"
                />
                <FormInput
                  control={form.control as any}
                  name="procedureFollowUpDays"
                  label="Retorno em dias (Opcional)"
                  type="number"
                  placeholder="Ex: 15"
                />
              </div>
            </>
          )}
          <FormDatePicker
            control={form.control as any}
            name="startDate"
            label="Data/Hora Início"
            required
          />
          <FormDatePicker
            control={form.control as any}
            name="endDate"
            label="Data/Hora Fim"
            required
          />
        </FieldGroup>
      </div>

      <Modal.Footer className="mt-4 flex-col sm:flex-row gap-2 shrink-0">
        {!isCreate && (
          <AppButton
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="sm:mr-auto"
          >
            Excluir
          </AppButton>
        )}
        <Modal.Close render={<AppButton type="button" variant="outline" />}>
          Cancelar
        </Modal.Close>
        <AppButton
          type="submit"
          loading={form.formState.isSubmitting}
          loadingText="Salvando..."
        >
          {isCreate ? "Criar" : "Salvar"}
        </AppButton>
      </Modal.Footer>
    </form>
  );
}

// --- Notification Form ---

function NotificationForm({
  initialData,
  onSuccess,
}: {
  initialData: Record<string, unknown> | null;
  onSuccess: () => void;
}) {
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTemplates() {
      const { getNotificationTemplatesAction } =
        await import("../../_actions/get-notification-templates");
      const res = await getNotificationTemplatesAction();
      const templates = (res as any).data || [];
      const type = (initialData as any)?.type || "REMINDER";
      const matched = templates.find((t: any) => t.type === type);
      setTemplate(matched);
      setLoading(false);
    }
    void loadTemplates();
  }, [initialData]);

  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground animate-pulse">
        Carregando template...
      </div>
    );
  }

  if (!template) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Template não encontrado para este tipo de notificação.
      </div>
    );
  }

  const appointment = (initialData as any)?.appointment || initialData;
  const clientName = appointment?.clientName || "Cliente";
  const dateStr = appointment?.startDate
    ? format(new Date(appointment.startDate), "dd/MM/yyyy")
    : "";
  const timeStr = appointment?.startDate
    ? format(new Date(appointment.startDate), "HH:mm")
    : "";
  const procedureName = appointment?.procedureName || "";
  const procedurePrice = appointment?.procedurePrice || "";
  const phoneClient = appointment?.phoneClient || "";

  let message = template.content || "";
  message = message.replace(/{{clientName}}/g, clientName);
  message = message.replace(/{{time}}/g, timeStr);
  message = message.replace(/{{date}}/g, dateStr);
  message = message.replace(/{{procedureName}}/g, procedureName);
  message = message.replace(/{{procedurePrice}}/g, String(procedurePrice));

  let phoneStr = String(phoneClient).replace(/\D/g, "");
  if (phoneStr && !phoneStr.startsWith("55") && phoneStr.length <= 11) {
    phoneStr = "55" + phoneStr;
  }
  const waLink = `https://wa.me/${phoneStr}?text=${encodeURIComponent(message)}`;

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
        {message}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Modal.Close render={<AppButton type="button" variant="outline" />}>
          Cancelar
        </Modal.Close>
        <AppButton
          onClick={() => {
            window.open(waLink, "_blank");
            onSuccess();
          }}
          disabled={!phoneStr}
        >
          Notificar no WhatsApp
        </AppButton>
      </div>
    </div>
  );
}
