import { Combobox } from "@base-ui/react/combobox";

import styles from "./select-trigger.module.css";

interface TriggerProps {
  id?: string;
  placeholder: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  isOpen?: boolean;
  isError?: boolean;
  required?: boolean;
}

export function SelectTrigger({
  id,
  placeholder,
  disabled,
  icon,
  isOpen,
  isError,
  required,
}: TriggerProps) {
  return (
    <Combobox.InputGroup
      className={`${styles.triggerWrapper} ${isError ? styles.error : ""}`.trim()}
    >
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      <Combobox.Input
        id={id}
        className={styles.searchInputTrigger}
        placeholder={placeholder}
        disabled={disabled}
        aria-required={required}
        required={required}
      />
      <Combobox.Trigger
        className={`${styles.chevronButton} ${isOpen ? styles.open : ""}`}
        disabled={disabled}
        tabIndex={-1}
      >
        <ChevronIcon className={styles.chevron} />
      </Combobox.Trigger>
    </Combobox.InputGroup>
  );
}

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
