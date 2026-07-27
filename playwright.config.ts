import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright e2e yapılandırması (Track 3).
 * `tests/e2e` altındaki akış testlerini çalıştırır; prod build'i (`next start`)
 * webServer olarak ayağa kaldırır. Birim testleri (vitest) ayrı tutulur.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
