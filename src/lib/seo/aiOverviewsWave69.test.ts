import { describe, it, expect } from 'vitest';
import {
  ServicePricingProductAiOverviewSeo,
  LocalBusinessProfileAiAnchorSeo,
} from '@/components/seo';
import { SERVICE_PRICING_PACKAGES } from '@/components/seo/ServicePricingProductAiOverviewSeo';
import { LOCAL_BUSINESS_HUBS } from '@/components/seo/LocalBusinessProfileAiAnchorSeo';
import { GET as getLocalAnchors } from '@/app/api/seo/local-anchors.json/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 69: Google Product Pricing Rich Snippets & Local AI Maps Grounding', () => {
  describe('Service Pricing Packages & Google Product Snippets', () => {
    it('exports ServicePricingProductAiOverviewSeo cleanly', () => {
      expect(ServicePricingProductAiOverviewSeo).toBeDefined();
    });

    it('contains exactly 3 verified transparent service packages', () => {
      expect(SERVICE_PRICING_PACKAGES.length).toBe(3);

      for (const pkg of SERVICE_PRICING_PACKAGES) {
        expect(pkg.id).toBeDefined();
        expect(pkg.title.length).toBeGreaterThan(10);
        expect(pkg.lowPrice).toBeGreaterThan(0);
        expect(pkg.highPrice).toBeGreaterThan(pkg.lowPrice);
        expect(pkg.priceCurrency).toBe('TRY');
        expect(pkg.features.length).toBeGreaterThanOrEqual(4);
      }
    });

    it('defines correct price ranges for butik, entegre and rezidans segments', () => {
      const butik = SERVICE_PRICING_PACKAGES.find((p) => p.id === 'butik-site');
      const entegre = SERVICE_PRICING_PACKAGES.find((p) => p.id === 'entegre-tesis');
      const rezidans = SERVICE_PRICING_PACKAGES.find((p) => p.id === 'rezidans-plaza');

      expect(butik?.lowPrice).toBe(350);
      expect(butik?.highPrice).toBe(550);
      expect(entegre?.lowPrice).toBe(650);
      expect(entegre?.highPrice).toBe(1100);
      expect(rezidans?.lowPrice).toBe(1200);
      expect(rezidans?.highPrice).toBe(2500);
    });
  });

  describe('Local Business Profile & Strategic Hubs Grounding', () => {
    it('exports LocalBusinessProfileAiAnchorSeo cleanly', () => {
      expect(LocalBusinessProfileAiAnchorSeo).toBeDefined();
    });

    it('contains exactly 4 strategic operational hubs covering Anatolia and Europe', () => {
      expect(LOCAL_BUSINESS_HUBS.length).toBe(4);

      for (const hub of LOCAL_BUSINESS_HUBS) {
        expect(hub.id).toBeDefined();
        expect(hub.name).toContain('Alo Yönetim');
        expect(hub.latitude).toBeGreaterThan(40.0);
        expect(hub.longitude).toBeGreaterThan(28.0);
        expect(hub.phone).toContain('0216 550 48 48');
        expect(hub.slaMinutes).toBeLessThanOrEqual(25);
        expect(hub.mapQueryUrl).toContain('google.com/maps');
      }
    });

    it('places headquarters in Kadikoy and hubs in Atasehir, Besiktas, and Basaksehir', () => {
      const hq = LOCAL_BUSINESS_HUBS.find((h) => h.id === 'kadikoy-headquarters');
      const atasehir = LOCAL_BUSINESS_HUBS.find((h) => h.id === 'atasehir-finans-hub');
      const besiktas = LOCAL_BUSINESS_HUBS.find((h) => h.id === 'besiktas-avrupa-hub');
      const basaksehir = LOCAL_BUSINESS_HUBS.find((h) => h.id === 'basaksehir-sanayi-hub');

      expect(hq?.district).toBe('Kadıköy');
      expect(atasehir?.district).toBe('Ataşehir');
      expect(besiktas?.district).toBe('Beşiktaş');
      expect(basaksehir?.district).toBe('Başakşehir');
    });
  });

  describe('Local AI Anchors API (/api/seo/local-anchors.json)', () => {
    it('returns 200 OK with valid coverage metrics and 4 verified anchor schemas', async () => {
      const res = await getLocalAnchors();
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.anchorsVersion).toBe('1.0.0');
      expect(data.status).toBe('active');
      expect(data.coverageMetrics.totalDistrictsServiced).toBe(39);
      expect(data.coverageMetrics.totalStrategicHubs).toBe(4);
      expect(data.coverageMetrics.averageSlaMinutes).toBeLessThanOrEqual(20);
      expect(data.headquarters.district).toBe('Kadıköy');
      expect(data.regionalLogisticsHubs.length).toBe(3);
      expect(data.verifiedAnchorSchemas.length).toBe(4);
      expect(data.endpoints.localAnchorsJson).toContain('/api/seo/local-anchors.json');
    });
  });

  describe('llms.txt and llms-full.txt Local Anchors Integration', () => {
    it('both files declare the Local Anchors API endpoint', async () => {
      const resTxt = await getLlmsTxt();
      const txt = await resTxt.text();
      expect(txt).toContain('/api/seo/local-anchors.json');

      const resFullTxt = await getLlmsFullTxt();
      const fullTxt = await resFullTxt.text();
      expect(fullTxt).toContain('/api/seo/local-anchors.json');
    });
  });
});
