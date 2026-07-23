import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temizlik ve Hijyen Yönetimi",
  description: "Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
