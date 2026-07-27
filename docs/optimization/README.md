# 🚀 Alo Yönetim - Performans ve Akıcılık Optimizasyon Kütüphanesi

Bu dizin (`docs/optimization/`), "Alo Yönetim" platformunun web standartlarında en yüksek performansı (100/100 Lighthouse, <1.0s LCP, 0ms INP, %0 CLS) ve 120 FPS akıcılığı korumak için uygulanan mimari stratejileri, denetim (audit) raporlarını, ağ planlamalarını ve sürüm bazlı optimizasyon fazlarını barındırır.

---

## 📂 Klasör ve Belge Hiyerarşisi

```
docs/
  optimization/
    ├── README.md                           # [Buradasınız] Optimizasyon Kütüphanesi Ana Haritası
    │
    └── v9-instant-page-load/               # ⚡ v9 Sayfa Yükleme Hızı (Hyper-Speed / Instant Load) Operasyonu
        ├── 01-load-speed-audit.md          # Yükleme Darboğazları, Ağ El Sıkışmaları ve Audit Analizi
        ├── 02-resource-hints-strategy.md   # Preconnect, Preload, DNS-Prefetch ve CDN Ağ Stratejisi
        ├── 03-font-and-icon-mastery.md     # Material Symbols İkon & Font Sıfır Gecikme (FOIT/FOUC İptali) Mimarisi
        └── 04-action-plan-checklist.md     # Uygulanacak Adım Adım Aksiyon Planı ve Doğrulama Checklisti
```

---

## 🎯 Temel Performans Prensipleri

1. **Sıfır Bekleme (Zero-Wait):** Kullanıcı bir bağlantıya tıkladığında veya sayfaya ilk girdiğinde 0 milisaniye gecikme hissi yaratılmalıdır.
2. **İzole İstemci Katmanı (Client Isolation):** Ağır etkileşim bileşenleri (`CustomCursor`, `NoiseOverlay`, modaller) sunucu taraflı ilk HTML paketine yük getirmemeli, `next/dynamic` ile asenkron yüklenmelidir.
3. **Önceden Isıtılmış Ağ (Pre-warmed Network):** Dış kaynaklar ve fontlar tarayıcı daha sayfayı indirmeye başlar başlamaz `dns-prefetch` ve `preconnect` ile karşılanmalıdır.
4. **Donanım Hızlandırma (GPU Mastery):** Tüm animasyonlar ve kaydırma efektleri CPU yerine doğrudan GPU animasyon katmanlarında (`translateZ(0)`, `willChange`) işlenmelidir.
