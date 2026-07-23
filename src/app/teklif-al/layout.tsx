import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teklif Al",
  description: "Alo Yönetim profesyonel hizmetlerinden (Güvenlik, Temizlik, Teknik Bakım, Yönetim vb.) hızlı ve detaylı teklif almak için hemen formu doldurun.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
