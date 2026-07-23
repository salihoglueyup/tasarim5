import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurumsal Hakkımızda",
  description: "Alo Yönetim'in vizyonu, misyonu ve kurumsal geçmişi hakkında detaylı bilgi alın. Şeffaf ve profesyonel yönetim anlayışımızla tanışın.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
