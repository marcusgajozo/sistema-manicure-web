"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

import { AppButton } from "@/common/components/app-button";
import { Modal, useModal } from "@/common/components/modal";

import { getNotificationTemplatesAction } from "../../actions/get-notification-templates";

export type NotificationModalData = {
  initialData: Record<string, unknown> | null;
};

export function NotificationModal({ onSuccess }: { onSuccess: () => void }) {
  const modal = useModal<NotificationModalData>("notification-modal");
  const initialData = modal.data?.initialData || null;

  const [template, setTemplate] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTemplates() {
      if (!initialData) return;
      const res = await getNotificationTemplatesAction();
      const templates =
        (res as { data?: Array<Record<string, unknown>> }).data || [];
      const type = initialData?.type || "REMINDER";
      const matched = templates.find(
        (t: Record<string, unknown>) => t.type === type,
      );
      setTemplate(matched);
      setLoading(false);
    }

    if (modal.isOpen) {
      void loadTemplates();
    } else {
      setTimeout(() => {
        setLoading(true);
        setTemplate(null);
      }, 0);
    }
  }, [modal.isOpen, initialData]);

  const appointment =
    ((initialData as Record<string, unknown>)?.appointment as Record<
      string,
      unknown
    >) || (initialData as Record<string, unknown>);
  const clientName = appointment?.clientName || "Cliente";
  const dateStr = appointment?.startDate
    ? format(new Date(appointment.startDate as string), "dd/MM/yyyy")
    : "";
  const timeStr = appointment?.startDate
    ? format(new Date(appointment.startDate as string), "HH:mm")
    : "";
  const procedureName = appointment?.procedureName || "";
  const procedurePrice = appointment?.procedurePrice || "";
  const phoneClient = appointment?.phoneClient || "";

  let message = (template as { content?: string })?.content || "";
  message = message.replace(/{{clientName}}/g, String(clientName));
  message = message.replace(/{{time}}/g, timeStr);
  message = message.replace(/{{date}}/g, dateStr);
  message = message.replace(/{{procedureName}}/g, String(procedureName));
  message = message.replace(/{{procedurePrice}}/g, String(procedurePrice));

  let phoneStr = String(phoneClient).replace(/\D/g, "");
  if (phoneStr && !phoneStr.startsWith("55") && phoneStr.length <= 11) {
    phoneStr = "55" + phoneStr;
  }
  const waLink = `https://wa.me/${phoneStr}?text=${encodeURIComponent(message)}`;

  return (
    <Modal.Root
      open={modal.isOpen}
      onOpenChange={(open) => !open && modal.close()}
    >
      <Modal.Popup className="sm:max-w-md">
        <Modal.Title>Enviar Notificação</Modal.Title>
        <Modal.Description />

        {loading ? (
          <div className="p-4 text-center text-sm text-muted-foreground animate-pulse">
            Carregando template...
          </div>
        ) : !template ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Template não encontrado para este tipo de notificação.
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-4">
            <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
              {message}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Modal.ButtonClose
                render={<AppButton type="button" variant="outline" />}
              >
                Cancelar
              </Modal.ButtonClose>
              <AppButton
                onClick={() => {
                  window.open(waLink, "_blank");
                  onSuccess();
                  modal.close();
                }}
                disabled={!phoneStr}
              >
                Notificar no WhatsApp
              </AppButton>
            </div>
          </div>
        )}
      </Modal.Popup>
    </Modal.Root>
  );
}
