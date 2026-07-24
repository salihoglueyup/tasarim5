import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Aidat ve Yönetim Ücreti Hesaplayıcı",
    description:
      "Sitenizin veya binanızın büyüklüğüne göre profesyonel tesis yönetimi ve aidat maliyetini hızlıca hesaplayın, size özel teklif alın.",
    path: "/hesaplayici",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
