import type { Metadata } from "next";

import { NovoClienteForm } from "./_components/novo-cliente-form";

export const metadata: Metadata = {
  title: "Novo cliente",
};

export default function NovoClientePage() {
  return <NovoClienteForm />;
}
