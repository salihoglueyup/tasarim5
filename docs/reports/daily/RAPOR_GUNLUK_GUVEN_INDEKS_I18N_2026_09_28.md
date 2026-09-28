# GÜNLÜK GELİŞTİRME RAPORU — GÜVEN TEMİZLİĞİ, İNDEKS POLİTİKASI VE ÇOK DİLLİ İÇERİK (2026-09-28)

## 📌 Görev Özeti ve Kapsam
Bugünkü çalışma önceki günlerdeki "daha fazla SEO bileşeni" yaklaşımından bilinçli olarak ayrıldı: hedef, sitenin **doğrulanabilir, tutarlı ve Google'ın kurallarına uygun** olması ve çevrilmiş sayfaların gerçekten çevrilmiş olması. Ana başlıklar:

1. Sertifika sayfaları (tıklama ve PDF önizleme hataları)
2. Doğrulanamayan belge/kimlik iddialarının temizlenmesi
3. Merkezi indeksleme politikası (çevrilmemiş diller, ince sayfalar)
4. Canonical / sitemap / başlık tutarlılığı
5. Admin girişi güvenlik sertleştirmesi
6. Görünmeyen FAQ ve ClaimReview şemalarının kaldırılması, ölü bileşenlerin silinmesi
7. Footer, ana sayfa, Hakkımızda, İletişim, Teklif Al ve Hizmetler sayfalarının en/ru/ar çevirisi

---

## ✅ Tamamlanan İşler

### 1. Sertifika sayfaları
- Kart tıklaması yan sekmeye gidiyordu ve sertifika PDF önizlemesi "bağlantı reddedildi" veriyordu.
- Neden: `certificates.ts` ve detay sayfasındaki karakter kodlaması bozukluğu (React hydration hatası #418) ve genel `X-Frame-Options: DENY` / `frame-ancestors 'none'` başlığı.
- Çözüm: dosyalar temiz UTF-8 olarak yeniden yazıldı; `next.config.ts`'e `/certificates/*` için `SAMEORIGIN` istisnası eklendi.
- `src/data/certificates.ts` artık **tek doğruluk kaynağı**: yalnızca `public/certificates` içindeki 7 gerçek BELCERT/ILAS belgesi.

### 2. Güven ve kimlik temizliği
- Sahip olunmayan belge iddiaları (TSE HYB, TÜRKAK, ISO 9001/27001/27701/41001/50001) kaldırıldı.
- Şirket kimliği `CANONICAL_NAP` (`napGuardEngine.ts`) tek kaynağına bağlandı; çelişen MERSİS/ticaret sicil/adres değerleri ve yer tutucu WhatsApp numarası kaldırıldı.
- "2025 En Güvenilir Site & Tesis Yönetim Şirketi Ödülü" iddiası kaldırıldı (sahibin teyidiyle).
- **Bugün ek olarak bulundu:** İletişim sayfasında hâlâ sahte görünen ikinci bir kimlik bloğu vardı (MERSİS `0068123456789012`, sicil `984512-5`, VKN, "Alo Tesis & Site Yönetimi Hizmetleri A.Ş."). `CANONICAL_NAP`'e bağlandı; eski değerler `credentialClaimsGuard.test.ts` kuralına eklendi.
- Kalan `ISO 41001` ifadeleri (iletişim rozeti, teklif şeması, hizmet kataloğu, çözüm sihirbazı) çıkarıldı.
- Regresyon koruması: `credentialClaimsGuard.test.ts` kaynak kodda yasaklı iddiaları tarar.

### 3. Merkezi indeksleme politikası (`src/lib/seo/indexPolicy.ts`)
- Çevirisi tamamlanmamış en/ru/ar sayfaları **noindex**; hreflang ve sitemap'ten çıkarıldı (`TRANSLATED_PATHS` boş; sayfa çevrilip gözden geçirilince eklenir).
- Sayfa sayısı 3'ten az olan etiket sayfaları noindex; sitemap yalnızca yeterli içerikli etiketleri listeler.
- **Bölge/ilçe sayfaları kapatılmadı** (hâlâ trafik alıyor).
- `/guvenlik-akademisi` başka domaine canonical olduğu için hreflang/sitemap dışında bırakıldı (kasıtlı; kanibalizasyon önlemi).
- Uygulama noktaları: `buildMetadata`, sitemap'ler, `middleware.ts` (X-Robots-Tag), edge header injector.

### 4. Canonical, sitemap ve başlık tutarlılığı
- Sitemap'te uydurma `lastModified` tarihleri kaldırıldı; yalnızca gerçek tarihler yazılıyor.
- Tek ve standart marka eki (`| Alo Yönetim`) `formatBrandTitle` ile garanti altına alındı.

### 5. Admin giriş güvenliği
- Login uç noktası artık **hiçbir koşulda kullanıcı oluşturmuyor**; koda gömülü varsayılan admin şifresi (`admin123`) kaldırıldı.
- Oturum çerezi `Secure` bayrağı, istemcinin gönderebildiği `x-forwarded-proto` başlığına bağlı olmaktan çıkarıldı.
- `prisma/seed.ts`: `INITIAL_ADMIN_PASSWORD` veya rastgele üretilen şifre (bir kez yazdırılır).
- Test: `adminAuthHardening.test.ts`.
- ⚠️ **Sunucuda yapılacak:** canlı ortamda admin şifresi eskiden `admin123` idiyse mutlaka değiştirilmeli.

### 6. Görünmeyen şema temizliği ve ölü kod
- Sayfada görünmeyen soruları basan **FAQPage** şemaları kaldırıldı (12 SEO bileşeni, tesis graph builder'ı, 5 alt sektör sayfası). SSS sayfasının şeması yalnızca ilk görünen 20 soruyu içerir (`sss/constants.ts`).
- **ClaimReview** şemaları ve "Google Fact Check" vaatleri arayüzden ve `llms.txt`'den kaldırıldı.
- Hiçbir yerde kullanılmayan 18 SEO bileşeni ve barrel export'ları silindi.
- Not: FAQ zengin sonuçları Ağustos 2023'ten beri yalnızca devlet/sağlık sitelerine açık olduğu için "tek FAQPage'e birleştirme" fikrinden vazgeçildi.

### 7. Çok dilli içerik (en / ru / ar)
Yöntem: hard-coded Türkçe metinler sözlük anahtarlarına (`src/i18n/locales/*/common.json`) veya bileşen içi "Türkçe metin → anahtar" haritasına taşındı; Türkçe sayfalar aynı metni sözlükten alır (Türkçe çıktı değişmedi).

| Alan | Durum |
| :--- | :--- |
| Footer (58 anahtar) | ✅ en/ru/ar |
| Ana sayfa (karşılaştırma, personel, bento, SSS, hero, header, rozetler) | ✅ en/ru/ar |
| Hakkımızda, İletişim (form, doğrulama mesajları, SSS), Teklif Al (meta dahil) | ✅ en/ru/ar |
| Hizmetler hub'ı (hero, katalog, sihirbaz, paket/karşılaştırma, CTA) | ✅ en/ru/ar |
| 30 statik sayfanın `<title>`/description'ı (`src/i18n/pageMeta.ts`, `buildMetadata` entegrasyonu) | ✅ en/ru/ar |
| Hizmet detay sayfaları, hesaplayıcı, SSS, sözlük, bölgeler, blog, referanslar, kurumsal | ⏳ Türkçe |

- **Doğrulanamayan içerik çevrilmedi, Türkçe dışındaki dillerde gizlendi:** Yargıtay karar alıntıları/dava numaraları (KMK asistanı), ilçe aidat endeksi, "AI grounding" blokları, otorite hub'ı, hukuki güvence bölümü, video hub'ı, kurumsal AI kartı.
- Link hatası: 4 yardımcı yalnızca `en` için `/en` öneki üretiyordu; ru/ar kullanıcıları Türkçe sayfaya gidiyordu. Tüm diller için düzeltildi.
- Çeviri kalitesi: ru ve ar metinleri ana dili o olan biri tarafından **gözden geçirilmedi**. Sayfalar `TRANSLATED_PATHS`'e eklenmediği için hâlâ noindex.

---

## 🔎 Bulgular — Sahibinin Kararı / Verisi Gereken Konular
1. **Ekip üyeleri:** Hakkımızda'daki "Ahmet Yılmaz" / "Elif Kaya" ve stok fotoğraflar yer tutucu görünüyor (sözlükteki isimler farklı: Oğuzhan Kaya, Selin Yılmaz, Av. Mehmet Demir). Ana sayfa yorumcu adları da yer tutucu görünüyor.
2. **Çelişen rakamlar:** Acil müdahale süresi sitede 15 / 20 / 30 / 45 dk olarak geçiyor. Yönetilen tesis sayısı 120+ / 150+ / 200+ / 340+ / 400+ / 1094 olarak geçiyor. Aidat tahsilat oranı %98 / %98.7 / %99 / %99.2.
3. **Doğrulanamayan iddialar:** "%22 tasarruf", "142M+ bütçe denetimi", "%0 reaktif ceza garantisi", "45.000+ bağımsız bölüm", "1.200+ personel". Gerçek veriyle değiştirilmeli.
4. **Türkçe meta metinlerinde kalan iddialar:** Bazı Türkçe `<title>`/description'larda hâlâ "ISO 41001", "TSE 13811", "%99 tahsilat garantili" geçiyor (çeviri metinlerinden bilinçli olarak çıkarıldı; Türkçe kaynak sonraki turda hizalanmalı).
5. **Gerçek referanslar ve GSC verisi:** AggregateRating/Review şemaları ve `/bolgeler/` sayfalarının farklılaştırılması için gerçek yorum/puan ve Search Console dışa aktarımı bekleniyor.

## 🧪 Doğrulama
- `npx tsc --noEmit`: sıfır hata.
- Vitest: 128 dosya / 1142 test geçti (başlangıç: 1143; silinen ölü bileşen testleri ve sözlük tabanlı hale getirilen testler nedeniyle güncellendi).
- Docker (`web`, 3001) ve dev server (3002) üzerinde `/en`, `/ru`, `/ar` sayfaları taranarak kalan Türkçe metin ölçüldü; ana sayfa, Hakkımızda, İletişim, Teklif Al ve Hizmetler'de yalnızca marka/yer adları kaldı.

## 🛠️ Sunucuya Alma Adımları
```bash
git pull
docker compose --env-file .env -f docker/docker-compose.yml up -d --build
```
- Canlı admin şifresini değiştirin (Bölüm 5).
- `docker/entrypoint` içinde `prisma db push --accept-data-loss` çalışıyor; uzun vadede `prisma migrate deploy` önerilir.

## ➡️ Sonraki Adımlar
1. Hizmet detay sayfalarının (site/tesis yönetimi ve alt sayfaları, güvenlik, temizlik, teknik bakım, aidat, peyzaj, havuz, hukuk, haşere) en/ru/ar çevirisi.
2. Hesaplayıcı, SSS, sözlük, bölgeler, blog listesi, referanslar ve kurumsal sayfaların çevirisi.
3. Çevirisi tamamlanıp ana dil gözden geçirmesi yapılan sayfaların `TRANSLATED_PATHS`'e eklenmesi.
4. Türkçe meta ve sayfa metinlerinde kalan doğrulanamayan iddiaların gerçek veriyle hizalanması.
5. Ekip üyesi ve yorumcu kayıtlarının gerçek verilerle güncellenmesi.
