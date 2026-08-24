import { describe, it, expect } from 'vitest';
import { pushFacilityUrlsBulkToIndexNow } from '@/lib/seo/indexNowQueue';
import { ServerTimingBuilder } from '@/lib/performance/serverTiming';

describe('5 İleri Seviye Backend SEO & Altyapı Motoru Testleri (Wave 3)', () => {
  describe('IndexNow Toplu Gönderim Motoru (indexNowQueue.ts)', () => {
    it('39 ilçe ve sektörel URL\'leri toplayıp paketler', async () => {
      const result = await pushFacilityUrlsBulkToIndexNow();

      expect(result.totalUrlsCollected).toBeGreaterThanOrEqual(100);
      expect(result.batchesSent).toBeGreaterThanOrEqual(1);
      expect(result.urlSamples.some((u) => u.includes('/hizmetler/tesis-yonetimi'))).toBe(true);
      expect(result.urlSamples.some((u) => u.includes('/api/ai/facility-agent-context.json'))).toBe(true);
    });
  });

  describe('Server-Timing W3C Başlık Motoru (serverTiming.ts)', () => {
    it('W3C formatında Server-Timing başlığı üretir', () => {
      const timing = new ServerTimingBuilder();
      timing.add('db', { duration: 12.5, description: 'Postgres Query' });
      timing.add('cache', { description: 'HIT' });

      const header = timing.toHeader();
      expect(header).toContain('db;dur=12.5;desc="Postgres Query"');
      expect(header).toContain('cache;desc="HIT"');

      const headers = new Headers();
      timing.applyToHeaders(headers);
      expect(headers.get('Server-Timing')).toBe(header);
    });

    it('start ve stop fonksiyonları ile dinamik süre ölçer', async () => {
      const timing = new ServerTimingBuilder();
      timing.start('render');
      await new Promise((resolve) => setTimeout(resolve, 10));
      timing.stop('render', 'React SSR');

      const header = timing.toHeader();
      expect(header).toContain('render;dur=');
      expect(header).toContain('desc="React SSR"');
    });
  });
});
