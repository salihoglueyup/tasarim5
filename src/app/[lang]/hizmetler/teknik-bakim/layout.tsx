import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Teknik Bakım ve Onarım",
    description:
      "Asansör, jeneratör, hidrofor ve elektrik sistemleri için 7/24 mobil teknik servis ve periyodik bakım hizmeti.",
    path: "/hizmetler/teknik-bakim",
    lang,
    ogImageType: 'service',
    keywords: ['asansör bakımı', 'jeneratör bakımı', 'teknik işletme', 'periyodik bakım', 'bina teknik servis'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
