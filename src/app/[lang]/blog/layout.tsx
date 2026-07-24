import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Blog",
    description:
      "Site ve tesis yönetimi, aidat, güvenlik, temizlik ve mevzuat üzerine güncel rehberler, ipuçları ve sektörel içerikler Alo Yönetim blogunda.",
    path: "/blog",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
