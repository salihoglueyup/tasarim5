import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Temizlik ve Hijyen Yönetimi",
    description:
      "Bina içi, otopark ve ortak alanların endüstriyel makineler ve profesyonel personeller ile düzenli temizliği.",
    path: "/hizmetler/temizlik-ve-hijyen",
    lang,
    keywords: ['site temizliği', 'ortak alan temizliği', 'apartman temizlik şirketi', 'profesyonel temizlik hizmeti'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
