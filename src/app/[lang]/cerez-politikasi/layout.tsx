import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Çerez Politikası",
    description:
      "Alo Yönetim web sitesinde kullanılan çerezler, çerez türleri ve çerez tercihlerinizi nasıl yönetebileceğinize dair bilgilendirme.",
    path: "/cerez-politikasi",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
