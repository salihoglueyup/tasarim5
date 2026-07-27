import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

/**
 * Vitest yapılandırması (Track 3 — birim testleri).
 * Saf mantık modüllerini test eder (leads/validate, rate-limit, hesaplayici, cro).
 * `@/` alias'ı Next.js tsconfig ile hizalı; e2e (Playwright) ayrı tutulur.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    exclude: ['tests/**', 'node_modules/**'],
  },
});
