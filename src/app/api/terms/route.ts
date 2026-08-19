import { NextResponse } from 'next/server';
import { TERMS } from '@/data/dictionary';
import { BASE_URL } from '@/lib/seo';
import { ORG_NAME } from '@/lib/schemas';

export const dynamic = 'force-static';
export const revalidate = 2592000; // 30 Gün

/**
 * W3C SKOS & Schema.org DefinedTermSet Semantic Dictionary API
 * 
 * Google Knowledge Graph, Semantic Search ve LLM motorları (ChatGPT, Claude, Perplexity) için 
 * KMK 634, 5188 Özel Güvenlik ve Tesis Yönetimi hukuki terminolojisini yapılandırılmış veri olarak sunar.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase()?.trim();

  let filtered = TERMS;
  if (q) {
    filtered = TERMS.filter(
      t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  }

  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${BASE_URL}/sozluk#definedtermset`,
    name: `${ORG_NAME} Tesis Yönetimi, KMK Hukuk ve 5188 Güvenlik Terimleri Sözlüğü`,
    description: 'Site ve apartman yönetimi, Kat Mülkiyeti Kanunu (KMK 634), 5188 sayılı Özel Güvenlik Kanunu ve aidat takibi hukuki terimler kütüphanesi.',
    url: `${BASE_URL}/sozluk`,
    publisher: {
      '@type': 'Corporation',
      name: ORG_NAME,
      url: BASE_URL
    },
    hasDefinedTerm: filtered.map((item, index) => ({
      '@type': 'DefinedTerm',
      '@id': `${BASE_URL}/sozluk#term-${index + 1}`,
      name: item.term,
      description: item.definition,
      inDefinedTermSet: `${BASE_URL}/sozluk#definedtermset`,
      ...(item.link ? { url: `${BASE_URL}${item.link.href}` } : {})
    }))
  };

  return NextResponse.json(definedTermSet, {
    status: 200,
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
