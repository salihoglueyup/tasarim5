import { describe, it, expect } from 'vitest';
import {
  normalizeSearchTerm,
  createBlogSearchIndex,
  searchInBlogIndex,
} from './blogSearchIndex';

describe('Normalize Edilmiş Blog Arama İndeksi (blogSearchIndex.ts - Faz 20)', () => {
  it('normalizeSearchTerm Türkçe karakterleri düzgün şekilde Latin eşdeğerine normalize eder', () => {
    expect(normalizeSearchTerm('İSTANBUL')).toBe('istanbul');
    expect(normalizeSearchTerm('Şeffaf Yönetim')).toBe('seffaf yonetim');
    expect(normalizeSearchTerm('Çevre Düzeni & Ağaç')).toBe('cevre duzeni & agac');
  });

  it('createBlogSearchIndex gönderileri indeksler ve arama tokeni üretir', () => {
    const samplePosts = [
      {
        id: '1',
        title: 'Tesis Yönetimi ve Kat Mülkiyeti',
        description: 'İstanbul sitelerinde aidat ve işletme projesi rehberi',
        tags: ['tesis', 'kmk', 'aidat'],
        category: { slug: 'tesis-yonetimi' },
      },
      {
        id: '2',
        title: 'Özel Güvenlik 5188 Kanunu',
        description: 'Site ve bina güvenliğinde yasal zorunluluklar',
        tags: ['güvenlik', '5188'],
        category: { slug: 'guvenlik' },
      },
    ];

    const index = createBlogSearchIndex(samplePosts);
    expect(index.length).toBe(2);
    expect(index[0].searchToken).toContain('tesis yonetimi');
    expect(index[0].searchToken).toContain('istanbul');
    expect(index[1].searchToken).toContain('guvenlik');
  });

  it('searchInBlogIndex Türkçe karakter duyarsız arama sonuçlarını tam getirir', () => {
    const samplePosts = [
      {
        id: '1',
        title: 'Tesis Yönetimi ve Kat Mülkiyeti',
        description: 'İstanbul sitelerinde aidat ve işletme projesi rehberi',
        tags: ['tesis', 'kmk'],
        category: { slug: 'tesis-yonetimi' },
      },
      {
        id: '2',
        title: 'Özel Güvenlik 5188 Kanunu',
        description: 'Site ve bina güvenliğinde yasal zorunluluklar',
        tags: ['güvenlik', '5188'],
        category: { slug: 'guvenlik' },
      },
    ];

    const index = createBlogSearchIndex(samplePosts);

    // Büyük 'İ' ve küçük 'i' ile arama
    const results1 = searchInBlogIndex(index, 'İSTANBUL');
    expect(results1.length).toBe(1);
    expect(results1[0].id).toBe('1');

    // Yumuşak 'g' olmadan 'guvenlik' arandığında 'güvenlik' eşleşmelidir
    const results2 = searchInBlogIndex(index, 'guvenlik');
    expect(results2.length).toBe(1);
    expect(results2[0].id).toBe('2');

    // Kategori filtreleme
    const resultsCat = searchInBlogIndex(index, '', 'guvenlik');
    expect(resultsCat.length).toBe(1);
    expect(resultsCat[0].id).toBe('2');
  });
});
