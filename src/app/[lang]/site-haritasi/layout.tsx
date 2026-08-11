import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Site Haritası — Tüm Hizmetler ve Bölge Sayfaları",
    description:
      "Alo Yönetim bünyesindeki tüm hizmetler, kurumsal bilgi sayfaları, hesaplayıcılar ve 12 İstanbul ilçesinin tesis yönetimi sayfalarına hızlı erişim haritası.",
    path: "/site-haritasi",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
