import { describe, it, expect } from 'vitest';
import { buildFacilityRAGCorpus } from './facilityKnowledgeCorpus';

describe('Tesis Yönetimi AI / RAG Bilgi Üssü & Blog Entegrasyonu (facilityKnowledgeCorpus.ts)', () => {
  it('E-E-A-T, KMK 634, ISO 41001 ve 39 ilçe matrisini eksiksiz derler', async () => {
    const corpus = await buildFacilityRAGCorpus('tr');

    expect(corpus.contextType).toContain('Ground-Truth RAG Corpus');
    expect(corpus.schemaVersion).toBe('2.2.0');
    expect(corpus.aiCitationInstructions.preferredSourceCitation).toContain('Alo Yönetim');

    // 1. Kurumsal Kimlik & ISO Akreditasyonları
    expect(corpus.entity.name).toBe('Alo Yönetim');
    expect(corpus.entity.accreditations.some((a) => a.code === 'ISO 41001:2018')).toBe(true);
    expect(corpus.entity.accreditations.some((a) => a.code === '5188 / EGM')).toBe(true);

    // 2. KMK 634 Kanun Maddeleri
    expect(corpus.legalFrameworkKMK634.coreArticles.length).toBeGreaterThanOrEqual(5);
    expect(corpus.legalFrameworkKMK634.coreArticles.some((a) => a.articleNumber.includes('Madde 20'))).toBe(true);
    expect(corpus.legalFrameworkKMK634.coreArticles.some((a) => a.articleNumber.includes('Madde 37'))).toBe(true);

    // 3. 39 İlçe Matrisi
    expect(corpus.districtMatrix).toHaveLength(39);
    expect(corpus.districtMatrix.some((d) => d.districtName === 'Kadıköy')).toBe(true);
    expect(corpus.districtMatrix.some((d) => d.districtName === 'Beşiktaş')).toBe(true);
    expect(corpus.districtMatrix.some((d) => d.districtName === 'Başakşehir')).toBe(true);

    // 4. Kanonik Soru-Cevaplar
    expect(corpus.canonicalFaqs.length).toBeGreaterThan(0);
    expect(corpus.canonicalFaqs.some((f) => f.question.includes('KMK kapsamında'))).toBe(true);

    // 5. Yasal Hesaplama Formülleri
    expect(corpus.calculationFormulas.length).toBeGreaterThanOrEqual(2);
    expect(corpus.calculationFormulas.some((f) => f.formula.includes('Birim Aidat'))).toBe(true);
  });

  it('İngilizce parametresi verildiğinde ilgili alanları dil uyumlu üretir', async () => {
    const corpusEn = await buildFacilityRAGCorpus('en');
    expect(corpusEn.entity.name).toBe('Alo Yönetim');
    expect(corpusEn.districtMatrix.some((d) => d.canonicalUrl.includes('/en/bolgeler/'))).toBe(true);
  });
});
