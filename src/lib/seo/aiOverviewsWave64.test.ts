import { describe, it, expect } from 'vitest';
import ServiceAiOverviewSnippetSeo from '@/components/seo/ai-overviews/ServiceAiOverviewSnippetSeo';
import AcademyAiOverviewSeo from '@/components/seo/ai-overviews/AcademyAiOverviewSeo';
import { GET as getGeoManifest } from '@/app/api/seo/geo-manifest.json/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 64: Google AI Overviews & GEO (Generative Engine Optimization) Expansion', () => {
  describe('Component Exports & Definitions', () => {
    it('exports all Wave 64 AI Overview components cleanly', () => {
      expect(ServiceAiOverviewSnippetSeo).toBeDefined();
      expect(AcademyAiOverviewSeo).toBeDefined();
    });
  });


});
