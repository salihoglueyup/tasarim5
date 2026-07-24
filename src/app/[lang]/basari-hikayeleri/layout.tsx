import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Başarı Hikayeleri",
    description:
      "Alo Yönetim ile çalışan site, plaza ve rezidansların gerçek başarı hikayeleri: maliyet tasarrufu, memnuniyet artışı ve profesyonel tesis yönetimi sonuçları.",
    path: "/basari-hikayeleri",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
