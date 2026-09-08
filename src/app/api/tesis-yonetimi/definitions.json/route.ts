import { NextResponse } from 'next/server';
import { TERMS, termToSlug, getTermsByLetter } from '@/data/dictionary';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function GET(req: Request) {
  let letterFilter: string | null = null;
  let queryFilter: string | null = null;

  if (req && req.url) {
    try {
      const { searchParams } = new URL(req.url);
      letterFilter = searchParams.get('letter');
      queryFilter = searchParams.get('q');
    } catch {
      // noop
    }
  }

  let filteredTerms = TERMS;

  if (letterFilter) {
    const cleanLetter = letterFilter.trim().toUpperCase();
    filteredTerms = getTermsByLetter(cleanLetter);
  }

  if (queryFilter) {
    const cleanQ = queryFilter.trim().toLowerCase();
    filteredTerms = filteredTerms.filter(
      (t) =>
        t.term.toLowerCase().includes(cleanQ) ||
        t.definition.toLowerCase().includes(cleanQ)
    );
  }

  const data = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${BASE_URL}/sozluk#glossary`,
    name: 'Site ve Tesis Yönetimi Sözlüğü — Alo Yönetim',
    description: 'KMK 634, 5188 sayılı Kanun ve ISO 41001 kapsamındaki tesis yönetimi terimlerinin yetkili tanımları.',
    url: `${BASE_URL}/sozluk`,
    inLanguage: 'tr-TR',
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Alo Yönetim',
      legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
      url: BASE_URL,
      logo: `${BASE_URL}/images/logo.png`,
      telephone: '+90 216 550 48 48',
    },
    numberOfItems: filteredTerms.length,
    hasDefinedTerm: filteredTerms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${BASE_URL}/sozluk/${termToSlug(t.term)}#term`,
      name: t.term,
      description: t.definition,
      url: `${BASE_URL}/sozluk/${termToSlug(t.term)}`,
      inDefinedTermSet: `${BASE_URL}/sozluk#glossary`,
      ...(t.link
        ? {
            subjectOf: {
              '@type': 'WebPage',
              name: t.link.label,
              url: `${BASE_URL}${t.link.href}`,
            },
          }
        : {}),
    })),
  };

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
