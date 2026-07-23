import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profesyonel Güvenlik Yönetimi",
  description: "Sertifikalı güvenlik personeli, 7/24 kamera takibi ve devriye hizmetleri ile sitenizi veya tesisinizi güvence altına alıyoruz.",
  openGraph: {
    title: "Profesyonel Güvenlik Yönetimi | Alo Yönetim",
    description: "Sertifikalı güvenlik personeli, 7/24 kamera takibi ve devriye hizmetleri ile sitenizi veya tesisinizi güvence altına alıyoruz.",
    url: "https://aloyonetim.com/hizmetler/guvenlik-yonetimi",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Profesyonel Güvenlik Yönetimi | Alo Yönetim",
    description: "Sertifikalı güvenlik personeli, 7/24 kamera takibi ve devriye hizmetleri ile sitenizi veya tesisinizi güvence altına alıyoruz.",
    images: ["/og-image.jpg"],
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
