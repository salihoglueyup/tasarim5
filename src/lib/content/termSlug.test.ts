import { describe, it, expect } from 'vitest';
import { termToSlug } from './termSlug';
import { TERMS } from '@/data/dictionary';

describe('termToSlug', () => {
  it('büyük İ içeren terimlerde birleştirici noktadan tire üretmez', () => {
    expect(termToSlug('İşletme Projesi')).toBe('isletme-projesi');
    expect(termToSlug('Mali İbra')).toBe('mali-ibra');
    expect(termToSlug('Kat İrtifakı')).toBe('kat-irtifaki');
    expect(termToSlug('Özel Güvenlik İzni (ÖGİ)')).toBe('ozel-guvenlik-izni-ogi');
  });

  it('tüm sözlük terimleri yalnızca [a-z0-9-] içeren, kenarlarında tire olmayan slug üretir', () => {
    const bad = TERMS.map((t) => ({ term: t.term, slug: termToSlug(t.term) })).filter(
      ({ slug }) => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)
    );
    expect(bad).toEqual([]);
  });

  it('sözlük terimleri arasında slug çakışması yoktur', () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const t of TERMS) {
      const s = termToSlug(t.term);
      if (seen.has(s)) dupes.push(`${seen.get(s)} <> ${t.term}`);
      else seen.set(s, t.term);
    }
    expect(dupes).toEqual([]);
  });
});
