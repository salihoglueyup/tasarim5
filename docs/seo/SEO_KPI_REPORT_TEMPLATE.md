# Aylık SEO KPI Raporu — Şablon

> **Amaç (SEO Master Plan V4 — Faz 248):** Tekrarlanabilir aylık KPI raporu. Her ay bu şablon
> kopyalanır (`reports/YYYY-MM.md`) ve doldurulur. Kaynaklar: GA4, Google Search Console (GSC),
> Bing Webmaster, GBP Insights, Lighthouse CI, `npm run seo:audit`.

**Dönem:** YYYY-AA · **Hazırlayan:** ___ · **Tarih:** ____

## 1. Organik trafik (GA4)
| Metrik | Bu ay | Geçen ay | Δ | Hedef |
|--------|-------|----------|---|-------|
| Organik oturum | | | | +%40 (3ay) |
| Organik kullanıcı | | | | |
| Ortalama etkileşim süresi | | | | |
| AI-referrer oturum (chatgpt/perplexity/gemini) | | | | görünürlük |

## 2. Dönüşümler (GA4 event — Faz 240/243)
| Event | Sayı | Δ | Not |
|-------|------|---|-----|
| open_quote_modal | | | teklif modalı açılışı |
| generate_lead | | | teklif formu tamamlama |
| contact_form_submit | | | iletişim formu |
| phone_call_click | | | tıkla-ara |
| whatsapp_click | | | WhatsApp |
| **Huni:** giriş → hizmet → teklif dönüşüm oranı | %__ | | düşüş noktası: ___ |

## 3. Arama görünürlüğü (GSC — Faz 241/244)
| Metrik | Bu ay | Δ |
|--------|-------|---|
| Toplam tıklama | | |
| Toplam gösterim | | |
| Ortalama CTR | | |
| Ortalama pozisyon | | |
| İlk sayfa (≤10) keyword sayısı | | |

**Öne çıkan sorgular (fırsat: yüksek gösterim, düşük CTR):**
1. ___ 2. ___ 3. ___ → içerik/başlık iyileştirme aksiyonu.

**Yerel keyword pozisyonları (örnek):** "kadıköy site yönetimi", "güvenlik yönetimi ataşehir" …

## 4. İndeksleme & teknik
| Metrik | Değer | Not |
|--------|-------|-----|
| İndekslenen sayfa (GSC) | | hedef: 300+ (6ay) |
| Kapsam hataları | | |
| Sitemap işlenen URL | | GSC + Bing |
| `npm run seo:audit` hata/uyarı | | 0 hata beklenir |
| Rich Results geçerli tip sayısı | | `npm run validate:jsonld` |

## 5. Core Web Vitals (Faz 209)
| Metrik | Saha (CrUX/GA4) | Lab (Lighthouse) | Hedef |
|--------|-----------------|------------------|-------|
| LCP | | | < 2.0s |
| INP | | | < 200ms |
| CLS | | | < 0.05 |
| Lighthouse Perf/SEO/A11y | | | 90/100/90+ |

## 6. Yerel görünürlük (GBP Insights — Faz 247)
| Metrik | Değer |
|--------|-------|
| Harita paketi gösterim | |
| Yol tarifi talebi | |
| Profil üzerinden arama | |
| Yeni yorum / ortalama puan | |

## 7. Off-page (Faz 246)
| Metrik | Değer |
|--------|-------|
| Referans veren alan (RD) | |
| Yeni backlink | |
| Toksik link / disavow | |

## 8. Aksiyon listesi (gelecek ay)
- [ ] ___
- [ ] ___
- [ ] ___
