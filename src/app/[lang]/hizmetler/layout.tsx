import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Tüm Hizmetlerimiz",
    description:
      "Alo Yönetim profesyonel mülk ve tesis yönetimi kapsamında sunduğu güvenlik, temizlik, havuz bakımı, teknik bakım ve peyzaj hizmetlerini inceleyin.",
    path: "/hizmetler",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
