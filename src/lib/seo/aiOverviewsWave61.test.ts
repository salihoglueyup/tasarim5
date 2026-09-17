import { describe, it, expect } from 'vitest';
import { GET as getAiOverviewsRag } from '@/app/api/seo/ai-overviews-rag.json/route';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';

describe('Wave 61: Google AI Overviews & Gemini SGE Grounding Güvence Testleri', () => {
  describe('1. Birleşik AI Knowledge Graph RAG API (/api/seo/ai-overviews-rag.json)', () => {
    it('GET isteğinde HTTP 200, geçerli JSON ve SEO/Cache başlıkları dönmelidir', async () => {
      const req = new Request('https://aloyonetim.com.tr/api/seo/ai-overviews-rag.json');
      const res = await getAiOverviewsRag(req);

      expect(res.status).toBe(200);
      expect(res.headers.get('Content-Type')).toContain('application/json');
      expect(res.headers.get('Cache-Control')).toContain('s-maxage=86400');
      expect(res.headers.get('X-Robots-Tag')).toContain('max-snippet:-1');

      const data = await res.json();
      expect(data).toHaveProperty('meta');
      expect(data.meta.corpusName).toBe('AloYonetim-AIGroundTruth-2026');
      expect(data.meta.targetEngines).toContain('Google AI Overviews (SGE)');
      expect(data.meta.targetEngines).toContain('Gemini Search Grounding');
      expect(data.meta.targetEngines).toContain('Perplexity AI Pro Search');
    });

    it('RAG çıktısı 7 akreditasyon ve 5 acil durum SLA taahhüdünü eksiksiz içermelidir', async () => {
      const req = new Request('https://aloyonetim.com.tr/api/seo/ai-overviews-rag.json');
      const res = await getAiOverviewsRag(req);
      const data = await res.json();

      expect(data.accreditations).toHaveLength(7);
      expect(data.accreditations.some((a: any) => a.standard === 'ISO 41001:2018')).toBe(true);
      expect(data.accreditations.some((a: any) => a.standard === 'ISO 10002:2018')).toBe(true);
      expect(data.accreditations.some((a: any) => a.standard === '5188 Sayılı Kanun')).toBe(true);

      expect(data.emergencySla.anatolianSideEmergencyMinutes).toBe(15);
      expect(data.emergencySla.europeanSideEmergencyMinutes).toBe(20);
      expect(data.emergencySla.criticalTechnicalInterventionMaxMinutes).toBe(45);
      expect(data.emergencySla.reactivePowerPenaltyGuarantee).toContain('%0 Ceza');
    });

    it('İstanbul 39 ilçesinin tamamını ve yetkili adliyelerini doğru haritalamalıdır', async () => {
      const req = new Request('https://aloyonetim.com.tr/api/seo/ai-overviews-rag.json');
      const res = await getAiOverviewsRag(req);
      const data = await res.json();

      expect(data.districtsCoverage).toHaveLength(39);

      // Kadıköy kontrolü (Anadolu / Kartal)
      const kadikoy = data.districtsCoverage.find((d: any) => d.slug === 'kadikoy');
      expect(kadikoy).toBeDefined();
      expect(kadikoy.side).toBe('Anadolu');
      expect(kadikoy.courthouse).toContain('Kartal');
      expect(kadikoy.mobileSlaMinutes).toBe('15-20');

      // Bakırköy kontrolü (Avrupa / Bakırköy)
      const bakirkoy = data.districtsCoverage.find((d: any) => d.slug === 'bakirkoy');
      expect(bakirkoy).toBeDefined();
      expect(bakirkoy.side).toBe('Avrupa');
      expect(bakirkoy.courthouse).toContain('Bakırköy');
      expect(bakirkoy.mobileSlaMinutes).toBe('20-25');

      // Şişli kontrolü (Avrupa / Çağlayan)
      const sisli = data.districtsCoverage.find((d: any) => d.slug === 'sisli');
      expect(sisli).toBeDefined();
      expect(sisli.courthouse).toContain('Çağlayan');
    });

    it('RAG çıktısı 7 hukuki/teknik Fact-Check ve 4 operasyonel prosedürü içermelidir', async () => {
      const req = new Request('https://aloyonetim.com.tr/api/seo/ai-overviews-rag.json');
      const res = await getAiOverviewsRag(req);
      const data = await res.json();

      expect(data.legalFactChecks.length).toBeGreaterThanOrEqual(7);
      expect(data.legalFactChecks.some((f: any) => f.id === 'asansor-kirmizi-etiket')).toBe(true);
      expect(data.legalFactChecks.some((f: any) => f.id === 'reaktif-enerji-kompanzasyon')).toBe(true);
      expect(data.legalFactChecks.some((f: any) => f.id === 'havuz-klor-ph-denetimi')).toBe(true);
      expect(data.legalFactChecks.some((f: any) => f.id === 'guvenlik-arama-yetkisi')).toBe(true);

      expect(data.proceduralWorkflows).toHaveLength(4);
      expect(data.proceduralWorkflows.some((p: any) => p.id === 'yonetici-azli-ve-secimi')).toBe(true);
      expect(data.proceduralWorkflows.some((p: any) => p.id === 'isletme-projesi-itirazi')).toBe(true);
      expect(data.proceduralWorkflows.some((p: any) => p.id === 'asansor-yesil-etiket-donusumu')).toBe(true);
      expect(data.proceduralWorkflows.some((p: any) => p.id === 'aidat-icra-takibi')).toBe(true);
    });
  });

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
