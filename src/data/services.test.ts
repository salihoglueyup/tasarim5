import { describe, it, expect } from 'vitest';
import {
  SERVICES,
  SERVICE_SLUGS,
  getService,
  isValidService,
  getParentService,
  getChildServices,
  getServicesByCategory,
} from './services';

describe('Hizmet Veri Modeli ve Alt Hizmet Hiyerarşisi (services.ts - Faz 17)', () => {
  it('9 temel hizmeti barındırır ve nesne mühürlüdür (Object.isFrozen)', () => {
    expect(SERVICES.length).toBe(9);
    expect(Object.isFrozen(SERVICES)).toBe(true);
    expect(SERVICE_SLUGS.length).toBe(9);
  });

  it('getService O(1) harita üzerinden hızlı arama yapar', () => {
    const s = getService('guvenlik-yonetimi');
    expect(s).toBeDefined();
    expect(s?.name).toBe('Güvenlik Yönetimi');
    expect(isValidService('guvenlik-yonetimi')).toBe(true);
    expect(isValidService('bilinmeyen-hizmet')).toBe(false);
  });

  it('tesis-yonetimi flagship amiral gemisi olarak alt hizmetleri tanımlıdır', () => {
    const flagship = getService('tesis-yonetimi');
    expect(flagship).toBeDefined();
    expect(flagship?.category).toBe('flagship');
    expect(flagship?.parentSlug).toBeNull();
    expect(flagship?.subServices?.length).toBe(8);

    const children = getChildServices('tesis-yonetimi');
    expect(children.length).toBe(8);
    expect(children.some((c) => c.slug === 'guvenlik-yonetimi')).toBe(true);
    expect(children.some((c) => c.slug === 'aidat-takibi')).toBe(true);
  });

  it('getServicesByCategory ilgili kategorideki hizmetleri getirir', () => {
    const flagshipServices = getServicesByCategory('flagship');
    expect(flagshipServices.length).toBe(1);
    expect(flagshipServices[0].slug).toBe('tesis-yonetimi');
  });
});
