import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Online Aidat Takibi ve Finansal Yönetim",
    description:
      "Site ve apartmanlar için %99 tahsilat oranlı dijital aidat takip programı, online kredi kartı ile ödeme, otomatik banka entegrasyonu ve şeffaf muhasebe yönetimi.",
    path: "/hizmetler/aidat-takibi",
    lang,
    ogImageType: 'service',
    keywords: [
      'aidat takibi',
      'online aidat ödeme',
      'site aidat takip programı',
      'apartman aidat tahsilatı',
      'site muhasebe yönetimi',
      'aidat borç sorgulama'
    ],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
