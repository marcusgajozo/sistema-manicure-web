"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { FormButton } from "@/common/components/form-button";
import { FormInput } from "@/common/components/form-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/common/components/shadcn-ui/card";
import { FieldError, FieldGroup } from "@/common/components/shadcn-ui/field";
import { createClientDtoSchema } from "@/common/services/api/clients/schemas";

import { createClientAction } from "../../_actions/create-client";

type CreateClientFormValues = z.infer<typeof createClientDtoSchema>;

export function NovoClienteForm() {
  const form = useForm<CreateClientFormValues>({
    resolver: zodResolver(createClientDtoSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const rootError = form.formState.errors.root?.message;

  async function onSubmit(values: CreateClientFormValues) {
    form.clearErrors("root");

    const result = await createClientAction(values);

    if (result?.error) {
      form.setError("root", { message: result.error });
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <h1 className="font-heading text-base leading-snug font-medium">
          Novo cliente
        </h1>
        <CardDescription>
          Cadastre um novo cliente com nome e telefone.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            <FormInput
              control={form.control}
              name="name"
              label="Nome"
              autoComplete="name"
              required
            />
            <FormInput
              control={form.control}
              name="phone"
              label="Telefone"
              type="tel"
              autoComplete="tel"
              placeholder="11999999999"
              required
            />
            {rootError ? <FieldError>{rootError}</FieldError> : null}
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <FormButton
            type="submit"
            className="w-full"
            loading={form.formState.isSubmitting}
            loadingText="Salvando..."
          >
            Salvar cliente
          </FormButton>
        </CardFooter>
      </form>
    </Card>
  );
}
