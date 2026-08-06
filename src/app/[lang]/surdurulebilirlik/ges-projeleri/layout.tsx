import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "GES Projeleri (Güneş Enerji Santrali)",
    description:
      "Siteler ve tesisler için güneş enerji santrali (GES) kurulumu ile enerji maliyetlerini düşürün. Alo Yönetim GES projeleri ve danışmanlığı.",
    path: "/surdurulebilirlik/ges-projeleri",
    lang,
    keywords: ['GES projesi', 'güneş enerji santrali', 'site GES kurulumu', 'enerji tasarrufu tesis'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
