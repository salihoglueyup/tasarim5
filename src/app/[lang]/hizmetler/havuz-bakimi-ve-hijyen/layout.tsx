import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Havuz Bakımı ve Hijyen",
    description:
      "Uzman havuz operatörlerimizle sezonluk ve yıllık periyodik havuz bakımı, su analizi ve kimyasal şartlandırma.",
    path: "/hizmetler/havuz-bakimi-ve-hijyen",
    lang,
    ogImageType: 'service',
    keywords: ['havuz bakımı', 'havuz hijyeni', 'havuz suyu yönetimi', 'site havuzu bakımı'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
