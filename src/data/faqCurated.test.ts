import { describe, it, expect } from 'vitest';
import { CURATED_FAQS } from './faqCurated';

describe('özenle yazılmış SSS', () => {
  it('her madde dört dilde dolu, kimlikler benzersiz, soru metinleri tekrarsız', () => {
    expect(CURATED_FAQS.length).toBeGreaterThanOrEqual(40);
    expect(new Set(CURATED_FAQS.map((f) => f.id)).size).toBe(CURATED_FAQS.length);
    expect(new Set(CURATED_FAQS.map((f) => f.question)).size).toBe(CURATED_FAQS.length);
    for (const f of CURATED_FAQS) {
      for (const k of ['question', 'answer', 'question_en', 'answer_en', 'question_ru', 'answer_ru', 'question_ar', 'answer_ar'] as const) {
        expect(f[k].length, `${f.id} ${k}`).toBeGreaterThan(10);
      }
      expect(f.answer.split(/\s+/).length, f.id).toBeGreaterThanOrEqual(25);
    }
  });
  it('Rusça ve Arapça metinlerde Türkçe özel harf kalmaz (özel adlar hariç)', () => {
    for (const f of CURATED_FAQS) {
      for (const k of ['question_ru', 'answer_ru', 'question_ar', 'answer_ar'] as const) {
        const t = f[k].replace(/\([^)]*\)/g, '').replace(/«[^»]*»/g, '').replace(/[Tt]oplu yapı/g, '').replace(/\b(KMK|UYAP|DASK|SLA|Alo Yönetim|Alo|Yönetim|Sulh)\b/g, '');
        expect(/[çğıöşüÇĞİÖŞÜ]/.test(t), `${f.id} ${k}`).toBe(false);
      }
    }
  });
});
