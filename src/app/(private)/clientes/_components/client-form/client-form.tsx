"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { FieldGroup } from "@/common/components/shadcn-ui/field";
import type { ActionResult } from "@/common/lib/toast/handle-action-result";
import { createClientDtoSchema } from "@/common/services/api/clients/schemas";

type ClientFormValues = z.infer<typeof createClientDtoSchema>;

type ClientFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  loadingText: string;
  defaultValues: ClientFormValues;
  onSubmit: (values: ClientFormValues) => Promise<ActionResult | void>;
};

export function ClientForm({
  title,
  description,
  submitLabel,
  loadingText,
  defaultValues,
  onSubmit,
}: ClientFormProps) {
  const router = useRouter();
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(createClientDtoSchema),
    defaultValues,
  });

  async function handleSubmit(values: ClientFormValues) {
    const result = await onSubmit(values);

    if (result && !result.ok) {
      router.refresh();
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <h1 className="font-heading text-base leading-snug font-medium">
          {title}
        </h1>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <FormButton
            type="submit"
            className="w-full"
            loading={form.formState.isSubmitting}
            loadingText={loadingText}
          >
            {submitLabel}
          </FormButton>
        </CardFooter>
      </form>
    </Card>
  );
}
