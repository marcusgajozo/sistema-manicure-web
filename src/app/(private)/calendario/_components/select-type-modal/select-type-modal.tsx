"use client";

import { AppButton } from "@/common/components/app-button";
import { Modal, useModal } from "@/common/components/modal";

export type SelectTypeModalData = {
  initialData: Record<string, unknown> | null;
};

export function SelectTypeModal() {
  const modal = useModal<SelectTypeModalData>("select-type-modal");
  const appointmentModal = useModal("appointment-modal");
  const timeOffModal = useModal("time-off-modal");

  return (
    <Modal.Root
      open={modal.isOpen}
      onOpenChange={(open) => !open && modal.close()}
    >
      <Modal.Popup className="sm:max-w-md">
        <Modal.Title>Novo Evento</Modal.Title>
        <Modal.Description>
          Escolha o tipo de evento que deseja criar.
        </Modal.Description>

        <div className="flex flex-col gap-3 py-4">
          <AppButton
            variant="outline"
            onClick={() => {
              modal.close();
              appointmentModal.open({
                mode: "create",
                initialData: modal.data?.initialData,
              });
            }}
          >
            Agendamento
          </AppButton>
          <AppButton
            variant="outline"
            onClick={() => {
              modal.close();
              timeOffModal.open({
                mode: "create",
                initialData: modal.data?.initialData,
              });
            }}
          >
            Ausência (Bloquear agenda)
          </AppButton>
        </div>
      </Modal.Popup>
    </Modal.Root>
  );
}
