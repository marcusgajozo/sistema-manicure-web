"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/common/components/shadcn-ui/button";
import { cn } from "@/common/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  showBackButton?: boolean;
  backHref?: string;
  children?: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  className,
  showBackButton = false,
  backHref,
  children,
}: PageHeaderProps) {
  const router = useRouter();

  function handleBack() {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  }

  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            aria-label="Voltar para a página anterior"
          >
            <ChevronLeft data-icon="inline-start" />
          </Button>
        )}

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {children && (
        <div className="flex shrink-0 items-center gap-2">{children}</div>
      )}
    </div>
  );
}
