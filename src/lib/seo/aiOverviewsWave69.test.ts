import { describe, it, expect } from 'vitest';
import ServicePricingProductAiOverviewSeo from '@/components/seo/ai-overviews/ServicePricingProductAiOverviewSeo';
import { SERVICE_PRICING_PACKAGES } from '@/components/seo/ai-overviews/ServicePricingProductAiOverviewSeo';
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



});
