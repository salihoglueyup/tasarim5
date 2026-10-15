import { describe, it, expect } from 'vitest';
import { TRANSLATED_TERM_SLUGS } from './dictionaryTranslated';
import { TERM_DETAILS } from './dictionaryDetails';
import { TERM_DETAILS_TRANSLATED } from './dictionaryDetailsTranslated';

describe('çevrilmiş sözlük ayrıntıları', () => {
  it('çevrilmiş her terimin ayrıntısı üç dilde, Türkçe ile aynı yapıda bulunur', () => {
    for (const slug of TRANSLATED_TERM_SLUGS) {
      const tr = TERM_DETAILS[slug];
      const tt = TERM_DETAILS_TRANSLATED[slug];
      expect(tt, slug).toBeTruthy();
      for (const lang of ['en', 'ru', 'ar'] as const) {
        expect(tt[lang].explain.length, `${slug} ${lang}`).toBe(tr.explain.length);
        expect((tt[lang].tips ?? []).length, `${slug} ${lang} tips`).toBe((tr.tips ?? []).length);
        expect((tt[lang].faq ?? []).length, `${slug} ${lang} faq`).toBe((tr.faq ?? []).length);
      }
    }
  });
  it('ru ve ar metinlerinde Türkçe özel harf kalmaz (özel adlar ve parantezler hariç)', () => {
    const strip = (s: string) => s.replace(/\([^)]*\)/g, '').replace(/Alo Yönetim|Aidat|Denetçi|İşletme|Demirbaş|[Tt]oplu yapı|işletme projesi/g, '');
    for (const [slug, d] of Object.entries(TERM_DETAILS_TRANSLATED)) {
      for (const lang of ['ru', 'ar'] as const) {
        const all = [...d[lang].explain, ...(d[lang].tips ?? []), ...(d[lang].faq ?? []).flat()].map(strip).join(' ');
        expect(/[çğıöşüÇĞİÖŞÜ]/.test(all), `${slug} ${lang}`).toBe(false);
      }
    }
  });
});
