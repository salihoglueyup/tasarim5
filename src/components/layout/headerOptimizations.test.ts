import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Wave 4: Header, Mega Menü & Router Hızlandırması (Faz 76 - Faz 80)', () => {
  const layoutDir = path.resolve(process.cwd(), 'src/components/layout');
  const appLayoutPath = path.resolve(process.cwd(), 'src/app/[lang]/layout.tsx');

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
});
