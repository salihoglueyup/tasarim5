import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: "Gizlilik Politikası",
    description:
      "Alo Yönetim olarak kişisel verilerinizi nasıl topladığımız, işlediğimiz ve koruduğumuza dair gizlilik politikamız.",
    path: "/gizlilik-politikasi",
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
