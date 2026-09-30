# GÜNLÜK GELİŞTİRME RAPORU — GOOGLE AI OVERVIEWS / GEO ALTYAPI DÜZELTMELERİ (2026-09-30)

Önceki rapor: [RAPOR_GUNLUK_TEKLIF_FORMLARI_2026_09_30.md](RAPOR_GUNLUK_TEKLIF_FORMLARI_2026_09_30.md).
Bağlam: Kullanıcı "Google AI Overviews kısmına bakalım mı, geliştirilirse daha iyi olabilir" diyerek başlattı. Önce arka planda kapsamlı bir GEO/AI-Overview denetimi yapıldı (32 bileşen, robots.txt, llms.txt/llms-full.txt, test kapsamı), somut bulgular 4 maddede önceliklendirildi ve kullanıcı onayıyla sırayla uygulandı.

## Yapılanlar

1. **Denetim** (kod değişikliği yok, yalnızca bulgu): `src/components/seo/ai-overviews/` altındaki 32 bileşen incelendi.
   - robots.txt zaten mükemmel: GPTBot, ClaudeBot, PerplexityBot, Google-Extended dahil tüm önemli AI botlar izinli — dokunulmadı.
   - llms.txt/llms-full.txt içerik olarak dolu, stub değil.
   - 3 bileşen (`PositionZeroAnswerBox`, `LegalFactCheckAiSeo`, `SiteAiSearchGroundingSeo`) hiç JSON-LD içermiyordu; birkaçı (`GoogleAiOverviewGroundingSeo`, `FactCheckAiGroundingSeo`) yanlış tip (WebPage yerine FAQPage/ClaimReview gerekirken) kullanıyordu.
   - Kritik bulgu: Sekme/genişletme tabanlı bileşenler yalnızca **aktif** öğeyi DOM'a basıyordu — geri kalan soru-cevaplar yalnızca client-side JS state'inde duruyordu, JS çalıştırmayan AI botları (GPTBot, ClaudeBot, PerplexityBot çoğu) bunları hiç göremiyordu.
   - 6 yüzeyde aynı hukuki gerçeklerin (KMK 20/1-c asansör muafiyeti, KMK 20/2 %5 gecikme tazminatı, KMK 37 7 gün itiraz süresi) neredeyse birebir tekrarlandığı tespit edildi.
   - Hiçbir mevcut test şema *tipini* doğrulamıyordu (yalnız içerik/uzunluk kontrolü).

2. **Şema düzeltmeleri (`a64a65b7`)**: `PositionZeroAnswerBox` (14 sayfada kullanılıyor) FAQPage şeması kazandı. `GoogleAiOverviewGroundingSeo` ve `FactCheckAiGroundingSeo` doğru tipe (FAQPage / ClaimReview) geçirildi. `LegalFactCheckAiSeo` ve `SiteAiSearchGroundingSeo`'ya sıfırdan şema eklendi.

3. **Crawlability düzeltmesi (aynı commit)**: `GoogleAiOverviewGroundingSeo`, `SiteAiSearchGroundingSeo` ve `LegalFactCheckAiSeo`'daki tab/tek-kart ve `{isExpanded && (...)}` unmount deseni, native `<details>/<summary>` accordion veya CSS `grid-template-rows` daraltma (mevcut IletisimClient FAQ akordeonuyla aynı desen) ile değiştirildi. Artık tüm soru-cevaplar her zaman DOM'da, yalnızca görsel olarak daraltılmış — Google 2019'dan beri bu tür içeriği tam değerde indexliyor, ceza yok.

4. **Guard test (`f5f1108b`)**: `aiOverviewSchemaGuard.test.ts` eklendi — her ai-overview bileşeninin en az bir `@type` şeması yayınladığını, Q&A şeklinde içerik render edenlerin FAQPage/QAPage/ClaimReview/HowTo kullandığını doğruluyor. İlk çalıştırmada gerçek bir eksik daha yakaladı: `CareerAiOverviewSeo.tsx` da aynı yanlış-tip hatasını taşıyordu, düzeltildi.

5. **İçerik ayrıştırma (`eebc57df`)**: Kullanıcı seçimiyle (kanonik sayfa yerine metinleri ayrıştırma) 6 yüzeydeki (`FactCheckAiGroundingSeo`, `LegalFactCheckAiSeo`, `GoogleAiOverviewGroundingSeo`, `InstantAnswerCardSeo`, `llms.txt`, `llms-full.txt`) 3 tekrarlanan hukuki gerçek, madde numaraları/oranlar/içtihatlar birebir korunarak gerçekten farklı anlatım açılarıyla yeniden yazıldı (Yargıtay gerekçesi / kural-istisna çerçevesi / hesaplama mekaniği / pratik kontrol noktası gibi).

6. **Test durumu**: Her commit'te `tsc --noEmit` temiz, `vitest run` son durumda 132 dosya / 1138 test yeşil, `next build --webpack` başarılı. Tarayıcı doğrulamaları standalone build üzerinden yapıldı: accordion tıklamayla açılıp kapanıyor, şema JSON-LD'de gerçekten mevcut (`curl` ile HTML'de tüm gizli soru-cevapların tam metni doğrulandı), konsol hatasız.

## Kalanlar

- **Kapsam dışı bırakılan (kullanıcı seçimiyle)**: Kanonik referans sayfası + link mimarisi yaklaşımı seçilmedi; içerik metinleri ayrıştırma yolu tercih edildi.
- **`CalculatorLeadForm` gibi küçük widget'larda hâlâ eski desenler olabilir** — bu tur yalnızca `ai-overviews/` dizinine odaklandı, site genelinde başka tab/unmount deseni taşıyan (AI-overview dışı) bileşen olup olmadığı taranmadı.
- **React #418 hydration hatası hâlâ açık** (önceki raporlarda not edildi, bu turda da spot-check'te tekrar gözlemlendi, kök sebep araştırılmadı).
- **İçerik genişletme henüz başlamadı**: Kullanıcı erken bir aşamada "burası [AI Overviews] çok genişletilecek" demişti — bu turda yalnızca *mevcut* içeriğin teknik altyapısı (şema, crawlability, tekrar) düzeltildi, yeni konu/soru eklenmedi. Sıradaki adım olarak gündemde.
