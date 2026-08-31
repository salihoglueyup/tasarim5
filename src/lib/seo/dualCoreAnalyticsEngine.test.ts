import { describe, it, expect } from 'vitest';
import {
  buildPageViewEvent,
  buildLeadFormEvent,
  buildCTAClickEvent,
  buildPhoneClickEvent,
  buildCustomDimensionSpec,
  buildCustomMetricSpec,
  buildSEOKPIDashboard,
  buildCTROptimizationAlert,
  buildROICalculation,
  buildWeeklyReportTemplate,
} from './dualCoreAnalyticsEngine';

describe('BÖLÜM P — 📊 GA4 & SEO Analitik Entegrasyon Motoru (dualCoreAnalyticsEngine.test.ts)', () => {
  /* =========================================================================
   * P1 — GA4 ETKİNLİK TAKİP ŞEMASI (Faz 421-440)
   * ========================================================================= */
  describe('P1: GA4 Etkinlik & Boyut Şartnameleri (Faz 421-440)', () => {
    it('buildPageViewEvent doğru eventName ve pillar boyutu üretir', () => {
      const pageView = buildPageViewEvent('istanbul/kadikoy', 'site');
      expect(pageView.eventName).toBe('page_view');
      expect(pageView.parameters.pillar_dimension).toBe('site');
      expect(pageView.pageType).toBe('district');
    });

    it('buildLeadFormEvent dönüşüm değeri ve sıcaklık derecesi içerir', () => {
      const hotLead = buildLeadFormEvent('plaza_teklif', 'facility', 90);
      expect(hotLead.eventName).toBe('generate_lead');
      expect(hotLead.parameters.value).toBe(15000);
      expect(hotLead.parameters.lead_warmth).toBe('HOT');

      const standardLead = buildLeadFormEvent('site_teklif', 'site', 45);
      expect(standardLead.parameters.lead_warmth).toBe('STANDARD');
    });

    it('buildCTAClickEvent ve buildPhoneClickEvent mikro dönüşümleri takip eder', () => {
      const cta = buildCTAClickEvent('Teklif Alın', 'hero', 'site');
      expect(cta.eventName).toBe('select_content');
      expect(cta.parameters.cta_position).toBe('hero');

      const phone = buildPhoneClickEvent('kadikoy', 'site');
      expect(phone.eventName).toBe('contact_call');
      expect(phone.parameters.district_context).toBe('kadikoy');
    });

    it('buildCustomDimensionSpec ve buildCustomMetricSpec GA4 boyutlarını döner', () => {
      const dims = buildCustomDimensionSpec();
      expect(dims.length).toBeGreaterThanOrEqual(4);
      expect(dims.some((d) => d.parameterName === 'pillar_dimension')).toBe(true);

      const metrics = buildCustomMetricSpec();
      expect(metrics.length).toBeGreaterThanOrEqual(2);
      expect(metrics.some((m) => m.parameterName === 'lead_score')).toBe(true);
    });
  });

  /* =========================================================================
   * P2 — SEARCH CONSOLE & KPI DASHBOARD (Faz 441-460)
   * ========================================================================= */
  describe('P2: SEO KPI Göstergeleri & ROI Hesaplayıcı (Faz 441-460)', () => {
    it('buildSEOKPIDashboard hedef ve gerçekleşen değerlerle KPI tablosu üretir', () => {
      const dashboard = buildSEOKPIDashboard('facility');
      expect(dashboard.pillar).toBe('facility');
      expect(dashboard.kpis.length).toBeGreaterThanOrEqual(5);
      expect(dashboard.kpis.every((k) => k.status === 'PASS')).toBe(true);
    });

    it('buildCTROptimizationAlert düşük CTR (%3 altı) için alarm üretir', () => {
      const alert = buildCTROptimizationAlert('/hizmetler/aidat-takibi', 2.1, 3.5);
      expect(alert.needsAction).toBe(true);
      expect(alert.actionType).toBe('SERP_TITLE_META_REVISION');

      const okAlert = buildCTROptimizationAlert('/tesis-yonetimi', 4.5, 3.5);
      expect(okAlert.needsAction).toBe(false);
    });

    it('buildROICalculation organik trafik ve CVR üzerinden gelir ve ROI çarpanı hesaplar', () => {
      const roi = buildROICalculation(15000, 3.0, 60000);
      expect(roi.monthlyLeads).toBe(450);
      expect(roi.monthlyDeals).toBe(90);
      expect(roi.annualRevenueTL).toBeGreaterThan(1000000);
      expect(roi.roiMultiplier).toBeGreaterThan(1);
    });

    it('buildWeeklyReportTemplate Markdown formatında yönetici raporu döner', () => {
      const report = buildWeeklyReportTemplate('site');
      expect(report).toContain('Alo Yönetim Haftalık SEO & Büyüme Raporu');
      expect(report).toContain('SITE');
      expect(report).toContain('Organik Tıklama');
    });
  });
});
