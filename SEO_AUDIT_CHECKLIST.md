# Aylık SEO Denetim Kontrol Listesi

> **Amaç (SEO Master Plan V4 — Faz 249):** Aylık tekrarlanan teknik + içerik + off-page + CWV
> denetimi. Otomasyon: `npm run seo:audit`, `npm run validate:jsonld`, Lighthouse CI.

## Otomatik kontroller (her ay çalıştır)
```bash
npm run build            # derleme + statik üretim hatasız (exit 0)
npm run start &          # prod sunucu
npm run seo:audit        # on-page: title/desc/H1/canonical/kelime/iç link (0 hata)
npm run validate:jsonld  # tüm JSON-LD geçerli + tip envanteri
npx lhci autorun         # Lighthouse CI eşikleri (perf/seo/a11y)
```

## Teknik (aylık)
- [ ] `seo:audit` 0 hata (duplicate title/desc, H1≠1, canonical eksik yok)
- [ ] `validate:jsonld` tüm bloklar geçerli
- [ ] Sitemap güncel; yeni sayfalar (blog/ilçe/hizmet) dahil; GSC/Bing işledi
- [ ] robots.txt doğru (AI botları allow; /admin,/api,/_next disallow)
- [ ] `/llms.txt`, `/llms-full.txt`, `/api/summary`, `/feed.xml` 200 ve güncel
- [ ] Kırık iç/dış link taraması; 404 loglarını incele → redirect gerekiyorsa ekle
- [ ] Canonical/hreflang örnekleme (tr/en eşdeğer sayfa)

## İçerik (aylık)
- [ ] Editoryal takvime göre yeni makale(ler) yayında (CONTENT_CALENDAR.md)
- [ ] Yeni içerik CONTENT_GUIDELINES checklist'inden geçti
- [ ] Cannibalization taraması (CONTENT_CLUSTERS.md keyword eşlemesi)
- [ ] Orphan sayfa yok (her sayfa ≥3 iç link)
- [ ] Eski/mevsimsel içerik `dateModified` tazelemesi (Faz 172)

## Core Web Vitals & performans
- [ ] Lighthouse Perf ≥ 90, SEO ≥ 95, A11y ≥ 90 (mobil + masaüstü)
- [ ] Saha CWV (GA4/CrUX) yeşil; regresyon yok
- [ ] Performans bütçesi ihlali yok (PERFORMANCE_BUDGET.md)

## Off-page & yerel
- [ ] GBP: yeni post, yorumlara yanıt, bilgi güncel (OFFPAGE_PLAN.md)
- [ ] NAP tutarlılığı (yeni dizin kayıtlarında)
- [ ] Backlink profili: yeni linkler + toksik link kontrolü
- [ ] Rakip hareketleri (çeyreklik derin, aylık hızlı bakış)

## Raporlama
- [ ] `SEO_KPI_REPORT_TEMPLATE.md` kopyala → `reports/YYYY-MM.md` doldur
- [ ] Aksiyon listesini bir sonraki aya taşı
