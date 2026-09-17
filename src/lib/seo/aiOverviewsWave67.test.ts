import { describe, it, expect } from 'vitest';
import {
  AppAiOverviewGroundingSeo,
  GlossaryAiOverviewSeo,
  DistrictServiceAiOverviewSnippetSeo,
  SectorHubAiOverviewSeo,
} from '@/components/seo';
import { APP_CORE_FEATURES } from '@/components/seo/ai-overviews/AppAiOverviewGroundingSeo';
import { TOP_GLOSSARY_TERMS } from '@/components/seo/ai-overviews/GlossaryAiOverviewSeo';
import { SECTOR_GROUND_TRUTH_LIST } from '@/components/seo/ai-overviews/SectorHubAiOverviewSeo';
import { GET as getAiTelemetry } from '@/app/api/seo/ai-telemetry.json/route';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Wave 67: Google AI Overviews Full-Power Grounding Expansion & AI Telemetry', () => {
  describe('Component Exports & Definitions', () => {
    it('exports all Wave 67 AI Overview components cleanly', () => {
      expect(AppAiOverviewGroundingSeo).toBeDefined();
      expect(GlossaryAiOverviewSeo).toBeDefined();
      expect(DistrictServiceAiOverviewSnippetSeo).toBeDefined();
      expect(SectorHubAiOverviewSeo).toBeDefined();
    });

    it('contains exactly 5 mobile app cloud features with 256-bit SSL & instant push', () => {
      expect(APP_CORE_FEATURES.length).toBe(5);
      expect(APP_CORE_FEATURES.some((f) => f.title.includes('256-Bit SSL'))).toBe(true);
      expect(APP_CORE_FEATURES.some((f) => f.title.includes('Canlı Kasa'))).toBe(true);
      expect(APP_CORE_FEATURES.some((f) => f.title.includes('QR / RFID'))).toBe(true);
      expect(APP_CORE_FEATURES.some((f) => f.title.includes('Push Bildirim') || f.title.includes('Duyuru'))).toBe(true);
    });

    it('contains 10 essential facility and KMK legal glossary entries', () => {
      expect(TOP_GLOSSARY_TERMS.length).toBe(10);
      expect(TOP_GLOSSARY_TERMS.some((g) => g.term.includes('İşletme Projesi'))).toBe(true);
      expect(TOP_GLOSSARY_TERMS.some((g) => g.term.includes('Demirbaş'))).toBe(true);
      expect(TOP_GLOSSARY_TERMS.some((g) => g.term.includes('Mali ve İdari İbra'))).toBe(true);
      expect(TOP_GLOSSARY_TERMS.some((g) => g.term.includes('Arsa Payı'))).toBe(true);
      expect(TOP_GLOSSARY_TERMS.some((g) => g.term.includes('Bağımsız Bölüm'))).toBe(true);
      expect(TOP_GLOSSARY_TERMS.some((g) => g.term.includes('Gecikme Tazminatı'))).toBe(true);
    });

    it('contains 5 core sector groundings under ISO and legal standards', () => {
      expect(SECTOR_GROUND_TRUTH_LIST.length).toBe(5);
      const res = SECTOR_GROUND_TRUTH_LIST.find((s) => s.id === 'rezidans');
      const plaza = SECTOR_GROUND_TRUTH_LIST.find((s) => s.id === 'plaza');
      const avm = SECTOR_GROUND_TRUTH_LIST.find((s) => s.id === 'avm');
      const sanayi = SECTOR_GROUND_TRUTH_LIST.find((s) => s.id === 'sanayi');

      expect(res).toBeDefined();
      expect(res?.standard).toContain('ISO 41001');
      expect(plaza?.standard).toContain('ISO 50001');
      expect(avm?.standard).toContain('5188 SK');
      expect(sanayi?.kpi).toContain('Sıfır İş Kazası');
    });
  });

  describe('Real-Time AI Telemetry & Health API (/api/seo/ai-telemetry.json)', () => {
    it('returns 200 OK with valid operational metrics and AI feeds inventory', async () => {
      const res = await getAiTelemetry();
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.telemetryVersion).toBe('1.0.0');
      expect(data.status).toBe('optimal');
      expect(data.healthScore).toBe(100);
      expect(data.knowledgeCoverage.districtsCovered).toBe(39);
      expect(data.knowledgeCoverage.activeManagedFacilities).toBeGreaterThanOrEqual(340);
      expect(data.knowledgeCoverage.residentsServed).toBeGreaterThanOrEqual(45000);
      expect(data.knowledgeCoverage.staffDeployed).toBeGreaterThanOrEqual(1200);
      expect(data.knowledgeCoverage.isoStandardsAccredited).toBe(6);

      // AI Feeds inventory checks
      expect(data.machineReadableRegistry.aiTelemetryJson).toContain('/api/seo/ai-telemetry.json');
      expect(data.machineReadableRegistry.aiCitationsJson).toContain('/api/seo/ai-citations.json');
      expect(data.machineReadableRegistry.corporateDnaJson).toContain('/api/seo/corporate-dna.json');
      expect(data.machineReadableRegistry.geoManifestJson).toContain('/api/seo/geo-manifest.json');
      expect(data.machineReadableRegistry.llmsTxt).toContain('/llms.txt');
    });
  });

  describe('llms.txt and llms-full.txt AI Telemetry integration', () => {
    it('both files declare the AI Telemetry API endpoint', async () => {
      const resTxt = await getLlmsTxt();
      const txt = await resTxt.text();
      expect(txt).toContain('/api/seo/ai-telemetry.json');

      const resFullTxt = await getLlmsFullTxt();
      const fullTxt = await resFullTxt.text();
      expect(fullTxt).toContain('/api/seo/ai-telemetry.json');
    });
  });
});
