import { cn } from "@/common/lib/utils";

type PageRootProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageRoot({ children, className }: PageRootProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)}>
      {children}
    </div>
  );
}
