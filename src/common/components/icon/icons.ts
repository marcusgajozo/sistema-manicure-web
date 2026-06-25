import { Loader2Icon, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";

export const icons = {
  loader2: Loader2Icon,
} as const satisfies Record<string, ComponentType<LucideProps>>;

export type IconName = keyof typeof icons;
