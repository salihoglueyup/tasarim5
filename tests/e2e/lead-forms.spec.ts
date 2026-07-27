import { test, expect } from '@playwright/test';

/**
 * Lead form akış testleri (Track 3). /api/lead'i intercept ederek gerçek
 * kanal göndermeden başarı/hata UI'sını doğrular.
 */

test('iletişim formu gönderilir ve başarı gösterir', async ({ page }) => {
  await page.route('**/api/lead', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, channels: [] }) })
  );

  await page.goto('/iletisim');
  await page.fill('#contact-name', 'Test Kullanıcı');
  await page.fill('#contact-phone', '05551234567');
  await page.fill('#contact-email', 'test@example.com');
  await page.fill('#contact-message', 'Otomatik test mesajı');
  await page.getByRole('button', { name: /Mesajı Gönder|Send Message/ }).click();

  await expect(page.getByRole('status')).toBeVisible();
});

test('API hata döndürünce hata mesajı görünür', async ({ page }) => {
  await page.route('**/api/lead', (route) =>
    route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ ok: false, errorKey: 'lead_error_required' }) })
  );

  await page.goto('/iletisim');
  await page.fill('#contact-name', 'x');
  await page.fill('#contact-phone', '05551234567');
  await page.fill('#contact-email', 'test@example.com');
  await page.fill('#contact-message', 'mesaj');
  await page.getByRole('button', { name: /Mesajı Gönder|Send Message/ }).click();

  await expect(page.getByRole('alert')).toBeVisible();
});
