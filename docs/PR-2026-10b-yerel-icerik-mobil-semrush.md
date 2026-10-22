# PR taslağı: Yerel içerik, Apsiyon, mobil, GSC ve Semrush düzeltmeleri (Ekim 2026, 2. paket)

## Özet
`v2026.10-icerik-temizligi` sonrası 17 commit. Ayrıntılı tablo: `docs/CHANGELOG-2026-10b.md`.

## Neler değişti
- 9 yeni özgün rehber (6 ilçe + 3 yerel güvenlik/asansör) ve Apsiyon sakin rehberi, hepsi en/ru/ar; ilçe hizmet sayfalarında mahalle tablosu ve yerel SSS.
- Apsiyon ile aidat bölümü (4 dil) ve yalnızca doğrulanan kapsamın yazılması.
- Doğrulanamayan iddia temizliği: hizmet şablonu, Güvenlik Akademisi, şema metinleri.
- Mobil: hero, yatay taşma, çerez/sohbet çakışması, küçük yazı, dokunma alanları, sayfalama; siteye ait PWA istemi kaldırıldı.
- Sitemap hata düzeltmesi: DB'de olmayan statik yazılar artık sitemap ve `/blog` listesinde.
- Semrush: başlık uzunluğu, yönlendirilen iç bağlantılar, yapılandırılmış veri (adres, geo, puan zorunluluğu), `robots.txt` satırları.

## Test planı
- [x] `npx tsc --noEmit`
- [x] `npx vitest run` (151 dosya, 1090 test)
- [x] Yerelde 1339 URL taraması: hreflang çatışması, canonical, JSON-LD geçerliliği
- [x] Dev sunucuda 4 dil sayfa kontrolleri, mobil taşma ölçümü (360/390 px)
- [ ] Production build ve deploy sonrası Semrush yeniden taraması
- [ ] GSC'de sitemap yeniden gönderimi
- [ ] Avukat kontrolü (`docs/hukuk-kontrol-listesi-2026-10.md`)

## Riskler
- Başlık uzunluğu sınırı, 70 karakteri aşan başlıklarda marka ekini kaldırır; SERP başlıklarında kısa süreli değişim görülebilir.
- `robots.txt`'ten standart dışı direktifler çıktı; Google davranışı değişmez, ama AI tarayıcı sinyalleri artık dosyada yok.
- Güvenlik Akademisi sayfası bilerek sadeleştirildi (sınav takvimi, ücret, kurs paketleri çıktı).
