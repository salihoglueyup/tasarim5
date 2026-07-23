import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hukuk ve İcra Danışmanlığı",
  description: "Aidat borçlarının hukuki yollarla tahsili, sözleşme hazırlıkları ve genel kurul yasal süreç yönetimleri.",
  openGraph: {
    title: "Hukuk ve İcra Danışmanlığı | Alo Yönetim",
    description: "Aidat borçlarının hukuki yollarla tahsili, sözleşme hazırlıkları ve genel kurul yasal süreç yönetimleri.",
    url: "https://aloyonetim.com/hizmetler/hukuk-ve-icra-danismanligi",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hukuk ve İcra Danışmanlığı | Alo Yönetim",
    description: "Aidat borçlarının hukuki yollarla tahsili, sözleşme hazırlıkları ve genel kurul yasal süreç yönetimleri.",
    images: ["/og-image.jpg"],
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
