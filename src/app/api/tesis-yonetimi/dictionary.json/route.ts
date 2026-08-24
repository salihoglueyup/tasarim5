import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { FACILITY_TERMS } from '@/data/facilityDictionaryData';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const definedTermSetLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${BASE_URL}/api/tesis-yonetimi/dictionary.json#terms`,
    name: 'Alo Yönetim Tesis Yönetimi ve Kat Mülkiyeti Kanunu Açık Terimler Sözlüğü',
    description: '634 Sayılı KMK, ISO 41001 ve 5188 mevzuatlarına uygun profesyonel tesis yönetimi terimler rehberi.',
    publisher: {
      '@type': 'Organization',
      name: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
    },
    inLanguage: 'tr-TR',
    hasDefinedTerm: FACILITY_TERMS.map((term) => ({
      '@type': 'DefinedTerm',
      termCode: term.termCode,
      name: term.name,
      description: term.description,
      inDefinedTermSet: `${BASE_URL}/api/tesis-yonetimi/dictionary.json#terms`,
      url: term.canonicalUrl,
      ...(term.wikidataUri ? { sameAs: term.wikidataUri } : {}),
    })),
  };

  return NextResponse.json(
    {
      metadata: {
        totalTerms: FACILITY_TERMS.length,
        version: '2026.1',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        provider: 'Alo Yönetim Hukuk ve Tesis Yönetim Kurulu',
        canonicalApiUrl: `${BASE_URL}/api/tesis-yonetimi/dictionary.json`,
      },
      terms: FACILITY_TERMS,
      schema: definedTermSetLd,
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
        'X-Dictionary': 'Facility-Management-KMK-Glossary',
      },
    }
  );
}
