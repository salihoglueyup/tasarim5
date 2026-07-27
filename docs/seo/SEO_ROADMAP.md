# SEO Yol Haritası & Yıllık Revizyon (V4 → V5 tohumları)

> **Amaç (SEO Master Plan V4 — Faz 250):** V4'ün 250 fazının uygulanma durumunu özetlemek,
> süregelen işleri ve bir sonraki dönemin (V5) fırsatlarını planlamak.

## V4 uygulama durumu

| Bölüm | Faz | Kapsam | Durum |
|-------|-----|--------|-------|
| A | 1–20 | Canonical/hreflang/OG/robots/schema temel | ✅ Kod tamam |
| B | 21–40 | Sitemap, indeksleme, soft-404, HSTS | ✅ Kod tamam |
| C | 41–70 | Merkezi schema fabrikası + rich results | ✅ Kod tamam |
| D | 71–100 | On-page, keyword map, sözlük, audit aracı | ✅ Kod tamam¹ |
| E | 101–130 | Programatik yerel (12 ilçe × 8 hizmet = 109 sayfa) | ✅ Kod tamam |
| F | 131–150 | GEO/AI (llms.txt, AI crawler, /api/summary) | ✅ Kod tamam |
| G | 151–180 | Blog içerik motoru + cluster + arşivler | ✅ Kod tamam² |
| H | 181–210 | Core Web Vitals + Lighthouse CI + bütçe | ✅ Kod tamam³ |
| I | 211–230 | A11y (focus, form, cookie i18n) + trust | ✅ Kod tamam⁴ |
| J | 231–250 | Off-page + analitik event + raporlama | ✅ Kod + doküman⁵ |

**Notlar (içerik/varlık gerektiren bekleyen işler):**
- ¹ İçerik derinliği (1000+ kelime hizmet sayfaları — Faz 76/92) içerik yazım dalgası.
- ² 6 gerçek makale yayında; editoryal takvim (CONTENT_CALENDAR.md) ile büyüyecek.
- ³ Lab ölçümleri (mobil Lighthouse, RUM) canlı ortamda; Material Symbols/i18n bölme borç.
- ⁴ Trust görselleri (ISO rozet, referans logo — Faz 222/223) gerçek varlık bekliyor.
- ⁵ GBP, dizin kayıtları, backlink, GSC/Bing doğrulama harici hesap aksiyonu (OFFPAGE_PLAN.md).

## Üretilen dokümanlar
- `SEO_MASTER_PLAN_V4.md` — 250 fazlık ana plan
- `SEO_KEYWORD_MAP.md` — keyword → sayfa eşlemesi
- `CONTENT_CLUSTERS.md` / `CONTENT_CALENDAR.md` / `CONTENT_GUIDELINES.md` — içerik
- `GEO_STRATEGY.md` — AI/GEO görünürlük
- `PERFORMANCE_BUDGET.md` — CWV bütçesi
- `A11Y_TRUST.md` — erişilebilirlik & güven denetimi
- `OFFPAGE_PLAN.md` — off-page & yerel
- `SEO_KPI_REPORT_TEMPLATE.md` / `SEO_AUDIT_CHECKLIST.md` — raporlama & denetim
- Araçlar: `scripts/seo-audit.mjs`, `scripts/validate-jsonld.mjs`, `lighthouserc.json`

## Süregelen döngü (aylık)
1. Yeni içerik (editoryal takvim) + eski içerik tazeleme.
2. `SEO_AUDIT_CHECKLIST.md` çalıştır; `SEO_KPI_REPORT_TEMPLATE.md` doldur.
3. GBP post/yorum, backlink takibi, rakip hızlı bakış.

## Gerçek değer girişleri (ilk fırsatta)
- [ ] `.env`: GA4, Clarity, GSC/Bing doğrulama, IndexNow anahtarı gerçek değerler.
- [ ] Trust görselleri: ISO sertifikaları, referans logoları (izinli).
- [ ] GBP oluştur/doğrula + dizin kayıtları.

## V5 tohumları (sonraki dönem fırsatları)
- **Mahalle katmanı (Faz 124):** yüksek potansiyelli ilçelerde mahalle sayfaları.
- **Yeni hizmet/ilçe:** veri modeline ekleme → otomatik sayfa/sitemap/schema.
- **İçerik ölçeği:** 50+ konu (CONTENT_CLUSTERS) → pillar başına 5-8 makale.
- **AI kanalı:** llms.txt genişletme, yeni AI motorları için politika; AI-referrer dönüşüm optimizasyonu.
- **Programatik genişleme:** "yakınımda" + hizmet kombinasyon sayfaları, sektörel (rezidans/AVM) landing'ler.
- **i18n:** EN içerik paritesi + EN blog (uluslararası/kurumsal müşteri).
- **Otomasyon:** Lighthouse + a11y + JSON-LD kontrollerini PR gate'ine bağla.
