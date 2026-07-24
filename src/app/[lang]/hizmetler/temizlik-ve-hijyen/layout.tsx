import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temizlik ve Hijyen Yönetimi",
  description: "Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği.",
  openGraph: {
    title: "Temizlik ve Hijyen Yönetimi | Alo Yönetim",
    description: "Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği.",
    url: "https://aloyonetim.com/hizmetler/temizlik-ve-hijyen",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Temizlik ve Hijyen Yönetimi | Alo Yönetim",
    description: "Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği.",
    images: ["/og-image.jpg"],
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
