import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haşere İlaçlama ve Dezenfeksiyon",
  description: "Sağlık Bakanlığı onaylı biyosidal ürünlerle kalıcı böcek, kemirgen ilaçlama ve periyodik dezenfeksiyon hizmetleri.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
