import type { LucideProps } from "lucide-react";

import { cn } from "@/common/lib/utils";

import { type IconName, icons } from "./icons";

type IconProps = LucideProps & {
  name: IconName;
};

export function Icon({ name, className, ...props }: IconProps) {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      data-slot="icon"
      className={cn("size-4 shrink-0", className)}
      {...props}
    />
  );
}

export type { IconName };
