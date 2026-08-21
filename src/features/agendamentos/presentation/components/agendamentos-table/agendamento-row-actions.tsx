"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Icon } from "@/common/components/icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/shadcn-ui/alert-dialog";
import { Button } from "@/common/components/shadcn-ui/button";
import { APP_ROUTES, generateUrl } from "@/common/lib/navigation/routes";

import { deleteAppointmentAction } from "../../actions/delete-appointment";
import type { AgendamentoListItemViewModel } from "../../view-models/agendamento.view-model";

type AgendamentoRowActionsProps = {
  agendamento: Pick<AgendamentoListItemViewModel, "id" | "clientName">;
};

export function AgendamentoRowActions({
  agendamento,
}: AgendamentoRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    const result = await deleteAppointmentAction(agendamento.id);

    setIsDeleting(false);

    if (!result.ok) {
      router.refresh();
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        nativeButton={false}
        render={
          <Link
            href={generateUrl(APP_ROUTES.agendamentos.edit, {
              id: agendamento.id,
            })}
          />
        }
        aria-label={`Editar ${agendamento.clientName}`}
      >
        <Icon name="pencil" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Remover ${agendamento.clientName}`}
            />
          }
        >
          <Icon name="trash2" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover agendamento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover o agendamento de{" "}
              {agendamento.clientName}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={() => void handleDelete()}
            >
              {isDeleting ? "Removendo..." : "Remover"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
