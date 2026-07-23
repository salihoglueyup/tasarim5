import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peyzaj ve Bahçe Bakımı",
  description: "Ortak alan yeşillendirme, çim biçme, mevsimsel bitki ekimi ve otomatik sulama sistemleri bakımı.",
  openGraph: {
    title: "Peyzaj ve Bahçe Bakımı | Alo Yönetim",
    description: "Ortak alan yeşillendirme, çim biçme, mevsimsel bitki ekimi ve otomatik sulama sistemleri bakımı.",
    url: "https://aloyonetim.com/hizmetler/peyzaj-ve-bahce-bakimi",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peyzaj ve Bahçe Bakımı | Alo Yönetim",
    description: "Ortak alan yeşillendirme, çim biçme, mevsimsel bitki ekimi ve otomatik sulama sistemleri bakımı.",
    images: ["/og-image.jpg"],
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
