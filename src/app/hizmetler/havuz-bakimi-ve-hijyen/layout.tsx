import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Havuz Bakımı ve Hijyen",
  description: "Uzman havuz operatörlerimizle sezonluk ve yıllık periyodik havuz bakımı, su analizi ve kimyasal şartlandırma.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
