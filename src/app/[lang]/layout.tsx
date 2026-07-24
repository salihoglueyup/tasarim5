import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { SmoothScroll, CustomCursor, NoiseOverlay, NavigationWrapper, QuickCallWidget, WebVitals } from "@/components";
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { LanguageProvider } from "@/context/LanguageContext";
import { QuoteProvider } from "@/context/QuoteContext";

const CookieConsent = dynamic(() => import('@/components').then(mod => mod.CookieConsent));

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap'
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
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
  verification: {
    google: "G-MOCK-GOOGLE-VERIFICATION-CODE", // TODO: Gerçek ID ile değiştirilecek
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://aloyonetim.com",
    title: "Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi",
    description: "Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri.",
    siteName: "Alo Yönetim",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alo Yönetim Profesyonel Mülk Yönetimi"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Alo Yönetim - Profesyonel Mülk ve Tesis Yönetimi",
    description: "Profesyonel mülk ve tesis yönetimi, 7/24 güvenlik, temizlik ve teknik bakım hizmetleri.",
    images: ["/og-image.png"],
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

  return (
    <html lang={lang} className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Alo Yönetim",
              "url": "https://aloyonetim.com",
              "logo": "https://aloyonetim.com/icon.png",
              "foundingDate": "2015",
              "numberOfEmployees": { "@type": "QuantitativeValue", "value": "500+" },
              "slogan": "Profesyonel Mülk ve Tesis Yönetimi",
              "areaServed": {
                "@type": "City",
                "name": "İstanbul"
              },
              "sameAs": [
                "https://twitter.com/aloyonetim",
                "https://www.linkedin.com/company/aloyonetim",
                "https://www.instagram.com/aloyonetim",
                "https://www.facebook.com/aloyonetim",
                "https://www.youtube.com/@aloyonetim"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+90-216-550-4848",
                "contactType": "Customer Service",
                "areaServed": "TR",
                "availableLanguage": "Turkish"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Alo Yönetim",
              "url": "https://aloyonetim.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://aloyonetim.com/blog?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${plusJakarta.className} min-h-full flex flex-col antialiased text-[var(--color-on-surface)] bg-[var(--color-background)] transition-colors duration-500 cursor-none selection:bg-blue-500/30 selection:text-white`}>
        {/* Microsoft Clarity - Heatmap (Faz 85) */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "MOCK-CLARITY-ID");
          `}
        </Script>
        
        {/* Google Analytics via @next/third-parties */}
        <GoogleAnalytics gaId="G-MOCKGA12345" />
        <WebVitals />
        <LanguageProvider initialLang={lang}>
          <QuoteProvider>
            <NoiseOverlay />
            <CustomCursor />
            <QuickCallWidget />
            <SmoothScroll>
              <NavigationWrapper>
                {children}
              </NavigationWrapper>
            </SmoothScroll>
            <CookieConsent />
          </QuoteProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

