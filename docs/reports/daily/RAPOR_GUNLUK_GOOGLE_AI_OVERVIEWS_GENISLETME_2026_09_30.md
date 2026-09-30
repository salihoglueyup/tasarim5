# GÜNLÜK GELİŞTİRME RAPORU — GOOGLE AI OVERVIEWS KAPSAMA GENİŞLETME (2026-09-30)

Önceki rapor: [RAPOR_GUNLUK_GOOGLE_AI_OVERVIEWS_2026_09_30.md](RAPOR_GUNLUK_GOOGLE_AI_OVERVIEWS_2026_09_30.md).
Bağlam: Önceki raporda altyapı (şema, crawlability, tekrar) düzeltildikten sonra kullanıcı "artık geliştirmelere başlayalım" dedi. Üç yön belirlendi (kapsama alanı genişletme, soru havuzu büyütme, yeni konu başlıkları) ve "hepsi" onaylandı. Bu tur, hizmetler sayfaları tarafını tamamladı; bölgeler ve blog için sonraki bir tura bırakıldı.

## Yapılanlar

1. **Kapsama tarama** (arka planda ajan, kod değişikliği yok): Hizmetler (16 sayfa), bölgeler (~160 render edilen sayfa), blog (8 route) ve SSS'nin AI-overview bileşeni kapsamı çıkarıldı. Sonuç: `GoogleAiOverviewGroundingSeo` yalnızca 2/16 hizmet sayfasında; `acik-veri` sayfasında hiç AI-overview bileşeni yok; blog hub/etiket/kategori/yazar listeleme sayfalarında hiç yok; SSS zaten tam kapsanmış.

2. **Bölgeler tarafı incelendi, YANLIŞ ALARM olduğu anlaşıldı**: İlk taramada `[ilce]`, `[ilce]/[hizmet]`, `mahalleler/[mahalle]` sayfalarının `ai-overviews/` klasöründen "sıfır" bileşen kullandığı görüldü. Detaylı incelemede bu sayfaların aslında paralel bir `src/components/seo/district/` klasöründeki kendi özel bileşenlerini (`DistrictAiOverviewSnippetSeo`, `DistrictServiceAiOverviewSnippetSeo`, `NeighborhoodAiOverviewSnippetSeo`) kullandığı, yani ~160 sayfanın zaten kapsandığı ortaya çıktı. Buraya `ai-overviews/` bileşeni eklemek bir önceki turda (D maddesi) düzeltilen tekrar sorununu yeniden yaratırdı — **eklenmedi**.

3. **Bonus bug bulundu ve düzeltildi** (`87f5a217`): `district/` klasörünü incelerken, önceki Perplexity→Claude rebrand taramasının kaçırdığı bir desen bulundu — 6 dosyada buton **"Perplexity" yazıyordu ama href zaten `claude.ai`'a gidiyordu** (etiket-hedef uyumsuzluğu): `DistrictAiOverviewSnippetSeo`, `NeighborhoodAiOverviewSnippetSeo`, `ArticleAiOverviewCard`, `FaqAiOverviewHubSeo`, `QuoteAiOverviewCardSeo`, `TermAiOverviewCard`. Etiketler "Claude" olarak düzeltildi. Ayrıca `ArticleAiOverviewCard.tsx`'te unutulmuş bir teal hex renk (#0D9488) site paletine (slate) çevrildi.

4. **Hizmetler kapsaması genişletildi** (`bdd2b71b`): `GoogleAiOverviewGroundingSeo`, eksik 12 sayfaya her sayfanın temasına uygun `filterIds` seçimiyle eklendi (aidat-takibi, guvenlik-yonetimi, hasere-ve-dezenfeksiyon, havuz-bakimi-ve-hijyen, hukuk-ve-icra-danismanligi, peyzaj-ve-bahce-bakimi, teknik-bakim, temizlik-ve-hijyen, ve tesis-yonetimi altında plaza/rezidans/sanayi/toplu-konut). Kapsama 2/16 → 14/16'ya çıktı.

5. **Soru havuzu büyütüldü**: `GoogleAiOverviewGroundingSeo`'nun `GEO_PROMPTS` dizisine, önceden hiç kapsanmayan 4 yeni konu eklendi (12 → 16 soru): ortak alan temizlik/hijyen sorumluluğu (KMK m.35 & 38), ağaç kesim/budama izni (2872 Sayılı Çevre Kanunu), sanayi tesislerinde OSGB/İSG zorunluluğu (6331 Sayılı Kanun), aidat icra takibinde haciz süreci (KMK m.37 & İİK m.68, 83). Yeni maddelerde emin olunmayan Yargıtay esas/karar numaraları uydurulmadı — yalnızca doğrulanabilir kanun/madde referansları kullanıldı.

6. **`acik-veri` sayfasına özel içerik**: Bu sayfa hukuki bir hizmet sayfası değil, geliştirici/RAG odaklı bir API portalı olduğundan `GEO_PROMPTS` havuzuna zorlanmadı; kendi temasına uygun özel bir `PositionZeroAnswerBox` eklendi. İlk taslakta lisansı yanlışlıkla "CC BY-SA" yazmıştım — sayfanın kendi içeriğini kontrol edip gerçek lisansın **ODC-BY** (Open Data Commons Attribution) olduğunu görüp düzelttim.

7. **Doğrulama**: Tüm `filterIds` değerleri bir script ile `GEO_PROMPTS` id'lerine karşı programatik olarak doğrulandı (16/16 geçerli, yazım hatası yok). Her commit'te `tsc --noEmit` temiz, `vitest run` 132 dosya / 1138 test yeşil, `next build --webpack` başarılı. Standalone build üzerinden 5 sayfa (teknik-bakim, guvenlik-yonetimi, peyzaj, sanayi-tesisi, acik-veri) gerçek HTML çıktısında yeni içeriğin varlığı `curl`/`find` ile doğrulandı.

## Kalanlar

- **Bölgeler soru havuzu derinliği**: Her `[ilce]`/`[hizmet]`/`mahalle` sayfasında yalnızca 1 soru-cevap var. Bunu 40 ilçe × birden fazla sayfa tipi için büyütmek ayrı, büyük bir iş — bu turda yapılmadı.
- **Blog kapsaması**: Blog hub, etiket, kategori, yazar listeleme sayfalarında hâlâ hiç AI-overview bileşeni yok.
- **Yeni konu başlıkları (madde 3)**: Kullanıcının istediği üçüncü yön ("henüz hiç kapsanmayan alanlar için sıfırdan yeni bileşenler") bu turda ayrıca ele alınmadı — mevcut `GoogleAiOverviewGroundingSeo` havuzuna 4 yeni konu eklenmesi kısmen bu ihtiyacı karşıladı, ama tam anlamıyla "yeni bileşen" değil.
- Önceki raporun kalanları (React #418 hydration hatası, Redis/Postgres şifre rotasyonu) hâlâ açık.
