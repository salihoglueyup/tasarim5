import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Teklif Al",
    description:
      "Alo Yönetim profesyonel hizmetlerinden (Güvenlik, Temizlik, Teknik Bakım, Yönetim vb.) hızlı ve detaylı teklif almak için hemen formu doldurun.",
    path: "/teklif-al",
    lang,
    keywords: ['tesis yönetimi teklif', 'site yönetimi fiyat', 'profesyonel yönetim teklif al', 'ücretsiz keşif'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
