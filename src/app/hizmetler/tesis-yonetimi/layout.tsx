import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profesyonel Tesis Yönetimi",
  description: "Avm, plaza, site ve rezidanslar için aidat toplama, bütçe planlama ve tam kapsamlı idari yönetim.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
