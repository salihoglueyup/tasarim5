import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('FlagIcon ve Varsayılan Dil Entegrasyonu Testi', () => {
  const flagIconPath = path.resolve(process.cwd(), 'src/components/ui/branding/FlagIcon.tsx');
  const headerPath = path.resolve(process.cwd(), 'src/components/layout/header/Header.tsx');
  const mobileMenuPath = path.resolve(process.cwd(), 'src/components/layout/header/MobileMenu.tsx');
  const middlewarePath = path.resolve(process.cwd(), 'src/middleware.ts');

  it('FlagIcon.tsx TR, EN/GB, RU ve AR için SVG vektörleri barındırır', () => {
    expect(fs.existsSync(flagIconPath)).toBe(true);
    const content = fs.readFileSync(flagIconPath, 'utf-8');
    expect(content).toContain("case 'tr':");
    expect(content).toContain("case 'en':");
    expect(content).toContain("case 'ru':");
    expect(content).toContain("case 'ar':");
    expect(content).toContain('<svg viewBox="0 0 640 480"');
    expect(content.toLowerCase()).toContain('#e30a17'); // Türkiye bayrağı kırmızısı
    expect(content.toLowerCase()).toContain('#012169'); // Union Jack mavisi
    expect(content.toLowerCase()).toContain('#0039a6'); // Rusya mavisi
    expect(content.toLowerCase()).toContain('#165d31'); // Suudi Arabistan yeşili
  });

  it('Header.tsx ve MobileMenu.tsx FlagIcon bileşenini içe aktarır ve kullanır', () => {
    const headerContent = fs.readFileSync(headerPath, 'utf-8');
    const mobileContent = fs.readFileSync(mobileMenuPath, 'utf-8');

    expect(headerContent).toContain("import FlagIcon from '@/components/ui/branding/FlagIcon'");
    expect(headerContent).toContain('<FlagIcon code={language}');
    expect(headerContent).toContain('<FlagIcon code={lang.code}');
    expect(headerContent).not.toContain("flag: '🇹🇷'");

    expect(mobileContent).toContain("import FlagIcon from '@/components/ui/branding/FlagIcon'");
    expect(mobileContent).toContain('<FlagIcon code={l.code}');
    expect(mobileContent).not.toContain("flag: '🇹🇷'");
  });

  it('Header.tsx dil menüsü yüksek kontrast ve izolasyon sınıflarına sahiptir', () => {
    const headerContent = fs.readFileSync(headerPath, 'utf-8');
    expect(headerContent).toContain('text-slate-800 dark:text-slate-200');
    expect(headerContent).toContain('bg-white dark:bg-[#181920]');
    expect(headerContent).toContain('bg-blue-600 text-white font-bold');
  });

  it('middleware.ts ana sayfa ("/") için varsayılan olarak Türkçe sunar ve gereksinimleri karşılar', () => {
    const middlewareContent = fs.readFileSync(middlewarePath, 'utf-8');
    expect(middlewareContent).toContain("request.cookies.get('NEXT_LOCALE')");
    expect(middlewareContent).toContain('cookieLocale !== defaultLocale');
    expect(middlewareContent).toContain("pathname === '/'");
    // getLocale zorlamasının kaldırıldığını doğrula
    expect(middlewareContent).not.toMatch(/if\s*\(!cookieLocale\s*&&\s*!isCrawler\)\s*\{\s*const detectedLocale = getLocale/);
  });
});
