import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll, CustomCursor, NoiseOverlay, NavigationWrapper, QuickCallWidget } from "@/components";
import { LanguageProvider } from "@/context/LanguageContext";
import { QuoteProvider } from "@/context/QuoteContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aloyonetim.com"),
  title: {
    default: "Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi",
    template: "%s | Alo Yönetim"
  },
  description: "Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri. Kadıköy merkezli, İstanbul genelinde premium tesis yönetimi sunuyoruz.",
  keywords: ["mülk yönetimi", "tesis yönetimi", "güvenlik hizmetleri", "temizlik şirketi", "profesyonel mülk yönetimi", "apartman yönetimi", "İstanbul", "Kadıköy"],
  authors: [{ name: "Alo Yönetim" }],
  creator: "Alo Yönetim",
  publisher: "Alo Yönetim",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://aloyonetim.com",
    title: "Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi",
    description: "Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri.",
    siteName: "Alo Yönetim"
  },
  twitter: {
    card: "summary_large_image",
    title: "Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi",
    description: "Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri.",
  },
  alternates: {
    canonical: "https://aloyonetim.com"
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.className} min-h-full flex flex-col antialiased text-[var(--color-on-surface)] bg-[var(--color-background)] transition-colors duration-500 cursor-none selection:bg-blue-500/30 selection:text-white`}>
        <LanguageProvider>
          <QuoteProvider>
            <NoiseOverlay />
            <CustomCursor />
            <QuickCallWidget />
            <SmoothScroll>
              <NavigationWrapper>
                {children}
              </NavigationWrapper>
            </SmoothScroll>
          </QuoteProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

