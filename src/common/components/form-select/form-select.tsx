"use client";

import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Select, type SelectOption } from "@/common/components/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/common/components/shadcn-ui/field";
import { cn } from "@/common/lib/utils";

type FormSelectProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  options: SelectOption[];
  description?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export function FormSelect<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  description,
  placeholder,
  searchPlaceholder,
  emptyText,
  required,
  disabled,
  className,
}: FormSelectProps<TFieldValues>) {
  const inputId = String(name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={!!fieldState.error} className={cn(className)}>
          <FieldLabel htmlFor={inputId}>
            {label} {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Select
            options={options}
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            emptyText={emptyText}
            disabled={disabled}
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
