import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Alo Yönetim ile iletişime geçin. Adresimiz, telefon numaramız ve destek hattımız üzerinden bize ulaşarak tesis yönetimi, güvenlik veya temizlik teklifi alabilirsiniz.",
  openGraph: {
    title: "İletişim | Alo Yönetim",
    description: "Alo Yönetim ile iletişime geçin. Tesis yönetimi, güvenlik veya temizlik teklifi alın.",
    url: "https://aloyonetim.com/iletisim",
    emails: ["info@aloyonetim.com"],
    phoneNumbers: ["+90 216 000 00 00"],
    countryName: "Turkey",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim | Alo Yönetim",
    description: "Alo Yönetim ile iletişime geçin. Tesis yönetimi, güvenlik veya temizlik teklifi alın.",
    images: ["/og-image.jpg"],
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
