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
import { signInDtoSchema } from "@/common/services/api/authentication/schemas";

import { signInAction } from "../../_actions/sign-in";

type SignInFormValues = z.infer<typeof signInDtoSchema>;

export function LoginForm() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInDtoSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const rootError = form.formState.errors.root?.message;

  async function onSubmit(values: SignInFormValues) {
    form.clearErrors("root");

    const result = await signInAction(values);

    if (result?.error) {
      form.setError("root", { message: result.error });
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h1 className="font-heading text-base leading-snug font-medium">
          Entrar
        </h1>
        <CardDescription>
          Acesse o sistema com seu e-mail e senha.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            <FormInput
              control={form.control}
              name="email"
              label="E-mail"
              type="email"
              autoComplete="email"
              required
            />
            <FormInput
              control={form.control}
              name="password"
              label="Senha"
              type="password"
              autoComplete="current-password"
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
            loadingText="Entrando..."
          >
            Entrar
          </FormButton>
        </CardFooter>
      </form>
    </Card>
  );
}
