import { cn } from "@/common/lib/utils";

type PageContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className={cn("flex flex-1 flex-col", className)}>{children}</div>
  );
}
