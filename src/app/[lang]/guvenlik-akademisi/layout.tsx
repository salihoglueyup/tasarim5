import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Özel Güvenlik Akademisi ve 5188 Hizmet İçi Eğitim",
    description:
      "5188 sayılı Özel Güvenlik Kanunu standartlarında eğitimli, sertifikalı güvenlik personeli ve sürekli hizmet içi gelişim akademi programlarımız.",
    path: "/guvenlik-akademisi",
    lang,
    keywords: ['özel güvenlik akademisi', '5188 eğitimi', 'güvenlik personeli eğitimi', 'site güvenlik standartları'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
