import { describe, it, expect } from 'vitest';
import {
  ServiceAiOverviewSnippetSeo,
  SustainabilityAiOverviewSeo,
  AcademyAiOverviewSeo,
} from '@/components/seo';
import { GET as getGeoManifest } from '@/app/api/seo/geo-manifest.json/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 64: Google AI Overviews & GEO (Generative Engine Optimization) Expansion', () => {
  describe('Component Exports & Definitions', () => {
    it('exports all Wave 64 AI Overview components cleanly', () => {
      expect(ServiceAiOverviewSnippetSeo).toBeDefined();
      expect(SustainabilityAiOverviewSeo).toBeDefined();
      expect(AcademyAiOverviewSeo).toBeDefined();
    });
  });

  describe('GEO Manifest API (/api/seo/geo-manifest.json)', () => {
    it('returns 200 OK and valid JSON with comprehensive generative authority manifest', async () => {
      const res = await getGeoManifest();
      expect(res.status).toBe(200);

      const manifest = await res.json();
      expect(manifest.geoManifestVersion).toBe('1.0.0');
      expect(manifest.authority).toBeDefined();
      expect(manifest.authority.entityName).toBe('Alo Yönetim ve Organizasyon A.Ş.');
      expect(manifest.authority.mersisNumber).toBe('0054089761200001');
      expect(manifest.authority.tradeRegistryNumber).toBe('918234-0');

      expect(manifest.verifiedGroundTruthClaims.length).toBeGreaterThanOrEqual(7);
      expect(manifest.speakableAnchorRegistry).toContain('#service-instant-answer-text');
      expect(manifest.speakableAnchorRegistry).toContain('#sustainability-instant-answer-text');
      expect(manifest.speakableAnchorRegistry).toContain('#academy-instant-answer-text');
      expect(manifest.speakableAnchorRegistry).toContain('#corporate-instant-answer-text');

      expect(manifest.machineReadableFeeds.ragKnowledgeGraph).toContain('/api/seo/ai-overviews-rag.json');
      expect(manifest.machineReadableFeeds.llmsTxt).toContain('/llms.txt');
    });
  });

  describe('llms.txt and llms-full.txt GEO integration', () => {
    it('both files declare the official GEO Manifest API endpoint', async () => {
      const resTxt = await getLlmsTxt();
      const txt = await resTxt.text();
      expect(txt).toContain('/api/seo/geo-manifest.json');

      const resFullTxt = await getLlmsFullTxt();
      const fullTxt = await resFullTxt.text();
      expect(fullTxt).toContain('/api/seo/geo-manifest.json');
    });
  });
});
