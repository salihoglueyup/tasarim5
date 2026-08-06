import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Profesyonel Güvenlik Yönetimi",
    description:
      "Sertifikalı güvenlik personeli, 7/24 kamera takibi ve devriye hizmetleri ile sitenizi veya tesisinizi güvence altına alıyoruz.",
    path: "/hizmetler/guvenlik-yonetimi",
    lang,
    ogImageType: 'service',
    keywords: ['site güvenliği', 'özel güvenlik', 'apartman güvenliği', 'kameralı güvenlik', '7/24 güvenlik hizmeti'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
