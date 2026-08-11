import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Site Yönetimi Sözlüğü — Aidat, KMK, Demirbaş",
    description:
      "Kat malikleri ve site yöneticileri için aidat, demirbaş, Kat Mülkiyeti Kanunu ve 5188 sayılı kanun gibi tesis yönetimi terimlerinin açık tanımları.",
    path: "/sozluk",
    lang,
    keywords: ['site yönetimi sözlüğü', 'aidat nedir', 'kat mülkiyeti kanunu nedir', 'demirbaş nedir', 'işletme projesi nedir'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
