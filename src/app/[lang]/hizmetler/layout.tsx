import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüm Hizmetlerimiz",
  description: "Alo Yönetim profesyonel mülk ve tesis yönetimi kapsamında sunduğu güvenlik, temizlik, havuz bakımı, teknik bakım ve peyzaj hizmetlerini inceleyin.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
