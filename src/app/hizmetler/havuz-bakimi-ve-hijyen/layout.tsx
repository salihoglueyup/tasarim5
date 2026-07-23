import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Havuz Bakımı ve Hijyen",
  description: "Uzman havuz operatörlerimizle sezonluk ve yıllık periyodik havuz bakımı, su analizi ve kimyasal şartlandırma.",
  openGraph: {
    title: "Havuz Bakımı ve Hijyen | Alo Yönetim",
    description: "Uzman havuz operatörlerimizle sezonluk ve yıllık periyodik havuz bakımı, su analizi ve kimyasal şartlandırma.",
    url: "https://aloyonetim.com/hizmetler/havuz-bakimi-ve-hijyen",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Havuz Bakımı ve Hijyen | Alo Yönetim",
    description: "Uzman havuz operatörlerimizle sezonluk ve yıllık periyodik havuz bakımı, su analizi ve kimyasal şartlandırma.",
    images: ["/og-image.jpg"],
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
