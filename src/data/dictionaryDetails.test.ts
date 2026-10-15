import { describe, it, expect } from 'vitest';
import { TERMS, termToSlug } from './dictionary';
import { TERM_DETAILS } from './dictionaryDetails';

describe('sözlük ayrıntı açıklamaları', () => {
  it('her anahtar gerçek bir terime karşılık gelir ve en az iki paragraf içerir', () => {
    const slugs = new Set(TERMS.map((t) => termToSlug(t.term)));
    const keys = Object.keys(TERM_DETAILS);
    expect(keys.length).toBeGreaterThanOrEqual(20);
    for (const k of keys) {
      expect(slugs.has(k), k).toBe(true);
      const d = TERM_DETAILS[k];
      expect(d.explain.length, k).toBeGreaterThanOrEqual(2);
      expect(d.explain.join(' ').split(/\s+/).length, k).toBeGreaterThanOrEqual(40);
    }
  });
});
