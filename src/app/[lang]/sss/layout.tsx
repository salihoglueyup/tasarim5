import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Sıkça Sorulan Sorular",
    description:
      "Site ve tesis yönetimi, aidat, sözleşme, güvenlik ve temizlik hizmetleri hakkında en sık sorulan soruların yanıtları.",
    path: "/sss",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
