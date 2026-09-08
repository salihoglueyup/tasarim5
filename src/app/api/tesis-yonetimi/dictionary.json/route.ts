import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { FACILITY_TERMS } from '@/data/facilityDictionaryData';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function GET(req: Request) {
  let categoryFilter: string | null = null;
  let queryFilter: string | null = null;
  let termFilter: string | null = null;

  if (req && req.url) {
    try {
      const { searchParams } = new URL(req.url);
      categoryFilter = searchParams.get('category');
      queryFilter = searchParams.get('q');
      termFilter = searchParams.get('term');
    } catch {
      // noop
    }
  }

  let filteredTerms = FACILITY_TERMS;

  if (categoryFilter) {
    const cleanCat = categoryFilter.trim().toLowerCase();
    filteredTerms = filteredTerms.filter((term) =>
      term.category.toLowerCase().includes(cleanCat)
    );
  }

  if (queryFilter) {
    const cleanQ = queryFilter.trim().toLowerCase();
    filteredTerms = filteredTerms.filter(
      (term) =>
        term.name.toLowerCase().includes(cleanQ) ||
        term.description.toLowerCase().includes(cleanQ) ||
        (term.legalBasis && term.legalBasis.toLowerCase().includes(cleanQ))
    );
  }

  if (termFilter) {
    const cleanTerm = termFilter.trim().toLowerCase();
    filteredTerms = filteredTerms.filter(
      (term) => term.termCode.toLowerCase() === cleanTerm
    );
  }

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
      logo: `${BASE_URL}/images/logo.png`,
      telephone: '+90 216 550 48 48',
      knowsAbout: [
        'Kat Mülkiyeti Kanunu',
        'ISO 41001 Tesis Yönetimi',
        '5188 Özel Güvenlik',
        'Site ve Tesis Yönetimi',
      ],
    },
    inLanguage: 'tr-TR',
    hasDefinedTerm: filteredTerms.map((term) => ({
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
        totalFiltered: filteredTerms.length,
        appliedFilter: {
          category: categoryFilter,
          q: queryFilter,
          term: termFilter,
        },
        version: '2026.1',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        provider: 'Alo Yönetim Hukuk ve Tesis Yönetim Kurulu',
        canonicalApiUrl: `${BASE_URL}/api/tesis-yonetimi/dictionary.json`,
      },
      terms: filteredTerms,
      schema: definedTermSetLd,
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
        'X-Dictionary': 'Facility-Management-KMK-Glossary',
      },
    }
  );
}
