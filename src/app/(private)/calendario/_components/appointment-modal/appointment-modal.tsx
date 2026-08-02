"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { AppButton } from "@/common/components/app-button";
import { FormDatePicker } from "@/common/components/form-date-picker";
import { FormInput } from "@/common/components/form-input";
import { Modal, useModal } from "@/common/components/modal";
import { FormSelect } from "@/common/components/select";
import { FieldGroup } from "@/common/components/shadcn-ui/field";
import { createAppointmentDtoSchema } from "@/common/services/api/appointments/schemas";

export type AppointmentModalData = {
  mode: "create" | "edit";
  initialData: Record<string, unknown> | null;
};

type AppointmentValues = z.infer<typeof createAppointmentDtoSchema>;

export function AppointmentModal({
  onSuccess,
  clients,
  procedures,
}: {
  onSuccess: () => void;
  clients: { label: string; value: string }[];
  procedures: { label: string; value: string }[];
}) {
  const modal = useModal<AppointmentModalData>("appointment-modal");
  const mode = modal.data?.mode || "create";
  const initialData = modal.data?.initialData || null;
  const isCreate = mode === "create";

  const data = initialData as
    | (Partial<AppointmentValues> & { id?: string })
    | null;
  const form = useForm<AppointmentValues>({
    resolver: zodResolver(createAppointmentDtoSchema),
    defaultValues: {
      clientId: undefined,
      clientName: "",
      phoneClient: "",
      procedureId: undefined,
      procedureName: "",
      procedurePrice: undefined,
      procedureFollowUpDays: undefined,
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    if (modal.isOpen) {
      form.reset({
        clientId: data?.clientId || undefined,
        clientName: data?.clientName || "",
        phoneClient: data?.phoneClient || "",
        procedureId: data?.procedureId || undefined,
        procedureName: data?.procedureName || "",
        procedurePrice: data?.procedurePrice || undefined,
        procedureFollowUpDays: data?.procedureFollowUpDays || undefined,
        startDate: data?.startDate || new Date().toISOString(),
        endDate: data?.endDate || new Date().toISOString(),
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

  return (
    <Modal.Root
      open={modal.isOpen}
      onOpenChange={(open) => !open && modal.close()}
    >
      <Modal.Popup className="w-full sm:max-w-md">
        <Modal.Title>
          {isCreate ? "Novo Agendamento" : "Editar Agendamento"}
        </Modal.Title>
        <Modal.Description />

        <form
          onSubmit={form.handleSubmit(
            onSubmit as unknown as Parameters<typeof form.handleSubmit>[0],
          )}
          className="flex flex-col flex-1 overflow-hidden gap-4 py-2"
        >
          <div className="flex-1 overflow-y-auto px-1 -mx-1 space-y-4">
            <FieldGroup>
              <FormSelect
                control={form.control}
                name="clientId"
                label="Cliente Cadastrado"
                options={clients}
                placeholder="Selecione ou deixe em branco para avulso"
                noOptionsMessage="Nenhum cliente encontrado."
              />
              {!selectedClientId && (
                <div className="flex gap-4">
                  <FormInput
                    control={
                      form.control as unknown as React.ComponentProps<
                        typeof FormInput
                      >["control"]
                    }
                    name="clientName"
                    label="Nome do Cliente (Avulso)"
                    placeholder="Ex: Maria"
                  />
                  <FormInput
                    control={
                      form.control as unknown as React.ComponentProps<
                        typeof FormInput
                      >["control"]
                    }
                    name="phoneClient"
                    label="Telefone (Opcional)"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              )}

              <FormSelect
                control={form.control}
                name="procedureId"
                label="Serviço Cadastrado"
                options={procedures}
                placeholder="Selecione ou preencha manualmente"
                noOptionsMessage="Nenhum serviço encontrado."
              />
              {!selectedProcedureId && (
                <>
                  <FormInput
                    control={
                      form.control as unknown as React.ComponentProps<
                        typeof FormInput
                      >["control"]
                    }
                    name="procedureName"
                    label="Nome do Serviço (Avulso)"
                    placeholder="Ex: Manicure Simples"
                  />
                  <div className="flex gap-4">
                    <FormInput
                      control={
                        form.control as unknown as React.ComponentProps<
                          typeof FormInput
                        >["control"]
                      }
                      name="procedurePrice"
                      label="Preço (Opcional)"
                      type="number"
                      placeholder="Ex: 50"
                    />
                    <FormInput
                      control={
                        form.control as unknown as React.ComponentProps<
                          typeof FormInput
                        >["control"]
                      }
                      name="procedureFollowUpDays"
                      label="Retorno em dias (Opcional)"
                      type="number"
                      placeholder="Ex: 15"
                    />
                  </div>
                </>
              )}
              <FormDatePicker
                control={
                  form.control as unknown as React.ComponentProps<
                    typeof FormInput
                  >["control"]
                }
                name="startDate"
                label="Data/Hora Início"
                required
              />
              <FormDatePicker
                control={
                  form.control as unknown as React.ComponentProps<
                    typeof FormInput
                  >["control"]
                }
                name="endDate"
                label="Data/Hora Fim"
                required
              />
            </FieldGroup>
          </div>

          <Modal.Buttons className="mt-4 flex-col sm:flex-row gap-2 shrink-0">
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
            <Modal.ButtonClose
              render={<AppButton type="button" variant="outline" />}
            >
              Cancelar
            </Modal.ButtonClose>
            <AppButton
              type="submit"
              loading={form.formState.isSubmitting}
              loadingText="Salvando..."
            >
              {isCreate ? "Criar" : "Salvar"}
            </AppButton>
          </Modal.Buttons>
        </form>
      </Modal.Popup>
    </Modal.Root>
  );
}
