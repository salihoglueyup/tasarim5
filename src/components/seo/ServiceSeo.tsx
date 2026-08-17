"use client";

import JsonLd from './JsonLd';
import { BASE_URL } from '@/lib/constants';

interface ServiceSeoProps {
  serviceType: string;
  description: string;
  providerName?: string;
  providerUrl?: string;
  areaServed?: string | string[]; // "İstanbul", "Kadıköy", etc.
  priceRange?: string; // e.g., "₺₺", "1000 TRY - 5000 TRY"
  sameAs?: string | string[]; // Wikipedia Entity links
}

/**
 * Hizmet Sayfaları İçin Service JSON-LD Şeması
 * Temizlik, Güvenlik, Aidat Takibi gibi hizmetlerin Google'da 
 * sağlayıcı, bölge ve fiyat bilgisiyle tam teşekküllü listelenmesini sağlar.
 */
export default function ServiceSeo({
  serviceType,
  description,
  providerName = "Alo Yönetim",
  providerUrl = BASE_URL,
  areaServed = "İstanbul",
  priceRange = "₺₺",
  sameAs
}: ServiceSeoProps) {
  
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
