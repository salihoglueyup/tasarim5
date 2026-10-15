import { NextRequest, NextResponse } from 'next/server';
import { CURATED_FAQS } from '@/data/faqCurated';

export const revalidate = 300;

const LANGS = ['tr', 'en', 'ru', 'ar'];
const ALL = new Set(['', 'Tümü', 'all', 'All', 'Все', 'الكل']);

/** SSS listesi sayfalama + arama ucu: sayfa yalnızca ilk 20 soruyu gömer, kalanı buradan gelir. */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const lang = LANGS.includes(sp.get('lang') ?? '') ? (sp.get('lang') as string) : 'tr';
  const category = (sp.get('category') ?? '').slice(0, 60);
  const q = (sp.get('q') ?? '').trim().slice(0, 80);
  const offset = Math.max(0, Number(sp.get('offset')) || 0);
  const limit = Math.min(40, Math.max(1, Number(sp.get('limit')) || 20));

  const key = (field: string) => (lang === 'tr' ? field : field + '_' + lang) as keyof (typeof CURATED_FAQS)[number];
  const needle = q.toLocaleLowerCase('tr-TR');
  const filtered = CURATED_FAQS.filter((f) => {
    if (!ALL.has(category) && f.category !== category) return false;
    if (!needle) return true;
    const text = (String(f[key('question')]) + ' ' + String(f[key('answer')])).toLocaleLowerCase('tr-TR');
    return text.includes(needle);
  });
  const items = filtered.slice(offset, offset + limit);
  return NextResponse.json({ items, total: filtered.length }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
}
