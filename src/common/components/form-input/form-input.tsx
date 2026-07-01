"use client";

import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/common/components/shadcn-ui/field";
import { Input } from "@/common/components/shadcn-ui/input";
import { cn } from "@/common/lib/utils";

type FormInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
};

export function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  autoComplete,
  description,
  placeholder,
  required,
  disabled,
  className,
  inputClassName,
}: FormInputProps<TFieldValues>) {
  const inputId = String(name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={!!fieldState.error} className={cn(className)}>
          <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
          <Input
            {...field}
            value={field.value ?? ""}
            onChange={(e) => {
              if (type === "number") {
                const val = e.target.value;
                field.onChange(val === "" ? undefined : Number(val));
              } else {
                field.onChange(e);
              }
            }}
            id={inputId}
            type={type}
            autoComplete={autoComplete}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            aria-invalid={!!fieldState.error}
            className={inputClassName}
          />
          {description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null}
          {fieldState.error?.message ? (
            <FieldError>{fieldState.error.message}</FieldError>
          ) : null}
        </Field>
      )}
    />
  );
}
