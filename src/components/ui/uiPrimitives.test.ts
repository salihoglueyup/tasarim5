import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Wave 3: UI Primitifleri & Modal Mimarisi (Faz 51 - Faz 55)', () => {
  const uiDir = path.resolve(process.cwd(), 'src/components/ui');

  it('Modal.tsx Framer Motion içermez ve A11y role="dialog" taşır', () => {
    const modalContent = fs.readFileSync(path.join(uiDir, 'Modal.tsx'), 'utf-8');
    expect(modalContent).not.toContain("from 'framer-motion'");
    expect(modalContent).toContain('role="dialog"');
    expect(modalContent).toContain('aria-modal="true"');
    expect(modalContent).toContain('transform-gpu');
  });

  it('QuoteModal.tsx Framer Motion içermez ve hafif CSS geçişleri kullanır', () => {
    const quoteContent = fs.readFileSync(path.join(uiDir, 'QuoteModal.tsx'), 'utf-8');
    expect(quoteContent).not.toContain("from 'framer-motion'");
    expect(quoteContent).toContain('transform-gpu');
    expect(quoteContent).toContain('aria-modal="true"');
  });

  it('SpotlightSearchModal.tsx Framer Motion içermez, arama dizgisi önceden tokenize edilmiştir', () => {
    const searchContent = fs.readFileSync(path.join(uiDir, 'SpotlightSearchModal.tsx'), 'utf-8');
    expect(searchContent).not.toContain("from 'framer-motion'");
    expect(searchContent).toContain('searchIndex');
    expect(searchContent).not.toMatch(/setTimeout\s*\(/);
  });

  it('Tooltip.tsx Framer Motion içermez ve role="tooltip" taşır', () => {
    const tooltipContent = fs.readFileSync(path.join(uiDir, 'Tooltip.tsx'), 'utf-8');
    expect(tooltipContent).not.toContain("from 'framer-motion'");
    expect(tooltipContent).toContain('role="tooltip"');
    expect(tooltipContent).toContain('transform-gpu');
  });

  it('Tabs.tsx Framer Motion layoutId içermez ve role="tablist" taşır', () => {
    const tabsContent = fs.readFileSync(path.join(uiDir, 'Tabs.tsx'), 'utf-8');
    expect(tabsContent).not.toContain("from 'framer-motion'");
    expect(tabsContent).toContain('role="tablist"');
    expect(tabsContent).toContain('role="tab"');
  });
});
