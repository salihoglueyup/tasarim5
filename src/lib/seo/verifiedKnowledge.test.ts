import { describe, it, expect } from 'vitest';
import { verifiedKnowledge } from './verifiedKnowledge';
import { DISTRICTS } from '@/data/districts';
import { getFacilitySerpMeta } from './facility/facilitySerpOptimizer';
import { FACTS } from '@/lib/facts';

/** Doğrulanamayan oran, puan, sayı, vaka ve "garanti" ifadeleri. */
const BANNED: RegExp[] = [
  /%\s?9[0-9]/, /%\s?3[0-5]\b/, /%\s?2[5-9]\b/, /\b4[.,]9\s?\/\s?5/, /\b(?:120|150|200|340|400)\+/, /garanti/i, /kanıtlanmış/i,
  /sıfır (?:risk|ceza|tazminat|arıza)/i, /\bE\.\s*,|\d{4}\/\d+\s*E\./, /Yargıtay \d+\./, /\b15-25\s?dk/i, /\b45\s?(?:dk|dakika)/i, /\b48 saat/i,
];

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

describe('AI/API uçları ve ilçe verisi yalnızca doğrulanmış bilgi içerir', () => {
  it('verifiedKnowledge doğrulanmış temel bilgileri içerir', () => {
    const k = verifiedKnowledge();
    expect(k.organization.foundingYear).toBe(FACTS.foundingYear);
    expect(k.coverage.districtCount).toBe(FACTS.districtCount);
    expect(k.references.count).toBe(FACTS.referenceCount);
    expect(k.districts).toHaveLength(DISTRICTS.length);
    expect(k.coverage.emergencyResponseTarget.anatolianSide).toBe('30 dakika');
    expect(k.coverage.emergencyResponseTarget.europeanSide).toBe('1 saat');
  });

  it('verifiedKnowledge çıktısında yasaklı iddia yoktur', () => {
    const text = collectStrings(verifiedKnowledge()).join('\n');
    for (const re of BANNED) expect(text, String(re)).not.toMatch(re);
  });

  it('ilçe verisinde uydurma sayısal alanlar ve yasaklı iddialar yoktur', () => {
    for (const d of DISTRICTS) {
      const keys = Object.keys(d);
      for (const k of ['avgDuesM2', 'aloDuesM2', 'savingsRate', 'managedProjects', 'totalResidentialSitesEstimated', 'prominentProjects']) {
        expect(keys, `${d.slug}.${k}`).not.toContain(k);
      }
      const text = collectStrings(d).join('\n');
      for (const re of BANNED) expect(text, `${d.slug} ${re}`).not.toMatch(re);
    }
  });

  it('SERP meta ve KPI değerleri (tr/en/ru/ar) yasaklı iddia içermez', () => {
    for (const lang of ['tr', 'en', 'ru', 'ar']) {
      const metas = [getFacilitySerpMeta(lang), ...DISTRICTS.map((d) => getFacilitySerpMeta(lang, d.slug))];
      for (const m of metas) {
        const text = [m.title, m.description, m.ogImageUrl, ...m.kpis.flatMap((x) => [x.label, x.value])].join('\n');
        for (const re of BANNED) expect(decodeURIComponent(text), `${lang} ${re}`).not.toMatch(re);
        expect(text).not.toMatch(/4\.9|rating=/);
      }
    }
  });
});
