import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teknik Bakım ve Onarım",
  description: "Asansör, jeneratör, hidrofor ve elektrik sistemleri için 7/24 mobil teknik servis ve periyodik bakım hizmeti.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
