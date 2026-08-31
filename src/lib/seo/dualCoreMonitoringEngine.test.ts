import { describe, it, expect } from 'vitest';
import {
  buildSERPPositionDropAlert,
  buildCoreWebVitalsRegressionAlert,
  buildStructuredDataErrorAlert,
  buildSlackNotificationPayload,
  runDailyHealthCheck,
  buildSelfHealingSpec,
} from './dualCoreMonitoringEngine';

describe('BÖLÜM Q — 🔔 Canlı İzleme & Otomatik Alarm Motoru (dualCoreMonitoringEngine.test.ts)', () => {
  /* =========================================================================
   * Q1 — GERÇEK ZAMANLI ALARM MOTORU (Faz 461-480)
   * ========================================================================= */
  describe('Q1: Gerçek Zamanlı Alarm & Slack Bildirim Testleri (Faz 461-480)', () => {
    it('buildSERPPositionDropAlert Top 3 düşüşlerinde critical severity ve dedupKey üretir', () => {
      const alert = buildSERPPositionDropAlert('site yönetimi istanbul', 2, 8, 'site');
      expect(alert.category).toBe('SERP_DROP');
      expect(alert.severity).toBe('critical');
      expect(alert.metricBefore).toBe('#2');
      expect(alert.metricAfter).toBe('#8');
      expect(alert.dedupKey).toContain('site-yonetimi-istanbul');
    });

    it('buildCoreWebVitalsRegressionAlert LCP gecikmesi için doğru aksiyon önerir', () => {
      const alert = buildCoreWebVitalsRegressionAlert('/tesis-yonetimi', 'LCP', 2100, 3600);
      expect(alert.category).toBe('CWV_REGRESSION');
      expect(alert.severity).toBe('critical');
      expect(alert.recommendedAction).toContain('preload');
    });

    it('buildStructuredDataErrorAlert şema tipi ve hata detayını içerir', () => {
      const alert = buildStructuredDataErrorAlert('/istanbul/kadikoy', 'LocalBusiness', 'address eksik');
      expect(alert.category).toBe('SCHEMA_ERROR');
      expect(alert.message).toContain('address eksik');
    });

    it('buildSlackNotificationPayload Slack Block Kit formatında renk ve bloklar içerir', () => {
      const alert = buildSERPPositionDropAlert('tesis yönetimi', 3, 7, 'facility');
      const slack = buildSlackNotificationPayload(alert);
      expect(slack.attachments).toHaveLength(1);
      expect(slack.attachments[0].color).toBe('#ef4444'); // Critical kırmızı
      expect(slack.attachments[0].blocks.length).toBeGreaterThanOrEqual(2);
    });
  });

  /* =========================================================================
   * Q2 — SAĞLIK DENETİMİ & SELF-HEALING (Faz 481-500)
   * ========================================================================= */
  describe('Q2: Günlük Sağlık Denetimi & Kendi Kendini Onarma (Faz 481-500)', () => {
    it('runDailyHealthCheck en az 4 temel kontrol kalemi içerir ve sağlıklıdır', () => {
      const health = runDailyHealthCheck('site');
      expect(health.checks.length).toBeGreaterThanOrEqual(4);
      expect(health.isHealthy).toBe(true);
      expect(health.checks.some((c) => c.name.includes('Kanonik'))).toBe(true);
      expect(health.checks.some((c) => c.name.includes('NAP'))).toBe(true);
    });

    it('buildSelfHealingSpec eksik alt metni ve şema için otomatik yama kodu üretir', () => {
      const altPatch = buildSelfHealingSpec({
        issueType: 'missing-alt-text',
        targetUrl: 'https://aloyonetim.com.tr/tesis',
        context: '/images/hero.webp',
      });
      expect(altPatch.autoFixAvailable).toBe(true);
      expect(altPatch.suggestedPatchCode).toContain('alt="Alo Yönetim');

      const schemaPatch = buildSelfHealingSpec({
        issueType: 'missing-schema',
        targetUrl: 'https://aloyonetim.com.tr/kadikoy',
      });
      expect(schemaPatch.suggestedPatchCode).toContain('buildLocalBusinessSchema');
    });
  });
});
