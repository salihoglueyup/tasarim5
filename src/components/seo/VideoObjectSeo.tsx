"use client";

import JsonLd from './JsonLd';

interface VideoObjectSeoProps {
  name: string;
  description: string;
  thumbnailUrl: string | string[];
  uploadDate: string;
  contentUrl?: string; // Sizin sunucunuzdaki mp4 linki vb.
  embedUrl?: string; // YouTube embed linki vb.
  duration?: string; // ISO 8601 format (e.g., "PT1M33S" for 1 min 33 sec)
  publisherName?: string;
  publisherLogo?: string;
}

/**
 * SEO Faz 12: Video İçerikler İçin VideoObject Şeması
 * Sitedeki tanıtım ve eğitim videolarının Google Görseller ve Google Video arama 
 * sonuçlarında oynatılabilen büyük kartlar olarak çıkmasını sağlar.
 */
export default function VideoObjectSeo({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
  publisherName = "Alo Yönetim",
  publisherLogo = "https://aloyonetim.com/logo.png"
}: VideoObjectSeoProps) {
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo
      }
    }
  };

  if (contentUrl) schema.contentUrl = contentUrl;
  if (embedUrl) schema.embedUrl = embedUrl;
  if (duration) schema.duration = duration;

  return <JsonLd data={schema} />;
}
