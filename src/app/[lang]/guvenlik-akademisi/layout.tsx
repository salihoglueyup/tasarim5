import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Özel Güvenlik Eğitimi Akademisi",
    description:
      "5188 sayılı kanun kapsamında özel güvenlik eğitimleri, sertifika programları ve profesyonel gelişim fırsatları Alo Yönetim Güvenlik Akademisi'nde.",
    path: "/guvenlik-akademisi",
    lang,
    keywords: ['özel güvenlik eğitimi', 'güvenlik sertifikası', '5188 eğitimi', 'güvenlik görevlisi kursu'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
