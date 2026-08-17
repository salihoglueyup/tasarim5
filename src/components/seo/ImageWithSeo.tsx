"use client";

import Image, { ImageProps } from 'next/image';
import JsonLd from './JsonLd';
import { BASE_URL } from '@/lib/constants';

interface ImageWithSeoProps extends ImageProps {
  alt: string; // Alt text erişilebilirlik ve SEO için zorunludur
  title?: string;
  author?: string;
  datePublished?: string;
  caption?: string;
  injectSchema?: boolean;
}

/**
 * Zengin Görsel SEO Bileşeni (ImageWithSeo — Google Images & E-E-A-T)
 * 
 * Next.js Image bileşenini sarar; lazy loading ve Core Web Vitals optimizasyonunu korurken
 * `injectSchema=true` durumunda Google Görseller için lisans, telif ve yaratıcı (creator)
 * bilgilerini içeren tam geçerli ImageObject JSON-LD şeması basar.
 */
export default function ImageWithSeo({
  alt,
  title,
  author = "Alo Yönetim",
  datePublished,
  caption,
  injectSchema = false,
  src,
  ...props
}: ImageWithSeoProps) {
  // Resmin mutlak URL olup olmadığını normalize et
  const rawSrc = typeof src === 'string' 
    ? src 
    : (src as any)?.src || '/images/default.jpg';

  const absoluteContentUrl = rawSrc.startsWith('http') 
    ? rawSrc 
    : `${BASE_URL}${rawSrc.startsWith('/') ? '' : '/'}${rawSrc}`;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: absoluteContentUrl,
    name: title || alt,
    description: alt,
    caption: caption || alt,
    creditText: author,
    copyrightNotice: `© ${new Date().getFullYear()} Alo Yönetim - Tüm Hakları Saklıdır`,
    license: `${BASE_URL}/kullanim-sartlari`,
    acquireLicensePage: `${BASE_URL}/iletisim`,
    creator: {
      '@type': 'Organization',
      name: 'Alo Yönetim',
      url: BASE_URL,
    },
  };

  if (author && author !== 'Alo Yönetim') {
    schema.author = {
      '@type': 'Person',
      name: author,
    };
  }

  if (datePublished) {
    schema.datePublished = datePublished;
  }

  return (
    <>
      {injectSchema && <JsonLd data={schema} />}
      <Image 
        src={src} 
        alt={alt} 
        title={title || alt} 
        {...props} 
      />
    </>
  );
}
