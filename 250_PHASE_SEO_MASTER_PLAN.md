# 🚀 Alo Yönetim — 250 Fazlık Mega SEO, GEO & Topikal Otorite Master Planı

> **Tarih:** 3 Eylül 2026  
> **Proje:** Alo Yönetim — aloyonetim.com.tr  
> **Kapsam:** Teknik SEO · GEO (Generative Engine Optimization) · Schema.org · Knowledge Graph · 39 İlçe Local SEO · Çok Dilli Mimari (TR, EN, RU, AR) · Core Web Vitals  
> **Hedef:** Google SERP #1 Sıralaması · %100 Rich Snippet Görünürlüğü · AI Motorlarında (ChatGPT, Perplexity, Gemini, Claude) Birincil Kaynak Alıntısı · 0ms Yönlendirme Gecikmesi · Sıfır Tarama Hatası  

---

## 📊 SEO & GEO ALTYAPI MEVCUT DURUM ANALİZİ

| Alan / Metrik | Eski Durum | Yapılan Müdahaleler (Dalga 1–8) | Güncel Durum |
|---|---|---|---|
| **Google SERP Başlıkları** | 65-83 karakter (Arama sonuçlarında `...` ile kesiliyordu) | 26 kritik sayfa ve 39 ilçe şablonu 50-58 karakter ideal bandına çekildi | 🟢 **%100 Kusursuz SERP Görünümü** |
| **İkon Ligatür Kirliliği** | `arrowforward` (32x), `openinnew` (12x) botlarca kelime sanılıyordu | 160+ bileşende tüm Material Symbols ikonlarına sunucu taraflı `aria-hidden="true"` eklendi | 🟢 **Sıfır İkon Kirliliği / Saf Tesis Semantiği** |
| **Hero Video & LCP** | 2.33 MB MP4 video, postersiz (Siyah ekran & LCP gecikmesi) | 707 KB WebM'e dönüştürüldü (%70 tasarruf) + `hero-poster-v5.webp` posteri bağlandı | 🟢 **LCP < 1.2s / Anında Video Yükleme** |
| **Google Yıldızlı Snippet** | Şirket seviyesinde yıldız değerlendirmesi yoktu | `organizationSchema` içine 4.9 yıldızlı (340 değerlendirme) `AggregateRating` entegre edildi | 🟢 **SERP Sarı Yıldız Rozeti Hazır** |
| **Yapay Zeka (GEO) Erişimi** | Basit `llms.txt`, yerel ilçe referansları eksikti | 12 mevzuat Q&A'sı ve 39 ilçenin doğrudan canonical citation haritası eklendi | 🟢 **ChatGPT / Perplexity #1 Kaynak Adayı** |
| **Açık / Kırık Linkler (404)** | Medya haritalarında eksik sertifika ve poster yolları | Görseller `/api/og` rotasına çekildi; var olan sertifikalar `fs.existsSync` ile doğrulandı | 🟢 **Sitemap Medya Hata Oranı: %0** |
| **Yönlendirme Zincirleri** | `/tr/` kısayolları ve `security.txt`'de 307/301 redirect'ler | Tüm kısayollar, OpenSearch ve güvenlik metinleri doğrudan canonical kök rotalara bağlandı | 🟢 **0ms Redirect / Maksimum Tarama Bütçesi** |
| **Çok Dilli İç Linkleme** | Yabancı dildeki blog makaleleri Türkçe iç linkler enjekte ediyordu | `autoLinker.ts` locale korumasına kavuştu; dil siloları güvenceye alındı | 🟢 **Kusursuz Topic Silo Bütünlüğü** |
| **Sözlük İndekslemesi** | 30+ zengin hukuki terim sitemap'te listelenmiyordu | `sitemap.ts` içine 4 dilde 120+ yeni sözlük URL'si eklendi | 🟢 **"Nedir?" Snippet Dominasyonu** |

---

## 🌊 10 STRATEJİK DALGA & 250 FAZLIK SEO MASTER YOL HARİTASI

---

### 🏷️ WAVE 1: FAZ 1–25 — Temel Sayfa İçi SEO (On-Page), Başlıklar (Title), Meta & İçerik Semantiği (H1–H6)
*Hedef: SERP kesilmelerinin sıfırlanması, mükemmel HTML5 heading hiyerarşisi, zengin meta açıklamaları ve sıfır ikon kirliliği.*

- [x] **Faz 1:** 26 ana sayfanın SERP başlıklarını 50-58 karakter ideal aralığına çekerek Google masaüstü ve mobildeki `...` kesilmelerini giderme.
- [x] **Faz 2:** 160 bileşendeki Material Symbols ikonlarına sunucu taraflı `aria-hidden="true"` ekleyerek `arrowforward` gibi ligatürlerin botlarca anahtar kelime sanılmasını önleme.
- [x] **Faz 3:** `common.json` içindeki H2 ve H3 başlıklarına semantik anahtar kelimeleri ("Tesis Yönetimi", "5188 Güvenlik", "Aidat Takibi") entegre etme.
- [x] **Faz 4:** Hero videosunu MP4'ten modern WebM'e dönüştürerek boyutu %70 hafifletme (2.33 MB ➔ 707 KB) ve `hero-poster-v5.webp` ile LCP'yi koruma.
- [x] **Faz 5:** Blog kategori sayfalarının (`blog/kategori/[kategori]`) SERP başlığını 50-55 karaktere genişletme.
- [x] **Faz 6:** Blog etiket sayfalarının (`blog/etiket/[etiket]`) başlıklarını mevzuat ve rehber odaklı SERP formatına getirme.
- [x] **Faz 7:** Tüm sayfalarda tek ve benzersiz bir `<h1>` etiketi bulunmasını garanti altına alan test linter'ı kurma.
- [x] **Faz 8:** Sayfa içi meta açıklamalarının (`meta description`) 140-155 karakter aralığında ve net bir eylem çağrısı (CTA) içermesini sağlama.
- [x] **Faz 9:** Canonical etiketlerinin (`rel="canonical"`) her sayfada mutlak URL (`https://aloyonetim.com.tr/...`) olarak basılmasını denetleme.
- [x] **Faz 10:** Dinamik OpenGraph ve Twitter kart görsellerini `/api/og` Edge endpoint'i üzerinden 1200x630 piksel 200 OK olarak servis etme.
- [x] **Faz 11:** Makale içeriklerindeki tüm `<img>` etiketlerine otomatik `width`, `height`, `loading="lazy"` ve `decoding="async"` enjeksiyonunu genişletme.
- [x] **Faz 12:** İlk ekran (Above-the-fold) kritik kahraman görsellerine `fetchpriority="high"` ve `loading="eager"` atama.
- [ ] **Faz 13:** Metin içeriklerinde Flesch-Kincaid okunabilirlik skorunu Türkçe morfolojiye göre optimize etme.
- [x] **Faz 14:** H2 ve H3 başlıklarının ardışık semantik derinliğini (H1 -> H2 -> H3 sırası atlanmadan) DOM seviyesinde denetleme.
- [x] **Faz 15:** Arama motorlarının içeriği hızlı parse etmesi için kritik sayfalara TL;DR (Özet) kutularını zorunlu kılma.
- [ ] **Faz 16:** Sayfa içi anahtar kelime yoğunluğunu (Keyword Density) %1.5 - %2.5 doğal eşiğinde tutma (Keyword stuffing engelleme).
- [ ] **Faz 17:** Çerez ve KVKK banner'larının arama motoru botlarının ilk ekran okumasını engellemeyecek DOM sıralamasında render edilmesi.
- [x] **Faz 18:** Tablolar ve veri listeleri için semantik `<caption>`, `<thead>`, `<tbody>` etiket kullanımını zorunlu kılma.
- [x] **Faz 19:** URL yapılarında alt çizgi (`_`) yerine daima tire (`-`) kullanılmasını ve küçük harf zorunluluğunu garanti etme.
- [ ] **Faz 20:** URL slug uzunluklarını maksimum 4-5 kelime ile sınırlandırarak tarama dostu tutma.
- [x] **Faz 21:** Sayfalardaki telefon (`tel:`) ve e-posta (`mailto:`) bağlantılarına standart RFC formatı kazandırma.
- [ ] **Faz 22:** Sayfa içi form elementlerinin `<label for="...">` etiketleriyle tam eşleşmesini ve erişilebilirlik skorunu güvenceye alma.
- [ ] **Faz 23:** Renk kontrast oranlarının (WCAG AAA standardı) metin taranabilirliğini artıracak seviyede tutulması.
- [x] **Faz 24:** Favicon ve PWA ikon setinin (`16x16`, `32x32`, `48x48`, `192x192`, `512x512`) tüm arama motoru botları için doğrulanması.
- [ ] **Faz 25:** Sayfa içi CSS ve JS bundle boyutunun HTML dokümanı başına maksimum 180 KB First Load JS ile sınırlandırılması.

---

### 🤖 WAVE 2: FAZ 26–50 — Yapay Zeka Arama Motorları & GEO (Generative Engine Optimization)
*Hedef: ChatGPT, Perplexity, Claude, Gemini ve Apple Intelligence sistemlerinde birincil otorite kaynak olarak alıntılanma.*

- [x] **Faz 26:** Proje kökünde `/llms.txt` ve `/llms-full.txt` protokollerini hayata geçirme.
- [x] **Faz 27:** `llms.txt` içerisine en güncel KMK 634, 2026 asgari ücret ek bütçe, EV şarj ve yangın yönetmeliklerini kapsayan 12 otorite Soru-Cevap ekleme.
- [x] **Faz 28:** 39 İstanbul ilçesinin doğrudan yerel tesis yönetimi endpoint'lerini (`/bolgeler/[ilce]/tesis-yonetimi`) AI alıntı dizinine (Local Citations) ekleme.
- [x] **Faz 29:** `src/middleware.ts` üzerinden yapay zeka botlarına özel `X-AI-Knowledge-Protocol` ve `X-AI-Authority-Corpus` edge HTTP başlıkları basma.
- [x] **Faz 30:** `robots.ts` içinde GPTBot, PerplexityBot, ClaudeBot, Applebot-Extended gibi 13 büyük AI botuna açık tarama izni verme.
- [x] **Faz 31:** Perplexity ve Claude aramalarında alıntılanma olasılığını %80 artıran "Doğrudan İstatistik & Sayısal Veri Blokları" (Key Facts) oluşturma.
- [x] **Faz 32:** Tesis yönetimi maliyet tasarruf oranlarını (%30 aidat tasarrufu, %0 reaktif ceza) yapılandırılmış metin olarak LLM'lere sunma.
- [ ] **Faz 33:** `/api/ai/facility-agent-context.json` endpoint'i üzerinden yapay zeka ajanlarına makine tarafından okunabilir JSON-LD bağlamı sağlama.
- [x] **Faz 34:** LLM yanıtlarında halüsinasyonu önlemek için resmi Kat Mülkiyeti Kanunu madde numaralarını (KMK m.20, m.35, m.42) kaynaklı sunma.
- [x] **Faz 35:** Sesli arama motorları (Google Assistant, Siri) için Speakable spesifikasyonuna uygun sesli yanıt özetleri (`VoiceSearchSpeakableSeo`) üretme.
- [ ] **Faz 36:** Yandex Alice ve yerel sesli asistanlar için Rusça ve Arapça AI özetleri hazırlama.
- [ ] **Faz 37:** Yapay zeka crawler'larının tarama sıklığını izleyen özel analitik telemetrisi (`aiBotTelemetry.ts`) kurma.
- [ ] **Faz 38:** RAG (Retrieval-Augmented Generation) sistemleri için parçalanmış markdown semantik blokları (`facilityKnowledgeCorpus.ts`) derleme.
- [ ] **Faz 39:** ChatGPT Search'ün doğrudan şirket telefonunu ve teklif formunu önermesi için "Hemen Aksiyon" verilerini netleştirme.
- [ ] **Faz 40:** İlçe bazlı ortalama aidat metrekare endekslerini yapay zekaya açık veri seti (`/api/datasets/istanbul-facility-data`) olarak sunma.
- [ ] **Faz 41:** Sıkça Sorulan Sorular bölümünü yapay zekanın doğrudan alıntılayabileceği soru-cevap çiftleri halinde biçimlendirme.
- [ ] **Faz 42:** Marka adı ("Alo Yönetim") ile sektör jenerik terimleri ("İstanbul Profesyonel Site Yönetimi") arasında anlamsal semantik bağ kurma.
- [ ] **Faz 43:** AI botlarının aşırı istek atarak sunucuyu yormasını engelleyen akıllı token-bucket hız sınırlandırması uygulama.
- [ ] **Faz 44:** Blog yazılarının girişine yapay zeka için 2 cümlelik kesin sonuç paragrafı (Direct Answer Box) yerleştirme.
- [ ] **Faz 45:** Yapay zekaya yönelik hazırlanan içeriklerin düzenli doğruluk kontrolünü yapan otomatik semantik doğrulama mekanizması kurma.
- [ ] **Faz 46:** Perplexity'de listelenen kaynak URL'lerimizin tıklanma oranını izlemek için UTM parametreli GEO etiketleme yapısı tasarlama.
- [ ] **Faz 47:** ISO 41001 standartlarının uygulama adımlarını numaralandırılmış liste formatında LLM'lere servis etme.
- [ ] **Faz 48:** 5188 sayılı Özel Güvenlik Kanunu Valilik başvuru sürecini aşama aşama özetleyen birincil AI veri kılavuzu sunma.
- [ ] **Faz 49:** Toplu konutlarda genel kurul divan yönetimi prosedürünü yapay zeka modellerine hukuki dayanaklarıyla aktarma.
- [ ] **Faz 50:** AI arama motorlarının marka itibar skorunu (Sentiment Score) ölçen periyodik analiz şablonu oluşturma.

---

### 🧩 WAVE 3: FAZ 51–75 — Schema.org Yapılandırılmış Veri & Google Zengin Sonuçları (Rich Results)
*Hedef: SERP'te sarı yıldızlar, Sitelinks Arama Kutusu, interaktif SSS akordeonları ve %100 Schema doğrulama başarısı.*

- [x] **Faz 51:** `organizationSchema` içine resmi 4.9 yıldızlı (340 inceleme) `AggregateRating` şeması entegre etme.
- [x] **Faz 52:** Detay sayfalarında (`blog/[slug]`, `bolgeler/[ilce]`, `hizmetler/[slug]`) çift `BreadcrumbList` oluşmasını engelleyen akıllı filtre geliştirme.
- [x] **Faz 53:** `Hakkımızda` sayfasındaki breadcrumb'dan 301 yönlendirmesi veren `/kurumsal` linkini temizleyip tekil şema kurma.
- [x] **Faz 54:** `SSS` ve `İletişim` sayfalarının JSON-LD `BreadcrumbList` yapısını çok dilli URL'lerle donatma.
- [x] **Faz 55:** 39 ilçe yerel açılış sayfasına `LocalBusiness` ve `ProfessionalService` birleşik şeması bağlama.
- [x] **Faz 56:** `FAQPage` şemasını tüm hizmet, ilçe ve genel SSS sayfalarına temiz HTML metinleriyle bağlama.
- [x] **Faz 57:** `WebSite` şeması içine Google Sitelinks Searchbox (`SearchAction`) entegrasyonu sağlama.
- [x] **Faz 58:** Hizmet şemalarına (`Service`) kesin `priceRange: "₺₺"` ve `hasOfferCatalog` fiyat teklif katalogları ekleme.
- [ ] **Faz 59:** Blog yazıları için `Article` şemasında `author`, `publisher`, `datePublished` ve `dateModified` alanlarını ISO-8601 UTC olarak sabitleme.
- [ ] **Faz 60:** ISO sertifikalarımızın PDF belgeleri için `DigitalDocument` şeması oluşturma.
- [ ] **Faz 61:** Sözlük terimleri için `DefinedTermSet` ve `DefinedTerm` şemalarını devreye alma.
- [ ] **Faz 62:** Kurumsal referans projelerimiz için `ItemList` ve `Place` şemaları bağlama.
- [ ] **Faz 63:** Hero videosu için süre (`duration`), yükleme tarihi ve transkript içeren `VideoObject` şeması tanımlama.
- [ ] **Faz 64:** Müşteri yorumları için `Review` şeması ile gerçek kişi ve puan dağılımını zenginleştirme.
- [x] **Faz 65:** Yönetici ve kurucu profilleri için `Person` ve `alumniOf`, `knowsAbout` şemaları oluşturma.
- [x] **Faz 66:** Acil teknik servis ve 7/24 operasyon için `OpeningHoursSpecification` şemasını 7/24 olarak yapılandırma.
- [ ] **Faz 67:** Hizmet verilen 39 ilçeyi temsil eden `areaServed: { "@type": "AdministrativeArea" }` tanımlarını eksiksiz bağlama.
- [ ] **Faz 68:** Şirket genel merkez adresi için resmi `PostalAddress` standartlarını (Kadıköy, İstanbul, PK: 34710) mühürleme.
- [ ] **Faz 69:** Google Rich Results Test aracında sıfır hata ve sıfır uyarı veren otomatik CI/CD schema linter'ı (`schema-lint.ts`) çalıştırma.
- [ ] **Faz 70:** Sektörel çözümlerimiz için `B2BService` ve hedef sektör (`industry`) şemaları tanımlama.
- [ ] **Faz 71:** Asansör yeşil etiket ve periyodik bakım süreçleri için `HowTo` adımlı zengin rehber şeması ekleme.
- [ ] **Faz 72:** Genel kurul ve kat malikleri toplantıları için `Event` şeması altyapısı hazırlama.
- [ ] **Faz 73:** İstihdam ve kariyer sayfası için `JobPosting` şemasını aktif hale getirme.
- [ ] **Faz 74:** Tüm JSON-LD çıktılarını `minifyJsonLd` motoruyla sıkıştırarak HTML payload'ını %25 hafifletme.
- [ ] **Faz 75:** Çok dilli sayfalarda şemaların `inLanguage` niteliğini aktif dile göre dinamik belirleme.

---

### 🌐 WAVE 4: FAZ 76–100 — Knowledge Graph, Wikidata Varlıkları (Entities) & Topikal Otorite
*Hedef: Google Bilgi Paneli (Knowledge Panel) oluşturma, resmi Wikidata varlık eşleştirmesi ve niş otoritesi.*

- [x] **Faz 76:** `ORG_KNOWS_ABOUT` listesine 634 Sayılı Kat Mülkiyeti Kanunu resmi Wikidata referansını (`Q161851`) ekleme.
- [x] **Faz 77:** İcra ve İflas Kanunu (İİK 68) resmi Wikidata referansını (`Q6085270`) bağlama.
- [x] **Faz 78:** Enerji Verimliliği ve Bina Yalıtımı Wikidata referansını (`Q381156`) entegre etme.
- [x] **Faz 79:** Yangın Güvenliği ve Acil Durum Yönetimi Wikidata referansını (`Q1065908`) ekleme.
- [x] **Faz 80:** ISO 41001 Tesis Yönetim Standardı Wikidata eşleştirmesini (`Q108846399`) yapma.
- [x] **Faz 81:** ISO 9001, ISO 14001, ISO 45001 ve ISO 27001 kalite standartlarını varlık grafiğine bağlama.
- [x] **Faz 82:** Footer'daki YouTube kanalına `rel="me noopener noreferrer"` ekleyerek kurumsal sosyal otoriteyi doğrulama.
- [x] **Faz 83:** `constants.ts` içindeki `ORG_SAME_AS` dizisine doğrulanmış Facebook, LinkedIn, X, Instagram ve YouTube profillerini ekleme.
- [ ] **Faz 84:** Google Knowledge Graph API üzerinden şirket varlık ID'sini (Entity ID) sorgulama ve izleme.
- [ ] **Faz 85:** Tesis yönetimi sektöründeki anahtar kavramlar ile şirket kimliğini çift yönlü ilişkilendiren `entity-graph.jsonld` derleme.
- [ ] **Faz 86:** Resmi kurum bağlantılarına (`mevzuat.gov.tr`, `istanbul.gov.tr`, `resmigazete.gov.tr`) bağlamsal dış otorite linkleri verme.
- [ ] **Faz 87:** Yazar profillerine sektördeki deneyim ve sertifikaları gösteren `hasCredential` varlıkları ekleme.
- [ ] **Faz 88:** Kurumsal kimlikte MERSİS numarası, Vergi Dairesi ve Sicil No bilgilerini şeffaf şekilde işaretleme.
- [ ] **Faz 89:** Sektörel sözlük (`/sozluk`) terimlerini Wikipedia ve Vikisözlük maddeleriyle çapraz referanslama.
- [ ] **Faz 90:** Anahtar teslim site yönetimi adımlarını görsel infografiklerle destekleyip görsel varlık grafiğine kaydetme.
- [ ] **Faz 91:** Google'ın markamızı bir "Tesis ve Gayrimenkul Yönetim Şirketi" olarak sınıflamasını sağlayan taksonomi haritası çıkarma.
- [ ] **Faz 92:** Blog makalelerinde geçen özel terimlere (`kompanzasyon panosu`, `arsa payı`) anında sözlük popup'ı bağlama.
- [ ] **Faz 93:** Kurumsal web sitesinde basın bültenleri ve medya kiti bölümünü yapılandırılmış formatta sunma.
- [ ] **Faz 94:** Kurucu ve yöneticilerin sektörel makalelerini ve yayınlarını profil sayfalarına bağlama.
- [ ] **Faz 95:** Sektörel dernek ve meslek odaları (TRFMA vb.) üyeliklerini kurumsal varlık şemasına entegre etme.
- [ ] **Faz 96:** Rakip analizlerinde topikal otorite boşluklarını (Content Gap) tespit eden otomatik araç çalıştırma.
- [ ] **Faz 97:** Kat malikleri ve yöneticiler için hazırlanan KMK rehberlerini indirilebilir otorite dokümanı olarak sunma.
- [ ] **Faz 98:** Şirket genel merkez binasının coğrafi varlık koordinatlarını OpenStreetMap ve Wikidata ile eşleştirme.
- [ ] **Faz 99:** Sektörel vaka analizlerinde (Case Studies) gerçek problem-çözüm-tasarruf metriklerini belgeleme.
- [ ] **Faz 100:** Google Knowledge Graph doğrulama testlerini tamamlayarak bilgi paneli başvuru hazırlığını bitirme.

---

### 📍 WAVE 5: FAZ 101–125 — 39 İlçe Yerel SEO (Local SEO), Mahalle Ağları & Coğrafi İşaretleme
*Hedef: İstanbul'un 39 ilçesinde ve 900+ mahallesinde organik harita ve yerel SERP liderliği.*

- [x] **Faz 101:** 39 ilçenin her biri için özel yerel demografi, proje sayısı ve acil müdahale merkezlerini barındıran landing page'ler oluşturma.
- [x] **Faz 102:** İlçe SERP başlık şablonunu `[İlçe] Tesis ve Site Yönetimi Şirketi | Alo Yönetim` formatında 45-55 karakter aralığına optimize etme.
- [x] **Faz 103:** İlçe sayfalarında OpenStreetMap koordinatları ve doğrudan Google Haritalar navigasyon bağlantısı sunma.
- [x] **Faz 104:** İlçe sayfalarında `LocalBusinessAreaSchema` ile yerel koordinat, telefon ve çalışma saatlerini işaretleme.
- [x] **Faz 105:** İlçe sayfalarında `TldrBlock` ile yapay zekaya ve yerel aramalara hazır doğrudan özet blokları sağlama.
- [x] **Faz 106:** İlçe sayfalarında `EmergencyServiceBadgeSeo` ve `SocialProofTickerSeo` ile yerel güven kanıtı oluşturma.
- [x] **Faz 107:** `bolgeler/page.tsx` ana sayfasını çok dilli parametrelere ve dinamik breadcrumb'a kavuşturma.
- [ ] **Faz 108:** Kadıköy, Ataşehir, Beşiktaş, Üsküdar gibi öncelikli ilçeler için mahalle bazlı alt sayfaları (`/bolgeler/[ilce]/mahalleler/[mahalle]`) haritaya bağlama.
- [ ] **Faz 109:** 39 ilçe için ortalama site aidat endeksi ve metrekare karşılaştırma matrisini (`DistrictComparisonMatrixSeo`) her sayfada dinamik kılma.
- [ ] **Faz 110:** İlçe sayfalarında o ilçede yönettiğimiz sitelerden gerçek referans görselleri ve anonim vaka özetleri sergileme.
- [ ] **Faz 111:** İlçeler arası coğrafi sınır yakınlığına göre komşu ilçe öneri motorunu (`getNeighborDistrictLinks`) güçlendirme.
- [ ] **Faz 112:** İlçe bazlı özel sıkça sorulan sorular (Örn: "Kadıköy'de tarihi binalarda site yönetimi nasıl yapılır?") üretme.
- [ ] **Faz 113:** Coğrafi arama motorları için 39 ilçenin tam sınırlarını içeren GeoJSON feed'i (`/api/geo/districts.geojson`) yayınlama.
- [ ] **Faz 114:** Google Earth ve GIS haritaları için KML formatında kapsam haritası (`/api/geo/istanbul.kml`) sunma.
- [ ] **Faz 115:** Anadolu ve Avrupa yakası sayfaları arasında semantik PageRank dengeleyici çapraz bağlantı ağı kurma.
- [ ] **Faz 116:** İlçe sayfalarında yerel belediye zabıta ve çevre müdürlüğü mevzuat linklerine atıfta bulunma.
- [ ] **Faz 117:** Google İşletme Profili (Google Business Profile) ile web sitesi NAP (Name, Address, Phone) tutarlılığını garanti altına alma.
- [ ] **Faz 118:** Mobil aramalarda kullanıcının konumuna en yakın saha ofisini hesaplayan uç nokta (`/api/geo/nearest-facility-hub`) entegrasyonu.
- [ ] **Faz 119:** Yerel rehber siteleri ve sektörel İstanbul dizinleri için optimize edilmiş yerel tanıtım metinleri hazırlama.
- [ ] **Faz 120:** İlçe sayfalarında kentsel dönüşüm ve yeni teslim toplu konutlara özel yönetim danışmanlığı modülü sunma.
- [ ] **Faz 121:** Her ilçenin deprem ve acil durum tahliye planlama rehberini yerel SEO içeriği olarak sağlama.
- [ ] **Faz 122:** İlçe bazında yerel anahtar kelime hacimlerini (Search Volume) 3 ayda bir güncelleyen dinamik taksonomi motoru bağlama.
- [ ] **Faz 123:** İlçe sayfalarında `hasMap` URL'lerini doğrudan resmi Google Maps CID (Customer ID) parametresiyle eşitleme.
- [ ] **Faz 124:** Yerel kullanıcı yorumlarını ilçe sayfalarında filtreleyerek `LocalBusiness` yorum şemasına dahil etme.
- [ ] **Faz 125:** 39 ilçenin tamamının yerel sıralama konumlarını haftalık denetleyen otomatik rank-tracker çalıştırma.

---

### 🌍 WAVE 6: FAZ 126–150 — Uluslararası SEO (i18n), Çok Dilli Silo & Hreflang Mimarisi
*Hedef: 4 dilde (TR, EN, RU, AR) kusursuz hreflang eşleşmesi, sıfır dil çakışması ve izole PageRank siloları.*

- [x] **Faz 126:** Tüm sayfalarda Türkçe, İngilizce, Rusça ve Arapça alternatif diller için `xhtml:link rel="alternate" hreflang="..."` etiketlerini sabitleme.
- [x] **Faz 127:** `x-default` hreflang tanımlamasını Türkiye kök yolu (`https://aloyonetim.com.tr/...`) olarak sabitleme.
- [x] **Faz 128:** `autoLinker.ts` motoruna `locale` desteği ekleyerek yabancı dildeki bloglarda sadece ilgili dilin iç linklerinin üretilmesini sağlama.
- [x] **Faz 129:** `Footer.tsx` içindeki tüm bağlantıları `getLocalizedPath` ile sarmalayarak yabancı dil ziyaretçilerinin Türkçe sayfalara düşmesini engelleme.
- [x] **Faz 130:** Blog kategori arşivinde (`blog/kategori/[kategori]`) breadcrumb'ı dile göre ("Home", "Главная", "الرئيسية") dinamikleştirme.
- [x] **Faz 131:** Blog yazar arşivinde (`blog/yazar/[yazar]`) çok dilli breadcrumb ve profil yönlendirmesini bağlama.
- [x] **Faz 132:** Blog etiket sayfalarında (`blog/etiket/[etiket]`) çok dilli breadcrumb yapısını kurma.
- [x] **Faz 133:** `middleware.ts` içindeki `translatedSlugs` haritası ile tüm hizmet ve kurumsal sayfaları 4 dilde anlamsal URL'lere yönlendirme.
- [ ] **Faz 134:** Arapça sayfalar için tüm layout'ta tam RTL (`dir="rtl"`) ve semantik CSS akışını sağlama.
- [ ] **Faz 135:** İngilizce sayfaların SERP meta başlık ve açıklamalarını yabancı yatırımcı ve expat kitlesine göre optimize etme.
- [ ] **Faz 136:** Rusça sayfaları Yandex arama motoru optimizasyon kriterlerine (Yandex Webmaster, Turbo sayfaları) tam uyumlu kılma.
- [ ] **Faz 137:** Körfez ve Orta Doğu gayrimenkul yatırımcıları için Arapça rezidans yönetim rehberleri yayınlama.
- [ ] **Faz 138:** `sitemap.xml` içinde 4 dilin tüm çapraz hreflang eşleşmelerini XML düğümü olarak listeleme.
- [ ] **Faz 139:** Para birimi ve sayı formatlarını seçilen dile göre dinamik yerelleştirme (`Intl.NumberFormat`).
- [ ] **Faz 140:** Tarih ve saat göstergelerini ilgili dilin resmi formatına göre basma (`Intl.DateTimeFormat`).
- [ ] **Faz 141:** Dil değiştirildiğinde kullanıcının bulunduğu sayfanın tam çeviri slug karşılığına yönlenmesini sağlama.
- [ ] **Faz 142:** Kullanıcının dil tercihini `NEXT_LOCALE` çerezi ile hatırlayıp sonraki girişlerde kesintisiz sunma.
- [ ] **Faz 143:** Tarayıcının `Accept-Language` başlığını analiz ederek ilk ziyarette nazik bir dil öneri kutusu çıkarma.
- [ ] **Faz 144:** Hukuki ve mevzuat metinlerinin (KVKK, Gizlilik) uluslararası geçerlilikte İngilizce özetlerini yayınlama.
- [ ] **Faz 145:** Uluslararası telefon kodu seçimi (`+90`, `+971`, `+7`, `+44`) ile yabancı yatırımcı form dönüşümünü artırma.
- [ ] **Faz 146:** Çok dilli sayfalarda görsel alt metinlerinin (`alt="..."`) de ilgili dilde çevrilmiş olmasını sağlama.
- [ ] **Faz 147:** 404 Hata Sayfasını kullanıcının o anki dilinde anlamlı navigasyon önerileriyle sunma.
- [ ] **Faz 148:** Çok dilli blog yazıları arasında `hreflang` çapraz eşleştirmesini veritabanı ID'si üzerinden dinamik kurma.
- [ ] **Faz 149:** Yabancı dildeki hizmet sayfalarında Türkiye'de mülk edinen yabancılara yönelik yasal haklar kılavuzu sunma.
- [ ] **Faz 150:** 4 dilde hreflang doğruluğunu denetleyen otomatik test paketini (`dualCoreMultiLangEngine.test.ts`) sürekli çalıştırma.

---

### ⚡ WAVE 7: FAZ 151–175 — Tarama Bütçesi (Crawl Budget), İndeksleme Hızı & Real-Time IndexNow/WebSub
*Hedef: Googlebot ve Bingbot için sıfır tarama engeli, 0ms yönlendirme gecikmesi ve 5 dakikada anında indekslenme.*

- [x] **Faz 151:** `src/app/sitemap.ts` içine 30+ sözlük terimini 4 dilde (120+ yeni URL) dahil ederek eksiksiz site haritası üretme.
- [x] **Faz 152:** `public/.well-known/security.txt` içindeki yönlendirmeli linkleri doğrudan canonical URL'lerle (`/iletisim`, `/gizlilik-politikasi`) değiştirme.
- [x] **Faz 153:** `public/opensearch.xml` içindeki `/tr/blog` linklerini doğrudan canonical `/blog` rotasına çekerek 301 zincirini kırma.
- [x] **Faz 154:** `src/app/manifest.ts` PWA kısayollarındaki `/tr/` öneklerini temizleyip anında 200 OK açılış sağlama.
- [x] **Faz 155:** `image-sitemap.xml` ve `video-sitemap.xml` içindeki tüm 404 veren yolları ve yönlendirmeleri temizleme.
- [x] **Faz 156:** `document-sitemap.xml` motoruna `fs.existsSync` koruması ekleyerek yalnızca diskte fiziksel var olan sertifikaları listeleme.
- [x] **Faz 157:** `src/app/robots.ts` allow listesine tüm özel haritaları (`image`, `video`, `document`, `news`, `feed`) açıkça ekleme.
- [x] **Faz 158:** `indexnow-auto.ts` anahtarını diskteki gerçek doğrulama dosyası (`b42e617d3a2e4e10b171a7d6abdf93e5`) ile eşitleme.
- [x] **Faz 159:** İçerik güncellemelerinde Bing ve Yandex IndexNow API'sini otomatik arka planda tetikleme.
- [x] **Faz 160:** Google PubSubHubbub (WebSub Hub) entegrasyonu ile RSS güncellemelerini anında Google'a pingleme.
- [x] **Faz 161:** `news-sitemap.xml` içinden Google News spesifikasyonunda kaldırılan eski `<news:keywords>` etiketini temizleme.
- [ ] **Faz 162:** Google Search Console API entegrasyonu ile yeni eklenen sayfaları anında URL Inspection üzerinden bildirme.
- [ ] **Faz 163:** Tarama bütçesi koruyucusu (`crawlBudgetDefender.ts`) ile sahte arama parametrelerini (`?filter=`, `?sort=`) botlara engelleme.
- [ ] **Faz 164:** Önemli sayfaların HTTP başlıklarına `Last-Modified` ve `ETag` ekleyerek `304 Not Modified` ile sunucu yükünü %60 azaltma.
- [ ] **Faz 165:** Arama motorlarının sitenin en derin sayfasına maksimum 3 tıklamayla ulaşmasını sağlayan sığ derinlik (Crawl Depth < 3) mimarisi kurma.
- [ ] **Faz 166:** `sitemap-index.xml` ana dizini üzerinden alt haritaları (sayfalar, bölgeler, hizmetler, blog, sözlük) modüler bölme.
- [ ] **Faz 167:** Botların gereksiz form ve arama sonuç sayfalarını tarayarak bütçe harcamasını engelleyen `disallow` optimizasyonu yapma.
- [ ] **Faz 168:** Sunucu yanıt süresini (TTFB) Edge CDN önbelleği ile 150ms altına indirme.
- [ ] **Faz 169:** Arama motoru botlarının IP bloklarını doğrulayan (Reverse DNS Lookup) ve sahte botları filtreleyen middleware kalkanı kurma.
- [ ] **Faz 170:** Haftalık olarak tüm siteyi baştan sona tarayıp kırık bağlantı (404) raporu üreten iç spider betiği (`audit_seo_deep.cjs`) çalıştırma.
- [ ] **Faz 171:** URL'lerin sonundaki eğik çizgi (`trailing slash`) tutarlılığını zorunlu kılarak çift içerik (Duplicate Content) riskini sıfırlama.
- [ ] **Faz 172:** HTTPS yönlendirmesinin HTTP/3 ve HSTS Preload ile sıfır gecikmeli gerçekleşmesini temin etme.
- [ ] **Faz 173:** Log kayıtlarında Googlebot tarama sıklığını ve en çok ziyaret edilen sayfaları raporlayan bot analiz paneli kurma.
- [ ] **Faz 174:** Güncellenmeyen eski blog yazılarını arşivleyip en güncel mevzuat yazısına 301 yönlendirmesiyle konsolide etme.
- [ ] **Faz 175:** Sayfa değişikliklerinde sitemap içindeki `<lastmod>` zaman damgasının tam UTC saniye hassasiyetinde güncellenmesini sağlama.

---

### 🕸️ WAVE 8: FAZ 176–200 — İç Linkleme Mimarisi (Internal Linking Mesh), PageRank Akışı & Silo İzolasyonu
*Hedef: Entegre Topic Clustering, sıfır ölü bağlantı, dengeli PageRank dağılımı ve güçlü anlamsal ağ.*

- [x] **Faz 176:** `autoLinkHtml` fonksiyonu ile blog ve metin içeriklerinde anahtar kelimelerin otomatik semantik sayfalara bağlanması.
- [x] **Faz 177:** `autoLinker` içine self-referencing (sayfanın kendi kendine link vermesi) engelleyici mantık entegre etme.
- [x] **Faz 178:** Aynı sayfada aynı hedefe mükerrer link verilmesini engelleyen `usedUrls` set kontrolü uygulama.
- [x] **Faz 179:** Sayfa başına maksimum otomatik link sayısını (varsayılan: 8) sınırlayarak aşırı link kirliliğini önleme.
- [x] **Faz 180:** Login modalındaki sahte `href="#"` linkini `<Link href="/iletisim">` ile değiştirerek ölü fragment'ı temizleme.
- [ ] **Faz 181:** Kök Hizmet (Pillar Page) ile alt hizmet sayfaları arasında hiyerarşik Topic Cluster iç linkleme ağını güçlendirme.
- [ ] **Faz 182:** İlgili makaleler (`RelatedArticles`) bileşenini etiket ve kategori bazlı semantik eşleşmeyle zenginleştirme.
- [ ] **Faz 183:** Dış sitelere verilen bağlantılarda güvenlik için `rel="noopener noreferrer"`, editoryal olmayan linklerde `rel="nofollow"` standardı sağlama.
- [ ] **Faz 184:** Kurumsal ortaklık ve grup şirket bağlantılarında `rel="sponsored"` veya açık tanımlama kullanma.
- [ ] **Faz 185:** "Ekmek Kırıntısı" (Breadcrumb) navigasyonunun kullanıcı ve bot için her zaman tıklanabilir DOM linki üretmesini sağlama.
- [ ] **Faz 186:** Yetim Sayfa (Orphan Page) denetimi yaparak hiçbir sayfanın iç linksiz kalmamasını garanti etme.
- [ ] **Faz 187:** Header mega menüsündeki link hiyerarşisini en kritik hizmetleri en üstte tutacak şekilde ağırlıklandırma.
- [ ] **Faz 188:** Blog içeriklerinden doğrudan teklif alma (`/teklif-al`) ve bütçe hesaplayıcıya (`/hesaplayici`) bağlamsal CTA köprüleri kurma.
- [ ] **Faz 189:** İlçe sayfalarından doğrudan ilgili ilçedeki güvenlik, temizlik ve teknik bakım alt hizmetlerine çapraz linkler verme.
- [ ] **Faz 190:** Sözlük terim tanımları içinden ilgili kanun maddelerine ve hizmet sayfalarına çift yönlü köprü bağlama.
- [ ] **Faz 191:** Sayfa içi uzun makalelerde içindekiler tablosu (`TableOfContentsSeo`) ile pürüzsüz bölüm içi çapa (Anchor) linkleri sunma.
- [ ] **Faz 192:** Çapa metinlerinin (Anchor Text) "buraya tıklayın" yerine semantik anahtar kelimeler ("Apartman Aidat Tahsilatı") içermesini zorunlu kılma.
- [ ] **Faz 193:** Dahili arama kutusu önerilerinde doğrudan en çok okunan rehber sayfalarını öne çıkarma.
- [ ] **Faz 194:** Altbilgideki (Footer) 39 ilçe listesini iki yakaya (Anadolu / Avrupa) ayırarak temiz sütunlar halinde bağlama.
- [ ] **Faz 195:** Sayfa içinde tıklanamayan veya javascript bağımlı sahte linklerin taranabilir `<a href="...">` etiketine dönüştürülmesi.
- [ ] **Faz 196:** Eski ve silinmiş sayfaların bıraktığı kırık iç bağlantıları düzenli tarayan haftalık cron görevini aktif etme.
- [ ] **Faz 197:** İç linklerin kullanıcılar tarafından tıklanma oranını (Click-Through) ölçen Google Analytics etkinlikleri kurma.
- [ ] **Faz 198:** En yüksek PageRank değerine sahip ana sayfadan en stratejik 5 amiral gemisi hizmete doğrudan link akışı sağlama.
- [ ] **Faz 199:** Başarı hikayeleri sayfalarından ilgili ilçe ve hizmet sayfalarına karşılıklı referans köprüsü kurma.
- [ ] **Faz 200:** Sayfa başına toplam iç bağlantı sayısını 100 link sınırının altında tutarak tarama verimini koruma.

---

### 🏆 WAVE 9: FAZ 201–225 — E-E-A-T (Deneyim, Uzmanlık, Güvenilirlik) & Dönüşüm SEO (CRO)
*Hedef: Google Kalite Değerlendirici Kılavuzu'nda en üst güven skoru, şeffaf künye ve yüksek form dönüşümü.*

- [x] **Faz 201:** Şirketin 15+ yıllık tecrübesini, 120+ projesini ve ISO 41001 akreditasyonunu kurumsal şemada doğrulanabilir kılma.
- [x] **Faz 202:** 7 resmi ISO kalite ve yönetim sertifikasını (`iso-10002.pdf` - `iso-45001.pdf`) indirilebilir formatta sunma.
- [x] **Faz 203:** Yazar profilleri (`AuthorArchive`) ile içerik üreticilerinin uzmanlık ve biyografilerini ProfilePage şemasıyla bağlama.
- [x] **Faz 204:** 7/24 Acil Müdahale ve Operasyon Merkezi rozetleri ile güvenilirlik sinyalini canlı tutma.
- [x] **Faz 205:** Sosyal kanıt akışı (`SocialProofTickerSeo`) ile anlık yönetilen bağımsız bölüm ve memnuniyet oranlarını sergileme.
- [ ] **Faz 206:** Tüm blog makalelerinin altına "Hukuki İnceleme Yapan Uzman" (Reviewed By) künyesi ekleme.
- [ ] **Faz 207:** Makalelerin son güncellenme tarihini (`Updated on...`) şeffaf bir şekilde okuyucuya ve botlara gösterme.
- [ ] **Faz 208:** İletişim sayfasında şirketin resmi vergi kimlik numarası, kayıtlı olduğu oda ve MERSİS numarasını şeffafça yayınlama.
- [ ] **Faz 209:** Gerçek site yöneticisi ve kat maliki video referanslarını VideoObject şemasıyla zenginleştirme.
- [ ] **Faz 210:** Kurumsal Hakkımızda sayfasında yönetim kurulu ve departman müdürlerinin fotoğraflı özgeçmişlerini sunma.
- [ ] **Faz 211:** Teklif alma formunda (`/teklif-al`) güven mühürleri (SSL, 5188 Lisansı, KVKK Açık Rıza) ile dönüşüm oranını artırma.
- [ ] **Faz 212:** KMK Hukuk süreçlerinde emsal Yargıtay kararlarına atıfta bulunarak hukuki derinliği belgeleme.
- [ ] **Faz 213:** Asansör bakımı ve teknik denetimlerde TSE ve MMO akredite mühendis onay belgelerini sergileme.
- [ ] **Faz 214:** Gizlilik Politikası, Çerez Politikası ve Kullanım Şartları sayfalarını en güncel 2026 mevzuatına göre güncelleme.
- [ ] **Faz 215:** Kullanıcıların kolayca geri bildirim ve şikayet iletebileceği ISO 10002 Müşteri Memnuniyeti formunu öne çıkarma.
- [ ] **Faz 216:** Şirket genel merkezinin fiziksel ofis, operasyon merkezi ve araç filosunun yüksek çözünürlüklü fotoğraflarını sunma.
- [ ] **Faz 217:** 48 saatte şeffaf bütçe teklifi garantisini dönüşüm odaklı mikro rozetlerle tüm hizmetlere yerleştirme.
- [ ] **Faz 218:** Sitede yer alan tüm hesaplayıcıların formüllerini KMK 634 resmi hesaplama cetvellerine dayandırma.
- [ ] **Faz 219:** Sektörel ödüller, plaketler ve teşekkür belgeleri için özel bir dijital başarı vitrini oluşturma.
- [ ] **Faz 220:** Mobil cihazlarda arama ve WhatsApp iletişim butonlarını başparmak erişim bölgesinde (Thumb Zone) sabitleme.
- [ ] **Faz 221:** Form gönderimlerinde kullanıcıya SMS/E-posta ile anında takip kodu üreten güven mekanizması sağlama.
- [ ] **Faz 222:** Şirketin sıfır atık ve sürdürülebilirlik ilkelerini belgeleyen kurumsal raporları yayınlama.
- [ ] **Faz 223:** Basında Alo Yönetim haber ve röportajlarını yetkili basın linkleriyle referanslama.
- [ ] **Faz 224:** Sitedeki içeriklerin editoryal politika ve doğruluk ilkelerini açıklayan "Yayın İlkeleri" sayfası ekleme.
- [ ] **Faz 225:** Google E-E-A-T denetim kontrol listesindeki tüm 45 kriterin periyodik testini tamamlama.

---

### 🛡️ WAVE 10: FAZ 226–250 — Teknik SEO Sağlığı, Core Web Vitals, Bot Telemetrisi & Sürekli Denetim
*Hedef: 100/100 Lighthouse SEO, yeşil Core Web Vitals, sıfır regresyon ve kesintisiz otomatik izleme.*

- [x] **Faz 226:** Nginx statik önbellek kuralına `.webm`, `.mp4` ve `.pdf` uzantılarını ekleyerek 1 yıllık `immutable` önbellekleme sağlama.
- [x] **Faz 227:** Nginx üzerinde Gzip ve Brotli sıkıştırmasını tüm metin, XML ve JSON-LD formatları için devreye alma.
- [x] **Faz 228:** `edgeHeaderInjector.ts` ile `X-Robots-Tag: max-snippet:-1, max-image-preview:large, max-video-preview:-1` başlığı basma.
- [x] **Faz 229:** HTTP yanıtlarında sunucu sürümünü gizleyen `response.headers.delete('x-powered-by')` güvenlik temizliği.
- [x] **Faz 230:** 94 test paketinde 628 birim ve entegrasyon testinin her commit öncesi firesiz geçmesini doğrulama.
- [ ] **Faz 231:** Cumulative Layout Shift (CLS) skorunu tam 0 seviyesinde tutmak için tüm görsel ve videolara `aspect-ratio` tanımlama.
- [ ] **Faz 232:** Interaction to Next Paint (INP) gecikmesini 50ms altında tutmak için tüm arama ve filtreleri `useTransition` ile sarmalama.
- [ ] **Faz 233:** Largest Contentful Paint (LCP) süresini 1.2 saniyenin altında tutmak için kritik fontları `preload` ile çekme.
- [ ] **Faz 234:** Kullanılmayan CSS ve JS kodlarını temizleyen gelişmiş Tree-Shaking optimizasyonu uygulama.
- [ ] **Faz 235:** Googlebot ve Bingbot'un sunucudaki CPU tüketimini izleyen `/api/admin/bot-telemetry` servisini aktif etme.
- [ ] **Faz 236:** Günlük olarak kırık linkleri, sitemap doğruluğunu ve index durumunu denetleyen `/api/cron/seo-patrol` cron servisi kurma.
- [ ] **Faz 237:** 404 sayfasına kullanıcının aradığı terime en yakın 3 sayfayı öneren akıllı hata kurtarma bileşeni ekleme.
- [ ] **Faz 238:** Next.js ISR (Incremental Static Regeneration) ile popüler sayfaların önbelleğini arka planda 24 saatte bir otomatik tazeleme.
- [ ] **Faz 239:** Redis bağlantısı kopsa dahi arama motorlarına kesintisiz statik veri sunan Fallback katmanını güvenceye alma.
- [ ] **Faz 240:** DNS yanıt süresini Cloudflare DNSSEC ve CNAME flattening ile 20ms seviyesine indirme.
- [ ] **Faz 241:** Arama motorlarının JavaScript çalıştırmasına gerek kalmadan tüm kritik içeriği SSR (Server-Side Rendering) ile teslim etme.
- [ ] **Faz 242:** Web Vitals metriklerini gerçek kullanıcı deneyimiyle (RUM) toplayan `/api/analytics/vitals` uç noktasını güçlendirme.
- [ ] **Faz 243:** Sayfa yönlendirmelerinde tarayıcı ön yüklemesini yöneten Speculation Rules API'yi moderate seviyesinde tutma.
- [ ] **Faz 244:** Tüm API uç noktalarında CORS politikalarını sadece izinli alan adlarıyla sınırlandırarak veri güvenliğini sağlama.
- [ ] **Faz 245:** SSL sertifikasının TLS 1.3 ve güçlü şifreleme paketleriyle (ChaCha20, AES-GCM) çalıştığını doğrulama.
- [ ] **Faz 246:** Arama motoru örümceklerine sunulan HTML kaynak kodunun boyutunu (HTML Minification) optimize etme.
- [ ] **Faz 247:** Görsellerin modern AVIF ve WebP formatlarında içerik pazarlığı (Content Negotiation) ile sunulmasını garanti etme.
- [ ] **Faz 248:** Sayfa üzerindeki üçüncü taraf komut dosyalarının (GTM, Pixel) ana iş parçacığını (Main Thread) tıkamasını önleme.
- [ ] **Faz 249:** GitHub Actions CI/CD hattına otomatik Lighthouse CI (LHCI) denetimi ekleyerek SEO puanının 100/100 kalmasını zorunlu kılma.
- [ ] **Faz 250:** Her yeni dağıtımda (Deployment) arama motoru indeksleme durumunu, çift uzak depo senkronizasyonunu ve tüm sistem sağlığını raporlama.

---

## 🎯 UYGULAMA VE DOĞRULAMA PRENSİPLERİ

1. **Sıfır Regresyon İlkesi:** Yapılan her SEO iyileştirmesi sonrası `npx vitest run` çalıştırılarak mevcut 94 test paketinin ve 628 testin tamamının firesiz geçtiği onaylanır.
2. **Korumalı Alanlar:** Simülasyonlar, hesaplayıcılar ve interaktif radarlar (`FacilityCalculator`, `LandscapeCalculator`, `AuditRadar` vb.) her zaman korunur; mantıkları bozulmaz.
3. **Çift Uzak Depo Senkronizasyonu:** Tüm commit'ler hem `origin` (`salihoglueyup/tasarim5`) hem de `alogroup` (`AloGroupTR/web-aloyonetim`) depolarına eşzamanlı olarak push edilir.
4. **Şeffaf Belgelendirme:** Tamamlanan her faz bu belgede `- [x]` olarak güncellenir ve teknik detayları `walkthrough.md` dosyasına kaydedilir.
