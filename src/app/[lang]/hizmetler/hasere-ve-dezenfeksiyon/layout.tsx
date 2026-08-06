import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Haşere İlaçlama ve Dezenfeksiyon",
    description:
      "Sağlık Bakanlığı onaylı biyosidal ürünlerle kalıcı böcek, kemirgen ilaçlama ve periyodik dezenfeksiyon hizmetleri.",
    path: "/hizmetler/hasere-ve-dezenfeksiyon",
    lang,
    ogImageType: 'service',
    keywords: ['haşere ilaçlama', 'dezenfeksiyon hizmeti', 'pest kontrol', 'site ilaçlama', 'biyosidal uygulama'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
