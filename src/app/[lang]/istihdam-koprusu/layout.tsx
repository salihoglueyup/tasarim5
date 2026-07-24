import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "İstihdam Köprüsü",
    description:
      "Güvenlik, temizlik ve teknik bakım alanlarında kariyer fırsatları. Alo Yönetim İstihdam Köprüsü ile profesyonel ekibimize katılın.",
    path: "/istihdam-koprusu",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
