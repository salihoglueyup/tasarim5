# GÜNLÜK GELİŞTİRME RAPORU — FAZ 26 (WAVE 70)
**Tarih**: 17 Eylül 2026  
**Sürüm & Aşama**: Faz 26 (Wave 70: Google AI Overviews PAA Deep Tree & Accredited BELCERT Trust Verification)  
**Kapsam**: 
1. **Google AI Overviews & Gemini 2.0 "People Also Ask" (PAA) Deep Tree (40 Statüter ve Teknik Soru-Cevap)**
2. **Akredite Laboratuvar ve Sertifikasyon Doğrulama Rozetleri (BELCERT & ILAS Trust Badges — EducationalOccupationalCredential)**
3. **Makine-Okunabilir Canlı Bilgi Kütüğü API'si (`/api/seo/credentials.json`)**
4. **Sistem Genelinde llms.txt / llms-full.txt, SSS ve Kalite Belgelerimiz Entegrasyonu**
5. **114 Test Suite ve 1048 Test ile %100 Yeşil Kalite Güvencesi**

---

## 1. GELİŞTİRMENİN AMACI VE STRATEJİK DEĞERİ

Google AI Overviews, Gemini 2.0 ve Perplexity gibi yeni nesil üretken arama motorları; arama sonuç sayfalarında yalnızca geleneksel metin indekslemeyle yetinmeyip "People Also Ask" (Kullanıcılar Bunları da Sordu) hiyerarşilerini derinlemesine analiz etmekte ve bağımsız akredite üçüncü taraf doğrulama belgelerini (Trust & Accreditation) doğrudan yanıt kartlarına dönüştürmektedir.

Wave 70 ile:
1. **PAA Deep Tree**: Kullanıcıların Google'da en çok arattığı 40 adet kanuni (634 Sayılı KMK, İcra ve İflas Kanunu, 5188 Sayılı Özel Güvenlik Kanunu) ve teknik (asansör yeşil etiket muayenesi, kompanzasyon takibi, yangın ve sığınak yönetimi) soru ve otoriter çözümler, aranabilir ve filtrelenebilir bir akordeon yapısıyla `FAQPage` şeması altında sunuldu.
2. **BELCERT & ILAS Trust Verification**: Sitedeki 7 resmi yönetim sistemi sertifikası (`src/data/certificates.ts` tek doğruluk kaynağı esas alınarak: ISO 10002:2018, ISO 14001:2026, ISO 22301:2019, ISO 26000:2021, ISO 31000:2018, ISO 45001:2018 ve Doğaya Saygı Sertifikası) `A1808961` - `A1808967` belge numaraları, resmi mühür kodları, `ILAS-MS-0089` akreditasyonu ve `https://www.belcert.com` canlı doğrulama portalı ile `EducationalOccupationalCredential` ve `AboutPage` şemalarına bağlandı.
3. **Canlı credentials.json API'si**: LLM crawler'ları (GPTBot, PerplexityBot, Google-Extended, ClaudeBot) için anında parse edilebilir `/api/seo/credentials.json` endpoint'i hizmete açıldı.

---

## 2. GELİŞTİRİLEN VE ENTEGRE EDİLEN BİLEŞENLER

### 2.1. `PeopleAlsoAskDeepTreeSeo.tsx`
- **Konum**: `src/components/seo/PeopleAlsoAskDeepTreeSeo.tsx`
- **İçerik**:
  - 4 Operasyonel Küme:
    1. `kmk-hukuku`: KMK 20 icra, zemin kat asansör muafiyeti, yönetim planı 4/5 çoğunluk, kiracı vekaleti, profesyonel yönetici salt çoğunluk vb. (10 soru).
    2. `aidat-butce`: KMK 20/2 aylık %5 emredici gecikme tazminatı, 7 günlük itiraz süresi, işletme projesi İİK 68 niteliği, kıdem amortisman fonu vb. (10 soru).
    3. `guvenlik-kamera`: 5188 Sayılı Kanun valilik izni, ÖGİ kimlik kartı, kamera kayıt süresi ve KVKK, elle arama yasağı vb. (10 soru).
    4. `teknik-asansor`: Kırmızı etiket mühürleme ve TCK cezai sorumluluğu, EPDK kompanzasyon reaktif ceza sıfırlama, yangın hidrofor testi, klor/pH ölçümleri vb. (10 soru).
  - Canlı Arama Çubuğu (Debounced Instant Filter).
  - Schema.org `FAQPage` ve `#paa-deep-tree-instant-answer-text` speakable seçicisi.
  - Akordeon mekanizması ve tek tıkla doğrudan kopyalama.

### 2.2. `AccreditedCertificationsTrustSeo.tsx`
- **Konum**: `src/components/seo/AccreditedCertificationsTrustSeo.tsx`
- **İçerik**:
  - 7 Resmi BELCERT Sertifikası:
    - ISO 10002:2018 (Müşteri Memnuniyeti) — Belge: `A1808961` | Mühür: `064794`
    - ISO 14001:2026 (Çevre Yönetim Sistemi) — Belge: `A1808962` | Mühür: `064792`
    - ISO 22301:2019 (İş Sürekliliği) — Belge: `A1808963` | Mühür: `064791`
    - ISO 26000:2021 (Sosyal Sorumluluk) — Belge: `A1808964` | Mühür: `064790`
    - ISO 31000:2018 (Risk Yönetimi) — Belge: `A1808965` | Mühür: `064789`
    - ISO 45001:2018 (İş Sağlığı ve Güvenliği) — Belge: `A1808966` | Mühür: `064787`
    - Doğaya Saygı Sertifikası (Ekolojik Tesis) — Belge: `A1808967` | Mühür: `064786`
  - Akreditasyon Otoritesi: `ILAS ACCREDITED (ILAS-MS-0089)`.
  - Belgelendirme Kuruluşu: `BELCERT Uluslararası Belgelendirme Şirketi`.
  - Canlı Doğrulama Bağlantısı: `https://www.belcert.com`.
  - Schema.org `EducationalOccupationalCredential` ve `#accredited-trust-instant-answer-text` speakable seçicisi.

### 2.3. Makine-Okunabilir Kütük API'si (`/api/seo/credentials.json`)
- **Konum**: `src/app/api/seo/credentials.json/route.ts`
- **CORS & Cache**: `Access-Control-Allow-Origin: *`, `max-age=3600, s-maxage=86400, stale-while-revalidate=604800`.
- **JSON Yapısı**:
  - `authority`: Ticari ve hukuki kimlik (Alo Yönetim, MERSİS, iletişim).
  - `accreditationRegistry`: BELCERT ve ILAS akreditasyon metaverileri.
  - `certificatesList`: 7 sertifikanın tüm detayları ve doğrulama linkleri.
  - `paaSummary`: 40 soruluk indekslenmiş veri tabanı.
  - `endpoints`: Tüm ekosistem SEO API'leri ile çapraz bağlantı.

### 2.4. Sayfa ve Manifest Entegrasyonları
- **`src/app/[lang]/sss/page.tsx`**: `PeopleAlsoAskDeepTreeSeo` eklendi, speakable listesine `#paa-deep-tree-instant-answer-text` dahil edildi.
- **`src/app/[lang]/kurumsal/kalite-belgelerimiz/page.tsx`**: `AccreditedCertificationsTrustSeo` eklendi, speakable listesine `#accredited-trust-instant-answer-text` dahil edildi.
- **`src/app/[lang]/layout.tsx`**: `<link rel="alternate" type="application/json" href="/api/seo/credentials.json" ...>` başlık discovery linki eklendi.
- **`src/app/llms.txt/route.ts` & `src/app/llms-full.txt/route.ts`**: `/api/seo/credentials.json` endpoint'i ve BELCERT/ILAS akreditasyonları açıkça işlendi.

---

## 3. DOĞRULAMA VE TEST METRİKLERİ

1. **Vitest Wave 70 Test Paketi**:
   - `npx vitest run src/lib/seo/aiOverviewsWave70.test.ts` -> **10 / 10 Test Başarılı (%100 Pass)**.
2. **TypeScript Derleme**:
   - `npx tsc --noEmit` -> **0 Hata (0 Errors)**.
3. **Kapsamlı Sistem Testi**:
   - `npx vitest run` -> **114 Test Dosyası, 1048 Testin Tamamı Başarılı (%100 Pass)**.

---

## 4. SONUÇ VE ETKİ

Alo Yönetim, Google AI Overviews ve Gemini 2.0 aramalarında:
- Kat Mülkiyeti Kanunu ve site işletmeciliği alanındaki 40 kritik soruda doğrudan birinci kaynak yanıtı verecek zengin içerik ve `FAQPage` mimarisine kavuşmuştur.
- BELCERT ve ILAS tarafından akredite edilmiş 7 sertifikası ile yapay zeka sistemlerine mutlak güven (Trustworthiness & Accreditation) kanıtı sunmaktadır.
