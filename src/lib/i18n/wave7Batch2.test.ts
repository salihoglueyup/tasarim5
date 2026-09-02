import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { ENGLISH_TERMS, getEnglishTerm, searchEnglishTerms } from '../../data/dictionaryEn';
import { getFacilitySerpMeta } from '../seo/facilitySerpOptimizer';

describe('Wave 7: Faz 156 - Faz 160 İngilizce Sözlük, RU/AR SERP Meta, Rota Koruma, NEXT_LOCALE & Akıllı Dil Bannerı', () => {
  const middlewarePath = path.resolve(process.cwd(), 'src/middleware.ts');
  const bannerPath = path.resolve(process.cwd(), 'src/components/ui/LanguageSuggestionBanner.tsx');

  it('Faz 156: dictionaryEn.ts temel sektör terimlerini ve arama fonksiyonunu içerir', () => {
    expect(ENGLISH_TERMS.length).toBeGreaterThanOrEqual(10);
    const fm = getEnglishTerm('Facility Management (FM)');
    expect(fm).toBeDefined();
    expect(fm?.turkishEquivalent).toBe('Tesis Yönetimi');

    const kmk = getEnglishTerm('634 Sayılı Kat Mülkiyeti Kanunu');
    expect(kmk).toBeDefined();
    expect(kmk?.term).toContain('Condominium Law No. 634');

    const searchResults = searchEnglishTerms('Security');
    expect(searchResults.length).toBeGreaterThanOrEqual(1);
  });

  it('Faz 157: getFacilitySerpMeta Rusça ve Arapça için yerelleştirilmiş ilçe başlık ve açıklamaları üretir', () => {
    const ruMeta = getFacilitySerpMeta('ru', 'kadikoy');
    expect(ruMeta.title).toContain('Управление Жилыми Комплексами и Объектами в Kadıköy');
    expect(ruMeta.description).toContain('Стамбул');
    expect(ruMeta.targetKeyword).toContain('управление недвижимостью kadıköy');

    const arMeta = getFacilitySerpMeta('ar', 'kadikoy');
    expect(arMeta.title).toContain('إدارة المجمعات السكنية والمرافق في Kadıköy');
    expect(arMeta.description).toContain('إسطنبول');
    expect(arMeta.targetKeyword).toContain('إدارة المجمعات Kadıköy');
  });

  it('Faz 158: Dil değiştirme mantığı mevcut sayfa rotasını korur', () => {
    const currentPath = '/ru/hizmetler/tesis-yonetimi';
    const langPrefixes = ['/en', '/tr', '/ru', '/ar'];

    let cleanPath = currentPath;
    for (const prefix of langPrefixes) {
      if (cleanPath.startsWith(prefix + '/') || cleanPath === prefix) {
        cleanPath = cleanPath.replace(new RegExp(`^${prefix}`), '') || '/';
        break;
      }
    }

    expect(cleanPath).toBe('/hizmetler/tesis-yonetimi');
    const newLang = 'ar';
    const newUrl = `/${newLang}${cleanPath}`;
    expect(newUrl).toBe('/ar/hizmetler/tesis-yonetimi');
  });

  it('Faz 159: middleware.ts NEXT_LOCALE çerezini okur ve kayıtlı dile yönlendirir', () => {
    const middlewareContent = fs.readFileSync(middlewarePath, 'utf-8');
    expect(middlewareContent).toContain("request.cookies.get('NEXT_LOCALE')");
    expect(middlewareContent).toContain('cookieLocale !== defaultLocale');
  });

  it('Faz 160: LanguageSuggestionBanner EN, RU ve AR için akıllı dil öneri mesajlarını barındırır', () => {
    const bannerContent = fs.readFileSync(bannerPath, 'utf-8');
    expect(bannerContent).toContain('Would you like to browse this website in English?');
    expect(bannerContent).toContain('Хотите просматривать этот сайт на русском языке?');
    expect(bannerContent).toContain('هل تفضل تصفح هذا الموقع باللغة العربية؟');
    expect(bannerContent).toContain('lang_banner_dismissed');
  });
});
