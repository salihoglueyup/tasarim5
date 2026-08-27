# 🧪 Test Altyapısı Kılavuzu

> **Test Çerçevesi:** Vitest (birim & entegrasyon) + Playwright (E2E)
> Proje 25+ birim test dosyası ve kapsamlı SEO engine test süitleri içerir.

---

## Hızlı Başlangıç

`ash
npm run test          # Tüm Vitest testlerini tek seferlik koş
npm run test:watch    # İzleme modunda (geliştirme sırasında)
npm run test:ui       # Vitest UI arayüzü (localhost:51204)
npm run test:coverage # Kapsam raporu (coverage/)
`

---

## 📂 Test Dosyası Haritası

### src/lib/ — Temel Kütüphane Testleri

| Dosya | Test Konusu |
|---|---|
| src/lib/seoEngine.test.ts | SEO meta üretimi, hreflang, canonical (350+ satır) |
| src/lib/hesaplayici.test.ts | Aidat ve hizmet maliyeti hesaplama |
| src/lib/cro.test.ts | CRO (dönüşüm optimizasyonu) mantığı |
| src/lib/blogBlockParser.test.ts | Blog içerik blok ayrıştırıcı |

### src/lib/seo/ — SEO Motor Testleri (25 Dosya)

| Test Dosyası | Test Edilen Modül |
|---|---|
| facilityTopicGraph.test.ts | facilityTopicGraph.ts — semantik tematik grafik |
| facilitySerpRankSimulator.test.ts | facilitySerpRankSimulator.ts — SERP sıra simülatörü |
| facilityDeepBackend.test.ts | Backend SEO derinlik motoru |
| facilityPhase3Engines.test.ts | Faz 3 SEO motorları |
| facilityPhase4Engines.test.ts | Faz 4 SEO motorları |
| facilityPhase11BackendSeo.test.ts | Faz 11 backend SEO |
| facilityPhase12LinkGraph.test.ts | Faz 12 link grafik oluşturucu |
| facilityPhase13DeepLinkMesh.test.ts | Faz 13 derin link ağı |
| facilityPhase14BlogEcosystem.test.ts | Faz 14 blog ekosistemi |
| facilityPhase15BlogMaster.test.ts | Faz 15 blog master engine |
| facilityPhase16Fundamentals.test.ts | Faz 16 temel SEO motorları |
| facilityAdvancedEngines.test.ts | İleri SEO motorları |
| facilityInternalBackendSeo.test.ts | İç sayfa backend SEO |
| facilityDistrictBackendSeo.test.ts | İlçe bazlı backend SEO |
| facilitySiloBackendSeo.test.ts | Silo mimarisi backend SEO |
| facilityEdgeOptimizer.test.ts | Edge CDN optimizasyonu |
| backendSeoEngines.test.ts | Genel backend SEO motorları |
| backendSeoWave3.test.ts | Backend SEO 3. dalga |
| backendSeoWave5.test.ts | Backend SEO 5. dalga |
| backgroundSeoEngines.test.ts | Arka plan SEO motorları |
| existingFilesEnhancement.test.ts | Mevcut dosya geliştirme |
| corePagesEnhancement.test.ts | Çekirdek sayfa geliştirme |
| smartRedirect.test.ts | Akıllı yönlendirme mantığı |

---

## ⚙️ Vitest Yapılandırması

Konfigürasyon dosyası: vitest.config.ts (proje kökü)

Temel ayarlar:
- environment: node
- include: src/**/*.test.ts
- exclude: node_modules, .next, dist
- globals: true (describe, it, expect global)

---

## 🧩 Test Yazma Kuralları

### Dosya İsimlendirmesi
Her modül için: <modül-adı>.test.ts → aynı dizinde

`
src/lib/seo/facilityTopicGraph.ts
src/lib/seo/facilityTopicGraph.test.ts  ← Test dosyası
`

### Temel Yapı

`	ypescript
import { describe, it, expect } from 'vitest';
import { generateFacilityManagementGraph } from './facilityTopicGraph';

describe('generateFacilityManagementGraph', () => {
  it('should return valid schema.org Service type', () => {
    const graph = generateFacilityManagementGraph('tr');
    expect(graph['@type']).toBe('Service');
    expect(graph['@context']).toBe('https://schema.org');
  });

  it('should include ISO 41001 reference', () => {
    const graph = generateFacilityManagementGraph('tr');
    expect(JSON.stringify(graph)).toContain('ISO 41001');
  });
});
`

### SEO Engine Testlerinde Yaygın Desenler

`	ypescript
// Schema üretimi doğrulama
it('generates valid JSON-LD', () => {
  const schema = generateSchema(params);
  expect(schema['@context']).toBe('https://schema.org');
  expect(schema['@type']).toBeDefined();
});

// Dil bazlı test
it.each(['tr', 'en', 'ru', 'ar'])('works for locale %s', (lang) => {
  const result = generateGraph(lang);
  expect(result.url).toContain(lang === 'tr' ? '/' : //);
});

// İçerik doğrulama
it('contains required legal reference', () => {
  const result = generateFaqContent();
  expect(JSON.stringify(result)).toContain('KMK');
});
`

---

## 📊 Kapsam Hedefleri (Coverage)

| Modül | Hedef Kapsam |
|---|---|
| src/lib/seoEngine.ts | %80+ |
| src/lib/seo/*.ts | %70+ |
| src/lib/hesaplayici.ts | %90+ |
| src/lib/auth.ts | %85+ |

`ash
# Kapsam raporu HTML olarak:
npm run test:coverage -- --reporter=html
# Sonuç: coverage/index.html
`

---

## 🚀 CI/CD Entegrasyonu

Her PR'da otomatik test:

`yaml
# .github/workflows/test.yml
- name: Run Tests
  run: npm run test -- --run

- name: Type Check
  run: npx tsc --noEmit
`

Test başarısız olursa PR merge edilemez.

---

## 🔍 Debugging İpuçları

`ash
# Tek dosya testi:
npx vitest run src/lib/seo/facilityTopicGraph.test.ts

# Verbose çıktı:
npx vitest run --reporter=verbose

# Sadece başarısız testleri göster:
npx vitest run --reporter=verbose 2>&1 | grep -A5 "FAIL"

# Test süitini izle ve değişikliklerde yeniden koş:
npx vitest --watch src/lib/seo/
`

---

İlgili: CONTRIBUTING.md, ../architecture/OVERVIEW.md
