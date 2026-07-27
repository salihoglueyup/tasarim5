import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { SmoothScroll, CustomCursor, NoiseOverlay, NavigationWrapper, QuickCallWidget, WebVitals, IconFontLoader, CookieConsent, AnalyticsScripts, FramerLazyProvider } from "@/components";
import { LanguageProvider } from "@/context/LanguageContext";
import { QuoteProvider } from "@/context/QuoteContext";
import { JsonLd } from "@/components";
import { organizationSchema, webSiteSchema } from "@/lib/schemas";

// Türkçe glyph'ler (ç, ğ, ş, ı, İ, ö, ü) için latin-ext subset (SEO V4 Faz 185).
// display:swap ile font kaynaklı CLS önlenir.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: 'swap'
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: 'swap'
});

import { GoogleAnalytics } from '@next/third-parties/google';

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
  // Arama motoru doğrulamaları yalnız env tanımlıysa eklenir (mock yayına çıkmaz — Faz 10/30).
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION || process.env.NEXT_PUBLIC_BING_VERIFICATION
    ? {
        verification: {
          ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
            ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
            : {}),
          ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
            ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } }
            : {}),
        },
      }
    : {}),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://aloyonetim.com",
    title: "Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi",
    description: "Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri.",
    siteName: "Alo Yönetim",
    // Görsel: dinamik opengraph-image route'u ile sağlanacak (SEO V4 Faz 4).
  },
  twitter: {
    card: "summary_large_image",
    title: "Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi",
    description: "Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }> | { lang: string };
}>) {
  // Await params to ensure compatibility with Next.js 15
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams?.lang || 'tr';

  // Analytics ID'leri env'den okunur; tanımlı değilse ilgili script render edilmez
  // (SEO V4 Faz 10 — mock ID'ler yayına çıkmaz, gerçek değerler .env ile girilir).
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <html lang={lang} className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Uzak görsel origin'i (blog/testimonial görselleri) — Faz 197 */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Material Symbols: render-blocking olmasın diye hydration sonrası
            yüklenir (IconFontLoader — Faz 186). No-JS için fallback: */}
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
          />
        </noscript>
        {/* Blog RSS beslemesi (SEO V4 Faz 162) */}
        <link rel="alternate" type="application/rss+xml" title="Alo Yönetim Blog" href="/feed.xml" />
        {/* Kurumsal varlık grafiği: Organization + WebSite (SEO V4 Faz 42/58) */}
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
      </head>
      <body className={`${plusJakarta.className} min-h-full flex flex-col antialiased text-[var(--color-on-surface)] bg-[var(--color-background)] cursor-none selection:bg-blue-500/30 selection:text-white`}>
        {/* Faz 22, 196: Skip Navigation Link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-blue-600 focus:text-white focus:font-bold focus:shadow-2xl">
          İçeriğe Geç
        </a>

        {/* Faz 3, 10, 20: TBT/LCP bozmayan asenkron izole analytics */}
        <AnalyticsScripts gaId={gaId} clarityId={clarityId} fbPixelId={fbPixelId} />
        
        <WebVitals />
        <IconFontLoader />
        <LanguageProvider initialLang={lang}>
          <QuoteProvider>
            <FramerLazyProvider>
              <NoiseOverlay />
              <CustomCursor />
              <QuickCallWidget />
              <SmoothScroll>
                <NavigationWrapper>
                  <main id="main-content" className="flex-1 w-full">
                    {children}
                  </main>
                </NavigationWrapper>
              </SmoothScroll>
              <CookieConsent />
            </FramerLazyProvider>
          </QuoteProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

