"use client";

import JsonLd from './JsonLd';
import { BASE_URL } from '@/lib/constants';
import { ORG_NAME, ORG_PHONE, ORG_ADDRESS, ORG_GEO, ORG_LOGO } from '@/lib/schemas';

interface LocalBusinessProps {
  businessName?: string;
  description?: string;
  url?: string;
  logo?: string;
  image?: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  areaServed?: string | string[];
}

/**
 * Bölgesel Arama Sonuçları İçin LocalBusiness Şeması
 * Google Haritalar, Kadıköy merkezli yerel arama ve ilçe sayfalarında NAP tutarlılığını sağlar.
 */
export default function LocalBusinessSeo({
  businessName = ORG_NAME,
  description = "Kadıköy merkezli, İstanbul genelinde profesyonel tesis, site, güvenlik ve temizlik yönetimi.",
  url = BASE_URL,
  logo = ORG_LOGO,
  image = `${BASE_URL}/og`,
  telephone = ORG_PHONE,
  address = ORG_ADDRESS,
  geo = { latitude: ORG_GEO.latitude, longitude: ORG_GEO.longitude },
  areaServed = "İstanbul"
}: LocalBusinessProps) {
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: businessName,
    description,
    url,
    logo,
    image,
    telephone,
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude
    }
  };

  if (areaServed) {
    schema.areaServed = Array.isArray(areaServed) 
      ? areaServed.map(area => ({ '@type': 'City', name: area }))
      : { '@type': 'City', name: areaServed };
  }

  return <JsonLd data={schema} />;
}
