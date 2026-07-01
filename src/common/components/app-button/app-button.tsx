"use client";

import { Icon } from "@/common/components/icon";
import { Button } from "@/common/components/shadcn-ui/button";
import { cn } from "@/common/lib/utils";

type AppButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
  loadingText?: string;
};

export function AppButton({
  children,
  loading = false,
  loadingText,
  disabled,
  className,
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Button
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(className)}
      {...props}
    >
      {loading ? (
        <>
          <Icon name="loader2" className="animate-spin" aria-hidden="true" />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
