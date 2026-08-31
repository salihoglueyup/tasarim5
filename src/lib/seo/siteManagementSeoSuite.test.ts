import { describe, it, expect } from 'vitest';
import { FACILITY_TERMS } from '@/data/facilityDictionaryData';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getGeoFeed } from '@/app/api/tesis-yonetimi/geo-feed.xml/route';
import {
  SERVICES,
  getService,
  getServiceKmkArticles,
  getServiceLongTailKeywords,
  getSiteManagementServiceMatrix
} from '@/data/services';
import { autoLinkHtml } from '@/lib/autoLinker';
import { FACILITY_MANAGEMENT_ENTITIES } from '@/lib/seoEngine';
import { resolveSmartRedirect } from '@/lib/seo/smartRedirect';
import { getFacilitySerpMeta } from '@/lib/seo/facilitySerpOptimizer';
import { organizationSchema } from '@/lib/schemas';

describe('Site Yönetimi Anahtar Kelime & Sayfa Optimizasyon Paketi (siteManagementSeoSuite.test.ts)', () => {
  describe('1. Sözlük & Google Featured Snippet (Position Zero) Tanımları (facilityDictionaryData.ts)', () => {
    it('Site Yönetimi, Yönetim Planı, Site Yönetim Kurulu ve Toplu Yapı Yönetimi terimlerini içerir', () => {
      const siteYonetimi = FACILITY_TERMS.find(t => t.termCode === 'site-yonetimi');
      const yonetimPlani = FACILITY_TERMS.find(t => t.termCode === 'yonetim-plani');
      const siteYonetimKurulu = FACILITY_TERMS.find(t => t.termCode === 'site-yonetim-kurulu');
      const topluYapi = FACILITY_TERMS.find(t => t.termCode === 'toplu-yapi-yonetimi');

      expect(siteYonetimi).toBeDefined();
      expect(siteYonetimi?.description).toContain('634 Sayılı Kat Mülkiyeti Kanunu');
      expect(siteYonetimi?.description).toContain('5188');

      expect(yonetimPlani).toBeDefined();
      expect(yonetimPlani?.legalBasis).toContain('Madde 28');

      expect(siteYonetimKurulu).toBeDefined();
      expect(siteYonetimKurulu?.legalBasis).toContain('Madde 34');

      expect(topluYapi).toBeDefined();
      expect(topluYapi?.legalBasis).toContain('Madde 66 - 74');
    });
  });

  describe('2. Hizmet Veri Modeli ve Semantik Otorite Külliyatı (services.ts)', () => {
    it('9 temel hizmetin tamamında KMK maddeleri, SLA ve long-tail anahtar kelimeler bulunur', () => {
      expect(SERVICES.length).toBe(9);

      const tesis = getService('tesis-yonetimi');
      expect(tesis).toBeDefined();
      expect(tesis?.keywords).toContain('site yönetimi');
      expect(tesis?.keywords).toContain('profesyonel site yönetimi');
      expect(tesis?.keywords).toContain('apartman ve site yönetimi');
      expect(tesis?.longTailKeywords?.length).toBeGreaterThanOrEqual(4);
      expect(tesis?.kmkArticles?.some(a => a.includes('Madde 34'))).toBe(true);
      expect(tesis?.slaGuarantee).toContain('15-25 Dk');
    });

    it('Yardımcı fonksiyonlar (getServiceKmkArticles, getServiceLongTailKeywords, getSiteManagementServiceMatrix) doğru çalışır', () => {
      const kmk = getServiceKmkArticles('aidat-takibi');
      expect(kmk.some(a => a.includes('Madde 20'))).toBe(true);

      const longTail = getServiceLongTailKeywords('guvenlik-yonetimi');
      expect(longTail.length).toBeGreaterThanOrEqual(2);

      const matrix = getSiteManagementServiceMatrix();
      expect(matrix.length).toBe(9);
      expect(matrix[0].primaryKeywords.length).toBeGreaterThan(0);
    });
  });

  describe('3. Akıllı İç Linkleme ve Kırık Varlık Linki Onarımı (seoEngine.ts & autoLinker.ts)', () => {
    it('seoEngine FACILITY_MANAGEMENT_ENTITIES içindeki site-yonetimi pillarUrl doğru sayfaya (/hizmetler/tesis-yonetimi) bakar', () => {
      const siteEntity = FACILITY_MANAGEMENT_ENTITIES.find(e => e.slug === 'site-yonetimi');
      expect(siteEntity).toBeDefined();
      expect(siteEntity?.pillarUrl).toBe('/hizmetler/tesis-yonetimi');
    });

    it('Metin içindeki "site yönetim şirketi", "profesyonel site yönetimi" gibi kelimeleri doğru linke dönüştürür', () => {
      const html = '<p>Büyük projelerde profesyonel site yönetimi ve güvenilir site yönetim şirketi ile çalışmak önemlidir.</p>';
      const linked = autoLinkHtml(html, '/blog/ornek-makale');

      expect(linked).toContain('href="/hizmetler/tesis-yonetimi"');
    });
  });

  describe('4. Semantik 301 Yönlendirmeleri (smartRedirect.ts)', () => {
    it('/site-yonetimi, /apartman-yonetimi ve /site-yonetim-sirketleri rotalarını /hizmetler/tesis-yonetimi adresine yönlendirir', () => {
      const red1 = resolveSmartRedirect('/site-yonetimi');
      expect(red1).toBeDefined();
      expect(red1?.targetUrl).toBe('/hizmetler/tesis-yonetimi');

      const red2 = resolveSmartRedirect('/apartman-yonetimi');
      expect(red2).toBeDefined();
      expect(red2?.targetUrl).toBe('/hizmetler/tesis-yonetimi');

      const red3 = resolveSmartRedirect('/site-yonetim-sirketleri');
      expect(red3).toBeDefined();
      expect(red3?.targetUrl).toBe('/hizmetler/tesis-yonetimi');
    });
  });

  describe('5. 39 İlçe SERP Başlık & Meta Optimizasyonu (facilitySerpOptimizer.ts) & Şema Doğrulama (schemas.ts)', () => {
    it('İlçe SERP başlıklarında Site ve Tesis Yönetimi çift kanatlı yapısı bulunur', () => {
      const kadikoyMeta = getFacilitySerpMeta('tr', 'kadikoy');
      expect(kadikoyMeta.title).toContain('Kadıköy Tesis Yönetimi & Site Yönetimi');
      expect(kadikoyMeta.description).toContain('KMK 634');
      expect(kadikoyMeta.description).toContain('15-25 dk SLA');
    });

    it('organizationSchema hasOfferCatalog içinde Profesyonel Site ve Toplu Konut Yönetimi tanımlıdır', () => {
      const org = organizationSchema();
      const catalog = org.hasOfferCatalog as { itemListElement: Array<{ itemOffered: { name: string; serviceType?: string } }> };
      expect(catalog).toBeDefined();
      const siteOffer = catalog.itemListElement.find(item => item.itemOffered.name.includes('Site'));
      expect(siteOffer).toBeDefined();
      expect(siteOffer?.itemOffered.serviceType).toBe('Site Yönetimi');
    });
  });

  describe('6. AI / LLM Grounding & Geo-Feed Protokolleri', () => {
    it('llms.txt site yönetimi anahtar kelimelerini ve grounding verilerini doğru döner', async () => {
      const res = await getLlmsTxt();
      const text = await res.text();
      expect(text).toContain('Site Yönetimi');
      expect(text).toContain('Kat Mülkiyeti Kanunu');
      expect(text).toContain('5188');
    });

    it('geo-feed.xml 39 ilçede site ve tesis yönetimi verilerini barındırır', async () => {
      const res = await getGeoFeed();
      const xml = await res.text();
      expect(xml).toContain('Tesis Yönetimi');
      expect(xml).toContain('Kadıköy');
      expect(xml).toContain('Beşiktaş');
    });
  });
});
