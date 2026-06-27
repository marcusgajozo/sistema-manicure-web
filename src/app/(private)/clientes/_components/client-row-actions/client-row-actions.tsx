"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteClientAction } from "@/app/(private)/clientes/_actions/delete-client";
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
import type { Client } from "@/common/services/api/clients/schemas";

type ClientRowActionsProps = {
  client: Pick<Client, "id" | "name">;
};

export function ClientRowActions({ client }: ClientRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    const result = await deleteClientAction(client.id);

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
            href={generateUrl(APP_ROUTES.clientes.edit, { id: client.id })}
          />
        }
        aria-label={`Editar ${client.name}`}
      >
        <Icon name="pencil" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Remover ${client.name}`}
            />
          }
        >
          <Icon name="trash2" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover cliente</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover {client.name}? Esta ação não pode
              ser desfeita.
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
