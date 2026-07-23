import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profesyonel Güvenlik Yönetimi",
  description: "Sertifikalı güvenlik personeli, 7/24 kamera takibi ve devriye hizmetleri ile sitenizi veya tesisinizi güvence altına alıyoruz.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
