import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Wave 3: UI Primitifleri & Modal Mimarisi (Faz 51 - Faz 65)', () => {
  const uiDir = path.resolve(process.cwd(), 'src/components/ui');
  const hooksDir = path.resolve(process.cwd(), 'src/hooks');

  it('Modal.tsx Framer Motion içermez ve A11y role="dialog" taşır (Faz 51)', () => {
    const modalContent = fs.readFileSync(path.join(uiDir, 'Modal.tsx'), 'utf-8');
    expect(modalContent).not.toContain("from 'framer-motion'");
    expect(modalContent).toContain('role="dialog"');
    expect(modalContent).toContain('aria-modal="true"');
    expect(modalContent).toContain('transform-gpu');
  });

  it('QuoteModal.tsx Framer Motion içermez ve hafif CSS geçişleri kullanır (Faz 52)', () => {
    const quoteContent = fs.readFileSync(path.join(uiDir, 'QuoteModal.tsx'), 'utf-8');
    expect(quoteContent).not.toContain("from 'framer-motion'");
    expect(quoteContent).toContain('transform-gpu');
    expect(quoteContent).toContain('aria-modal="true"');
  });

  it('SpotlightSearchModal.tsx Framer Motion içermez, arama dizgisi önceden tokenize edilmiştir (Faz 53)', () => {
    const searchContent = fs.readFileSync(path.join(uiDir, 'SpotlightSearchModal.tsx'), 'utf-8');
    expect(searchContent).not.toContain("from 'framer-motion'");
    expect(searchContent).toContain('searchIndex');
    expect(searchContent).not.toMatch(/setTimeout\s*\(/);
  });

  it('Tooltip.tsx Framer Motion içermez ve role="tooltip" taşır (Faz 54)', () => {
    const tooltipContent = fs.readFileSync(path.join(uiDir, 'Tooltip.tsx'), 'utf-8');
    expect(tooltipContent).not.toContain("from 'framer-motion'");
    expect(tooltipContent).toContain('role="tooltip"');
    expect(tooltipContent).toContain('transform-gpu');
  });

  it('Tabs.tsx Framer Motion layoutId içermez ve role="tablist" taşır (Faz 55)', () => {
    const tabsContent = fs.readFileSync(path.join(uiDir, 'Tabs.tsx'), 'utf-8');
    expect(tabsContent).not.toContain("from 'framer-motion'");
    expect(tabsContent).toContain('role="tablist"');
    expect(tabsContent).toContain('role="tab"');
  });

  it('QuickCallWidget.tsx Framer Motion içermez ve GPU will-change-transform taşır (Faz 56)', () => {
    const quickCallContent = fs.readFileSync(path.join(uiDir, 'QuickCallWidget.tsx'), 'utf-8');
    expect(quickCallContent).not.toContain("from 'framer-motion'");
    expect(quickCallContent).toContain('will-change-transform');
    expect(quickCallContent).toContain('transform-gpu');
  });

  it('PwaInstallPrompt.tsx Framer Motion içermez ve 30 saniyelik deferred delay uygular (Faz 57)', () => {
    const pwaContent = fs.readFileSync(path.join(uiDir, 'PwaInstallPrompt.tsx'), 'utf-8');
    expect(pwaContent).not.toContain("from 'framer-motion'");
    expect(pwaContent).toContain('30000');
    expect(pwaContent).toContain('transform-gpu');
  });

  it('CookieConsent.tsx Framer Motion içermez ve LCP defer mekanizması taşır (Faz 58)', () => {
    const cookieContent = fs.readFileSync(path.join(uiDir, 'CookieConsent.tsx'), 'utf-8');
    expect(cookieContent).not.toContain("from 'framer-motion'");
    expect(cookieContent).toContain('requestIdleCallback');
    expect(cookieContent).toContain('transform-gpu');
  });

  it('Magnetic.tsx mobil ve dokunmatik ekranlarda otomatik devre dışı kalır (Faz 59)', () => {
    const magneticContent = fs.readFileSync(path.join(uiDir, 'Magnetic.tsx'), 'utf-8');
    expect(magneticContent).toContain('pointer: coarse');
    expect(magneticContent).toContain('isTouch');
  });

  it('Accordion.tsx Framer Motion içermez ve CSS grid-template-rows modeline sahiptir (Faz 60)', () => {
    const accordionContent = fs.readFileSync(path.join(uiDir, 'Accordion.tsx'), 'utf-8');
    expect(accordionContent).not.toContain("from 'framer-motion'");
    expect(accordionContent).toContain('grid-rows-[1fr]');
    expect(accordionContent).toContain('grid-rows-[0fr]');
    expect(accordionContent).toContain('aria-expanded');
  });

  it('Button.tsx Framer Motion whileTap içermez ve saf CSS :active kullanır (Faz 61)', () => {
    const buttonContent = fs.readFileSync(path.join(uiDir, 'Button.tsx'), 'utf-8');
    expect(buttonContent).not.toContain("from 'framer-motion'");
    expect(buttonContent).toContain('active:scale-[0.97]');
    expect(buttonContent).toContain('transform-gpu');
  });

  it('Card.tsx Framer Motion wrapper içermez ve saf CSS hover kullanır (Faz 62)', () => {
    const cardContent = fs.readFileSync(path.join(uiDir, 'Card.tsx'), 'utf-8');
    expect(cardContent).not.toContain("from 'framer-motion'");
    expect(cardContent).toContain('transform-gpu');
  });

  it('FramerLazyProvider.tsx Framer Motion LazyMotion kök yükünü kaldırır (Faz 63)', () => {
    const providerContent = fs.readFileSync(path.join(uiDir, 'FramerLazyProvider.tsx'), 'utf-8');
    expect(providerContent).not.toContain("from 'framer-motion'");
    expect(providerContent).toContain('<>{children}</>');
  });

  it('Modal.tsx Escape tuşu ve odak geri yükleme (focus restoration) uygular (Faz 64)', () => {
    const modalContent = fs.readFileSync(path.join(uiDir, 'Modal.tsx'), 'utf-8');
    expect(modalContent).toContain('previousActiveElement');
    expect(modalContent).toContain('focus()');
    expect(modalContent).toContain("'Escape'");
  });

  it('useClickOutside hook pasif pointerdown ile dropdown menüleri optimize eder (Faz 65)', () => {
    const hookContent = fs.readFileSync(path.join(hooksDir, 'useClickOutside.ts'), 'utf-8');
    expect(hookContent).toContain('pointerdown');
    expect(hookContent).toContain('passive: true');
  });
});
