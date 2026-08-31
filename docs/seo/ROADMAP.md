# SEO Yol Haritası & Yıllık Revizyon (V4 → V5 tohumları)

> **Amaç (SEO Master Plan V4 — Faz 250):** V4'ün 250 fazının uygulanma durumunu özetlemek,
> süregelen işleri ve bir sonraki dönemin (V5) fırsatlarını planlamak.

## V4 uygulama durumu

| Bölüm | Faz | Kapsam | Durum |
|-------|-----|--------|-------|
| A | 1–20 | Canonical/hreflang/OG/robots/schema temel | ✅ Kod tamam (%100) |
| B | 21–40 | Sitemap index, RSS, IndexNow, soft-404, HSTS, 304 ETag | ✅ Kod tamam (%100) |
| C | 41–70 | Merkezi schema fabrikası + 14 Rich Results şeması | ✅ Kod tamam (%100) |
| D | 71–100 | On-page exact H1, TL;DR snippet, 1000+ kelime, sözlük | ✅ Kod tamam (%100) |
| E | 101–130 | Programatik yerel (39 ilçe × 8 hizmet = 312 sayfa + mesh linkler) | ✅ Kod tamam (%100) |
| F | 131–150 | GEO/AI (llms.txt, AI crawler, /api/summary, Voice QA/LLM Facts) | ✅ Kod tamam (%100) |
| G | 151–180 | Blog içerik motoru + autoLinker + cluster + arşivler | ✅ Kod tamam (%100) |
| H | 181–210 | Core Web Vitals + Lighthouse CI + 304 ETag önbellek | ✅ Kod tamam (%100) |
| I | 211–230 | A11y + ISO/5188 Doğrulama + SLA & Garanti Kartları | ✅ Kod tamam (%100) |
| J | 231–250 | Off-page + analitik event + raporlama | ✅ Kod Tamam / Harici Hesaplar Bekliyor |

**Notlar (içerik/varlık durumu):**
- ¹ 8 Ana hizmet sayfası zenginleştirildi; `/hizmetler/tesis-yonetimi` amiral gemisi 5 yeni kurumsal sütun ile donatıldı.
- ² Blog motoru, dinamik etiket arşivleri ve otomatik iç linkleme (`autoLinker.ts`) aktif.
- ³ Core Web Vitals optimizasyonu, dinamik `next/dynamic` chunking ve HTTP 304 ETag motoru devrede.
- ⁴ `TrustVerificationAuditSeo` (ISO 9001/14001/45001/27001/10002 ve 5188 lisans) canlıda.
- ⁵ Kod tarafı tamam; Google Business Profile, Bing Places ve yerel dizin kayıtları harici hesap aksiyonu olarak listelendi.

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
