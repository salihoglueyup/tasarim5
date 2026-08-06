import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Kalite Politikamız",
    description:
      "ISO standartları ve sürekli iyileştirme ilkesiyle şekillenen Alo Yönetim kalite politikası ve hizmet standartlarımız.",
    path: "/kurumsal/kalite-politikamiz",
    lang,
    keywords: ['ISO tesis yönetimi', 'kalite yönetimi', 'hizmet kalite standartları', 'sürekli iyileştirme'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
