import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Site Yönetimi Sözlüğü ve Terimler",
    description:
      "Aidat, demirbaş, Kat Mülkiyeti Kanunu, işletme projesi ve 5188 gibi tesis yönetimi terimlerinin açık tanımları. Site yöneticileri için sektör sözlüğü.",
    path: "/sozluk",
    lang,
    keywords: ["site yönetimi terimleri", "kat mülkiyeti kanunu", "aidat nedir", "demirbaş", "işletme projesi"],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
