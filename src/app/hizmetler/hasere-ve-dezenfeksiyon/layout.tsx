import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haşere İlaçlama ve Dezenfeksiyon",
  description: "Sağlık Bakanlığı onaylı biyosidal ürünlerle kalıcı böcek, kemirgen ilaçlama ve periyodik dezenfeksiyon hizmetleri.",
  openGraph: {
    title: "Haşere İlaçlama ve Dezenfeksiyon | Alo Yönetim",
    description: "Sağlık Bakanlığı onaylı biyosidal ürünlerle kalıcı böcek, kemirgen ilaçlama ve periyodik dezenfeksiyon hizmetleri.",
    url: "https://aloyonetim.com/hizmetler/hasere-ve-dezenfeksiyon",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haşere İlaçlama ve Dezenfeksiyon | Alo Yönetim",
    description: "Sağlık Bakanlığı onaylı biyosidal ürünlerle kalıcı böcek, kemirgen ilaçlama ve periyodik dezenfeksiyon hizmetleri.",
    images: ["/og-image.jpg"],
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
