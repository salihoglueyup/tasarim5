# Google AI Overviews / Yapay Zekâ Görünürlüğü Planı (2026-10)

Amaç: Alo Yönetim içeriklerinin Google AI Overviews, AI Mode ve diğer yapay zekâ yanıtlarında kaynak olarak
gösterilme olasılığını artırmak. **Hiçbir yöntem görünürlüğü garanti etmez**; yapılan her şey "doğru, doğrulanabilir
ve kolay alıntılanır içerik" ilkesine dayanır. Uydurma oran, yorum, fiyat ve garanti ifadeleri bilerek kullanılmaz
(bkz. `src/lib/seo/sourceHonesty.test.ts`).

## 1. Neye bakıyor olacağız (ölçüm)

- Search Console → Performans: sorgu bazlı gösterim/tıklama; AI Overviews tıklamaları ayrı raporlanmaz, "web" içinde görünür.
- Elle örnekleme: her ay 30 hedef sorgu (aşağıdaki liste) Google'da (gizli sekme) aranır; AI Overview çıkıyor mu,
  alo yönetim kaynak olarak geçiyor mu, hangi sayfa? Sonuçlar tabloya işlenir.
- Bing Webmaster / Copilot, Perplexity, ChatGPT arama için aynı sorguların elle denenmesi.
- Başarı göstergesi: hedef sorgularda kaynak olarak geçme sayısı (30 sorgudan kaçında), marka aramaları, sayfa başına organik tıklama.

## 2. Hedef sorgu kümeleri (ilk 30)

| Küme | Örnek sorgular | Karşılık gelen sayfa |
|---|---|---|
| Aidat/bütçe | aidat artış sınırı 2026, işletme projesi nedir, geçici işletme projesi | `/kmk-2026-degisiklikleri`, blog, sözlük |
| Gecikme/icra | aidat ödenmezse ne olur, aidat icra takibi nasıl yapılır, gecikme tazminatı yüzde kaç | blog, sözlük, SSS |
| Yönetim | site yöneticisi nasıl seçilir, yönetim planı nasıl değişir, toplu yapı 2/3 | SSS, sözlük, blog |
| Güvenlik | 5188 site güvenliği izin, güvenlik görevlisi yetkileri, site kamera kayıtları KVKK | blog, SSS |
| Teknik | asansör etiket renkleri, kazan bakımı ne zaman, jeneratör bakım sıklığı | SSS, sözlük |
| Yerel | Kadıköy/… site yönetimi şirketi, … apartman yönetimi | ilçe rehberleri, `/bolgeler` |

## 3. İçerik standardı (her sayfa için kontrol listesi)

1. **Cevap önce:** sayfanın ilk 1–2 paragrafında soruya 40–70 kelimelik doğrudan, bağımsız okunabilen yanıt.
2. **Net başlıklar:** H2/H3 soru biçiminde ("Aidat artışına yasal sınır var mı?").
3. **Kaynak ve tarih:** mevzuat maddesi (KMK m.20, m.34, m.37, m.70; 7579 sayılı Kanun, RG 33261) + "son güncelleme" tarihi görünür.
4. **Liste/tablo:** adımlar numaralı liste, karşılaştırmalar tablo. Tablolar mobilde taşmamalı.
5. **SSS bloğu:** sayfaya özgü 2–4 soru (şablon permütasyon yok). `FAQPage` şeması yalnızca sayfada görünen sorulardan üretilir.
6. **Sorumluluk notu:** "Genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez."
7. **İç bağlantı kümeleri:** hizmet → rehber → sözlük → SSS; her sayfadan en az 3 ilgili sayfaya bağlantı.
8. **Varlık tutarlılığı:** şirket adı, adres, kuruluş yılı (2009), ilçe sayısı, SLA hedefi (Anadolu 30 dk / Avrupa 1 saat) yalnızca `src/lib/facts.ts` kaynağından.

## 4. Teknik uygulama

- Şema: `Organization`, `WebSite`, `BreadcrumbList`, `Article/BlogPosting` (yazar + tarih), `FAQPage` (görünür SSS), `DefinedTerm` (sözlük),
  `HowTo` (yalnızca gerçekten adım adım yazılmış rehberler). `AggregateOffer`, `Review`, `AggregateRating` **kullanılmaz** (doğrulanmış veri yok).
- `llms.txt` ve `llms-full.txt`: yalnızca doğrulanmış bilgi; her yeni rehber ve SSS bölümü eklendikçe güncellenir
  (`src/lib/seo/llmsContent.ts`, `llmsHonesty.test.ts`).
- Tarama: AI botları için `robots.txt` politikası bilinçli karar olarak yazılı tutulur; sitemap `lastmod` değerleri gerçek güncelleme tarihleridir.
- Sayfa hızı: ağır sayfalar (SSS, blog, sözlük) sayfalanır; LCP öğesi hafif tutulur.
- Çok dillilik: yalnızca gerçekten çevrilmiş sayfalar indekslenir (`indexPolicy.ts`); AI yanıtlarında yanlış dilde içerik sızmasın.

## 5. Uygulama takvimi

| Dönem | İş |
|---|---|
| Hafta 1 | 30 hedef sorgu için başlangıç ölçümü (elle) + mevcut sayfa eşlemesi |
| Hafta 2–3 | Eşleşen 30 sayfada "cevap önce" paragrafı + soru başlıkları + SSS bloğu kontrolü |
| Hafta 4 | Sözlükte kalan terimler için ayrıntı açıklamaları (şu an 25 terim tamam); en/ru/ar için çeviri |
| Hafta 5–6 | İlçe rehberlerini mahalle verisi ve gerçek referanslarla zenginleştirme; rehberlerin en/ru/ar çevirisi |
| Hafta 7 | `llms.txt` güncellemesi, şema doğrulaması (Rich Results Test), iç bağlantı denetimi |
| Her ay | Elle örnekleme + GSC sorgu raporu; kazanılan/kaybedilen sorguların notlanması |

## 6. Yapılmayacaklar

- Doğrulanamayan oran, ödül, müşteri yorumu, fiyat aralığı, "garanti" veya "7/24" ifadesi.
- İlçe × hizmet permütasyonlu şablon yazı/SSS üretimi.
- Hukuki konularda kesin hüküm cümleleri; her hukuki yazıda avukat gözden geçirmesi.
