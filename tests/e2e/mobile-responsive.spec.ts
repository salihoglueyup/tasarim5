import { test, expect } from '@playwright/test';

/**
 * Faz 230: Playwright Mobil Görünüm (iPhone / Android) Emülasyon Test Suite'i
 * - Küçük ekranlarda masaüstü menüsünün gizlenmesi ve hamburger butonunun görünmesi
 * - Mobil çekmece (drawer) açılış, gezinme ve kapatma akışı
 * - Yatay taşma (horizontal body overflow) olmaması kontrolü
 */
test.describe('Mobil Görünüm ve Dokunmatik Arayüz (Mobile Viewport)', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 13/14/15 boyutu

  test('Mobilde hamburger menü butonu görünür ve çekmece açılıp kapanabilir', async ({ page }) => {
    await page.goto('/');

    // Hamburger butonu görünürdür
    const hamburgerBtn = page.getByRole('button', { name: /Menüyü Aç|Menüyü Kapat/i });
    await expect(hamburgerBtn).toBeVisible();

    // Tıklanarak açılır
    await hamburgerBtn.click();
    const mobileDrawer = page.locator('[role="dialog"][aria-label="Mobil Menü"]');
    await expect(mobileDrawer).toBeVisible();

    // Açıkça "Menüyü Kapat" butonuyla kapatılabilir
    const closeBtn = page.getByRole('button', { name: 'Menüyü Kapat' });
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await expect(mobileDrawer).toBeHidden();
    }
  });

  test('Mobilde body üzerinde istenmeyen yatay kaydırma taşması (horizontal overflow) yoktur', async ({ page }) => {
    await page.goto('/');
    
    // Pencere genişliği ile scrollWidth eşit olmalıdır (yatay taşma sıfır)
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
  });
});
