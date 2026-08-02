"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { AppButton } from "@/common/components/app-button";
import { FormDatePicker } from "@/common/components/form-date-picker";
import { FormInput } from "@/common/components/form-input";
import { Modal, useModal } from "@/common/components/modal";
import { FieldGroup } from "@/common/components/shadcn-ui/field";
import { createTimeOffDtoSchema } from "@/common/services/api/time-offs/schemas";

export type TimeOffModalData = {
  mode: "create" | "edit";
  initialData: Record<string, unknown> | null;
};

type TimeOffValues = z.infer<typeof createTimeOffDtoSchema>;

export function TimeOffModal({ onSuccess }: { onSuccess: () => void }) {
  const modal = useModal<TimeOffModalData>("time-off-modal");
  const mode = modal.data?.mode || "create";
  const initialData = modal.data?.initialData || null;
  const isCreate = mode === "create";

  const data = initialData as (Partial<TimeOffValues> & { id?: string }) | null;
  const form = useForm<TimeOffValues>({
    resolver: zodResolver(createTimeOffDtoSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      reason: "",
    },
  });

  useEffect(() => {
    if (modal.isOpen) {
      form.reset({
        startDate: data?.startDate || new Date().toISOString(),
        endDate: data?.endDate || new Date().toISOString(),
        reason: data?.reason || "",
      });
    }
  }, [modal.isOpen, data, form]);

  async function onSubmit(values: TimeOffValues) {
    if (isCreate) {
      const { createTimeOffAction } =
        await import("../../_actions/create-time-off");
      const result = await createTimeOffAction(values);
      if (result.ok) {
        toast.success("Ausência criada com sucesso!");
        onSuccess();
        modal.close();
      } else {
        toast.error("Erro ao criar ausência.");
      }
    } else {
      const { updateTimeOffAction } =
        await import("../../_actions/update-time-off");
      const result = await updateTimeOffAction(data?.id as string, values);
      if (result.ok) {
        toast.success("Ausência atualizada!");
        onSuccess();
        modal.close();
      } else {
        toast.error("Erro ao atualizar.");
      }
    }
  }

  async function handleDelete() {
    if (!initialData?.id) return;
    const { deleteTimeOffAction } =
      await import("../../_actions/delete-time-off");
    const result = await deleteTimeOffAction(data?.id as string);
    if (result.ok) {
      toast.success("Ausência removida!");
      onSuccess();
      modal.close();
    } else {
      toast.error("Erro ao remover.");
    }
  }

  return (
    <Modal.Root
      open={modal.isOpen}
      onOpenChange={(open) => !open && modal.close()}
    >
      <Modal.Popup className="w-full sm:max-w-md">
        <Modal.Title>
          {isCreate ? "Nova Ausência" : "Editar Ausência"}
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
              <FormInput
                control={
                  form.control as unknown as React.ComponentProps<
                    typeof FormInput
                  >["control"]
                }
                name="reason"
                label="Motivo"
                placeholder="Ex: Almoço, Férias..."
                required
              />
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
