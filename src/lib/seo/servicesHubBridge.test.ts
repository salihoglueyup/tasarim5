import { describe, it, expect } from 'vitest';
import {
  ALL_SERVICES_CATALOG,
  ServicesHeroSeo,
  ServicesBentoGridSeo,
  ServicesMatcherSeo,
  ServicesVideoHubSeo,
} from '@/components/seo/services';

describe('Services Hub & Catalog Bridge Tests (/hizmetler)', () => {
  it('tüm 10 temel operasyonel hizmet eksiksiz tanımlanmıştır', () => {
    expect(ALL_SERVICES_CATALOG).toBeDefined();
    expect(ALL_SERVICES_CATALOG.length).toBe(10);

    const ids = ALL_SERVICES_CATALOG.map((s) => s.id);
    expect(ids).toContain('tesis-yonetimi');
    expect(ids).toContain('site-yonetimi');
    expect(ids).toContain('guvenlik-yonetimi');
    expect(ids).toContain('teknik-bakim');
    expect(ids).toContain('temizlik-ve-hijyen');
    expect(ids).toContain('aidat-takibi');
    expect(ids).toContain('hukuk-ve-icra-danismanligi');
    expect(ids).toContain('peyzaj-ve-bahce-bakimi');
    expect(ids).toContain('havuz-bakimi-ve-hijyen');
    expect(ids).toContain('hasere-ve-dezenfeksiyon');
  });

  it('tesis ve site yönetimi amiral gemisi (isFlagship) olarak işaretlenmiştir', () => {
    const flagships = ALL_SERVICES_CATALOG.filter((s) => s.isFlagship);
    expect(flagships.length).toBe(2);

    const flagshipIds = flagships.map((f) => f.id);
    expect(flagshipIds).toContain('tesis-yonetimi');
    expect(flagshipIds).toContain('site-yonetimi');
  });

  it('tüm hizmetlerin slug bağlantıları geçerli ve /hizmetler/ altındadır', () => {
    ALL_SERVICES_CATALOG.forEach((service) => {
      expect(service.slug).toMatch(/^\/hizmetler\/[a-z0-9-]+$/);
      expect(service.title.length).toBeGreaterThan(10);
      expect(service.desc.length).toBeGreaterThan(30);
      expect(service.icon).toBeDefined();
      expect(service.bulletPoints.length).toBeGreaterThanOrEqual(4);
    });
  });

  it('4 temel ana kategori eksiksiz temsil edilmektedir', () => {
    const categories = new Set(ALL_SERVICES_CATALOG.map((s) => s.category));
    expect(categories.has('management')).toBe(true);
    expect(categories.has('security')).toBe(true);
    expect(categories.has('technical')).toBe(true);
    expect(categories.has('hygiene')).toBe(true);
  });

  it('tüm SEO ve UI bileşenleri dışa aktarılmıştır ve geçerlidir', () => {
    expect(typeof ServicesHeroSeo).toBe('function');
    expect(typeof ServicesBentoGridSeo).toBe('function');
    expect(typeof ServicesMatcherSeo).toBe('function');
    expect(typeof ServicesVideoHubSeo).toBe('function');
  });
});
