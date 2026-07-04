import { AppToaster } from "@/common/components/app-toaster";
import { PrivateShell } from "@/common/components/private-shell";
import { consumeFlashToast } from "@/common/lib/toast/flash-toast";

// TODO: ao clicar no item no menu laterial, ir para a listagem
// TODO: arrancar o header do layout deixar somente o menu lateral no desktop
// TODO: ajustar a tipagem de como pega os agendamentos no calendario
// TODO: criar cores padrões para os status de agendamento,

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
