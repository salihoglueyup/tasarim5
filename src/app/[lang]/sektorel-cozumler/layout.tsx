import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Sektörel Çözümler",
    description:
      "Rezidans, AVM, plaza, iş merkezi, hastane ve fabrikalar için sektöre özel tesis yönetimi çözümleri. İhtiyacınıza uygun profesyonel hizmet paketleri.",
    path: "/sektorel-cozumler",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
