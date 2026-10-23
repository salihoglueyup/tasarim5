# Deploy kontrol listesi — Ekim 2026 paketleri

Kapsam: `v2026.10-icerik-temizligi` ve `v2026.10b-yerel-icerik-mobil-semrush` etiketlerindeki değişiklikler.
Not: Semrush ve GSC raporlarının bir kısmı eski prod sürümünü gösteriyor; aşağıdaki adımlar tamamlanmadan o raporlar değişmez.

## 0. Önce (yerelde)
- [ ] `npx tsc --noEmit` temiz
- [ ] `npx vitest run` tamamı geçiyor (151 dosya, 1090+ test)
- [ ] `npx next build --webpack` hatasız (bkz. aşağıdaki "Build sonucu")
- [ ] `git status` temiz (takipsiz kişisel dosyalar hariç) ve `main` iki remote'ta aynı commit'te

## 1. Yedek
- [ ] Prod PostgreSQL yedeği (`pg_dump`) alın; SQL adımından önce zorunlu.
- [ ] Mevcut prod sürümünü (commit/etiket) not edin; geri dönüş için.

## 2. Kodu yayına alma
- [ ] Sunucuda (`/home/halil/aloyonetim`) `git pull` (veya sizin pipeline'ınız) ardından `npm ci` ve `npx next build --webpack`
- [ ] Uygulamayı yeniden başlatın (PM2/Docker; sizin kurulumunuza göre) ve ilk açılışta `/`, `/blog`, `/sitemap.xml` yanıtlarını kontrol edin

## 3. Veritabanı
- [ ] `prisma/data/claims-cleanup-2026-10.sql` dosyası **gitignore'da**; sunucuya elle kopyalayıp çalıştırın (yedekten sonra).
  - Etkisi: "7/24" ifadeleri, uydurma KPI etiketleri, sahte referans/iş ortağı kayıtları ve kaldırılan şablon blog yazıları temizlenir.
  - `Reference` ve `Partner` tablolarını boşaltır; gerçek liste kodda (`src/data/realReferences.ts`).
- [ ] Blog yazılarının DB ile eşitlenmesi gerekiyorsa seed: `npx tsx prisma/seed.ts` (DATABASE_URL gerekir). Not: sitemap ve `/blog` listesi artık DB'de olmayan statik yazıları da gösterir; seed zorunlu değil ama DB içeriği statik içerikle farklıysa tek tek yazı sayfası DB'deki eski metni gösterebilir, bu yüzden seed önerilir.
- [ ] Yazı içeriğinde eski bağlantı taraması (SQL örneği):
  ```sql
  SELECT slug FROM "Post" WHERE content ILIKE '%/hizmetler/yonetim-danismanligi%' OR content ILIKE '%/hizmetler/havuz-bakimi%' OR content ILIKE '%212%';
  ```
- [ ] Redis blog listesi önbelleğini temizleyin (`blog_list_posts_v2` ve blog sayfası anahtarları) ya da süresinin dolmasını bekleyin.

## 4. Doğrulama (yayından sonra)
- [ ] `https://aloyonetim.com.tr/sitemap.xml`: yaklaşık 1100 URL, ilçe rehberleri ve yeni yazılar dahil
- [ ] `https://aloyonetim.com.tr/robots.txt`: `Content-Signal`, `Agentmap`, `Host` satırları yok; `Sitemap:` satırları var
- [ ] Örnek sayfalar: `/hakkimizda` başlığı "2009 yılından beri…", `/blog/apsiyondan-aidat-odeme-ve-borc-goruntuleme-sakin-rehberi` (4 dil), `/guvenlik-akademisi`
- [ ] Mobilde (gerçek telefon): hero tam ekran ve beyaz bar yok, çerez bannerı ile sohbet butonu çakışmıyor, "uygulamayı indir" istemi çıkmıyor
- [ ] Google Rich Results Test: ana sayfa, bir ilçe hizmet sayfası, `/hesaplayici`

## 5. Arama motorları ve denetim araçları
- [ ] GSC: sitemap'i yeniden gönderin (`sitemap-index.xml` ve `sitemap.xml`)
- [ ] GSC: yeni rehber URL'leri için "URL Denetimi → Dizine eklenmesini iste" (en önemli 5–10 URL)
- [ ] Semrush Site Audit: yeni tarama başlatın; sonuçta şu sorunlar azalmalı: yapılandırılmış veri (adres/geo/puan), başlık uzunluğu, kalıcı yönlendirmeler
- [ ] 2–3 hafta sonra GSC haftalık raporunu (Sayfalar + Sorgular, tarih aralığıyla) karşılaştırın

## 6. Hâlâ sizden beklenenler
- Semrush detay alanları: Course (2 alan), Carousel (1 alan), 2 hreflang çatışması, sitemap format hatası, kırık dahili görsel, 90 kırık dış link listesi
- Avukat kontrolü: `docs/hukuk-kontrol-listesi-2026-10.md` (özellikle işletme projesi itiraz süresi)
- RU/AR çevirilerin ana dil konuşuru tarafından okunması
- `/app` sayfasının görünen metni için hangi ifadelerin doğru olduğu (taksit, BDDK, SSL, "ücretsiz")
- Şirket şemasındaki `numberOfEmployees` (şimdilik 90, değiştirilmedi)

## Build sonucu (2026-10-23)
`npx next build --webpack` hatasız tamamlandı (çıkış kodu 0) — 17 commit'lik pakete ek olarak `main` son durumu (changelog/etiket commit'i dahil).
