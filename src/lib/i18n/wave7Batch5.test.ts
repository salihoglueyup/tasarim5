import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { validateLead, getValidationErrorMessage } from '../leads/validate';
import {
  buildHreflangTags,
  buildCanonicalForLocale,
  buildLocalizedKeywordMap,
  detectUserLocale,
  validateHreflangConsistency,
} from '../seo/dualCoreMultiLangEngine';
import trDict from '@/i18n/locales/tr/common.json';
import enDict from '@/i18n/locales/en/common.json';
import ruDict from '@/i18n/locales/ru/common.json';
import arDict from '@/i18n/locales/ar/common.json';

describe('Wave 7: Faz 171 - Faz 175 Arama Önerileri API, Çok Dilli Formlar, 404 Sayfası & i18n Tip Güvenliği', () => {
  const searchSuggestRoutePath = path.resolve(process.cwd(), 'src/app/api/search-suggest/route.ts');
  const notFoundPath = path.resolve(process.cwd(), 'src/app/[lang]/not-found.tsx');

  it('Faz 171: search-suggest route lang parametresini ve yerelleştirilmiş URL üretimini destekler', () => {
    const routeContent = fs.readFileSync(searchSuggestRoutePath, 'utf-8');
    expect(routeContent).toContain("searchParams.get('lang')");
    expect(routeContent).toContain('localizedUrl(');
    expect(routeContent).toContain('View all results and services');
    expect(routeContent).toContain('Посмотреть все результаты');
    expect(routeContent).toContain('عرض جميع النتائج');
  });

  it('Faz 172: validateLead ve getValidationErrorMessage 4 dilde hata mesajları döner', () => {
    const invalidResultTr = validateLead({ type: 'contact', name: '' }, 'tr');
    expect(invalidResultTr.valid).toBe(false);
    expect(invalidResultTr.errorMessage).toContain('zorunlu');

    const invalidResultEn = validateLead({ type: 'contact', name: '' }, 'en');
    expect(invalidResultEn.valid).toBe(false);
    expect(invalidResultEn.errorMessage).toContain('required');

    const invalidResultRu = validateLead({ type: 'contact', name: '' }, 'ru');
    expect(invalidResultRu.valid).toBe(false);
    expect(invalidResultRu.errorMessage).toContain('обязательные');

    const invalidResultAr = validateLead({ type: 'contact', name: '' }, 'ar');
    expect(invalidResultAr.valid).toBe(false);
    expect(invalidResultAr.errorMessage).toContain('المطلوبة');
  });

  it('Faz 173: not-found.tsx 404 sayfası seçili dile göre yerelleştirilmiş içerik ve popüler hizmetler sunar', () => {
    const notFoundContent = fs.readFileSync(notFoundPath, 'utf-8');
    expect(notFoundContent).toContain('POPULAR_SERVICES');
    expect(notFoundContent).toContain('UI_TEXTS');
    expect(notFoundContent).toContain('Facility & Property Management');
    expect(notFoundContent).toContain('Управление Комплексами');
    expect(notFoundContent).toContain('إدارة المجمعات والمرافق');
    expect(notFoundContent).toContain('getLocalizedPath');
  });

  it('Faz 174: dualCoreMultiLangEngine çok dilli rotalar, hreflang ve karşılıklı etiket tutarlılığını sağlar', () => {
    const hreflangs = buildHreflangTags('/hizmetler/tesis-yonetimi');
    expect(hreflangs).toHaveLength(5);
    expect(hreflangs.find((h) => h.lang === 'tr')?.url).toBe('https://aloyonetim.com.tr/hizmetler/tesis-yonetimi');
    expect(hreflangs.find((h) => h.lang === 'en')?.url).toBe('https://aloyonetim.com.tr/en/hizmetler/tesis-yonetimi');

    const canonicalAr = buildCanonicalForLocale('/hizmetler/tesis-yonetimi', 'ar');
    expect(canonicalAr).toBe('https://aloyonetim.com.tr/ar/hizmetler/tesis-yonetimi');

    expect(detectUserLocale('en-US,en;q=0.9')).toBe('en');
    expect(detectUserLocale('ar-SA,ar;q=0.8')).toBe('ar');
  });

  it('Faz 175: TypeScript i18n anahtar güvenliği ve 4 dilde sıfır çeviri açığı (%100 parite)', () => {
    const trKeys = Object.keys(trDict);
    const enKeys = Object.keys(enDict);
    const ruKeys = Object.keys(ruDict);
    const arKeys = Object.keys(arDict);

    expect(trKeys.length).toBeGreaterThan(1400);
    expect(enKeys.length).toBe(trKeys.length);
    expect(ruKeys.length).toBe(trKeys.length);
    expect(arKeys.length).toBe(trKeys.length);

    const missingInEn = trKeys.filter((k) => !(k in enDict));
    const missingInRu = trKeys.filter((k) => !(k in ruDict));
    const missingInAr = trKeys.filter((k) => !(k in arDict));

    expect(missingInEn).toEqual([]);
    expect(missingInRu).toEqual([]);
    expect(missingInAr).toEqual([]);
  });
});
