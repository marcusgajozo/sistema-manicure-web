import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Select, type SelectProps } from "../select/select";

export type FormSelectProps<TFieldValues extends FieldValues> = Omit<
  SelectProps,
  "value" | "onChange" | "name"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
};

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  control,
  ...props
}: FormSelectProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...props}
          value={field.value}
          onChange={field.onChange}
          errorMessage={error?.message || props.errorMessage}
        />
      )}
    />
  );
}
