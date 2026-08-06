# Off-Page, Yerel İşaretler & Backlink Planı

> **Amaç (SEO Master Plan V4 — Bölüm J, Faz 231–247):** Site dışı otorite (backlink, citation),
> yerel varlık (Google Business Profile) ve dijital PR ile alan otoritesini artırmak. Bu bölümün
> çoğu **harici hesap/aksiyon** gerektirir; kod tarafı (sameAs, GA4 event) uygulanmıştır.

## 0. NAP tutarlılığı — tek kaynak (Faz 117/235)
Tüm off-page kayıtlarında **birebir** kullanılacak künye:

```
Alo Yönetim
Eğitim Mah. Kasap İsmail Sk. No:15/19, Kadıköy, İstanbul, TR
Tel: +90 216 550 48 48
E-posta: istanbul@aloyonetim.com.tr
Web: https://aloyonetim.com.tr
```
Sosyal: facebook.com/aloyonetim · twitter.com/aloyonetim · instagram.com/aloyonetim ·
linkedin.com/company/aloyonetim · youtube.com/@aloyonetim
(schema `sameAs` ve Footer linkleriyle birebir aynı — Faz 239.)

## 1. Google Business Profile (Faz 231–234, 247)
- [ ] İşletme profilini oluştur/doğrula (kartla/telefon/posta) — NAP yukarıdakiyle aynı.
- [ ] **Birincil kategori:** Property management company (Emlak/Site yönetim şirketi).
      **İkincil:** Security service, Cleaning service, Facility management company.
- [ ] Hizmet alanları: Bölüm E ilçeleri (Kadıköy, Ataşehir, Üsküdar, Beşiktaş…).
- [ ] Görseller: logo, kapak, ekip/ofis; düzenli GBP post (kampanya/rehber — haftalık).
- [ ] Yorum akışı: memnun müşteri → kısa yorum linki; tüm yorumlara 48 saatte yanıt.
      Site `aggregateRating` (4.9) gerçek GBP puanıyla tutarlı tutulur (Faz 46/234).
- [ ] GBP Insights: harita paketi görünürlüğü, yol tarifi/arama aksiyonları — aylık izle.

## 2. NAP citation & dizinler (Faz 235/236)
Öncelikli Türkiye dizinleri (tutarlı NAP + web linki):
- [ ] Google Business Profile (yukarıda)
- [ ] Bing Places, Apple Business Connect, Foursquare
- [ ] Yerel rehberler: Yandex İşletme, Bulurum, Neredekaca, Firmasec, Sanayi/Ticaret Odası listelemesi
- [ ] Sektörel: tesis/site yönetimi dernekleri, emlak/yönetim portalları
- [ ] Doğrulama sonrası profil URL'lerini schema `sameAs`'e ekle (Faz 60/235).

## 3. Backlink stratejisi & hedef liste (Faz 237)
**Yaklaşım:** alıntılanabilir içerik (blog rehberleri + veri) → doğal link kazanımı.

| Fırsat türü | Hedef | Kaldıraç |
|-------------|-------|----------|
| Misafir yazı | Emlak/gayrimenkul, yerel yaşam blogları | KMK/aidat uzmanlığı |
| Kaynak sayfa | "Site yönetimi rehberi" derleyen sayfalar | `/sozluk`, uzun rehberler |
| Yerel PR | İlçe haber siteleri, semt dernekleri | Bölüm E yerel sayfalar |
| Sektörel dizin | Yönetim/güvenlik dernek dizinleri | Üyelik + profil |
| Veri/istatistik | Aidat/enerji tasarrufu mini araştırma (infografik) | Alıntı çekici |

Anchor dağılımı doğal tutulur (marka + çıplak URL + konu karışık); para-anchor aşırılığından kaçınılır.

## 4. Dijital PR & basın (Faz 238)
- [ ] Haber değeri olan veri üret: "İstanbul'da site aidatları 2026" mini analizi.
- [ ] Yerel/sektörel yayınlara basın bülteni; röportaj fırsatları.

## 5. Backlink profil sağlığı (Faz 246)
- [ ] GSC "Bağlantılar" raporu + 3rd-party (Ahrefs/SEMrush) ile aylık izleme.
- [ ] Toksik/spam linkler için gerekirse disavow; ani anchor artışlarını denetle.

## 6. Rakip analizi (Faz 245)
- [ ] İlçe + hizmet keyword'lerinde ilk 5 rakibi belirle (özellikle yerel harita paketi).
- [ ] İçerik boşlukları (CONTENT_CLUSTERS.md) + backlink boşluklarını kapat.
- [ ] Çeyreklik GAP raporu → içerik/off-page aksiyon listesi.

## 7. Uygulanmış kod tarafı
- `sameAs` schema + Footer sosyal linkleri gerçek profillere bağlı (Faz 239).
- GA4 dönüşüm event'leri: teklif modalı, form, tıkla-ara, WhatsApp (Faz 240 — bkz. `src/lib/analytics.ts`).
- IndexNow anahtarı env'de hazır (`INDEXNOW_KEY`), Bing/Yandex anlık indeksleme için (Faz 29).
