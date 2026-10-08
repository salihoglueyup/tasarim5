import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import KeywordAnalysisSeo from '@/components/seo/district/KeywordAnalysisSeo';
import { getDictionary } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return buildMetadata({
    title: dict?.blgx_meta_title || "Blog",
    description: dict?.blgx_meta_desc || "",
    path: "/blog",
    lang,
    keywords: lang === 'tr'
      ? [
          "tesis yönetimi",
          "site yönetimi",
          "apartman yönetimi",
          "kat mülkiyeti kanunu",
          "aidat takibi",
          "bina teknik bakım",
          "özel güvenlik",
        ]
      : undefined,
  });
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <>
      {/* Türkçe anahtar kelime analizi bloğu yalnızca Türkçe sayfada gösterilir (en/ru/ar'da Türkçe kalıntı olmasın) */}
      {lang === 'tr' && (
        <KeywordAnalysisSeo
          title="Alo Yönetim Blog & Bilgi Merkezi"
          description="Profesyonel tesis ve site yönetimi, KMK mevzuatı, 5188 güvenlik ve apartman bütçe yönetimi rehberleri."
          path="/blog"
          targetKeyword="tesis yönetimi"
          keywords={[
            "tesis yönetimi",
            "site yönetimi",
            "apartman yönetimi",
            "kat mülkiyeti kanunu",
            "aidat yönetimi",
            "bina güvenliği",
            "önleyici bakım",
          ]}
        />
      )}
      {children}
    </>
  );
}
