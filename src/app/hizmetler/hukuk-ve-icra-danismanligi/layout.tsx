import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hukuk ve İcra Danışmanlığı",
  description: "Aidat borçlarının hukuki yollarla tahsili, sözleşme hazırlıkları ve genel kurul yasal süreç yönetimleri.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
