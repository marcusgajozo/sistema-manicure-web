"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import type { z } from "zod";

import { AppButton } from "@/common/components/app-button";
import { FormDatePicker } from "@/common/components/form-date-picker";
import { FormInput } from "@/common/components/form-input";
import { FormSelect } from "@/common/components/select";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/common/components/shadcn-ui/card";
import { FieldGroup } from "@/common/components/shadcn-ui/field";
import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { createAppointmentDtoSchema } from "@/common/services/api/appointments/schemas";

type AgendamentoFormValues = z.infer<typeof createAppointmentDtoSchema>;

type Option = { value: string; label: string };

type AgendamentoFormProps = {
  submitLabel: string;
  loadingText: string;
  defaultValues: Partial<AgendamentoFormValues>;
  clientOptions: Option[];
  procedureOptions: Option[];
  onSubmit: (values: AgendamentoFormValues) => Promise<ActionResult | void>;
};

export function AgendamentoForm({
  submitLabel,
  loadingText,
  defaultValues,
  clientOptions,
  procedureOptions,
  onSubmit,
}: AgendamentoFormProps) {
  const router = useRouter();
  const form = useForm<AgendamentoFormValues>({
    resolver: zodResolver(createAppointmentDtoSchema),
    defaultValues: {
      clientName: "",
      phoneClient: "",
      procedureName: "",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      ...defaultValues,
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

  async function handleSubmit(values: AgendamentoFormValues) {
    const result = await onSubmit(values);

    if (result && !result.ok) {
      router.refresh();
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent>
          <FieldGroup>
            <FormSelect
              control={form.control}
              name="clientId"
              label="Cliente Cadastrado"
              options={clientOptions}
              placeholder="Selecione ou deixe em branco para avulso"
              noOptionsMessage="Nenhum cliente encontrado."
            />
            {!selectedClientId && (
              <div className="flex gap-4">
                <FormInput
                  control={form.control}
                  name="clientName"
                  label="Nome do Cliente (Avulso)"
                  placeholder="Ex: Maria"
                />
                <FormInput
                  control={form.control}
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
              options={procedureOptions}
              placeholder="Selecione ou preencha manualmente"
              noOptionsMessage="Nenhum serviço encontrado."
            />
            {!selectedProcedureId && (
              <>
                <FormInput
                  control={form.control}
                  name="procedureName"
                  label="Nome do Serviço (Avulso)"
                  placeholder="Ex: Manicure Simples"
                />
                <div className="flex gap-4">
                  <FormInput
                    control={form.control}
                    name="procedurePrice"
                    label="Preço (Opcional)"
                    type="number"
                    placeholder="Ex: 50"
                  />
                  <FormInput
                    control={form.control}
                    name="procedureFollowUpDays"
                    label="Retorno em dias (Opcional)"
                    type="number"
                    placeholder="Ex: 15"
                  />
                </div>
              </>
            )}
            <FormDatePicker
              control={form.control}
              name="startDate"
              label="Data/Hora Início"
              required
            />
            <FormDatePicker
              control={form.control}
              name="endDate"
              label="Data/Hora Fim"
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
