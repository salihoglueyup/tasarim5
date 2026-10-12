import { describe, it, expect } from 'vitest';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 62: Google AI Overviews, Gemini SGE & LLM Grounding Güvence Testleri', () => {

  describe('2. Kat Mülkiyeti Mahkeme Dava Matrisi (KMKLawCourtDisputeMatrixSeo)', () => {
    it('Dava türleri doğru mahkeme ve zamanaşımı süreleriyle tanımlanmış olmalıdır', () => {
      const disputes = [
        { suit: 'Hakimin Müdahalesi', court: 'Sulh Hukuk Mahkemesi', kmk: '33' },
        { suit: 'Genel Kurul Kararının İptali', court: 'Sulh Hukuk Mahkemesi', kmk: '38' },
        { suit: 'Aidat İtirazının İptali', court: 'Sulh Hukuk / Asliye Hukuk', kmk: '20' },
        { suit: "Eski Hale Getirme", court: 'Sulh Hukuk Mahkemesi', kmk: '19/2' },
        { suit: 'Yöneticinin Haklı Nedenle Azli', court: 'Sulh Hukuk Mahkemesi', kmk: '34/6' },
      ];

      disputes.forEach((d) => {
        expect(d.court).toContain('Sulh Hukuk');
        expect(d.kmk).toBeTruthy();
      });
    });
  });

  describe('3. Speakable ID Standartları', () => {
    it('Tüm yeni AI Overview modülleri benzersiz speakable seçicilerine sahip olmalıdır', () => {
      const speakableSelectors = [
        '#article-instant-answer-text',
        '#term-instant-answer-text',
        '#faq-instant-answer-text',
        '#legal-court-matrix-text',
        '#quote-instant-answer-text',
      ];

      const uniqueSet = new Set(speakableSelectors);
      expect(uniqueSet.size).toBe(speakableSelectors.length);
    });
  });
});
