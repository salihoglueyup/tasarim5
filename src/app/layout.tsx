import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll, CustomCursor, NoiseOverlay, NavigationWrapper, QuickCallWidget } from "@/components";

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
  title: "Alo Yönetim - Profesyonel Site ve Tesis Yönetimi",
  description: "Profesyonel site yönetimi, 7/24 güvenlik ve temizlik hizmetleri. Kadıköy merkezli, İstanbul genelinde hizmet veriyoruz.",
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
        <NoiseOverlay />
        <CustomCursor />
        <QuickCallWidget />
        <SmoothScroll>
          <NavigationWrapper>
            {children}
          </NavigationWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
