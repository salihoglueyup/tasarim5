"use client";

import Image, { ImageProps } from 'next/image';
import JsonLd from './JsonLd';

interface ImageWithSeoProps extends ImageProps {
  alt: string; // Alt text'i zorunlu hale getiriyoruz
  title?: string;
  author?: string;
  datePublished?: string;
  injectSchema?: boolean;
}

/**
 * SEO Faz 11: Zengin Görsel SEO (ImageWithSeo)
 * Next.js Image bileşenini sarar, erişilebilirliği (alt etiketini) zorunlu kılar.
 * Eğer `injectSchema=true` ise Google Görseller'de çıkmak için ImageObject şeması basar.
 */
export default function ImageWithSeo({
  alt,
  title,
  author,
  datePublished,
  injectSchema = false,
  src,
  ...props
}: ImageWithSeoProps) {
  
  // Resmin string bir URL olup olmadığını kontrol et
  const srcString = typeof src === 'string' 
    ? src 
    : (src as any)?.src || "https://aloyonetim.com/images/default.jpg";

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: srcString,
    name: title || alt,
    description: alt
  };

  if (author) {
    schema.author = {
      '@type': 'Person',
      name: author
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
