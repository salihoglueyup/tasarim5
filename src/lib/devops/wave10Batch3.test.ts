import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { slowQueryMonitor } from '@/lib/performance/slowQueryMonitor';
import { auditDeadCode } from './deadCodeEliminator';
import { POST as postVitals } from '@/app/api/analytics/vitals/route';
import { NextRequest } from 'next/server';

describe('Wave 10: Faz 236 - Faz 240 Nginx Sıkıştırma, 1-Yıl Cache, Yavaş Sorgu Takibi, Web Vitals Beacon & Dead Code', () => {
  it('Faz 236: Nginx aloyonetim.conf Brotli ve yüksek seviyeli Gzip sıkıştırmasını tanımlar', () => {
    const confPath = path.resolve(process.cwd(), 'docker/nginx/aloyonetim.conf');
    const content = fs.readFileSync(confPath, 'utf-8');

    expect(content).toContain('gzip on;');
    expect(content).toContain('gzip_comp_level 6;');
    expect(content).toContain('brotli on;');
    expect(content).toContain('brotli_comp_level 6;');
  });

  it('Faz 237: Statik varlıklar için 1 yıllık immutable Cache-Control başlığı tanımlıdır', () => {
    const confPath = path.resolve(process.cwd(), 'docker/nginx/aloyonetim.conf');
    const confContent = fs.readFileSync(confPath, 'utf-8');
    expect(confContent).toContain('max-age=31536000, immutable');

    const nextConfigPath = path.resolve(process.cwd(), 'next.config.ts');
    const nextContent = fs.readFileSync(nextConfigPath, 'utf-8');
    expect(nextContent).toContain('public, max-age=31536000, immutable');
  });

  it('Faz 238: slowQueryMonitor eşiği aşan sorguları yakalar ve istatistik üretir', () => {
    slowQueryMonitor.clear();

    // Hızlı sorgu (15ms) -> kaydedilmez
    const wasRecordedFast = slowQueryMonitor.recordIfSlow('SELECT * FROM users WHERE id = 1', 15);
    expect(wasRecordedFast).toBe(false);

    // Yavaş sorgu (280ms) -> kaydedilir
    const wasRecordedSlow = slowQueryMonitor.recordIfSlow('SELECT * FROM posts JOIN categories ON ...', 280);
    expect(wasRecordedSlow).toBe(true);

    const stats = slowQueryMonitor.getStats();
    expect(stats.totalRecorded).toBe(1);
    expect(stats.averageDurationMs).toBe(280);
  });

  it('Faz 239: Web Vitals beacon uç noktası (/api/analytics/vitals) sessizce 204 döner', async () => {
    const req = new NextRequest('http://localhost:3000/api/analytics/vitals', {
      method: 'POST',
      body: JSON.stringify({
        metric: 'LCP',
        value: 1250,
        url: '/',
      }),
    });

    const res = await postVitals(req);
    expect(res.status).toBe(204);

    const webVitalsCompPath = path.resolve(process.cwd(), 'src/components/layout/WebVitals.tsx');
    const compContent = fs.readFileSync(webVitalsCompPath, 'utf-8');
    expect(compContent).toContain('navigator.sendBeacon');
    expect(compContent).toContain('/api/analytics/vitals');
  });

  it('Faz 240: auditDeadCode kullanılmayan veya atıl exportları tespit eder', () => {
    const sampleFiles = {
      'src/used.ts': `
        export const ActiveHelper = () => 'active';
        export const DeadHelper = () => 'dead';
      `,
      'src/consumer.ts': `
        import { ActiveHelper } from './used';
        ActiveHelper();
      `,
    };

    const report = auditDeadCode(sampleFiles);
    expect(report.scannedFiles).toBe(2);
    expect(report.deadExportsFound).toBe(1);
    expect(report.warnings[0]).toContain('DeadHelper');
  });
});
