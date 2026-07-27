import { test, expect } from '@playwright/test';

/**
 * Duman testleri (Track 3): kritik sayfalar render oluyor ve tek H1 taşıyor.
 */

const pages = ['/', '/hizmetler', '/iletisim', '/hesaplayici', '/blog', '/bolgeler'];

for (const path of pages) {
  test(`${path} yüklenir ve tek H1 içerir`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator('h1')).toHaveCount(1);
  });
}

test('dil değiştirme /en önekiyle çalışır', async ({ page }) => {
  const res = await page.goto('/en/hizmetler');
  expect(res?.status()).toBeLessThan(400);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
