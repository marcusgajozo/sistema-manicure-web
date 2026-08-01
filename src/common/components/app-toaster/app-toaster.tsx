"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";

import { consumeFlashToastAction } from "@/common/lib/toast/flash-toast-action";

type AppToasterProps = {
  flashMessage?: string | null;
};

export function AppToaster({ flashMessage = null }: AppToasterProps) {
  const pathname = usePathname();

  const initialFlashMessage = useRef(flashMessage);

  useEffect(() => {
    if (initialFlashMessage.current) {
      toast.error(initialFlashMessage.current);
      initialFlashMessage.current = null;
    }
  }, []);

  useEffect(() => {
    void consumeFlashToastAction().then((message) => {
      if (message) {
        toast.error(message);
      }
    });
  }, [pathname]);

  return <Toaster richColors closeButton position="top-right" />;
}
