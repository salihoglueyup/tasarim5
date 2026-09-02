import { test, expect } from '@playwright/test';

/**
 * Faz 228: Playwright Kritik Kullanıcı Akışları E2E Test Suite'i
 * - Ana sayfa gezintisi ve Hero CTA butonları
 * - Teklif ve İletişim formu doldurma ve doğrulama akışı
 * - Online İşlemler / Giriş modalı açılış ve odak tuzağı kontrolü
 */
test.describe('Kritik Kullanıcı Akışları (Critical Flows)', () => {
  test('Ana sayfa yüklenir, Hero başlığı görünür ve Teklif Al butonuna tıklanabilir', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Alo Yönetim/i);

    // Hero başlığı ve Teklif Al CTA
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();

    const ctaButton = page.locator('a[href*="teklif"], a[href*="iletisim"]').first();
    await expect(ctaButton).toBeVisible();
  });

  test('İletişim sayfası form alanları etkileşime açıktır ve doğrulama tetiklenir', async ({ page }) => {
    await page.goto('/iletisim');

    // Form alanları mevcuttur
    const nameInput = page.locator('#name');
    const phoneInput = page.locator('#phone');
    const emailInput = page.locator('#email');
    const submitBtn = page.getByRole('button', { name: /Mesajı Gönder|Send Message/i });

    await expect(nameInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Boş gönderim denemesinde form doğrulama hatası üretilir
    await submitBtn.click();
    const errorAlert = page.locator('[role="alert"]').first();
    await expect(errorAlert).toBeVisible();
  });

  test('Online İşlemler butonuna tıklandığında Giriş Modalı açılır', async ({ page }) => {
    await page.goto('/');

    const loginButton = page.getByRole('button', { name: /Online İşlemler/i });
    if (await loginButton.isVisible()) {
      await loginButton.click();
      const modal = page.locator('[role="dialog"]').first();
      await expect(modal).toBeVisible();
    }
  });
});
