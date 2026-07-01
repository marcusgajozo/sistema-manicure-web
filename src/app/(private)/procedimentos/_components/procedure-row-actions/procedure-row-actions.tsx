"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteProcedureAction } from "@/app/(private)/procedimentos/_actions/delete-procedure";
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
import type { Procedure } from "@/common/services/api/procedures/schemas";

type ProcedureRowActionsProps = {
  procedure: Pick<Procedure, "id" | "name">;
};

export function ProcedureRowActions({ procedure }: ProcedureRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    const result = await deleteProcedureAction(procedure.id);

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
            href={generateUrl(APP_ROUTES.procedimentos.edit, {
              id: procedure.id,
            })}
          />
        }
        aria-label={`Editar ${procedure.name}`}
      >
        <Icon name="pencil" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Remover ${procedure.name}`}
            />
          }
        >
          <Icon name="trash2" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover procedimento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover {procedure.name}? Esta ação não
              pode ser desfeita.
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
