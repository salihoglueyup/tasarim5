import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Kullanım Şartları",
    description:
      "Alo Yönetim web sitesinin kullanımına ilişkin şartlar, koşullar ve yasal bilgilendirmeler.",
    path: "/kullanim-sartlari",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
