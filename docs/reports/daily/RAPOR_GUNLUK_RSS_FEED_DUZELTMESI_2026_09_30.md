# GÜNLÜK GELİŞTİRME RAPORU — DEPLOY, GSC İNDEKSLEME VE RSS FEED DÜZELTMESİ (2026-09-30)

Önceki rapor: [RAPOR_GUNLUK_GOOGLE_AI_OVERVIEWS_GENISLETME_2026_09_30.md](RAPOR_GUNLUK_GOOGLE_AI_OVERVIEWS_GENISLETME_2026_09_30.md).
Bağlam: Kullanıcı bugünkü değişiklikleri sunucuda başlattıktan sonra Google Search Console indeksleme sürecini sordu; bu sırada sitemap zincirini ve RSS/Atom feed'lerini birlikte kontrol ederken gerçek bir bug bulundu.

## Yapılanlar

1. **Sunucu güncelleme komutu netleştirildi**: `make` komutu sunucuda kurulu değildi ve zaten proje kökünde bir `Makefile` hiç yoktu (git'te tracked değil) — `docs/dev/DEPLOYMENT.md`'nin belgelediği uzun hali kullanıcıya verildi: `docker compose -f docker/docker-compose.yml --env-file .env up -d --build`.
2. **Google indeksleme süreci açıklandı**: Sitenin `/api/seo/ping-all` endpoint'i yalnızca IndexNow protokolünü destekleyen motorlara (Bing, Yandex, Seznam, Naver) bildirim gönderiyor — **Google IndexNow'u desteklemiyor**. Google için gerçek yol GSC panelinden `sitemap-index.xml`'in bir kez kayıtlı olması (tekil sayfalar için "Dizine Eklenmesini İste" opsiyonel/manuel) olarak netleştirildi, yanlış beklenti oluşmadan önce düzeltildi.
3. **Sitemap zinciri canlıda doğrulandı**: `robots.txt` → `sitemap-index.xml` → `sitemap.xml` zincirinin doğru bağlı olduğu ve bugün değiştirilen sayfaların (`teknik-bakim`, `acik-veri`, `aidat-takibi` vb.) `sitemap.xml` içinde göründüğü canlı ortamda `fetch` ile doğrulandı.
4. **`rss.xml` ve `feed.xml` birlikte incelendi, gerçek bir bug bulundu ve düzeltildi** (`3c0eec9f`): `feed.xml` (Atom) sorunsuzdu. `rss.xml` ise **geçersiz XML üretiyordu** — Unsplash görsel URL'lerindeki query string'ler (`?q=80&w=1200&auto=format&fit=crop`) `<enclosure url="...">` özniteliğine hiç kaçırılmadan basılıyordu. Canlı feed tarayıcının `DOMParser`'ıyla test edildiğinde `parsererror` döndü (121 kaçırılmamış `&`). Bu, feed'i tüketen RSS okuyucularının ve bazı arama motoru/agregatör araçlarının **feed'i tamamen reddetmesine** yol açabilecek ciddi bir hataydı — sadece kozmetik değil, fonksiyonel bir kırılmaydı.
5. **Düzeltme**: `escapeXmlAttr()` yardımcı fonksiyonu eklendi; `link`, `guid`, `author`, `enclosure url` alanlarına uygulandı (title/description/category zaten `CDATA` içinde olduğundan etkilenmiyordu, dokunulmadı). `/api/tesis-yonetimi/feed.xml`'de aynı `enclosure` deseni var ama sabit (query-string'siz) bir görsel yolu kullandığından bu bug'dan etkilenmiyor — kontrol edildi, dokunulmadı.
6. **Doğrulama**: `tsc --noEmit` temiz, ilgili test dosyası (`gscZeroError.test.ts`, 191 test) yeşil, prod build + standalone server üzerinden gerçek `DOMParser` ile test edildi: `valid: true`, 40/40 item hatasız parse ediliyor.

## Kalanlar

- Önceki raporların kalanları (React #418 hydration hatası, Redis/Postgres şifre rotasyonu, blog/bölgeler AI-overview kapsaması) hâlâ açık.
- Kullanıcının sunucuda `docker compose up -d --build` komutunu çalıştırıp çalıştırmadığı (bu rapor sırasında) teyit edilmedi — bir sonraki turda sunucunun bugünkü tüm commit'leri (Google AI Overviews genişletmesi + rss.xml düzeltmesi dahil) yansıttığından emin olunmalı.
