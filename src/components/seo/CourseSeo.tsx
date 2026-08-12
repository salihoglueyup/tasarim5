"use client";

import JsonLd from './JsonLd';

interface CourseSeoProps {
  name: string;
  description: string;
  providerName?: string;
  providerUrl?: string;
}

/**
 * SEO Faz 12: Güvenlik Akademisi için Course Şeması
 * Google Kurslar arama modülünde çıkmayı sağlar.
 */
export default function CourseSeo({
  name,
  description,
  providerName = "Alo Yönetim Güvenlik Akademisi",
  providerUrl = "https://aloyonetim.com/guvenlik-akademisi"
}: CourseSeoProps) {
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: providerName,
      sameAs: providerUrl
    }
  };

  return <JsonLd data={schema} />;
}
