import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Wave 4: Header, Mega Menü & Router Hızlandırması (Faz 76 - Faz 95)', () => {
  const layoutDir = path.resolve(process.cwd(), 'src/components/layout');
  const uiDir = path.resolve(process.cwd(), 'src/components/ui');
  const contextDir = path.resolve(process.cwd(), 'src/context');
  const appLayoutPath = path.resolve(process.cwd(), 'src/app/[lang]/layout.tsx');
  const nextConfigPath = path.resolve(process.cwd(), 'next.config.ts');
  const loadingPath = path.resolve(process.cwd(), 'src/app/[lang]/loading.tsx');
  const notFoundPath = path.resolve(process.cwd(), 'src/app/[lang]/not-found.tsx');
  const errorPath = path.resolve(process.cwd(), 'src/app/[lang]/error.tsx');
  const globalErrorPath = path.resolve(process.cwd(), 'src/app/global-error.tsx');
  const megaMenuPath = path.resolve(process.cwd(), 'src/components/layout/MegaMenuDropdown.tsx');

  it('Header.tsx MegaMenuDropdown bileşenini lazy-load olarak dinamik yükler (Faz 76)', () => {
    const headerContent = fs.readFileSync(path.join(layoutDir, 'Header.tsx'), 'utf-8');
    expect(headerContent).toContain("dynamic(() => import('./MegaMenuDropdown')");
    expect(headerContent).not.toMatch(/^import MegaMenuDropdown from '\.\/MegaMenuDropdown';/m);
  });

  it('Header.tsx scroll dinleyicisini pasif ve requestAnimationFrame ile throttler (Faz 77)', () => {
    const headerContent = fs.readFileSync(path.join(layoutDir, 'Header.tsx'), 'utf-8');
    expect(headerContent).toContain('requestAnimationFrame');
    expect(headerContent).toContain('passive: true');
  });

  it('layout.tsx ve Header.tsx senkronize, FOUC-engelli tema mimarisine sahiptir (Faz 78)', () => {
    const appLayoutContent = fs.readFileSync(appLayoutPath, 'utf-8');
    const headerContent = fs.readFileSync(path.join(layoutDir, 'Header.tsx'), 'utf-8');
    expect(appLayoutContent).toContain("localStorage.getItem('theme')");
    expect(headerContent).toContain("addEventListener('storage'");
  });

  it('MobileMenu.tsx Framer Motion içermez ve GPU will-change-transform taşır (Faz 79)', () => {
    const menuContent = fs.readFileSync(path.join(layoutDir, 'MobileMenu.tsx'), 'utf-8');
    expect(menuContent).not.toContain("from 'framer-motion'");
    expect(menuContent).toContain('will-change-transform');
    expect(menuContent).toContain('transform-gpu');
  });

  it('Header.tsx mobil menü açıldığında scrollbar genişliğini dengeleyerek CLS önler (Faz 80)', () => {
    const headerContent = fs.readFileSync(path.join(layoutDir, 'Header.tsx'), 'utf-8');
    expect(headerContent).toContain('scrollBarWidth');
    expect(headerContent).toContain('paddingRight');
  });

  it('next.config.ts staleTimes ve router cache ayarlarını içerir (Faz 81 & Faz 82)', () => {
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8');
    expect(nextConfigContent).toContain('staleTimes');
    expect(nextConfigContent).toContain('dynamic: 30');
    expect(nextConfigContent).toContain('static: 180');
  });

  it('loading.tsx sayfa yapısıyla birebir örtüşen Skeleton layout içerir (Faz 83)', () => {
    const loadingContent = fs.readFileSync(loadingPath, 'utf-8');
    expect(loadingContent).toContain('Skeleton');
    expect(loadingContent).toContain('variant="rectangular"');
  });

  it('not-found.tsx arama motoru tetikleyicisi ve popüler hizmetleri içerir (Faz 84)', () => {
    const notFoundContent = fs.readFileSync(notFoundPath, 'utf-8');
    expect(notFoundContent).not.toContain("from 'framer-motion'");
    expect(notFoundContent).toContain('open-spotlight-search');
    expect(notFoundContent).toContain('POPULAR_SERVICES');
  });

  it('error.tsx hata referans rozeti ve tek tıkla yeniden deneme içerir (Faz 85)', () => {
    const errorContent = fs.readFileSync(errorPath, 'utf-8');
    expect(errorContent).not.toContain("from 'framer-motion'");
    expect(errorContent).toContain('error.digest');
    expect(errorContent).toContain('handleRetry');
    expect(errorContent).toContain('Destek Hattı');
  });

  it('global-error.tsx sıfır bağımlılıklı saf HTML layout çökme kurtarıcısı sunar (Faz 86)', () => {
    const globalErrorContent = fs.readFileSync(globalErrorPath, 'utf-8');
    expect(globalErrorContent).toContain('<html lang="tr">');
    expect(globalErrorContent).toContain('Tekrar Dene · Try Again');
    expect(globalErrorContent).toContain('error.digest');
  });

  it('next.config.ts optimizePackageImports listesinde yaygın paketleri içerir (Faz 87)', () => {
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8');
    expect(nextConfigContent).toContain('react-hook-form');
    expect(nextConfigContent).toContain('zod');
    expect(nextConfigContent).toContain('jose');
  });

  it('Header.tsx ve MegaMenuDropdown prefetch={true} kullanımını kritik rotalarla sınırlar (Faz 88)', () => {
    const headerContent = fs.readFileSync(path.join(layoutDir, 'Header.tsx'), 'utf-8');
    const megaMenuContent = fs.readFileSync(megaMenuPath, 'utf-8');
    expect(headerContent).toContain("prefetch={['/', '/hizmetler/tesis-yonetimi', '/hesaplayici', '/iletisim'].includes(item.path!)}");
    expect(megaMenuContent).toContain("prefetch={subItem.path === '/hizmetler/tesis-yonetimi'}");
  });

  it('Header.tsx tema butonu donanım hızlandırmalı saf CSS rotasyonu kullanır (Faz 89)', () => {
    const headerContent = fs.readFileSync(path.join(layoutDir, 'Header.tsx'), 'utf-8');
    expect(headerContent).not.toContain("<motion.span \n                  className=\"material-symbols-outlined text-[15px]\"");
    expect(headerContent).toContain('rotate-180 scale-90');
  });

  it('Header.tsx klavye odak yönetimini onKeyDown ile destekler (Faz 90)', () => {
    const headerContent = fs.readFileSync(path.join(layoutDir, 'Header.tsx'), 'utf-8');
    expect(headerContent).toContain("e.key === 'Enter'");
    expect(headerContent).toContain("e.key === 'Escape'");
  });

  it('ExternalLink.tsx dış bağlantılarda rel="noopener noreferrer" ve target="_blank" garantiler (Faz 91)', () => {
    const externalLinkContent = fs.readFileSync(path.join(uiDir, 'ExternalLink.tsx'), 'utf-8');
    expect(externalLinkContent).toContain('noopener noreferrer');
    expect(externalLinkContent).toContain('target = \'_blank\'');
  });

  it('Header.tsx ağır modal ve menüleri Client Island olarak izole eder (Faz 92)', () => {
    const headerContent = fs.readFileSync(path.join(layoutDir, 'Header.tsx'), 'utf-8');
    expect(headerContent).toContain("dynamic(() => import('./LoginModal')");
    expect(headerContent).toContain("dynamic(() => import('./MobileMenu')");
    expect(headerContent).toContain("dynamic(() => import('./MegaMenuDropdown')");
  });

  it('Logo.tsx sabit 48x48 piksel boyutları ve aspect-square ile CLS=0 garantiler (Faz 93)', () => {
    const logoContent = fs.readFileSync(path.join(uiDir, 'Logo.tsx'), 'utf-8');
    expect(logoContent).toContain('aspect-square');
    expect(logoContent).toContain("width={48}");
    expect(logoContent).toContain("height={48}");
  });

  it('Header.tsx dil seçici açılır menüsünün taşmasını önleyen responsive ve RTL konumlandırma içerir (Faz 94)', () => {
    const headerContent = fs.readFileSync(path.join(layoutDir, 'Header.tsx'), 'utf-8');
    expect(headerContent).toContain('rtl:right-auto rtl:left-0');
    expect(headerContent).toContain('max-w-[calc(100vw-1rem)]');
  });

  it('QuoteContext.tsx URL hash (#teklif) ve deep-link yönetimini destekler (Faz 95)', () => {
    const quoteContextContent = fs.readFileSync(path.join(contextDir, 'QuoteContext.tsx'), 'utf-8');
    expect(quoteContextContent).toContain("window.location.hash === '#teklif'");
    expect(quoteContextContent).toContain("window.history.pushState(null, '', '#teklif')");
    expect(quoteContextContent).toContain("window.history.replaceState");
  });
});
