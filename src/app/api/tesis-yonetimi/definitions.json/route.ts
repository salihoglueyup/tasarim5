import { NextResponse } from 'next/server';
import { TERMS, termToSlug } from '@/data/dictionary';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function GET() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${BASE_URL}/sozluk#glossary`,
    name: 'Site ve Tesis Yönetimi Sözlüğü — Alo Yönetim',
    description: 'KMK 634, 5188 sayılı Kanun ve ISO 41001 kapsamındaki tesis yönetimi terimlerinin yetkili tanımları.',
    url: `${BASE_URL}/sozluk`,
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Alo Yönetim',
    },
    numberOfItems: TERMS.length,
    hasDefinedTerm: TERMS.map((t) => ({
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
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
