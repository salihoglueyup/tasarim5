# Değişiklik Günlüğü — Ekim 2026 (2. paket: yerel içerik, Apsiyon, mobil, GSC ve Semrush düzeltmeleri)

Kapsam: `v2026.10-icerik-temizligi` etiketinden sonra yapılan 17 commit (`b1b782c7` … `72b1d29c`). Hepsi `origin/main` ve `alogroup/main` üzerinde.
İlke aynı: doğrulanamayan iddia yok, yalnızca işletmeden teyit edilen kapsam yazılır; yasal ifadeler güncel mevzuat ve avukat teyidine bağlanır.
Not: aynı aralıkta başka oturumlardan gelen commit'ler (GEO, agent keşfi, referanslar, ERP köprüsü vb.) bu listeye dahil değildir.

## 1. Yerel içerik

| Commit | Ne yapıldı |
|---|---|
| `b1b782c7` | 6 yeni ilçe rehberi (Pendik, Esenyurt, Küçükçekmece, Kâğıthane, Bahçelievler, Çekmeköy), en/ru/ar çevirileriyle; rehber sayısı 12 → 18. |
| `97c9a0c5` | Site, apartman ve tesis yönetimi hizmet sayfalarına rehberden türetilen mahalle tablosu, 2 senaryo ve yerel SSS (FAQPage şemasına da eklendi). |
| `5da5de30` | GSC yerel sorguları için 3 rehber: Bakırköy asansör bakımı, Pendik site güvenliği, Acarkent/Beykoz güvenlik; 4 dilde; ilgili hizmet sayfalarına "yerel rehber" bağlantısı. |
| `e39c746a` | GSC raporuna göre ÖGG "özel kimlik" başlığı/SSS'i ve TOKİ/toplu konut sayfa başlığı. |

## 2. Apsiyon ve aidat

| Commit | Ne yapıldı |
|---|---|
| `99105713` | "Apsiyon ile aidat" bölümü (4 dil): online kartla ödeme, borç/ödeme geçmişi, duyuru-talep, hatırlatma, gelir-gider görünürlüğü. Özellik kartları ve SSS aynı kapsama göre hizalandı; taksit, 3D Secure vurgusu, "canlı banka bakiyesi" gibi ifadeler çıkarıldı. |
| `a108e2b2` | "Apsiyon'dan aidatımı nasıl öderim, borcumu nasıl görürüm?" sakin rehberi (4 dil); işletme projesine itiraz süresiyle ilgili "kesin 7 gün" ifadeleri 7579 sonrası kurala göre yumuşatıldı. |
| `ba9e8a3c` | İlçe hizmet şablonu ve hizmet verisindeki doğrulanamayan iddialar temizlendi (bakanlık/valilik onayı, "tam uyumlu", AI kamera, GPS/QR devriye, TSE 13811, garantili ilaçlama vb.); koruma testi eklendi. |

## 3. Mobil ve arayüz

| Commit | Ne yapıldı |
|---|---|
| `0350f28e` | Hero'daki beyaz bar kaldırıldı; `h-svh`; mobil poster/video odağı ve video yükleme koşulu; "En Prestijli" üstünlük iddiaları nötrleştirildi; yatay taşma güvenlik ağı (`overflow-x: clip`); çerez bannerı sohbet butonunun üstünde. Üç kırık test onarıldı. |
| `24afa8aa` | Siteye ait PWA yükleme istemi kaldırıldı (gerçek sakin uygulaması Apsiyon); 10px yazılar mobilde 11px; footer ve kart bağlantılarının dokunma alanı büyütüldü. |
| `be19b076` | Sayfalama butonları 44px, pencereli sayfa listesi, taşma önleme. |

## 4. Sitemap, SEO ve Semrush

| Commit | Ne yapıldı |
|---|---|
| `bf21b835` | **Hata düzeltmesi:** DB doluyken statik yazılar (18 ilçe rehberi, 7579 yazısı, yeni rehberler) sitemap ve `/blog` listesinden düşüyordu; artık birleştiriliyor (61/61 yazı, 1106 URL, 0 tekrar). |
| `d758574d` | Başlık uzunluğu sınırı (marka eki 70 karakteri aşıyorsa kaldırılır); yönlendirilen iç bağlantılar (yazar takma adı, emekli slug'lar) düzeltildi. |
| `9c87f895` | Yapılandırılmış veri: LocalBusiness alt türlerine adres/telefon, Organization'dan `geo`, puan zorunluluğu getiren uygulama şemaları `CreativeWork`'e. |
| `ad6f0290` | Kalan Corporation `geo`'ları; ScholarlyArticle'a görsel/tarih; yayıncı adı gerçek unvana çevrildi. |
| `a7596cf8` | `robots.txt`'ten `Content-Signal`, `Agentmap`, `Host` satırları kaldırıldı; `/app` MobileApplication şemaları `WebPage`'e çevrildi. |

## 5. Güvenlik Akademisi ve takip

| Commit | Ne yapıldı |
|---|---|
| `72b1d29c` | `/guvenlik-akademisi`: geçmiş/doğrulanamayan sınav tarihleri, ücret-harç dökümü, saat/atış sayıları, kurs paketleri, baraj puanı/sınav hakkı gibi SSS ayrıntıları ve Course şemaları kaldırıldı; AI özet cevabı temkinli ifadeye çevrildi. |
| `6f40abed` | `docs/ai-takip-tablosu.html` (Google AI görünürlük takip tablosu) ve Apsiyon sorguları; sonrasında 39 sorguya çıktı. |

## 6. Test ve koruma

- `sourceHonesty.test.ts`: ilçe hizmet şablonu ve `services.ts` için yasaklı kalıp koruması.
- `blogI18n.test.ts`: çevrilmiş rehber sayısı 18; çeviri belleği 2387/2387 (61/61 yazı).
- Tam test paketi: 151 dosya, 1090 test geçiyor.

## 7. Bekleyen işler (kod dışı)

1. **Deploy:** Semrush raporu (27 Ağustos / 3 Eylül) eski sürümü gösteriyor; yeni sürüm yayına alınmadan sonuçlar değişmez. Deploy sonrası Semrush'ta yeniden tarama başlatın.
2. **Prod veritabanı:** `prisma/data/claims-cleanup-2026-10.sql` (gitignore'da; elle kopyalanmalı) ve yazı içeriğindeki eski bağlantılar için `ILIKE` taraması.
3. **GSC:** sitemap'i yeniden gönderin; 2–3 hafta sonra haftalık raporu karşılaştırın (Sayfalar sekmesi ve tarih aralığıyla).
4. **Semrush detayları:** Course (2 alan), Carousel (1 alan), 2 hreflang çatışması, sitemap format hatası ve kırık dahili görsel için alan adları/URL'ler.
5. **Avukat kontrolü:** `docs/hukuk-kontrol-listesi-2026-10.md`; özellikle işletme projesi itiraz süresi (7579 sonrası).
6. **Çalışan sayısı:** şemada `numberOfEmployees: 90`; kesin teyit sonrası güncellenecek.
7. **RU/AR çeviriler:** ana dil konuşuru tarafından gözden geçirilmeli.
8. **`/app` sayfasının görünen metni:** taksit, BDDK, SSL, "ücretsiz" gibi doğrulanmamış ifadeler duruyor (yalnızca şemalar temizlendi).
9. Takipsiz dosya `Alo_Grup_Kurumsal_Portfoy_TASLAK_v1.pdf` bilerek hiçbir commit'e alınmadı.
