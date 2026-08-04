import "../../theme.css";

import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import resetStyles from "../../reset.module.css";
import { SelectDropdown } from "../select-dropdown";
import { SelectTrigger } from "../select-trigger";
import styles from "./select.module.css";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  label?: string;
  description?: string;
  required?: boolean;
  showRequiredText?: boolean;
  noOptionsMessage?: string;
  icon?: React.ReactNode;
  errorMessage?: string;
  readOnly?: boolean;
}

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select...",
  disabled = false,
  id,
  className,
  label,
  description,
  required = false,
  showRequiredText = false,
  noOptionsMessage = "Nenhuma opção encontrada",
  icon,
  errorMessage,
  readOnly = false,
}: SelectProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const selectedValue = isControlled ? value : internalValue;

  const selectedObj = React.useMemo(
    () => options.find((o) => o.value === selectedValue) || null,
    [options, selectedValue],
  );

  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleValueChange = React.useCallback(
    (val: Option | null) => {
      const newVal = val ? val.value : "";
      if (!isControlled) setInternalValue(newVal);
      if (onChange) onChange(newVal);
    },
    [isControlled, onChange],
  );

  const filteredOptions = React.useMemo(() => {
    if (selectedObj && inputValue === selectedObj.label) {
      return options;
    }
    return options.filter((o) =>
      o.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [options, inputValue, selectedObj]);

  return (
    <div
      className={[
        resetStyles.base,
        styles.container,
        disabled ? styles.disabled : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}{" "}
          {showRequiredText && (
            <span className={styles.required}>
              {required ? "(obrigatório)" : "(opcional)"}
            </span>
          )}
        </label>
      )}
      {description && <span className={styles.description}>{description}</span>}

      {readOnly ? (
        <p className={styles.viewText}>{selectedObj?.label || "-"}</p>
      ) : (
        <Combobox.Root
          value={selectedObj}
          onValueChange={handleValueChange}
          inputValue={inputValue}
          onInputValueChange={setInputValue}
          disabled={disabled}
          open={open}
          onOpenChange={setOpen}
        >
          <SelectTrigger
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            icon={icon}
            isOpen={open}
            isError={Boolean(errorMessage)}
            required={required}
          />
          {!disabled && (
            <SelectDropdown
              options={filteredOptions}
              noOptionsMessage={noOptionsMessage}
            />
          )}
        </Combobox.Root>
      )}
      {errorMessage && !readOnly && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}
