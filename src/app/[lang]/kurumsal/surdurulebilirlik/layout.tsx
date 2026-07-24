import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Sürdürülebilirlik",
    description:
      "Çevreye duyarlı tesis yönetimi, enerji verimliliği ve yeşil dönüşüm projeleriyle Alo Yönetim'in sürdürülebilirlik yaklaşımı.",
    path: "/kurumsal/surdurulebilirlik",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
