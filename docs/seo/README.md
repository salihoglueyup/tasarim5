# 🔍 SEO Belgeleri

Bu klasör, **Alo Yönetim SEO Master Plan V4** kapsamında üretilen tüm strateji, denetim ve raporlama belgelerini içerir.

## Belgeler

| Dosya | Açıklama | Önce Oku |
|---|---|---|
| [MASTER_PLAN.md](MASTER_PLAN.md) | 250 fazlık ana SEO planı | Strateji anlayışı için |
| [ROADMAP.md](ROADMAP.md) | V4 uygulama durumu + V5 tohumları | Genel bakış için |
| [KEYWORD_MAP.md](KEYWORD_MAP.md) | Anahtar kelime → sayfa eşlemesi | İçerik yazarken |
| [GEO_STRATEGY.md](GEO_STRATEGY.md) | AI/Generative Engine Optimization stratejisi | AI görünürlüğü için |
| [OFFPAGE_PLAN.md](OFFPAGE_PLAN.md) | Backlink, GBP, dizin kayıtları | Off-page aksiyonlar için |
| [AUDIT_CHECKLIST.md](AUDIT_CHECKLIST.md) | Aylık SEO denetim kontrol listesi | Rutin denetimde |
| [KPI_TEMPLATE.md](KPI_TEMPLATE.md) | Aylık KPI rapor şablonu | Performans raporunda |

## Önerilen Okuma Sırası

1. **[ROADMAP.md](ROADMAP.md)** — Nerede olduğumuzu anlamak için
2. **[KEYWORD_MAP.md](KEYWORD_MAP.md)** — Hangi sayfanın hangi kelimeyi hedeflediği
3. **[GEO_STRATEGY.md](GEO_STRATEGY.md)** — AI motorlarında nasıl görünüyoruz
4. **[OFFPAGE_PLAN.md](OFFPAGE_PLAN.md)** — Yapılacaklar listesi (GBP, backlink)
5. **[AUDIT_CHECKLIST.md](AUDIT_CHECKLIST.md)** + **[KPI_TEMPLATE.md](KPI_TEMPLATE.md)** — Aylık rutin

## Araçlar

```bash
node scripts/seo-audit.mjs        # Temel SEO dosya kontrolü
node scripts/validate-jsonld.mjs  # JSON-LD şema doğrulama
# veya dev.bat [8] / [22]
```

## SEO Performans Özeti (Hedef)

| Metrik | Hedef | Mevcut Durum |
|---|---|---|
| Lighthouse SEO | ≥ 95 | ✅ ~98 |
| Lighthouse Performance | ≥ 90 | ✅ ~98 |
| Lighthouse Accessibility | ≥ 90 | ✅ 100 |
| LCP | < 2.0s | ✅ ~1.1s |
| CLS | < 0.05 | ✅ 0.00 |
| Toplam rota sayısı | — | 288 |

---

**İlgili:** [../content/](../content/) — İçerik takvimi ve kümeleri
