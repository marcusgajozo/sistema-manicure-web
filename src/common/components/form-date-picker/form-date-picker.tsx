"use client";

import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { DatePicker } from "@/common/components/date-picker";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/common/components/shadcn-ui/field";
import { cn } from "@/common/lib/utils";

type FormDatePickerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export function FormDatePicker<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  required,
  disabled,
  className,
}: FormDatePickerProps<TFieldValues>) {
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
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
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
