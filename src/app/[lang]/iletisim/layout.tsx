import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const base = buildMetadata({
    title: "İletişim ve Ücretsiz Teklif Hattı",
    description:
      "Alo Yönetim ile iletişime geçin. Adres, telefon ve destek hattımız üzerinden tesis yönetimi, güvenlik veya temizlik teklifi alın.",
    path: "/iletisim",
    lang,
  });

  // İletişim sayfasına özgü Open Graph alanları
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      emails: ["info@aloyonetim.com"],
      phoneNumbers: ["+90 216 550 48 48"],
      countryName: "Turkey",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
