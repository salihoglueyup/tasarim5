import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Hukuk ve İcra Danışmanlığı",
    description:
      "Aidat borçlarının hukuki yollarla tahsili, sözleşme hazırlıkları ve genel kurul yasal süreç yönetimleri.",
    path: "/hizmetler/hukuk-ve-icra-danismanligi",
    lang,
    keywords: ['aidat icra takibi', 'kat mülkiyeti hukuku', 'yönetim hukuk danışmanlığı', 'site hukuku'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
