import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Kurumsal Hakkımızda",
    description:
      "Alo Yönetim'in vizyonu, misyonu ve kurumsal geçmişi hakkında detaylı bilgi alın. Şeffaf ve profesyonel yönetim anlayışımızla tanışın.",
    path: "/hakkimizda",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
