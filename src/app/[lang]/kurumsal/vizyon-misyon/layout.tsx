import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Vizyon ve Misyon",
    description:
      "Alo Yönetim'in vizyonu, misyonu ve değerleri. Profesyonel tesis yönetiminde sektöre yön veren kurumsal yaklaşımımız.",
    path: "/kurumsal/vizyon-misyon",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
