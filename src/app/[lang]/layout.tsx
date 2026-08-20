import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Cairo } from "next/font/google";
import "../globals.css";
import { SmoothScroll, NavigationWrapper, WebVitals, AnalyticsScripts, FramerLazyProvider, ClientWidgets } from "@/components";
import MaterialSymbolsFix from "@/components/ui/MaterialSymbolsFix";
import { EXTERNAL_CDN_HINTS } from "@/lib/performance/resourceHints";
import { LanguageProvider } from "@/context/LanguageContext";
import { QuoteProvider } from "@/context/QuoteContext";
import JsonLd from '@/components/seo/JsonLd';
import { organizationSchema, webSiteSchema } from "@/lib/schemas";
import trDict from '@/i18n/locales/tr/common.json';
import enDict from '@/i18n/locales/en/common.json';
import ruDict from '@/i18n/locales/ru/common.json';
import arDict from '@/i18n/locales/ar/common.json';
import DynamicBreadcrumb from '@/components/seo/DynamicBreadcrumb';

const dictionaries: Record<string, any> = { tr: trDict, en: enDict, ru: ruDict, ar: arDict };

// Türkçe glyph'ler (ç, ğ, ş, ı, İ, ö, ü) için latin-ext subset (SEO V4 Faz 185).
// display:swap ile font kaynaklı CLS önlenir.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aloyonetim.com.tr"),
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
    url: "https://aloyonetim.com.tr",
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
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a192f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
  const isRtl = lang === 'ar';

  // Analytics ID'leri env'den okunur; GA_ID varsayılan olarak G-L7RLVMBW9G ile çalışır
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-L7RLVMBW9G';
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'} className={`${inter.variable} ${plusJakarta.variable} ${cairo.variable}`}>
      <head>
        {/* v9 Hyper-Speed Resource Hints (Preconnect & DNS-Prefetch) */}
        {EXTERNAL_CDN_HINTS.map((hint, i) => (
          <link
            key={i}
            rel={hint.rel}
            href={hint.href}
            {...(hint.crossOrigin ? { crossOrigin: hint.crossOrigin } : {})}
          />
        ))}
        
        
        
        {/* Faz 124: En çok dönüştüren (tıklanan) ana rotalar için prefetch */}
        <link rel="prefetch" href="/tr/hizmetler" />
        <link rel="prefetch" href="/tr/iletisim" />
        {/* Blog RSS & Atom & GeoRSS beslemeleri */}
        <link rel="alternate" type="application/rss+xml" title="Alo Yönetim RSS 2.0" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Alo Yönetim Atom 1.0" href="/feed.xml" />
        <link rel="alternate" type="application/rss+xml" title="Alo Yönetim Tesis Yönetimi GeoRSS" href="/api/facility/districts-feed.xml" />
        <link rel="alternate" type="application/rss+xml" title="Alo Yönetim 5188 Güvenlik GeoRSS" href="/api/security/districts-feed.xml" />
        
        {/* OpenSearch & Humans.txt */}
        <link rel="search" type="application/opensearchdescription+xml" title="Alo Yönetim" href="/opensearch.xml" />
        <link rel="author" href="/humans.txt" />
        
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        {/* Faz 25: 0ms Speculation Rules API (Chrome) */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  where: {
                    and: [
                      { href_matches: "/*" },
                      { not: { href_matches: "/*\\?*" } }
                    ]
                  },
                  eagerness: "moderate"
                }
              ]
            })
          }}
        />
        {/* 0ms FOUT Theme Initializer (Karanlık Mod Parlama Engelleyici) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${plusJakarta.className} min-h-full flex flex-col antialiased text-[var(--color-on-surface)] bg-[var(--color-background)]`}>
        {/* Faz 22, 196: Skip Navigation Link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-slate-900 focus:text-white dark:focus:bg-white dark:focus:text-slate-950 focus:font-bold focus:shadow-2xl">
          İçeriğe Geç
        </a>

        {/* Faz 3, 10, 20: TBT/LCP bozmayan asenkron izole analytics */}
        <AnalyticsScripts gaId={gaId} clarityId={clarityId} fbPixelId={fbPixelId} gtmId={gtmId} />
        <DynamicBreadcrumb />
        
        <MaterialSymbolsFix />
        <WebVitals />
        <LanguageProvider initialLang={lang} initialDictionary={dictionaries[lang] || trDict}>
          <QuoteProvider>
            <FramerLazyProvider>
              <ClientWidgets />
              <SmoothScroll>
                <NavigationWrapper>
                  {children}
                </NavigationWrapper>
              </SmoothScroll>
            </FramerLazyProvider>
          </QuoteProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

