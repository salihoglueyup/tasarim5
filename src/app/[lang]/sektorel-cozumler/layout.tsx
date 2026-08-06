import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Sektörel Tesis Yönetimi Çözümleri",
    description:
      "Rezidans, AVM, plaza, iş merkezi, hastane ve fabrikalar için sektöre özel tesis yönetimi çözümleri. İhtiyacınıza uygun profesyonel hizmet paketleri.",
    path: "/sektorel-cozumler",
    lang,
    keywords: ['sektörel tesis yönetimi', 'AVM yönetimi', 'hastane tesis yönetimi', 'plaza yönetimi', 'rezidans yönetimi'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
