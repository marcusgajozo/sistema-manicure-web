"use client";

import { AppButton } from "@/common/components/app-button";
import { FormDatePicker } from "@/common/components/form-date-picker";
import { FormInput } from "@/common/components/form-input";
import { Modal } from "@/common/components/modal";
import { FormSelect } from "@/common/components/select";
import { FieldGroup } from "@/common/components/shadcn-ui/field";

import { useAppointmentModal } from "./hooks/use-appointment-modal";

export function AppointmentModal() {
  const {
    modal,
    form,
    isCreate,
    selectedClientId,
    selectedProcedureId,
    onSubmit,
    handleDelete,
  } = useAppointmentModal();

  return (
    <Modal.Root
      open={modal.isOpen}
      onOpenChange={(open) => !open && modal.close()}
    >
      <Modal.Popup>
        <Modal.Title>
          {isCreate ? "Novo Agendamento" : "Editar Agendamento"}
        </Modal.Title>

        <form
          onSubmit={form.handleSubmit(
            onSubmit as unknown as Parameters<typeof form.handleSubmit>[0],
          )}
          className="flex flex-col flex-1 gap-4 py-2"
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

          <Modal.Buttons>
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
