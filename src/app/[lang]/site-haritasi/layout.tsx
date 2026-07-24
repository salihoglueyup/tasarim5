import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Site Haritası",
    description:
      "Alo Yönetim web sitesindeki tüm sayfalara ve hizmetlere kolayca ulaşabileceğiniz site haritası.",
    path: "/site-haritasi",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
