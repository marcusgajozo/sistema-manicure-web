import { PrivateShell } from "@/common/components/private-shell";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PrivateShell>{children}</PrivateShell>;
}
