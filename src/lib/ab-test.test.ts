import { describe, it, expect } from 'vitest';
import { getVariant, Experiment } from './ab-test';

describe('A/B Testing Framework (Phase 201 & 226)', () => {
  const heroCtaExperiment: Experiment = {
    id: 'hero-cta-button',
    variants: ['control', 'variant-blue', 'variant-emerald'],
  };

  it('userId ile aynı kullanıcıya her zaman deterministik aynı varyantı döndürür', () => {
    const userA = 'user-uuid-12345';
    const variant1 = getVariant(heroCtaExperiment, userA);
    const variant2 = getVariant(heroCtaExperiment, userA);
    const variant3 = getVariant(heroCtaExperiment, userA);

    expect(variant1).toBe(variant2);
    expect(variant2).toBe(variant3);
    expect(heroCtaExperiment.variants).toContain(variant1);
  });

  it('Farklı kullanıcılara geçerli varyantlar atar', () => {
    const users = ['usr-1', 'usr-2', 'usr-3', 'usr-4', 'usr-5'];
    users.forEach((userId) => {
      const variant = getVariant(heroCtaExperiment, userId);
      expect(heroCtaExperiment.variants).toContain(variant);
    });
  });

  it('userId verilmediğinde rastgele geçerli bir varyant döndürür', () => {
    const variant = getVariant(heroCtaExperiment);
    expect(heroCtaExperiment.variants).toContain(variant);
  });
});
