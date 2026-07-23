import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Alo Yönetim ile iletişime geçin. Adresimiz, telefon numaramız ve destek hattımız üzerinden bize ulaşarak tesis yönetimi, güvenlik veya temizlik teklifi alabilirsiniz.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
