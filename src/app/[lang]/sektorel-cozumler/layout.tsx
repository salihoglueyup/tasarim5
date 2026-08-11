import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Rezidans, AVM ve Plaza Sektörel Tesis Yönetimi",
    description:
      "Lüks rezidanslar, alışveriş merkezleri, plazalar ve iş merkezleri için sektöre özel tesis yönetimi, VIP güvenlik ve kurumsal temizlik çözümleri.",
    path: "/sektorel-cozumler",
    lang,
    keywords: ['rezidans yönetimi', 'AVM tesis yönetimi', 'plaza yönetimi', 'iş merkezi yönetimi'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
