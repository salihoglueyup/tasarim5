import { describe, it, expect } from 'vitest';
import { getHybridPostsList, getHybridPostBySlug } from './hybridSync';

describe('Hibrit Veri Katmanı Senkronizasyonu (hybridSync.ts - Faz 19)', () => {
  it('getHybridPostsList veritabanı kapalı olsa bile statik listeden eksiksiz gönderi döner', async () => {
    const posts = await getHybridPostsList();
    expect(posts).toBeDefined();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);

    const first = posts[0];
    expect(first.slug).toBeDefined();
    expect(first.title).toBeDefined();
    expect(Array.isArray(first.tags)).toBe(true);
    expect(first.datePublished instanceof Date).toBe(true);
  });

  it('getHybridPostBySlug geçerli bir slug verildiğinde doğru içeriği teslim eder', async () => {
    const post = await getHybridPostBySlug('tesis-yonetimi-nedir-kapsami-ve-iso-41001-standartlari');
    expect(post).toBeDefined();
    expect(post?.slug).toBe('tesis-yonetimi-nedir-kapsami-ve-iso-41001-standartlari');
    expect(post?.title).toContain('Tesis Yönetimi');
    expect(Array.isArray(post?.tags)).toBe(true);
  });

  it('getHybridPostBySlug olmayan bir slug için null döner', async () => {
    const post = await getHybridPostBySlug('kesinlikle-olmayan-blog-yazisi-12345');
    expect(post).toBeNull();
  });
});
