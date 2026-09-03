import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';
import {
  runComprehensiveSeoPatrol,
  auditSitemapIntegrity,
  auditInternalLinks,
  auditIndexStatus,
} from '@/lib/seo/facilitySeoPatrol';
import { GET as getCronPatrol } from '@/app/api/cron/seo-patrol/route';
import {
  getCloudflareDnssecConfig,
  verifyCloudflareDnsConfig,
  generateCloudflareZoneDnsRecords,
} from '@/lib/devops/cloudflareDnssecOptimizer';
import {
  recordRumMetric,
  getWebVitalsRumSummary,
  clearRumBuffer,
  calculateVitalRating,
  calculatePercentile,
} from '@/lib/performance/webVitalsRumEngine';
import { POST as postVitals, GET as getVitals } from '@/app/api/analytics/vitals/route';

describe('Wave 10 Final Sprint: Faz 236, Faz 240, Faz 242 ve Faz 249 Tamamlama Testleri', () => {
  describe('Faz 236: Günlük Kırık Link, Sitemap Doğruluğu & İndeks Durumu Denetimi (/api/cron/seo-patrol)', () => {
    it('auditSitemapIntegrity sitemap yollarının bütünlüğünü ve canonical yapısını doğrular', () => {
      const sitemapReport = auditSitemapIntegrity();
      expect(sitemapReport.totalUrls).toBeGreaterThanOrEqual(80);
      expect(sitemapReport.missingCanonicalCount).toBe(0);
      expect(sitemapReport.sitemapIntegrityScore).toBe(100);
      expect(sitemapReport.status).toBe('VALID');
    });

    it('auditInternalLinks iç bağlantıları tarar ve kırık rota olmadığını onaylar', () => {
      const linkReport = auditInternalLinks();
      expect(linkReport.totalLinksAudited).toBeGreaterThanOrEqual(15);
      expect(linkReport.brokenLinksFound).toBe(0);
      expect(linkReport.status).toBe('CLEAN');
      expect(linkReport.linkHealthScore).toBe(100);
    });

    it('auditIndexStatus arama motoru indekslenebilirlik ve canonical durumunu doğrular', () => {
      const indexReport = auditIndexStatus();
      expect(indexReport.indexableRoutesCount).toBeGreaterThan(0);
      expect(indexReport.blockedRoutesCount).toBe(0);
      expect(indexReport.robotsStatus).toBe('INDEXABLE');
    });

    it('runComprehensiveSeoPatrol tüm denetimleri birleştirerek eksiksiz rapor döner', () => {
      const report = runComprehensiveSeoPatrol();
      expect(['OPTIMAL', 'GOOD']).toContain(report.overallHealthStatus);
      expect(report.facilitySeo.averageScore).toBeGreaterThanOrEqual(80);
      expect(report.sitemapAudit.status).toBe('VALID');
      expect(report.brokenLinkAudit.status).toBe('CLEAN');
    });

    it('GET /api/cron/seo-patrol uç noktası 200 döner ve comprehensiveReport içerir', async () => {
      const res = await getCronPatrol();
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.status).toBe('success');
      expect(json.reportTitle).toContain('Faz 236');
      expect(json.comprehensiveReport).toBeDefined();
      expect(json.comprehensiveReport.sitemapAudit.status).toBe('VALID');
    });
  });

  describe('Faz 240: Cloudflare DNSSEC & CNAME Flattening ile 20ms DNS Yanıt Süresi', () => {
    it('getCloudflareDnssecConfig Algorithm 13 ve CNAME Flattening mimarisini eksiksiz sunar', () => {
      const config = getCloudflareDnssecConfig();
      expect(config.dnssec.enabled).toBe(true);
      expect(config.dnssec.config.algorithm).toBe(13); // ECDSA-P256
      expect(config.dnssec.config.digestType).toBe(2); // SHA-256
      expect(config.dnssec.config.flags).toBe(257); // KSK
      expect(config.cnameFlattening.flattenAtRoot).toBe(true);
      expect(config.cnameFlattening.expectedDnsLatencyMs).toBeLessThanOrEqual(20);
    });

    it('verifyCloudflareDnsConfig mimarinin 20ms SLA hedefini ve DNSSEC bütünlüğünü onaylar', () => {
      const report = verifyCloudflareDnsConfig();
      expect(report.valid).toBe(true);
      expect(report.dnssecActive).toBe(true);
      expect(report.cnameFlatteningActive).toBe(true);
      expect(report.meets20msSla).toBe(true);
      expect(report.estimatedLatencyMs).toBeLessThanOrEqual(20);
    });

    it('generateCloudflareZoneDnsRecords geçerli BIND formatında zone çıktısı üretir', () => {
      const zone = generateCloudflareZoneDnsRecords();
      expect(zone).toContain('aloyonetim.com.tr');
      expect(zone).toContain('CNAME');
      expect(zone).toContain('DS 2371 13 2');
    });

    it('docs/architecture/CLOUDFLARE_DNSSEC_CONFIG.md mimari dokümantasyonu mevcuttur', () => {
      const docPath = path.resolve(process.cwd(), 'docs/architecture/CLOUDFLARE_DNSSEC_CONFIG.md');
      expect(fs.existsSync(docPath)).toBe(true);
      const content = fs.readFileSync(docPath, 'utf-8');
      expect(content).toContain('DNSSEC');
      expect(content).toContain('CNAME Flattening');
      expect(content).toContain('20ms');
    });
  });

  describe('Faz 242: Gerçek Kullanıcı Deneyimi (RUM) Core Web Vitals Uç Noktası (/api/analytics/vitals)', () => {
    beforeEach(() => {
      clearRumBuffer();
    });

    it('calculateVitalRating Google Core Web Vitals eşiklerine göre doğru değerlendirme yapar', () => {
      expect(calculateVitalRating('LCP', 1200)).toBe('good');
      expect(calculateVitalRating('LCP', 3200)).toBe('needs-improvement');
      expect(calculateVitalRating('LCP', 5000)).toBe('poor');

      expect(calculateVitalRating('CLS', 0.04)).toBe('good');
      expect(calculateVitalRating('CLS', 0.15)).toBe('needs-improvement');
      expect(calculateVitalRating('CLS', 0.35)).toBe('poor');

      expect(calculateVitalRating('INP', 80)).toBe('good');
      expect(calculateVitalRating('INP', 250)).toBe('needs-improvement');
      expect(calculateVitalRating('INP', 600)).toBe('poor');
    });

    it('calculatePercentile 75. persentil değerini doğru hesaplar', () => {
      const values = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
      const p75 = calculatePercentile(values, 75);
      expect(p75).toBe(800);
    });

    it('recordRumMetric ve getWebVitalsRumSummary canlı metrikleri toplar ve p75 özetini çıkarır', () => {
      recordRumMetric({ name: 'LCP', value: 1100, url: '/' });
      recordRumMetric({ name: 'LCP', value: 1400, url: '/hizmetler' });
      recordRumMetric({ name: 'CLS', value: 0.02, url: '/' });
      recordRumMetric({ name: 'INP', value: 45, url: '/' });

      const summary = getWebVitalsRumSummary();
      expect(summary.totalSamples).toBe(4);
      expect(summary.overallStatus).toBe('PASS');
      expect(summary.metrics.LCP.sampleCount).toBe(2);
      expect(summary.metrics.LCP.rating).toBe('good');
      expect(summary.metrics.CLS.p75Value).toBe(0.02);
    });

    it('POST ve GET /api/analytics/vitals uç noktası RUM entegrasyonunu eksiksiz yürütür', async () => {
      // POST Beacon
      const postReq = new NextRequest('http://localhost:3000/api/analytics/vitals', {
        method: 'POST',
        body: JSON.stringify({
          name: 'LCP',
          value: 950,
          url: '/hizmetler/tesis-yonetimi',
        }),
      });
      const postRes = await postVitals(postReq);
      expect(postRes.status).toBe(204);

      // GET Dashboard Summary
      const getRes = await getVitals();
      expect(getRes.status).toBe(200);

      const json = await getRes.json();
      expect(json.status).toBe('success');
      expect(json.reportTitle).toContain('Faz 242');
      expect(json.summary.metrics.LCP.sampleCount).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Faz 249: GitHub Actions CI/CD Hattına Otomatik Lighthouse CI (LHCI) 100/100 SEO Denetimi', () => {
    it('lighthouserc.seo.json dosyası 100/100 (minScore: 1.0) SEO kuralı tanımlar', () => {
      const lhciPath = path.resolve(process.cwd(), 'lighthouserc.seo.json');
      expect(fs.existsSync(lhciPath)).toBe(true);

      const content = fs.readFileSync(lhciPath, 'utf-8');
      const config = JSON.parse(content);

      expect(config.ci.assert.assertions['categories:seo']).toEqual(['error', { minScore: 1.0 }]);
      expect(config.ci.collect.url).toContain('http://localhost:3000/hizmetler/tesis-yonetimi');
    });

    it('.github/workflows/lhci.yml iş akışı Lighthouse CI adımını içerir', () => {
      const workflowPath = path.resolve(process.cwd(), '.github/workflows/lhci.yml');
      expect(fs.existsSync(workflowPath)).toBe(true);

      const content = fs.readFileSync(workflowPath, 'utf-8');
      expect(content).toContain('treosh/lighthouse-ci-action');
      expect(content).toContain('lighthouserc.seo.json');
      expect(content).toContain('Faz 249');
    });

    it('.github/workflows/ci.yml iş akışı Faz 249 SEO doğrulamasını içerir', () => {
      const ciPath = path.resolve(process.cwd(), '.github/workflows/ci.yml');
      const content = fs.readFileSync(ciPath, 'utf-8');
      expect(content).toContain('Faz 249');
      expect(content).toContain('lighthouserc.seo.json');
    });
  });
});
