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
    default: "Alo Yönetim — İstanbul Profesyonel Tesis Yönetimi & Entegre Tesis İşletmeciliği",
    template: "%s | Alo Yönetim Tesis Yönetimi"
  },
  description: "İstanbul genelinde 39 ilçede ISO 41001 standartlarında profesyonel tesis yönetimi, 5188 lisanslı özel güvenlik, teknik bakım ve şeffaf aidat muhasebesi. 400+ tesis referansı ile %30 tasarruf güvencesi.",
  keywords: [
    "tesis yönetimi",
    "profesyonel tesis yönetimi",
    "istanbul tesis yönetimi",
    "entegre tesis yönetimi",
    "tesis yönetim şirketleri",
    "tesis yönetim firmaları",
    "site ve tesis yönetimi",
    "bina tesis yönetimi",
    "plaza tesis yönetimi",
    "rezidans tesis yönetimi",
    "iso 41001 tesis yönetimi",
    "kmk 634 site yönetimi",
    "5188 özel güvenlik",
    "apartman yönetimi",
    "İstanbul"
  ],
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
    title: "Alo Yönetim — İstanbul Profesyonel Tesis Yönetimi",
    description: "İstanbul genelinde 39 ilçede ISO 41001 standartlarında profesyonel tesis yönetimi, 5188 özel güvenlik ve %30 maliyet tasarrufu.",
    siteName: "Alo Yönetim",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alo Yönetim — İstanbul Profesyonel Tesis Yönetimi",
    description: "İstanbul genelinde 39 ilçede ISO 41001 standartlarında profesyonel tesis yönetimi, 5188 özel güvenlik ve %30 maliyet tasarrufu.",
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
  params: Promise<{ lang: string }>;
}>) {
  // Await params to ensure compatibility with Next.js 15
  const resolvedParams = await params;
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
        {/* LCP Hero Poster Preload (Zero-latency image fetch) */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-poster-v5.webp"
          type="image/webp"
          // @ts-ignore
          fetchPriority="high"
        />

        {/* Google Material Symbols Font (Reliable Synchronous Render) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />

        {/* Eski ServiceWorker ve PWA önbelleğini temizleme (F5 yenileme tutarlılığı) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(regs) {
                    for (var i = 0; i < regs.length; i++) {
                      regs[i].unregister();
                    }
                  });
                }
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (var i = 0; i < names.length; i++) {
                      if (names[i].indexOf('workbox') !== -1 || names[i].indexOf('swe-') !== -1 || names[i].indexOf('next-pwa') !== -1) {
                        caches.delete(names[i]);
                      }
                    }
                  });
                }
              }
            `
          }}
        />

        {/* Blog RSS & Atom & GeoRSS beslemeleri */}
        <link rel="alternate" type="application/rss+xml" title="Alo Yönetim RSS 2.0" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Alo Yönetim Atom 1.0" href="/feed.xml" />
        <link rel="alternate" type="application/rss+xml" title="Alo Yönetim Tesis Yönetimi GeoRSS" href="/api/facility/districts-feed.xml" />
        <link rel="alternate" type="application/rss+xml" title="Alo Yönetim 5188 Güvenlik GeoRSS" href="/api/security/districts-feed.xml" />
        
        {/* OpenSearch & Humans.txt */}
        <link rel="search" type="application/opensearchdescription+xml" title="Alo Yönetim" href="/opensearch.xml" />
        <link rel="author" href="/humans.txt" />
        
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        {/* Faz 25, 58: 0ms Speculation Rules API (Chrome Instant Navigation) */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prefetch: [
                {
                  where: {
                    and: [
                      {
                        or: [
                          { href_matches: "/*/hizmetler*" },
                          { href_matches: "/*/hakkimizda" },
                          { href_matches: "/*/iletisim" },
                          { href_matches: "/*/hesaplayici" },
                          { href_matches: "/*/teklif-al" },
                          { href_matches: "/*/sss" },
                          { href_matches: "/*/referanslar" }
                        ]
                      },
                      { not: { href_matches: "/*/admin*" } }
                    ]
                  },
                  eagerness: "eager"
                }
              ],
              prerender: [
                {
                  where: {
                    and: [
                      { href_matches: "/*" },
                      { not: { href_matches: "/*\\?*" } },
                      { not: { href_matches: "/*/admin*" } }
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

