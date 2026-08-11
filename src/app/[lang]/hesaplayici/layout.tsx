import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Aidat ve Tesis Yönetimi Maliyet Hesaplayıcı",
    description:
      "Siteniz veya tesisiniz için ortalama aidat, güvenlik, temizlik ve bakım maliyetlerini saniyeler içinde hesaplayın. Şeffaf ve tahmini bütçe aracı.",
    path: "/hesaplayici",
    lang,
    keywords: ['aidat hesaplama', 'site yönetimi maliyeti', 'yönetim ücreti hesaplama', 'aidat bütçesi'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
