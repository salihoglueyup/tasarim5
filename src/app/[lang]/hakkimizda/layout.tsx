import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Hakkımızda — Alo Yönetim Tesis Yönetimi A.Ş.',
    description:
      '2015\'ten bu yana İstanbul genelinde 500+ uzman çalışan ve onlarca prestijli proje. KMK ve 5188 uyumlu, şeffaf ve insan odaklı tesis yönetiminin adresi.',
    path: '/hakkimizda',
    lang,
    keywords: ['alo yönetim hakkında', 'tesis yönetimi şirketi istanbul', 'alo yönetim ekip', 'profesyonel site yönetimi'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
