import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { notifyIndexNow } from '../indexnow-auto';
import { publishWebSubPing } from './webSubPinger';
import robots from '../../app/robots';
import { generateBreadcrumbs } from '../schemas/breadcrumbs';
import { getNeighborDistrictLinks } from './districtCrossLinker';

describe('Wave 6: Faz 141 - Faz 145 Anlık İndeksleme, WebSub, Robots.txt, Breadcrumb & Komşu Linkleme', () => {
  const feedXmlPath = path.resolve(process.cwd(), 'src/app/feed.xml/route.ts');

  it('Faz 141: notifyIndexNow IndexNow, Bing ve Yandex uçlarına eşzamanlı bildirim gönderir', async () => {
    const success = await notifyIndexNow(['/blog/yeni-yazi']);
    expect(success).toBe(true);
  });

  it('Faz 142: feed.xml WebSub (PubSubHubbub) Google hub bağlantısını ve publishWebSubPing fonksiyonunu içerir', () => {
    const content = fs.readFileSync(feedXmlPath, 'utf-8');
    expect(content).toContain('https://pubsubhubbub.appspot.com/');
    expect(content).toContain('rel="hub"');
    expect(typeof publishWebSubPing).toBe('function');
  });

  it('Faz 143: robots.ts AI botları için crawlDelay: 1 ve news-sitemap.xml içerir', () => {
    const robotsConfig = robots();
    const aiRule = (robotsConfig.rules as any[]).find((r) => Array.isArray(r.userAgent) && r.userAgent.includes('GPTBot'));
    expect(aiRule).toBeDefined();
    expect(aiRule.crawlDelay).toBe(1);

    const sitemaps = robotsConfig.sitemap as string[];
    expect(sitemaps.some((s) => s.includes('news-sitemap.xml'))).toBe(true);
  });

  it('Faz 144: generateBreadcrumbs boş/hatalı isimleri eler ve tam geçerli hiyerarşi kurar', () => {
    const breadcrumb = generateBreadcrumbs([
      { name: 'Anasayfa', url: '/' },
      { name: '', url: '/gecersiz' },
      { name: 'Tesis Yönetimi', url: '/hizmetler/tesis-yonetimi' },
    ]) as any;

    expect(breadcrumb['@type']).toBe('BreadcrumbList');
    expect(breadcrumb.itemListElement).toHaveLength(2);
    expect(breadcrumb.itemListElement[0].position).toBe(1);
    expect(breadcrumb.itemListElement[0].name).toBe('Anasayfa');
    expect(breadcrumb.itemListElement[1].position).toBe(2);
    expect(breadcrumb.itemListElement[1].name).toBe('Tesis Yönetimi');
  });

  it('Faz 145: getNeighborDistrictLinks Kadıköy için komşu ilçeleri (Ataşehir, Üsküdar, Maltepe) eksiksiz üretir', () => {
    const neighbors = getNeighborDistrictLinks('kadikoy');
    expect(neighbors.length).toBeGreaterThanOrEqual(3);
    const slugs = neighbors.map((n) => n.slug);
    expect(slugs).toContain('atasehir');
    expect(slugs).toContain('uskudar');
    expect(slugs).toContain('maltepe');
    expect(neighbors[0]).toHaveProperty('href');
    expect(neighbors[0].href).toContain('/bolgeler/');
  });
});
