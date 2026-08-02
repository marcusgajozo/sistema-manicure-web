import { Controller, useFormContext } from "react-hook-form";

import { Select, type SelectProps } from "../select/select";

export interface FormSelectProps extends Omit<
  SelectProps,
  "value" | "onChange" | "name"
> {
  name: string;
}

export function FormSelect({ name, ...props }: FormSelectProps) {
  const { control } = useFormContext();

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
