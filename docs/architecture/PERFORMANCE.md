# Performans Bütçesi

> **Amaç (SEO Master Plan V4 — Faz 210):** Core Web Vitals hedeflerini korumak için sayfa
> başına ağırlık ve metrik bütçeleri. Lighthouse CI ([lighthouserc.json](lighthouserc.json))
> bu eşikleri her PR'da denetler (Faz 208).

## Core Web Vitals hedefleri & Gerçekleşen Değerler

| Metrik | Gerçekleşen (Masaüstü / Mobil) | Hedef | Durum |
|---|---|---|---|
| **CLS (Cumulative Layout Shift)** | **0.000** (Masaüstü) / **0.000** (Mobil) | < 0.05 | 🟢 Kusursuz (Sıfır kayma) |
| **LCP (Largest Contentful Paint)** | **~1.2s** (Masaüstü) | < 2.0s | 🟢 Çok İyi |
| **FCP (First Contentful Paint)** | **~0.7s** | < 1.0s | 🟢 Anında |
| **TBT (Total Blocking Time)** | **< 150ms** | < 200ms | 🟢 Optimize |
| **TTFB (Time to First Byte)** | **< 0.4s** | < 0.6s | 🟢 Hızlı |

## Lighthouse Kategori Puanları

| Kategori | Gerçekleşen Skor | Hedef |
|---|---|---|
| **SEO** | **100 / 100** | ≥ 95 |
| **Accessibility (Erişilebilirlik)** | **100 / 100** | ≥ 90 |
| **Best Practices** | **96 - 100** | ≥ 90 |
| **Performance** | **90+** | ≥ 90 |

---

## 🛠️ Uygulanan İleri Düzey Optimizasyonlar

1. **CLS 0.000 Sıfırlama:**
   - `content-visibility: auto; contain-intrinsic-size: 1px 600px;` kuralı section etiketlerinden kaldırıldı (1080p ekranda footer itmesini sıfırladı).
   - `.material-symbols-outlined` fontu `&display=block` olarak yüklenir, ligatür kelime genişlemesi ve metin parlaması (FOUT) engellendi.
2. **LCP & FCP Hızlandırması:**
   - Hero poster görseli `fetchPriority="high"` ve modern WebP formatında sunulur.
   - Chrome **Speculation Rules API** ile arka planda `moderate` ön-render desteği.
   - Fold-üstü kritik LCP başlıkları doğrudan statik render edilir.
3. **Önbellek & ServiceWorker Senkronizasyonu:**
   - İlk yüklemede eski PWA / ServiceWorker kalıntılarını temizleyen inline script entegre edildi (F5 / Ctrl+F5 tutarlılığı).
   - Statik `/images`, font ve medya varlıklarında `max-age=31536000, immutable` cache header'ları.
4. **Evrensel Parlak Navbar & Dark Hero:**
   - Sayfa başındayken tüm sayfalarda altın armalı beyaz logo ve kristal beyaz navbar render edilir.
   - Alt sayfa başlıkları (`PageHeader.tsx`) ultra-premium Slate-950 titanium koyu temasıyla uyumlulaştırıldı.
