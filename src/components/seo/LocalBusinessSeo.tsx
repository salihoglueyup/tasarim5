"use client";

import JsonLd from './JsonLd';

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
 * SEO Faz 11: Zengin Arama Sonuçları için Local Business SEO
 * Özellikle "Bölgeler" (örn: Kadıköy, Ataşehir) veya İletişim sayfasında kullanılarak
 * Google Haritalar ve bölgesel (Local SEO) aramalarda öne çıkmayı sağlar.
 */
export default function LocalBusinessSeo({
  businessName = "Alo Yönetim",
  description = "Profesyonel tesis, güvenlik ve temizlik yönetimi.",
  url = "https://aloyonetim.com",
  logo = "https://aloyonetim.com/logo.png",
  image = "https://aloyonetim.com/images/office.jpg",
  telephone = "+90 216 123 45 67",
  address = {
    streetAddress: "Örnek Mah. Örnek Sok. No:1",
    addressLocality: "Ataşehir",
    addressRegion: "İstanbul",
    postalCode: "34700",
    addressCountry: "TR"
  },
  geo,
  areaServed
}: LocalBusinessProps) {
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    description,
    url,
    logo,
    image,
    telephone,
    address: {
      '@type': 'PostalAddress',
      ...address
    }
  };

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      ...geo
    };
  }

  if (areaServed) {
    schema.areaServed = Array.isArray(areaServed) 
      ? areaServed.map(area => ({ '@type': 'City', name: area }))
      : { '@type': 'City', name: areaServed };
  }

  return <JsonLd data={schema} />;
}
