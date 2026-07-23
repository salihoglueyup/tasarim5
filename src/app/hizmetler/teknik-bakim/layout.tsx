import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teknik Bakım ve Onarım",
  description: "Asansör, jeneratör, hidrofor ve elektrik sistemleri için 7/24 mobil teknik servis ve periyodik bakım hizmeti.",
  openGraph: {
    title: "Teknik Bakım ve Onarım | Alo Yönetim",
    description: "Asansör, jeneratör, hidrofor ve elektrik sistemleri için 7/24 mobil teknik servis ve periyodik bakım hizmeti.",
    url: "https://aloyonetim.com/hizmetler/teknik-bakim",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teknik Bakım ve Onarım | Alo Yönetim",
    description: "Asansör, jeneratör, hidrofor ve elektrik sistemleri için 7/24 mobil teknik servis ve periyodik bakım hizmeti.",
    images: ["/og-image.jpg"],
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
