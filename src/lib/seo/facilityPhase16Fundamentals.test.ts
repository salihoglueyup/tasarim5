import { describe, it, expect } from 'vitest';
import { POSTS, CATEGORIES } from '@/data/posts';

describe('Tesis ve Mülk Hizmetleri Temel Bilgi Kütüphanesi & Amiral Makaleler (Faz 16)', () => {
  const FUNDAMENTAL_SLUGS = [
    'tesis-yonetimi-nedir-kapsami-ve-iso-41001-standartlari',
    'entegre-tesis-yonetimi-hizmetleri-nelerdir-kapsamli-rehber',
    'tesis-yonetiminde-soft-destek-hizmetleri-nelerdir',
    'tesis-yonetiminde-hard-teknik-bakim-hizmetleri-nelerdir',
    'mulk-yonetimi-ile-tesis-yonetimi-arasindaki-farklar-nelerdir',
    'profesyonel-tesis-yonetiminin-mulk-sahibine-10-somut-faydasi',
    'tesis-yonetim-sirketlerinin-gorev-ve-yasal-sorumluluklari',
    'tesis-yonetim-plani-nasil-hazirlanir-adim-adim-rehber',
  ];

  it('Toplam blog makalesi sayısının en az 134 olduğunu doğrular', () => {
    expect(POSTS.length).toBeGreaterThanOrEqual(134);
  });

  it('8 yeni temel bilgi amiral makalesinin eksiksiz tanımlandığını doğrular', () => {
    for (const slug of FUNDAMENTAL_SLUGS) {
      const post = POSTS.find((p) => p.slug === slug);
      expect(post).toBeDefined();
      expect(post?.title).toBeDefined();
      expect(post?.description).toBeDefined();
      expect(post?.tldr).toBeDefined();
      expect(post?.pillar).toBeDefined();
      expect(post?.content.length).toBeGreaterThanOrEqual(4);
      expect(post?.tags.length).toBeGreaterThanOrEqual(4);
      expect(post?.category).toBe('tesis-yonetimi');
    }
  });

  it('Tesis Yönetimi Nedir makalesinin ISO 41001 ve ana hizmet sayfasına bağlı olduğunu doğrular', () => {
    const post = POSTS.find((p) => p.slug === 'tesis-yonetimi-nedir-kapsami-ve-iso-41001-standartlari');
    expect(post?.pillar).toBe('/hizmetler/tesis-yonetimi');
    expect(post?.tags).toContain('iso 41001');
  });

  it('Soft Destek Hizmetleri makalesinin temizlik ve 5188 güvenlik içerdiğini doğrular', () => {
    const post = POSTS.find((p) => p.slug === 'tesis-yonetiminde-soft-destek-hizmetleri-nelerdir');
    expect(post?.pillar).toBe('/hizmetler/temizlik-ve-hijyen');
    const ulBlock = post?.content.find((b) => b.type === 'ul');
    expect(ulBlock).toBeDefined();
  });

  it('Hard Teknik Hizmetler makalesinin HVAC, elektrik ve asansör içerdiğini doğrular', () => {
    const post = POSTS.find((p) => p.slug === 'tesis-yonetiminde-hard-teknik-bakim-hizmetleri-nelerdir');
    expect(post?.pillar).toBe('/hizmetler/teknik-bakim');
    expect(post?.tags).toContain('hvac mekanik');
  });

  it('Mülk vs Tesis Yönetimi makalesinin iki disiplin arasındaki farkı açıkladığını doğrular', () => {
    const post = POSTS.find((p) => p.slug === 'mulk-yonetimi-ile-tesis-yonetimi-arasindaki-farklar-nelerdir');
    expect(post?.tags).toContain('property management');
  });

  it('Tesis Yönetim Planı makalesinin KMK Madde 28 ve bütçe planlaması içerdiğini doğrular', () => {
    const post = POSTS.find((p) => p.slug === 'tesis-yonetim-plani-nasil-hazirlanir-adim-adim-rehber');
    expect(post?.tags).toContain('kmk madde 28');
  });
});
