import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Peyzaj ve Bahçe Bakımı",
    description:
      "Ortak alan yeşillendirme, çim biçme, mevsimsel bitki ekimi ve otomatik sulama sistemleri bakımı.",
    path: "/hizmetler/peyzaj-ve-bahce-bakimi",
    lang,
    ogImageType: 'service',
    keywords: ['bahçe bakımı', 'peyzaj yönetimi', 'site bahçesi', 'çevre düzenleme', 'yeşil alan bakımı'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
