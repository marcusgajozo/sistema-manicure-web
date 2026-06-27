import { AppToaster } from "@/common/components/app-toaster";
import { PrivateShell } from "@/common/components/private-shell";
import { consumeFlashToast } from "@/common/lib/toast/flash-toast";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const flashMessage = await consumeFlashToast();

  return (
    <>
      <PrivateShell>{children}</PrivateShell>
      <AppToaster flashMessage={flashMessage} />
    </>
  );
}
