import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Referanslarımız",
    description:
      "İstanbul genelinde yönettiğimiz siteler, plazalar ve rezidanslar. Alo Yönetim'in güvenilir referansları ve iş ortaklarıyla tanışın.",
    path: "/referanslar",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
