import { test, expect } from '@playwright/test';

/**
 * Faz 229: Playwright Çok Dilli Rota ve Yön Doğruluğu E2E Test Suite'i
 * Türkçe (tr), İngilizce (en), Rusça (ru) ve Arapça (ar - RTL) rotalarını doğrular.
 */
test.describe('Çok Dilli Rota ve Yön Doğruluğu (Language Routing & RTL)', () => {
  test('Türkçe ana sayfa doğru dil ve yöne sahiptir', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  });

  test('İngilizce rotasında lang="en" ve URL önekleri korunur', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

    // Menü bağlantılarında /en öneki bulunur
    const servicesLink = page.locator('nav a[href*="/en/"]').first();
    await expect(servicesLink).toBeVisible();
  });

  test('Rusça rotasında lang="ru" ve geçerli içerik yüklenir', async ({ page }) => {
    await page.goto('/ru');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  });

  test('Arapça rotasında dir="rtl" ve lang="ar" aktifleşir', async ({ page }) => {
    await page.goto('/ar');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });
});
