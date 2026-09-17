import React from 'react';

interface CoreWebVitalsOptimizerSeoProps {
  preloadImages?: string[];
  customPreconnects?: string[];
}

/**
 * Core Web Vitals Hızlandırıcı & Kaynak Önyükleme Motoru (CoreWebVitalsOptimizerSeo)
 * 
 * Google Fonts, CDN ve analitik kaynakları için `preconnect` ve `dns-prefetch` bağlantıları açar.
 * Sayfa açılış hızını (LCP & TTFB) optimize ederek Google Page Experience algoritmasında
 * maksimum puan almayı sağlar.
 */
export default function CoreWebVitalsOptimizerSeo({
  preloadImages = [],
  customPreconnects = []
}: CoreWebVitalsOptimizerSeoProps) {
  const defaultPreconnects = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    ...customPreconnects
  ];

  return (
    <>
      {defaultPreconnects.map((origin) => (
        <React.Fragment key={origin}>
          <link rel="preconnect" href={origin} crossOrigin="anonymous" />
          <link rel="dns-prefetch" href={origin} />
        </React.Fragment>
      ))}

      {preloadImages.map((src) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
          type="image/webp"
          fetchPriority="high"
        />
      ))}
    </>
  );
}
