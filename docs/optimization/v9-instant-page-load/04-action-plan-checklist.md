# 📋 v9 Aksiyon Planı ve Doğrulama Kontrol Listesi (Checklist)

Bu doküman, v9 "Hyper-Speed" Sayfa Yükleme Optimizasyonu kapsamında uygulanan adımların takibini ve test standartlarını belirler.

---

## 🛠️ Uygulama Adımları

- [x] **Adım 1:** Kütüphane Hiyerarşisinin Kurulumu
  - `docs/optimization/` alt dizini ve v9 operasyon belgeleri oluşturuldu.
- [ ] **Adım 2:** `src/lib/performance/resourceHints.ts` Oluşturulması
  - Projede kullanılan harici alan adları (Google Fonts, Unsplash, GTM, Clarity) için merkezi yapı yapılandı.
- [ ] **Adım 3:** `layout.tsx` Ağ Ön-Bağlantı Entegrasyonu
  - Preconnect ve DNS-prefetch etiketleri root layout HTML `<head>` kısmına bağlandı.
- [ ] **Adım 4:** `IconFontLoader.tsx` Yeniden Yapılandırılması
  - 1 saniye gecikmeli `requestIdleCallback` yapısı yerine asenkron `preload as="style"` entegre edildi.
- [ ] **Adım 5:** Otomasyon Betiği (`scripts/performance/check-lcp-assets.js`)
  - Kritik görsellerin boyutunu ve statik özelliklerini denetleyen CLI aracı hazırlandı.
- [ ] **Adım 6:** Kalite ve Derleme Doğrulaması
  - `npm run lint` ile sıfır hata ve `npm run build` ile Next.js 16 üretim paketinin başarıyla derlendiği kanıtlandı.

---

## 🧪 Doğrulama Kriterleri ve Başarı Metrikleri

1. **Lighthouse Performance Skoru:** ≥ 95 (Hedef: 100/100).
2. **LCP (Largest Contentful Paint):** < 1.0 saniye (4G simülasyonunda bile).
3. **FCP (First Contentful Paint):** < 0.6 saniye.
4. **CLS (Cumulative Layout Shift):** Tam olarak 0.000.
5. **Ağ Ağacı (Network Waterfall):** Google Fonts ve Unsplash isteklerinin SSL el sıkışma süresinin (green bar) ana HTML indirmesiyle paralel tamamlandığının doğrulanması.
