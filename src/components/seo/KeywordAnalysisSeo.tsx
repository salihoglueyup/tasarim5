import React from 'react';
import JsonLd from '@/components/seo/JsonLd';
import { BASE_URL } from '@/lib/seo';
import { ORG_ID, WEBSITE_ID } from '@/lib/schemas';

interface KeywordAnalysisSeoProps {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  targetKeyword?: string;
  category?: string;
  relatedWikidata?: { name: string; url: string }[];
}

/**
 * Sayfa ve Bölüm Düzeyinde Topikal Anahtar Kelime & Varlık Şeması Bileşeni.
 * Arama motorlarına sayfanın anahtar kelimelerini, varlık eşleşmelerini ve
 * topikal otorite grafiğini JSON-LD olarak iletir.
 */
export default function KeywordAnalysisSeo({
  title,
  description,
  path,
  keywords,
  targetKeyword = 'tesis yönetimi',
  category = 'Tesis Yönetimi',
  relatedWikidata = [
    { name: 'Tesis Yönetimi', url: 'https://www.wikidata.org/wiki/Q1391515' },
    { name: 'Kat Mülkiyeti Kanunu', url: 'https://www.wikidata.org/wiki/Q161851' },
    { name: '5188 Sayılı Özel Güvenlik Kanunu', url: 'https://www.wikidata.org/wiki/Q11440' },
  ],
}: KeywordAnalysisSeoProps) {
  const fullUrl = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${fullUrl}#webpage-keywords`,
    url: fullUrl,
    name: title,
    description: description,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    keywords: Array.from(new Set([targetKeyword, ...keywords])).join(', '),
    about: relatedWikidata.map((item) => ({
      '@type': 'Thing',
      name: item.name,
      sameAs: item.url,
    })),
    mainEntity: {
      '@type': 'DefinedTermSet',
      name: `${category} Terminolojisi ve Standartları`,
      hasDefinedTerm: keywords.slice(0, 10).map((kw) => ({
        '@type': 'DefinedTerm',
        name: kw,
        termCode: kw.toLowerCase().replace(/\s+/g, '-'),
      })),
    },
  };

  return <JsonLd data={schema} />;
}
