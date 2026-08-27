import { describe, it, expect } from 'vitest';
import { POSTS, CATEGORIES } from '@/data/posts';
import { resolveBlogArticleCluster } from './facilityBlogClusterEngine';

describe('Tesis ve Mülk Yönetimi Amiral Blog Makaleleri & Hukuk Kütüphanesi (Faz 15)', () => {
  const FLAGSHIP_SLUGS = [
    'luks-rezidanslarda-concierge-ve-tesis-yonetimi-standartlari-2026',
    'ticari-plazalarda-hvac-ve-leed-tesis-enerji-verimliligi',
    '1000-konutlu-toplu-konut-sitelerinde-merkezi-yonetim-ve-aidat-tasarrufu',
    'endustriyel-sanayi-tesislerinde-iso-45001-isg-ve-guvenlik-yonetimi',
    'profesyonel-tesis-yonetim-sirketi-secim-rehberi-ve-ihale-sartnamesi',
    '5188-ozel-guvenlik-gorevlisi-egitimi-ve-kimlik-yenileme-rehberi-2026',
    'sitelerde-5188-lisansli-ozel-guvenlik-sirketi-secim-kriterleri',
    'aidat-borcu-icra-takibi-ve-yuzde-5-gecikme-tazminati-kmk-20',
  ];

  it('Tesis & Mülk Yönetimi kategorisinin tanımlandığını doğrular', () => {
    const tesisCat = CATEGORIES.find((c) => c.slug === 'tesis-yonetimi');
    expect(tesisCat).toBeDefined();
    expect(tesisCat?.name).toBe('Tesis & Mülk Yönetimi');
    expect(CATEGORIES.length).toBeGreaterThanOrEqual(5);
  });

  it('8 yeni amiral makalenin tamamının eksiksiz tanımlandığını doğrular', () => {
    expect(POSTS.length).toBeGreaterThanOrEqual(126);

    for (const slug of FLAGSHIP_SLUGS) {
      const post = POSTS.find((p) => p.slug === slug);
      expect(post).toBeDefined();
      expect(post?.title).toBeDefined();
      expect(post?.description).toBeDefined();
      expect(post?.tldr).toBeDefined();
      expect(post?.pillar).toBeDefined();
      expect(post?.content.length).toBeGreaterThanOrEqual(4);
      expect(post?.tags.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('Rezidans makalesinin rezidans alt sektörüne ve cluster engine sinyallerine bağlandığını doğrular', () => {
    const post = POSTS.find((p) => p.slug === 'luks-rezidanslarda-concierge-ve-tesis-yonetimi-standartlari-2026');
    expect(post?.pillar).toBe('/hizmetler/tesis-yonetimi/rezidans-site-yonetimi');

    const cluster = resolveBlogArticleCluster(post!.title, post!.description, post!.tags, 'Tesis & Mülk Yönetimi');
    expect(cluster.recommendedSubSector.slug).toBe('rezidans-site-yonetimi');
  });

  it('Güvenlik eğitimi makalesinin Alo Güvenlik kursu sinerjisi içerdiğini doğrular', () => {
    const post = POSTS.find((p) => p.slug === '5188-ozel-guvenlik-gorevlisi-egitimi-ve-kimlik-yenileme-rehberi-2026');
    const ctaBlock = post?.content.find((b) => b.type === 'cta');
    expect(ctaBlock).toBeDefined();
    if (ctaBlock && ctaBlock.type === 'cta') {
      expect(ctaBlock.href).toContain('guvenlikkursu.com');
    }
  });

  it('Özel güvenlik şirketi seçimi makalesinin 3G Güvenlik sinerjisi içerdiğini doğrular', () => {
    const post = POSTS.find((p) => p.slug === 'sitelerde-5188-lisansli-ozel-guvenlik-sirketi-secim-kriterleri');
    const ctaBlock = post?.content.find((b) => b.type === 'cta');
    expect(ctaBlock).toBeDefined();
    if (ctaBlock && ctaBlock.type === 'cta') {
      expect(ctaBlock.href).toContain('3gguvenlik.com');
    }
  });

  it('Aidat icra takibi makalesinin KMK m.20 ve gecikme tazminatı yasal içeriğini doğrular', () => {
    const post = POSTS.find((p) => p.slug === 'aidat-borcu-icra-takibi-ve-yuzde-5-gecikme-tazminati-kmk-20');
    expect(post?.category).toBe('hukuk');
    expect(post?.pillar).toBe('/hizmetler/aidat-takibi');
  });
});
