import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peyzaj ve Bahçe Bakımı",
  description: "Ortak alan yeşillendirme, çim biçme, mevsimsel bitki ekimi ve otomatik sulama sistemleri bakımı.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
