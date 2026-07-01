"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { AppButton } from "@/common/components/app-button";
import { FormInput } from "@/common/components/form-input";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/common/components/shadcn-ui/card";
import { FieldGroup } from "@/common/components/shadcn-ui/field";
import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { createProcedureDtoSchema } from "@/common/services/api/procedures/schemas";

type ProcedureFormValues = z.infer<typeof createProcedureDtoSchema>;

type ProcedureFormProps = {
  submitLabel: string;
  loadingText: string;
  defaultValues: ProcedureFormValues;
  onSubmit: (values: ProcedureFormValues) => Promise<ActionResult | void>;
};

export function ProcedureForm({
  submitLabel,
  loadingText,
  defaultValues,
  onSubmit,
}: ProcedureFormProps) {
  const router = useRouter();
  const form = useForm<ProcedureFormValues>({
    resolver: zodResolver(createProcedureDtoSchema),
    defaultValues,
  });

  async function handleSubmit(values: ProcedureFormValues) {
    const result = await onSubmit(values);

    if (result && !result.ok) {
      router.refresh();
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className="pt-6">
          <FieldGroup>
            <FormInput
              control={form.control}
              name="name"
              label="Nome"
              placeholder="Ex: Manicure simples"
              required
            />
            <FormInput
              control={form.control}
              name="description"
              label="Descrição"
              placeholder="Descrição opcional do procedimento"
            />
            <FormInput
              control={form.control}
              name="price"
              label="Preço (R$)"
              type="number"
              placeholder="0.00"
              required
            />
            <FormInput
              control={form.control}
              name="durationMinutes"
              label="Duração (minutos)"
              type="number"
              placeholder="60"
              required
            />
            <FormInput
              control={form.control}
              name="returnDays"
              label="Dias para retorno"
              type="number"
              placeholder="30"
              required
            />
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <AppButton
            type="submit"
            className="w-full"
            loading={form.formState.isSubmitting}
            loadingText={loadingText}
          >
            {submitLabel}
          </AppButton>
        </CardFooter>
      </form>
    </Card>
  );
}
