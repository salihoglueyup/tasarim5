import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { KeywordAnalysisSeo } from "@/components/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Site ve Tesis Yönetimi Blogu ve Rehberleri",
    description:
      "Site ve tesis yönetimi, aidat, güvenlik, temizlik ve KMK mevzuatı üzerine güncel rehberler, ipuçları ve sektörel içerikler Alo Yönetim blogunda.",
    path: "/blog",
    lang,
    keywords: [
      "tesis yönetimi",
      "site yönetimi",
      "apartman yönetimi",
      "kat mülkiyeti kanunu",
      "aidat takibi",
      "bina teknik bakım",
      "özel güvenlik",
    ],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
      {children}
    </>
  );
}

