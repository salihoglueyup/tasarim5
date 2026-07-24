import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Profesyonel Tesis Yönetimi",
    description:
      "Avm, plaza, site ve rezidanslar için aidat toplama, bütçe planlama ve tam kapsamlı idari yönetim.",
    path: "/hizmetler/tesis-yonetimi",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
