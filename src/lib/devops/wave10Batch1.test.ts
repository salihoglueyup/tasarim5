import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Wave 10: Faz 226 - Faz 230 API Birim Testleri, Playwright E2E Suite, Çok Dilli Rota & Mobil Emülasyon', () => {
  it('Faz 226: A/B test çerçevesi testleri mevcuttur', () => {
    const abTestPath = path.resolve(process.cwd(), 'src/lib/ab-test.test.ts');
    expect(fs.existsSync(abTestPath)).toBe(true);
  });

  it('Faz 227: API uç noktaları için birim ve entegrasyon test paketi mevcuttur', () => {
    const apiTestPath = path.resolve(process.cwd(), 'src/lib/api/apiRoutes.test.ts');
    expect(fs.existsSync(apiTestPath)).toBe(true);

    const content = fs.readFileSync(apiTestPath, 'utf-8');
    expect(content).toContain('/api/calculator');
    expect(content).toContain('/api/health');
    expect(content).toContain('/api/lead');
  });

  it('Faz 228: Playwright kritik akışlar E2E suite dosyası mevcuttur', () => {
    const e2eFlowsPath = path.resolve(process.cwd(), 'tests/e2e/critical-flows.spec.ts');
    expect(fs.existsSync(e2eFlowsPath)).toBe(true);

    const content = fs.readFileSync(e2eFlowsPath, 'utf-8');
    expect(content).toContain('Kritik Kullanıcı Akışları');
    expect(content).toContain('Teklif Al');
  });

  it('Faz 229: Playwright çok dilli rota ve RTL E2E test dosyası mevcuttur', () => {
    const langE2ePath = path.resolve(process.cwd(), 'tests/e2e/language-routing.spec.ts');
    expect(fs.existsSync(langE2ePath)).toBe(true);

    const content = fs.readFileSync(langE2ePath, 'utf-8');
    expect(content).toContain('lang="ar"');
    expect(content).toContain('dir="rtl"');
  });

  it('Faz 230: Playwright yapılandırmasında mobil emülasyon cihazları tanımlıdır', () => {
    const configPath = path.resolve(process.cwd(), 'playwright.config.ts');
    const content = fs.readFileSync(configPath, 'utf-8');

    expect(content).toContain('Mobile Chrome');
    expect(content).toContain('Mobile Safari');

    const mobileE2ePath = path.resolve(process.cwd(), 'tests/e2e/mobile-responsive.spec.ts');
    expect(fs.existsSync(mobileE2ePath)).toBe(true);
  });
});
