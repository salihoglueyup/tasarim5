import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { autoLinkHtml, autoLinkDomTreeWalker } from '../autoLinker';
import { auditPageEEAT } from './eeatAuditor';
import { resolveBlogArticleCluster } from './facilityBlogClusterEngine';

describe('Wave 6: Faz 136 - Faz 140 Otomatik İç Linkleme, E-E-A-T Denetimi, Yargıtay Atıfları & Site Haritaları', () => {
  const newsSitemapPath = path.resolve(process.cwd(), 'src/app/news-sitemap.xml/route.ts');
  const videoSitemapPath = path.resolve(process.cwd(), 'src/app/video-sitemap.xml/route.ts');

  it('Faz 136: autoLinkHtml başlıklar (h1-h6) ve kod bloklarında linkleme yapmaz ve TreeWalker fonksiyonunu sunar', () => {
    const input = '<h1>Tesis Yönetimi Nedir?</h1><p>Alo Yönetim profesyonel tesis yönetimi ve site yönetimi sunar.</p>';
    const output = autoLinkHtml(input, '/blog/ornek', 5);

    // H1 içindeki metne link eklenmemeli
    expect(output).toContain('<h1>Tesis Yönetimi Nedir?</h1>');
    // P içindeki metne link eklenmeli
    expect(output).toContain('href="/hizmetler/tesis-yonetimi"');
    expect(typeof autoLinkDomTreeWalker).toBe('function');
  });

  it('Faz 137: auditPageEEAT yazar, tarih, kanun ve akreditasyon kriterlerini tam puanla değerlendirir', () => {
    const result = auditPageEEAT({
      path: '/blog/asansor-bakimi-kmk',
      authorName: 'Murat Yılmaz',
      authorBio: 'Kıdemli Tesis Yönetimi ve KMK 634 Uzmanı, 15 yıl deneyimli.',
      publishDate: '2026-01-10T00:00:00Z',
      modifiedDate: '2026-02-01T00:00:00Z',
      text: 'Bu makalede 634 sayılı kat mülkiyeti kanunu ve ISO 41001 standartları incelenmiştir.',
    });

    expect(result.score).toBe(100);
    expect(result.grade).toBe('A+');
    expect(result.checks.authorCredentialCheck).toBe(true);
    expect(result.checks.temporalRecencyCheck).toBe(true);
    expect(result.checks.officialLegalCitationCheck).toBe(true);
    expect(result.checks.accreditationSignalCheck).toBe(true);
  });

  it('Faz 138: resolveBlogArticleCluster blog yazılarına ilgili Yargıtay emsal kararlarını ekler', () => {
    const cluster = resolveBlogArticleCluster(
      'Site Asansör Bakımı ve Zemin Kat Muafiyeti',
      'Asansör periyodik bakım masrafları ve yönetim planı hükümleri.',
      ['asansör', 'aidat']
    );

    expect(cluster.relevantPrecedents).toBeDefined();
    expect(cluster.relevantPrecedents!.length).toBeGreaterThanOrEqual(1);
    expect(cluster.relevantPrecedents![0]).toHaveProperty('court');
    expect(cluster.relevantPrecedents![0]).toHaveProperty('docketNumber');
    expect(cluster.relevantPrecedents![0]).toHaveProperty('decisionNumber');
  });

  it('Faz 139: news-sitemap.xml route Google News XML şemasına tam uygundur', () => {
    const content = fs.readFileSync(newsSitemapPath, 'utf-8');
    expect(content).toContain('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"');
    expect(content).toContain('<news:publication>');
    expect(content).toContain('<news:publication_date>');
    expect(content).toContain('twoDaysAgo');
  });

  it('Faz 140: video-sitemap.xml route Google Video XML şemasına tam uygundur', () => {
    const content = fs.readFileSync(videoSitemapPath, 'utf-8');
    expect(content).toContain('xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"');
    expect(content).toContain('<video:thumbnail_loc>');
    expect(content).toContain('<video:content_loc>');
    expect(content).toContain('<video:duration>');
  });
});
