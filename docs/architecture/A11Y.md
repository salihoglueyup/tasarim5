# Erişilebilirlik (A11y) & Güven Denetimi

> **Amaç (SEO Master Plan V4 — Bölüm I, Faz 211–230):** Erişilebilirlik (WCAG 2.1 AA) ve güven
> sinyallerini güçlendirmek. A11y hem yasal hem SEO/UX sinyali; semantik yapı SEO'yu da besler.

## 1. Denetim envanteri & durum (Faz 211)

| Alan | Durum | Faz |
|------|-------|-----|
| Skip-to-content linki | ✅ `NavigationWrapper` ("İçeriğe Atla", sr-only + focus) | 216 |
| Tek `<main id="main-content">` landmark | ✅ | 91/217 |
| Görünür odak halkası (`:focus-visible`) | ✅ globals.css (cursor-none çakışması çözüldü) | 214 |
| Klavye: modal focus-trap / ESC | ⚠️ QuoteModal/LoginModal doğrulanmalı | 213 |
| ARIA (menü/modal/accordion) | ✅ mevcut `aria-label`/`aria-expanded` (Header, slider) | 212 |
| Form label bağlama (`htmlFor`/`id`), `aria-required` | ✅ iletişim formu; `role=status` başarı mesajı | 218 |
| `prefers-reduced-motion` | ✅ global CSS + Lenis guard | 219/202 |
| Renk kontrastı (koyu hero üstü metin) | ✅ hero metni beyaz + drop-shadow + vignette | 215 |
| Cookie banner i18n + karar saklama + granülerlik | ✅ tr/en, "yalnız zorunlu / tümü", localStorage | 220 |
| 404/error i18n + faydalı linkler | ✅ `not-found.tsx` (i18n, ana sayfa + hizmetler) | 221 |
| Dil değiştirici → eşdeğer sayfa (hreflang uyumlu) | ✅ `Header.handleLanguageChange` cleanPath | 229 |
| Güvenlik header seti (HSTS + X-Frame vb.) | ✅ `next.config.ts` | 227 |
| Mobil dokunma hedefleri (≥44px) | ✅ butonlar py-3/py-4 + px yeterli; CustomCursor touch'ta kapalı | 228 |
| Otomatik a11y CI | ✅ Lighthouse CI accessibility ≥ 0.90 (`lighthouserc.json`) | 230 |

## 2. Uygulanan düzeltmeler (bu bölüm)
- `:focus-visible` görünür odak halkası; odaklanan öğede özel imleç geçersiz kılınır.
- İletişim formu: `<label htmlFor>` ↔ `id`, `aria-required`, `role="status" aria-live="polite"`
  başarı bildirimi.
- CookieConsent: i18n (tr/en), "Yalnız zorunlu" kararı artık localStorage'a yazılıyor
  (önceden yalnız gizleniyordu), `aria-label`'lı dialog.

## 3. NAP görünürlüğü & yasal erişim (Faz 225/226)
- **NAP** footer + iletişim + QuickCallWidget'te görünür ve tıklanabilir (`tel:` linkleri):
  0216 550 48 48, Kadıköy adresi, WhatsApp. Schema ile birebir (Faz 117).
- **Yasal sayfalar** footer alt barından erişilir: KVKK, Gizlilik, Çerez, Kullanım Şartları,
  Site Haritası. İki dilli linkler (`/en/...`).

## 4. Güven sinyalleri — bekleyen görsel varlıklar (Faz 222/223/224)

> Bu üç faz **gerçek görsel varlık** gerektirir; uydurma logo/sertifika eklenmez.

| Öğe | Durum | Yapılacak |
|-----|-------|-----------|
| ISO/sertifika rozetleri | ⏳ `CertificateBadgeGrid` bileşeni var; `public/images/badges` boş | Gerçek ISO 9001/45001 görsellerini ekle; `hasCredential` schema zaten kalite sayfasında (Faz 65) |
| Müşteri referans logoları | ⏳ `LogoTicker` var; `public/images/references` boş | İzinli gerçek referans logoları + alt metin |
| Garanti / üyelik içeriği | ⏳ | Garanti, sigorta, oda/dernek üyeliklerini ana sayfa + hizmetlere ekle |

Footer'da ISO 9001:2015, ISO 45001 ve özel güvenlik rozetleri **metin olarak** mevcut
(görünür güven sinyali); görsel sertifikalar eklendiğinde `alt` metinleriyle zenginleştirilecek.

## 5. Kalan doğrulamalar (manuel/operasyonel)
- Ekran okuyucu (NVDA/VoiceOver) ile tam sayfa gezinme testi (Faz 217).
- QuoteModal/LoginModal klavye focus-trap + ESC doğrulaması (Faz 213).
- axe DevTools ile sayfa-tipi bazlı ihlal taraması; Lighthouse CI regresyonu izler (Faz 211/230).
