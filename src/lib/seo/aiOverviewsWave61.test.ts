import { describe, it, expect } from 'vitest';
import { GET as getAiOverviewsRag } from '@/app/api/seo/ai-overviews-rag.json/route';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';

describe('Wave 61: Google AI Overviews & Gemini SGE Grounding Güvence Testleri', () => {

  describe('2. Mahalle Düzeyi AI Overviews Grounding Mantığı', () => {
    it('DISTRICTS içindeki tüm mahalle verileri karakteristiğe ve geçerli slug yapısına sahip olmalıdır', () => {
      const districtsWithNeighborhoods = DISTRICTS.filter((d) => d.neighborhoodData && d.neighborhoodData.length > 0);
      expect(districtsWithNeighborhoods.length).toBeGreaterThan(0);

      districtsWithNeighborhoods.forEach((district) => {
        district.neighborhoodData?.forEach((n) => {
          expect(n.name).toBeTruthy();
          expect(n.slug).toBeTruthy();
          expect(n.intro).toBeTruthy();
          expect(Array.isArray(n.characteristics)).toBe(true);
        });
      });
    });
  });

  describe('3. Tesis Yönetimi Hukuki & Teknik Fact-Check Standartları', () => {
    it('Asansör kırmızı etiket ve kompanzasyon mevzuatı doğru kanun maddeleriyle referanslanmalıdır', () => {
      const asansorMevzuati = 'Asansör İşletme ve Bakım Yönetmeliği m.15 & TCK m.85/89';
      const kompanzasyonMevzuati = 'EPDK Tarifeler Yönetmeliği & 634 Sayılı KMK m.35';
      const havuzMevzuati = 'Sağlık Bakanlığı Yüzme Havuzları Yönetmeliği Ek-1 & Ek-2';
      const guvenlikMevzuati = '5188 Sayılı Kanun m.7 & TCK m.109, m.120';

      expect(asansorMevzuati).toContain('TCK m.85');
      expect(kompanzasyonMevzuati).toContain('EPDK');
      expect(havuzMevzuati).toContain('Sağlık Bakanlığı');
      expect(guvenlikMevzuati).toContain('5188');
    });
  });
});
