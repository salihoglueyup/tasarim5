"use client";

import JsonLd from '@/components/seo/schema/JsonLd';
import { BASE_URL } from '@/lib/constants';

interface ServiceSeoProps {
  serviceType: string;
  description: string;
  providerName?: string;
  providerUrl?: string;
  areaServed?: string | string[]; // "İstanbul", "Kadıköy", etc.
  priceRange?: string; // e.g., "₺₺", "1000 TRY - 5000 TRY"
  sameAs?: string | string[]; // Wikipedia Entity links
  emitSchema?: boolean;
}

/**
 * Hizmet Sayfaları İçin Service JSON-LD Şeması
 * Not: Tüm /hizmetler/* sunucu page.tsx rotaları zaten @id ve ORG_CREDENTIALS bağlantılı
 * kanonik Service JSON-LD düğümünü bastığı için istemci bileşenlerinde çift Service şemasını
 * önlemek adına emitSchema varsayılan olarak false tutulur.
 */
export default function ServiceSeo({
  serviceType,
  description,
  providerName = "Alo Yönetim",
  providerUrl = BASE_URL,
  areaServed = "İstanbul",
  priceRange = "₺₺",
  sameAs,
  emitSchema = false,
}: ServiceSeoProps) {
  if (!emitSchema) return null;
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    name: serviceType,
    description,
    provider: {
      '@type': 'ProfessionalService',
      name: providerName,
      url: providerUrl
    },
    ...(sameAs ? { sameAs } : {})
  };

  if (areaServed) {
    schema.areaServed = Array.isArray(areaServed) 
      ? areaServed.map(area => ({ '@type': 'City', name: area }))
      : { '@type': 'City', name: areaServed };
  }

  if (priceRange) {
    schema.offers = {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'TRY',
        description: priceRange
      }
    };
  }

  return <JsonLd data={schema} />;
}

