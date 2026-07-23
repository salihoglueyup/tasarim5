import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profesyonel Tesis Yönetimi",
  description: "Avm, plaza, site ve rezidanslar için aidat toplama, bütçe planlama ve tam kapsamlı idari yönetim.",
  openGraph: {
    title: "Profesyonel Tesis Yönetimi | Alo Yönetim",
    description: "Avm, plaza, site ve rezidanslar için aidat toplama, bütçe planlama ve tam kapsamlı idari yönetim.",
    url: "https://aloyonetim.com/hizmetler/tesis-yonetimi",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Profesyonel Tesis Yönetimi | Alo Yönetim",
    description: "Avm, plaza, site ve rezidanslar için aidat toplama, bütçe planlama ve tam kapsamlı idari yönetim.",
    images: ["/og-image.jpg"],
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
