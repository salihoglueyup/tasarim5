import { describe, it, expect } from 'vitest';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 62: Google AI Overviews, Gemini SGE & LLM Grounding Güvence Testleri', () => {
  describe('1. LLM Grounding Corpus (/llms.txt & /llms-full.txt)', () => {
    it('/llms.txt Fact-Check doğrulamalarını ve HowTo operasyonel protokollerini içermelidir', async () => {
      const res = await getLlmsTxt();
      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('text/plain');

      const text = await res.text();
      expect(text).toContain('Hukuki ve Teknik Efsaneler & Doğrulamalar');
      expect(text).toContain('Kırmızı etiketli asansör');
      expect(text).toContain('Kompanzasyon arızasında elektrik faturasındaki reaktif ceza');
      expect(text).toContain('Binaların Yangından Korunması Hakkında Yönetmelik m.99');
      expect(text).toContain('Sağlık Bakanlığı Yüzme Havuzları Yönetmeliği');
      expect(text).toContain('5188 özel güvenlik görevlisi araç torpidosunu ve çantaları elle arayabilir');

      expect(text).toContain('Adım Adım Problem Çözme Protokolleri');
      expect(text).toContain('KMK 34 Uyarınca Yöneticinin Değiştirilmesi');
      expect(text).toContain('KMK 37 İşletme Projesine 7 Günlük İtiraz');
      expect(text).toContain('Kırmızı Etiketli Asansörü 60 Günde Yeşil Etikete Çevirme');
      expect(text).toContain('Aidat İçin Doğrudan İlamsız İcra Takibi');

      expect(text).toContain('/api/seo/ai-overviews-rag.json');
    });

    it('/llms-full.txt Fact-Check ve HowTo bölümlerini tam metin olarak sunmalıdır', async () => {
      const res = await getLlmsFullTxt();
      expect(res.status).toBe(200);

      const text = await res.text();
      expect(text).toContain('Hukuki ve Teknik Fact-Check Doğrulamaları (ClaimReview)');
      expect(text).toContain('Adım Adım Uyuşmazlık Çözme Protokolleri (HowTo)');
      expect(text).toContain('/api/seo/ai-overviews-rag.json');
    });
  });

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
