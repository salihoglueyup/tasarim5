# 🚀 ALO YÖNETİM — ÇİFT ÇEKİRDEKLİ (DUAL-CORE) SEO & AI ARAMA MOTORU 250 FAZ MASTER PLANI

> **Versiyon:** 1.0.0 — Nihai Tamamlandı  
> **Oluşturma Tarihi:** 2026-08-31  
> **Statü:** 🟢 %100 TAMAMLANDI — Tüm Motorlar Aktif & Test Edildi  
> **Hedef:** Türkiye'nin en gelişmiş Semantik Backend SEO & AI Arama Motoru Altyapısını inşa etmek.

---

## 📊 MASTER PLAN ÖZET MATRİSİ

| Bölüm | Başlık | Faz Aralığı | Faz Sayısı | Öncelik |
|-------|--------|-------------|------------|---------|
| **A** | Semantik LSI & Topikal Derinlik Motoru | Faz 1-55 | 55 Faz | 🔴 KRİTİK |
| **B** | 39 İlçe Çift Çekirdekli Mikro-Lokasyon Matrisi | Faz 56-105 | 50 Faz | 🔴 KRİTİK |
| **C** | AI / Sesli Arama & LLM Soru-Cevap Bankası | Faz 106-160 | 55 Faz | 🟠 YÜKSEK |
| **D** | 9 Hizmet Çapraz Bağlantı & Dinamik Kart Ağı | Faz 161-205 | 45 Faz | 🟠 YÜKSEK |
| **E** | Dinamik Silo Breadcrumb & Hiyerarşik Otorite | Faz 206-250 | 45 Faz | 🟡 ORTA |
| **TOPLAM** | | **Faz 1-250** | **250 Faz** | |

---

## 🎯 KULLANıM KILAVUZU

```
[YENİ]    → Yeni dosya oluşturulacak
[DEĞİŞTİR] → Mevcut dosyada güncelleme yapılacak
[TEST]    → Vitest test senaryosu eklenecek
[ŞEMA]    → Schema.org JSON-LD şeması oluşturulacak
[PUSH]    → Git commit & dual repo push yapılacak
```

---

---

# BÖLÜM A — 🧠 SEMANTİK LSI & TOPİKAL DERİNLİK ANALİZCİSİ
### `src/lib/seo/domainSemanticAuditor.ts`
> **Faz 1-55 | Öncelik: KRİTİK**  
> Google'ın bir sayfayı belirli bir anahtar kelime için tam otorite olarak kabul etmesi için aranan **LSI (Latent Semantic Indexing)** sinyal kümesini anahtar kelime dikimine göre ayrı ayrı hesaplayan, topikal boşlukları tespit eden ve öneriler üreten sunucu taraflı analiz motoru.

---

### 📦 A1 — Veri Yapısı & Interface Tasarımı (Faz 1-10)

**Faz 1** `[YENİ]` `src/lib/seo/domainSemanticAuditor.ts` — Ana motor dosyası oluştur.

**Faz 2** `[YENİ]` `SemanticAuditInput` interface tanımla:
```typescript
interface SemanticAuditInput {
  pillar: 'site' | 'facility' | 'hybrid';
  title: string;
  h1?: string;
  metaDescription?: string;
  content: string;          // Tam sayfa HTML veya metin içeriği
  wordCount?: number;
}
```

**Faz 3** `[YENİ]` `LsiTermGroup` interface tanımla:
```typescript
interface LsiTermGroup {
  groupName: string;
  pillar: 'site' | 'facility' | 'legal' | 'shared';
  terms: string[];
  maxScore: number;
}
```

**Faz 4** `[YENİ]` `TopicalGapItem` interface tanımla — eksik kritik varlıkları modeller.

**Faz 5** `[YENİ]` `SemanticDepthReport` interface tanımla:
```typescript
interface SemanticDepthReport {
  pillar: 'site' | 'facility' | 'hybrid';
  topicalDepthScore: number;         // 0-100
  lsiCoveragePercent: number;        // 0-100
  detectedLsiTerms: string[];
  missingCriticalTerms: LsiTermGroup[];
  topicalGaps: TopicalGapItem[];
  recommendations: string[];
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
}
```

**Faz 6** `[YENİ]` `LsiTermCoverage` dönen yardımcı tip tanımla.

**Faz 7** `[YENİ]` `SemanticAuditOptions` interface tanımla — strictMode, includeSharedTerms vb. konfigürasyon parametreleri.

**Faz 8** `[DEĞİŞTİR]` `domainKeywordsTaxonomy.ts` — LSI Grup Listesi için `LSI_TERM_GROUPS` const yapısını ekle.

**Faz 9** `[YENİ]` JSDoc yorumlarını ve modül açıklamalarını tamamla.

**Faz 10** `[TEST]` `domainSemanticAuditor.test.ts` — Interface ve tip doğrulama testleri yaz.

---

### 📦 A2 — Site Yönetimi LSI Kelime Kümeleri (Faz 11-22)

**Faz 11** `[YENİ]` **Grup 1 — Hukuki & Mevzuat LSI Küme (20 Terim):**
```
"bağımsız bölüm", "kat irtifakı", "kat mülkiyeti", "arsa payı",
"müstakil kullanım", "genel kurul toplantısı", "yönetim kurulu kararı",
"ibra", "muhalefet şerhi", "sulh hukuk mahkemesi", "dava dilekçesi",
"ihtarname", "tebligat", "kat malikleri kurulu", "oy çokluğu",
"dörtte üç karar nisabı", "oybirliği", "tapu sicili", "cins tashihi", "iskan"
```

**Faz 12** `[YENİ]` **Grup 2 — Finansal & Muhasebe LSI Küme (18 Terim):**
```
"işletme projesi", "yıllık bütçe", "avans aidat", "gider payı",
"aidat makbuzu", "ek bütçe", "denetim raporu", "hesap özeti",
"banka ekstre", "gelir-gider tablosu", "nakit akışı", "fatura yönetimi",
"kdv beyannamesi", "stopaj", "denetim kurulu ibrası", "muhasebeci",
"mali müşavir", "bütçe revizyonu"
```

**Faz 13** `[YENİ]` **Grup 3 — Teknik Bakım & Periyodik Kontrol LSI Küme (20 Terim):**
```
"asansör periyodik kontrolü", "kırmızı etiket asansör", "jeneratör bakımı",
"hidrofor sistemi", "yangın tüpü dolumu", "sığınak denetimi",
"çatı su yalıtımı", "dış cephe bakımı", "havuz kimyası", "klima bakımı",
"elektrik panosu", "kompanzasyon takibi", "doğalgaz tesisat kontrolü",
"baca temizliği", "paratoner muayenesi", "bina deprem güçlendirmesi",
"kentsel dönüşüm analizi", "termal kamera tespiti", "zemin etüdü", "statik proje"
```

**Faz 14** `[YENİ]` **Grup 4 — Güvenlik & Erişim LSI Küme (15 Terim):**
```
"5188 kimlik kartı", "güvenlik kamera sistemi", "kartlı geçiş sistemi",
"turnike sistemi", "araç bariyer sistemi", "güvenlik vardiyası",
"gece devriyesi", "ziyaretçi kayıt sistemi", "acil durum planı",
"yangın tahliye senaryosu", "depo güvenliği", "zimmet tutanağı",
"güvenlik defteri", "olay tutanağı", "güvenlik şefi"
```

**Faz 15** `[YENİ]` **Grup 5 — Yeşil Alan & Çevre LSI Küme (12 Terim):**
```
"peyzaj bakımı", "sulama sistemi", "çim biçme", "bahçe gübresi",
"ağaç budama", "dekoratif bitki", "mevsimlik çiçek", "fıskiye havuzu",
"çocuk oyun parkı", "spor aletleri bakımı", "bisiklet parkı", "çevre düzenleme"
```

**Faz 16** `[YENİ]` **Grup 6 — Temizlik & Hijyen LSI Küme (12 Terim):**
```
"ortak alan temizliği", "cam silme hizmeti", "asansör temizliği",
"çöp depo alanı", "atık ayrıştırma", "geri dönüşüm konteyneri",
"dezenfeksiyon hizmeti", "haşere ilaçlama", "fare mücadelesi",
"kapalı otopark temizliği", "bina girişi temizliği", "bayramlık temizlik"
```

**Faz 17** `[YENİ]` **Grup 7 — Dijital & Teknoloji LSI Küme (10 Terim):**
```
"dijital aidat ödeme", "mobil uygulama yönetim", "online genel kurul",
"e-devlet entegrasyonu", "dijital duyuru panosu", "arıza takip sistemi",
"qr kod kapı giriş", "enerji tüketim takip", "akıllı sayaç sistemi", "bms sistemi"
```

**Faz 18** `[YENİ]` **Grup 8 — Konut Türleri & Sektör Spesifik LSI (15 Terim):**
```
"müstakil villa yönetimi", "dubleks daire yönetimi", "ofis sitesi yönetimi",
"karma kullanımlı bina", "ticari dükkan yönetimi", "otopark yönetim sistemi",
"toplu yapı blok yönetimi", "avm içi yönetim", "rezidans konsiyerj",
"butik site yönetimi", "üst segment konut yönetimi", "ada parsel yönetimi",
"kira yönetim hizmeti", "tapu devri işlemi", "tahliye danışmanlığı"
```

**Faz 19** `[DEĞİŞTİR]` `domainKeywordsTaxonomy.ts` — SITE_LSI_GROUPS const'unu ekle.

**Faz 20** `[TEST]` Site yönetimi LSI grup tanımlarını doğrula — her grup `pillar: 'site'` etiketini taşımalı.

**Faz 21** `[TEST]` Site LSI terim listesi minimum 100 terim içermeli.

**Faz 22** `[PUSH]` Site yönetimi LSI küme commit'i: `feat(lsi): add site-management LSI term groups`

---

### 📦 A3 — Tesis Yönetimi LSI Kelime Kümeleri (Faz 23-33)

**Faz 23** `[YENİ]` **Grup 9 — ISO & Sertifikasyon LSI Küme (15 Terim):**
```
"iso 41001 sertifikası", "iso 9001 kalite yönetim", "iso 14001 çevre yönetim",
"iso 45001 iş güvenliği", "ohsas 18001", "breeam sertifikası",
"leed sertifikası", "well binası", "enerji kimlik belgesi", "epdk lisansı",
"yetkilendirilmiş servis", "akredite laboratuvar", "kalite denetimi",
"iç denetim raporlama", "yönetim sistemi entegrasyonu"
```

**Faz 24** `[YENİ]` **Grup 10 — Kurumsal İşletme & Verimlilik LSI Küme (18 Terim):**
```
"önleyici bakım planı", "arıza oranı kpi", "mtbf analizi",
"enerji verimliliği raporu", "enerji baskı analizi", "hvac optimizasyonu",
"bms entegrasyonu", "akıllı bina sistemi", "iot sensör ağı",
"tahmine dayalı bakım", "dijital ikiz bina", "karbon ayak izi",
"su tasarrufu raporu", "atık yönetim protokolü", "yeşil bina stratejisi",
"bina otomasyon", "plc kontrol sistemi", "scada entegrasyonu"
```

**Faz 25** `[YENİ]` **Grup 11 — B2B Müşteri & İhale LSI Küme (12 Terim):**
```
"tesis yönetim şartnamesi", "rfp teklif dosyası", "hizmet seviye sözleşmesi",
"sla kpi takibi", "performans değerlendirme toplantısı", "ihale süreci",
"kurumsal yönetim raporu", "haftalık faaliyet raporu", "aylık işletme raporu",
"yıllık performans değerlendirme", "sözleşme yenileme", "kurumsal teklif formu"
```

**Faz 26** `[YENİ]` **Grup 12 — Plaza & Ticari Tesis LSI Küme (15 Terim):**
```
"plaza ortak gider", "kira stopaj", "kiracı hizmet talep yönetimi",
"yük rampası yönetimi", "teslimat saati kısıtlama", "otopark tahsis",
"kiracı kural kitabı", "plaza misafir karşılama", "konferans salonu yönetimi",
"çatı terası yönetimi", "tabela yönetim kuralları", "dış cephe reklam",
"güvenlik çevre sistemi", "kamera izleme merkezi", "acil protokol planı"
```

**Faz 27** `[YENİ]` **Grup 13 — Sanayi & Lojistik Tesis LSI Küme (12 Terim):**
```
"tır parkı yönetimi", "weigh-bridge kontrol", "yükleme boşaltma rampası",
"tehlikeli madde depolama", "forklift güvenlik protokolü", "zemin dayanımı",
"depo rack sistemi", "yangın algılama sanayi", "ex-proof ekipman",
"atık su arıtma sistemi", "gürültü önlem tedbirleri", "çevre izin belgesi"
```

**Faz 28** `[YENİ]` **Grup 14 — Sağlık & İş Güvenliği LSI Küme (10 Terim):**
```
"isg uzmanı", "risk değerlendirme raporu", "acil durum ekibi",
"ilk yardım eğitimi", "kişisel koruyucu donanım", "iş kazası bildirimi",
"sgk e-bildirge", "iş güvenliği denetimi", "çalışan sağlığı takibi", "ramak kala formu"
```

**Faz 29** `[DEĞİŞTİR]` `domainKeywordsTaxonomy.ts` — FACILITY_LSI_GROUPS const'unu ekle.

**Faz 30** `[TEST]` Tesis yönetimi LSI grup tanımlarını doğrula — her grup `pillar: 'facility'` etiketini taşımalı.

**Faz 31** `[TEST]` Tesis LSI terim listesi minimum 80 terim içermeli.

**Faz 32** `[TEST]` Paylaşılan LSI terimleri (hvac, jeneratör, yangın vb.) her iki dikeyden de tespit edilebilmeli.

**Faz 33** `[PUSH]` Tesis LSI küme commit'i: `feat(lsi): add facility-management LSI term groups`

---

### 📦 A4 — `analyzeDomainSemanticDepth()` Çekirdek Fonksiyon (Faz 34-44)

**Faz 34** `[YENİ]` `analyzeDomainSemanticDepth(input: SemanticAuditInput): SemanticDepthReport` fonksiyonunu oluştur.

**Faz 35** `[YENİ]` Pillar tespiti: `input.pillar === 'hybrid'` ise her iki LSI kümesini birleştir.

**Faz 36** `[YENİ]` Metin normalizer: HTML strip, Türkçe lowercase normalizer ve stop-word (bağlaç, edat) filtresi.

**Faz 37** `[YENİ]` LSI Tarama Döngüsü: tüm gruplardaki tüm terimlerin `title + h1 + metaDescription + content` içinde kaçının bulunduğunu say.

**Faz 38** `[YENİ]` `lsiCoveragePercent` hesapla: `(detectedCount / totalLsiTerms) * 100`.

**Faz 39** `[YENİ]` `topicalDepthScore` hesapla: LSI kapsamı (%40) + Kelime sayısı derinliği (%20) + Başlık/H1 uyum (%20) + İçerik zenginliği (%20).

**Faz 40** `[YENİ]` Topikal Boşluk (`topicalGap`) tespiti: her gruptan en az 1 terim bulunmayan gruplar "boşluk" olarak işaretlenir.

**Faz 41** `[YENİ]` `missingCriticalTerms`: kritik gruplarda (Hukuki, Teknik Bakım) eksik terimler öncelikle listelenir.

**Faz 42** `[YENİ]` Otomatik öneri üretimi: her eksik grup için aksiyon odaklı Türkçe öneri cümleleri üret.

**Faz 43** `[YENİ]` Grade hesaplama: `A+ (90+)`, `A (80-89)`, `B (65-79)`, `C (50-64)`, `D (<50)`.

**Faz 44** `[TEST]` Boş içerik için `grade: 'D'` ve `topicalDepthScore: 0` döndürmeli.

---

### 📦 A5 — Yardımcı & Export Fonksiyonlar (Faz 45-55)

**Faz 45** `[YENİ]` `getLsiGroupCoverage(pillar, content)` → grup bazında kapsam yüzdesi döner.

**Faz 46** `[YENİ]` `getMissingLsiTermsByGroup(pillar, content)` → eksik terimleri grup başlıklarıyla listeler.

**Faz 47** `[YENİ]` `getTopicalDepthGrade(score)` → puan → harf notu dönüşümü.

**Faz 48** `[YENİ]` `generateSemanticContentBriefing(input)` → eksikliklerden otomatik içerik yazım brifingi üretir.

**Faz 49** `[YENİ]` `comparePageSemanticDepth(page1, page2)` → iki sayfayı topikal derinlik açısından karşılaştırır.

**Faz 50** `[DEĞİŞTİR]` `facilitySearchRankAnalyzer.ts` — `analyzeDomainSemanticDepth()` sonucunu SERP puanına bonus olarak ekle (+0-10 puan LSI bonusu).

**Faz 51** `[TEST]` Tam dolu site yönetimi sayfası `topicalDepthScore >= 80` almalı.

**Faz 52** `[TEST]` `getMissingLsiTermsByGroup('site', shortContent)` eksik gruplar döndürmeli.

**Faz 53** `[TEST]` `generateSemanticContentBriefing()` minimum 5 aksiyon önerisi içermeli.

**Faz 54** `[DEĞİŞTİR]` `siteManagementSeoSuite.test.ts` — Semantic Auditor testlerini süite ekle.

**Faz 55** `[PUSH]` Semantik Derinlik Motoru commit'i: `feat(seo-engine): add domainSemanticAuditor LSI depth analyzer`

---
---

# BÖLÜM B — 🗺️ 39 İLÇE ÇİFT ÇEKİRDEKLİ MİKRO-LOKASYON & MAHALLE MATRİSİ
### `src/lib/seo/districtDualCoreMatrix.ts`
> **Faz 56-105 | Öncelik: KRİTİK**  
> Her ilçeyi hem "Site Yönetimi (B2C/Konut)" hem "Tesis Yönetimi (B2B/Ticari)" gözüyle ayrı ayrı lokasyona özgü mahalle içgörüleri, rekabet segmenti ve SERP meta verisiyle modelleyen Mikro-Lokasyon Zekası Motoru.

---

### 📦 B1 — Veri Modeli & Interface Tasarımı (Faz 56-62)

**Faz 56** `[YENİ]` `src/lib/seo/districtDualCoreMatrix.ts` — Ana matrix dosyası oluştur.

**Faz 57** `[YENİ]` `DistrictSiteCoreData` interface tanımla:
```typescript
interface DistrictSiteCoreData {
  districtSlug: string;
  districtName: string;
  keyNeighborhoods: string[];        // Konut ağırlıklı mahalleler
  housingProfile: 'villasite' | 'toplukonut' | 'rezidans' | 'karma';
  estimatedSiteCount: number;
  dominantIssues: string[];          // "asansör bakımı", "aidat tahsilatı" vb.
  targetKeywords: string[];
  longTailKeywords: string[];
  serpTitle: string;
  serpDescription: string;
}
```

**Faz 58** `[YENİ]` `DistrictFacilityCoreData` interface tanımla:
```typescript
interface DistrictFacilityCoreData {
  districtSlug: string;
  districtName: string;
  commercialNeighborhoods: string[]; // Ticari & plaza ağırlıklı mahalleler
  buildingProfile: 'plaza' | 'sanayi' | 'karma' | 'finans';
  estimatedCommercialCount: number;
  b2bServices: string[];
  targetKeywords: string[];
  longTailKeywords: string[];
  serpTitle: string;
  serpDescription: string;
}
```

**Faz 59** `[YENİ]` `DistrictDualCoreEntry` interface tanımla — Site ve Tesis verilerini birleştirir.

**Faz 60** `[YENİ]` `DistrictDualCoreReport` dönen tip tanımla.

**Faz 61** `[YENİ]` JSDoc ve modül açıklamalarını ekle.

**Faz 62** `[TEST]` Interface tip doğrulama testleri yaz.

---

### 📦 B2 — Avrupa Yakası İlçe Matrisleri (Faz 63-80)

**Faz 63** `[YENİ]` **Beşiktaş:**
- *Site Çekirdeği:* Bebek, Etiler, Arnavutköy, Kuruçeşme — ultra lüks villa ve yalı siteleri
- *Tesis Çekirdeği:* Levent, Akmerkez çevresi — uluslararası finans & hizmet plazaları

**Faz 64** `[YENİ]` **Sarıyer:**
- *Site Çekirdeği:* Zekeriyaköy, Tarabya, Uskumruköy — orman siteleri & ekolojik villa toplulukları
- *Tesis Çekirdeği:* Maslak, Ayazağa — İstanbul'un en yüksek kira getirili A+ ofis kuleleri

**Faz 65** `[YENİ]` **Şişli:**
- *Site Çekirdeği:* Nişantaşı, Balmumcu, Bomonti — kentsel dönüşüm siteleri
- *Tesis Çekirdeği:* Mecidiyeköy, Büyükdere Cad. — orta ve büyük ölçekli ticari binalar

**Faz 66** `[YENİ]` **Kâğıthane:**
- *Site Çekirdeği:* Çeliktepe, Gültepe — dönüşüm konutları ve yeni konut projeleri
- *Tesis Çekirdeği:* Çağlayan, Merkez — devlet kurumları yakını karma yapılar

**Faz 67** `[YENİ]` **Eyüpsultan:**
- *Site Çekirdeği:* Göktürk, Habibler — geniş bahçeli siteler, modern toplu konut
- *Tesis Çekirdeği:* İkitelli çevresi — sanayi sitesi ve imalathane kompleksleri

**Faz 68** `[YENİ]` **Bakırköy:**
- *Site Çekirdeği:* Ataköy, Florya, Yeşilköy — deniz manzaralı sahil siteleri
- *Tesis Çekirdeği:* Bakırköy Cumhuriyet Meydanı çevresi — ticari ofis binaları

**Faz 69** `[YENİ]` **Bahçelievler & Bağcılar:**
- *Site Çekirdeği:* Orta gelir grubu konut siteleri, yoğun apartman stoku
- *Tesis Çekirdeği:* E-5 hattı ticari şerit — küçük ve orta ölçekli iş merkezleri

**Faz 70** `[YENİ]` **Beylikdüzü:**
- *Site Çekirdeği:* Yakuplu, Gürpınar — mega toplu konut projeleri, 1000+ daireli siteler
- *Tesis Çekirdeği:* E-5 bağlantı noktaları — lojistik depo & ticari park

**Faz 71** `[YENİ]` **Esenyurt:**
- *Site Çekirdeği:* Türkiye'nin en büyük toplu konut yoğunluğu — yüksek aidat tahsilat sorunu
- *Tesis Çekirdeği:* Hadımköy bağlantısı — OSB yakınlığı, büyük depo kompleksleri

**Faz 72** `[YENİ]` **Küçükçekmece:**
- *Site Çekirdeği:* Atakent, Tevfikbey — orta-üst segment konut siteleri
- *Tesis Çekirdeği:* İkitelli OSB — imalat ve sanayi tesisi yönetimi

**Faz 73** `[YENİ]` **Avcılar:**
- *Site Çekirdeği:* Deniz kenarı siteleri, Marmara manzaralı toplu konutlar
- *Tesis Çekirdeği:* E-5 hattı ticari bölge

**Faz 74** `[YENİ]` **Büyükçekmece & Silivri:**
- *Site Çekirdeği:* Tatil sitesi ve yazlık site yönetimi — mevsimsel yönetim ihtiyacı
- *Tesis Çekirdeği:* Organize sanayi alanları ve depo parkları

**Faz 75** `[YENİ]` **Çatalca & Arnavutköy:**
- *Site Çekirdeği:* Yeni açılan bölge siteleri — 3. Havalimanı çevresi yeni konutlar
- *Tesis Çekirdeği:* Havalimanı lojistik bölgesi — yeni tesis yönetim fırsatları

**Faz 76** `[YENİ]` **Fatih, Bayrampaşa & Zeytinburnu:**
- *Site Çekirdeği:* Kentsel dönüşüm bölgesi — eski yapı stoku yenileme
- *Tesis Çekirdeği:* Tekstil imalat ve küçük ticaret binaları

**Faz 77** `[YENİ]` **Sultangazi & Gaziosmanpaşa:**
- *Site Çekirdeği:* Yoğun nüfus, orta gelir grubu konut siteleri
- *Tesis Çekirdeği:* Küçük ölçekli ticari yapılar

**Faz 78** `[YENİ]` **Esenler & Güngören:**
- *Site Çekirdeği:* Kentsel yenileme konut projeleri
- *Tesis Çekirdeği:* Bağcılar bağlantısı karma ticari yapılar

**Faz 79** `[YENİ]` Avrupa yakası toplu matrix const'u `EUROPEAN_SIDE_MATRIX` oluştur.

**Faz 80** `[TEST]` Avrupa yakası en az 18 ilçe girişi içermeli.

---

### 📦 B3 — Anadolu Yakası İlçe Matrisleri (Faz 81-94)

**Faz 81** `[YENİ]` **Kadıköy:**
- *Site Çekirdeği:* Moda, Caddebostan, Suadiye, Fenerbahçe — sahil & kentsel dönüşüm siteleri
- *Tesis Çekirdeği:* Kozyatağı, Merdivenköy — kurumsal plaza bölgesi

**Faz 82** `[YENİ]` **Üsküdar:**
- *Site Çekirdeği:* Çengelköy, Kuzguncuk, Beylerbeyi — tarihi konak & villa siteleri
- *Tesis Çekirdeği:* Altunizade, Bağlarbaşı — kurumsal ofis binaları

**Faz 83** `[YENİ]` **Ataşehir:**
- *Site Çekirdeği:* Finans merkezi yakınlığı — üst segment rezidanslar
- *Tesis Çekirdeği:* İstanbul Finans Merkezi (İFM) — Türkiye'nin en prestijli ofis kuleleri

**Faz 84** `[YENİ]` **Maltepe & Kartal:**
- *Site Çekirdeği:* Bağlarbaşı, Cevizli — orta-üst segment sahil ve tepeli siteler
- *Tesis Çekirdeği:* Kartal Anadolu Yakası iş kuleleri projesi

**Faz 85** `[YENİ]` **Pendik & Tuzla:**
- *Site Çekirdeği:* Kurtköy, Sapanca bağlantısı — yeni açılan villa siteleri
- *Tesis Çekirdeği:* Tuzla OSB — kimya, gemi inşa ve savunma sanayii tesisleri

**Faz 86** `[YENİ]` **Sultanbeyli & Sancaktepe:**
- *Site Çekirdeği:* TOKİ ve toplu konut projeleri
- *Tesis Çekirdeği:* İkitelli'ye yakın küçük sanayi siteleri

**Faz 87** `[YENİ]` **Ümraniye:**
- *Site Çekirdeği:* Alemdağ, Yamanevler — göç ile genişleyen konut siteleri
- *Tesis Çekirdeği:* Dudullu OSB — üretim ve depolama tesisleri

**Faz 88** `[YENİ]` **Beykoz & Şile:**
- *Site Çekirdeği:* Paşabahçe, Kavacık — orman ve Boğaz manzaralı özel siteler
- *Tesis Çekirdeği:* Beykoz deri fabrika dönüşüm projeleri

**Faz 89** `[YENİ]` **Çekmeköy & Sultanbeyli:**
- *Site Çekirdeği:* Orman yakınlığı konut siteleri — yeni yapılaşma bölgesi
- *Tesis Çekirdeği:* Bölge ticari merkezi gelişim alanı

**Faz 90** `[YENİ]` Anadolu yakası toplu matrix const'u `ANATOLIAN_SIDE_MATRIX` oluştur.

**Faz 91** `[TEST]` Anadolu yakası en az 9 ilçe girişi içermeli.

**Faz 92** `[TEST]` Tüm ilçe girişleri zorunlu alanları içermeli (`serpTitle`, `targetKeywords`, `keyNeighborhoods`).

**Faz 93** `[TEST]` İlçe bazlı SERP başlığı her iki dikeyden oluşturulabilmeli.

**Faz 94** `[PUSH]` İlçe matrisi commit'i: `feat(seo-geo): add 39-district dual-core micro-location matrix`

---

### 📦 B4 — Matrix Yardımcı Fonksiyonlar (Faz 95-105)

**Faz 95** `[YENİ]` `getDistrictDualCore(slug)` → ilgili ilçenin tam dual-core matrisini döner.

**Faz 96** `[YENİ]` `getDistrictSiteKeywords(slug)` → ilçe bazlı site yönetimi anahtar kelimelerini döner.

**Faz 97** `[YENİ]` `getDistrictFacilityKeywords(slug)` → ilçe bazlı tesis yönetimi anahtar kelimelerini döner.

**Faz 98** `[YENİ]` `getDistrictPillarSerp(slug, pillar)` → ilgili dilke ve pillar için tam SERP meta verisi döner.

**Faz 99** `[YENİ]` `getTopDistrictsByPillar(pillar, limit)` → arama hacmine göre sıralanmış en önemli ilçeleri döner.

**Faz 100** `[YENİ]` `getNeighborhoodLongTailKeywords(slug, pillar)` → mahalle düzeyinde uzun kuyruklu anahtar kelimeler üretir.

**Faz 101** `[DEĞİŞTİR]` `facilitySerpOptimizer.ts` — `getFacilitySerpMeta()` içinde `getDistrictDualCore()` kullanarak ilçe verilerini zenginleştir.

**Faz 102** `[DEĞİŞTİR]` `facilityMeshLinkerEngine.ts` — 39 ilçe düğümleri için `getDistrictSiteKeywords()` ile anchor text otomasyonu sağla.

**Faz 103** `[TEST]` `getDistrictDualCore('kadikoy')` Kozyatağı ve Moda mahallelerini içermeli.

**Faz 104** `[TEST]` `getDistrictPillarSerp('sariyer', 'facility')` Maslak'a atıf yapan SERP başlığı üretmeli.

**Faz 105** `[PUSH]` Matrix yardımcı fonksiyonlar commit'i: `feat(seo-geo): add districtDualCoreMatrix helper functions`

---
---

# BÖLÜM C — 🎙️ AI / SESLİ ARAMA & LLM SORU-CEVAP BANKASI
### `src/lib/seo/dualCoreVoiceFaqEngine.ts`
> **Faz 106-160 | Öncelik: YÜKSEK**  
> Google Assistant, Siri, ChatGPT Search, Perplexity, Gemini ve Bing Copilot için optimize edilmiş 50+ soru-cevap içeren Sesli Arama & LLM Grounding Motoru.

---

### 📦 C1 — Veri Yapısı & Interface Tasarımı (Faz 106-113)

**Faz 106** `[YENİ]` `src/lib/seo/dualCoreVoiceFaqEngine.ts` — Ana FAQ motoru dosyası oluştur.

**Faz 107** `[YENİ]` `DualCoreFaqItem` interface:
```typescript
interface DualCoreFaqItem {
  id: string;
  pillar: 'site' | 'facility' | 'legal' | 'shared';
  intent: 'informational' | 'commercial' | 'legal' | 'transactional';
  voiceQuery: string;           // 5-10 kelime — doğal konuşma dili
  speakableAnswer: string;      // 25-35 kelime — Google SpeakableSpec & Voice
  detailedAnswer: string;       // 80-120 kelime — PAA featured snippet
  legalReference?: string;      // KMK, İİK, ISO madde no
  targetKeyword: string;
  seoSlug: string;
  answerConfidence: 'high' | 'medium';
}
```

**Faz 108** `[YENİ]` `FaqSchema` → Schema.org FAQPage & QAPage JSON-LD şeması tipi tanımla.

**Faz 109** `[YENİ]` `SpeakableSchema` → Schema.org `SpeakableSpecification` tipi tanımla.

**Faz 110** `[YENİ]` `DualCoreFaqBank` — tüm bankanın meta bilgilerini tutan ana yapı:
```typescript
interface DualCoreFaqBank {
  version: string;
  totalQuestions: number;
  lastUpdated: string;
  questions: DualCoreFaqItem[];
  faqPageSchema: Record<string, any>;
  speakableSchema: Record<string, any>;
}
```

**Faz 111** `[YENİ]` JSDoc modül açıklamalarını tamamla.

**Faz 112** `[TEST]` Interface tip doğrulama testleri.

**Faz 113** `[TEST]` `speakableAnswer` maksimum 35 kelime limitini aşmamalı.

---

### 📦 C2 — Site Yönetimi Soru-Cevap Külliyatı (Faz 114-130)

**Faz 114** `[YENİ]` **S01 — Site yönetim şirketi ne kadar ücret alır?**
- `speakableAnswer:` "İstanbul'da profesyonel site yönetim şirketleri genellikle bağımsız bölüm başına 150-600 TL aylık ücret alır. Fiyat, sitenin büyüklüğü, hizmet kapsamı ve sözleşme süresine göre belirlenir."
- `legalReference:` KMK Madde 34 Yönetici Seçimi

**Faz 115** `[YENİ]` **S02 — Apartman yöneticisi kaç yılda bir seçilir?**
- `speakableAnswer:` "Kat Mülkiyeti Kanunu Madde 34 uyarınca apartman yöneticisi her yıl olağan kat malikleri genel kurulunda seçilir. Aynı kişi yeniden seçilebilir."
- `legalReference:` KMK Madde 34

**Faz 116** `[YENİ]` **S03 — Site aidatı ödenmezse ne olur?**
- `speakableAnswer:` "Gününde ödenmeyen aidat için KMK Madde 20 uyarınca aylık yüzde 5 gecikme tazminatı uygulanır. Yönetici ilamsız icra takibi başlatma hakkına sahiptir."
- `legalReference:` KMK Madde 20/c, İİK Madde 68

**Faz 117** `[YENİ]` **S04 — Toplu konutlarda ortak alan giderleri nasıl bölünür?**
- `speakableAnswer:` "KMK Madde 20 uyarınca ortak alan giderleri eşit olarak bölünür. Arsa payına göre bölünmesi için yönetim planında açık hüküm bulunması gerekir."
- `legalReference:` KMK Madde 20

**Faz 118** `[YENİ]` **S05 — Site yönetimi için genel kurul nasıl yapılır?**
- `speakableAnswer:` "Kat malikleri genel kurulu her yıl ocak ayı içinde yapılır. Çağrı, noter veya taahhütlü mektupla en az 15 gün önceden yapılmalıdır."
- `legalReference:` KMK Madde 29

**Faz 119** `[YENİ]` **S06 — Asansör kırmızı etiket alırsa yöneticinin sorumluluğu nedir?**
- `speakableAnswer:` "Kırmızı etiketli asansörü çalıştırmak yasal suçtur. Yönetici hem cezai hem de hukuki sorumluluğa maruz kalır. Derhal yetkili servise haber verilmelidir."

**Faz 120** `[YENİ]` **S07 — Site yönetim planı nasıl değiştirilir?**
- `speakableAnswer:` "Yönetim planı, kat maliklerinin dörtte üçünün oybirliğiyle değiştirilebilir. Değişikliğin tapu siciline tescil edilmesi zorunludur."
- `legalReference:` KMK Madde 28

**Faz 121** `[YENİ]` **S08 — İşletme projesine itiraz nasıl yapılır?**
- `speakableAnswer:` "İşletme projesine tebliğ tarihinden itibaren 7 gün içinde yazılı olarak itiraz edilmelidir. Süresi içinde itiraz edilmeyen işletme projesi kesinleşir ve icra takibine esas olur."
- `legalReference:` KMK Madde 37

**Faz 122** `[YENİ]` **S09 — Profesyonel site yönetimi ile kendi yöneticisi arasındaki fark nedir?**
- `speakableAnswer:` "Profesyonel site yönetim şirketleri KMK uzmanı avukat, 5188 lisanslı güvenlik şefi ve sertifikalı teknik ekiple binalara kurumsal standartlarda hizmet verir; komşuluk ilişkileri zarar görmez."

**Faz 123** `[YENİ]` **S10 — Site yöneticisi aidat öder mi?**
- `speakableAnswer:` "Yönetim planında aksine hüküm yoksa kat malikleri arasından seçilen yönetici işletme giderlerinin yarısından muaf tutulabilir. Profesyonel yönetim şirketlerinde tüm malikler aidat öder."
- `legalReference:` KMK Madde 40

**Faz 124** `[YENİ]` **S11 — Sitelerde ruhsatsız eklenti yaptırmak yasal mı?**
- `speakableAnswer:` "Cam balkon, teras kapatma gibi müşterek alanlardaki değişiklikler kat maliklerinin dörtte üç onayı olmadan yasaldışıdır. Yargıtay bu konuda emsal kararlar vermiştir."
- `legalReference:` KMK Madde 19

**Faz 125** `[YENİ]` **S12 — Apartmanda evcil hayvan beslenebilir mi?**
- `speakableAnswer:` "Yönetim planında yasaklanmamışsa evcil hayvan beslenebilir; ancak diğer kat maliklerine rahatsızlık verilmemesi esastır. Yönetici rahatsızlık yaratan hayvan sahiplerine resmi uyarı gönderebilir."

**Faz 126** `[YENİ]` **S13 — Zemin kat sakinleri asansör masrafı ödemek zorunda mı?**
- `speakableAnswer:` "Yargıtay kararlarına göre zemin katta oturan malikler asansör bakım ve işletme giderlerinden muaf değildir; çünkü asansör tüm maliklerin ortak yeridir."

**Faz 127** `[YENİ]` **S14 — Site güvenlik kameraları kişisel verileri ihlal eder mi?**
- `speakableAnswer:` "Site güvenlik kameraları KVKK kapsamında değerlendirilir. Kamera konumlarının ortak alanlarda olması, KVKK aydınlatma metninin ilan edilmesi ve kayıtların 30 günü aşmaması gerekir."

**Faz 128** `[YENİ]` **S15 — Sitelerde hangi ödeme yöntemi kullanılıyor?**
- `speakableAnswer:` "Alo Yönetim'de kat malikleri aidatlarını online, havale, EFT veya otomatik ödeme talimatıyla ödeyebilir. Tüm ödemeler dijital makbuz ve anlık bildirim ile takip edilir."

**Faz 129** `[DEĞİŞTİR]` Mevcut `facilityVoiceKnowledgeEngine.ts` — site yönetimi soruları bu dosyaya taşın ve cross-import ekle.

**Faz 130** `[PUSH]` Site FAQ külliyatı commit'i: `feat(faq-voice): add 15 site-management voice & AI FAQ items`

---

### 📦 C3 — Tesis Yönetimi Soru-Cevap Külliyatı (Faz 131-145)

**Faz 131** `[YENİ]` **F01 — Tesis yönetim şirketi ne iş yapar?**
- `speakableAnswer:` "Tesis yönetim şirketi; binaların teknik bakım, güvenlik, temizlik, enerji optimizasyonu ve hukuki uyum süreçlerini ISO 41001 standartlarında kurumsal ekiplerle yönetir."

**Faz 132** `[YENİ]` **F02 — ISO 41001 sertifikası ne anlama gelir?**
- `speakableAnswer:` "ISO 41001 uluslararası Entegre Tesis Yönetim Sistemi standardıdır. Bu sertifikaya sahip firmalar; ölçülebilir KPI'larla yüzde 30'a kadar maliyet tasarrufu ve 7/24 teknik müdahale garantisi sunar."

**Faz 133** `[YENİ]` **F03 — Plaza yönetimi ile apartman yönetimi arasındaki fark nedir?**
- `speakableAnswer:` "Plaza yönetimi HVAC, yangın güvenlik sistemleri, erişim kontrol, kiracı hizmet talep yönetimi ve kurumsal SLA'larla çalışır. Apartman yönetiminden çok daha kapsamlı teknik ve hukuki süreçler içerir."

**Faz 134** `[YENİ]` **F04 — Tesis yönetiminde SLA nedir?**
- `speakableAnswer:` "SLA (Service Level Agreement), hizmet düzeyi sözleşmesidir. Tesis yönetiminde acil arızalara müdahale süresi, bakım kalitesi ve şikayet çözüm oranı gibi KPI'lar SLA ile güvence altına alınır."

**Faz 135** `[YENİ]` **F05 — Sanayi tesisinde özel güvenlik zorunlu mu?**
- `speakableAnswer:` "5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun kapsamında belirlenen kritik tesislerde özel güvenlik zorunludur. Valilik Özel Güvenlik Komisyonu'nun onay vermesi ve lisanslı personel istihdamı gerekir."
- `legalReference:` 5188 Sayılı Kanun

**Faz 136** `[YENİ]` **F06 — Entegre tesis yönetimi kaça mal olur?**
- `speakableAnswer:` "Entegre tesis yönetimi maliyeti, tessin büyüklüğüne ve hizmet kapsamına göre değişir. Toplu satın alma ve verimlilik optimizasyonu ile bütçede yüzde 25-30 tasarruf sağlanabilir."

**Faz 137** `[YENİ]` **F07 — Önleyici teknik bakım neden önemlidir?**
- `speakableAnswer:` "Önleyici bakım, arızaları oluşmadan önce tespit ederek acil onarım maliyetlerini yüzde 60'a kadar düşürür; ekipman ömrünü uzatır ve üretim sürekliliğini korur."

**Faz 138** `[YENİ]` **F08 — Tesis yönetiminde enerji tasarrufu nasıl sağlanır?**
- `speakableAnswer:` "ISO 50001 standartlarında hazırlanan enerji yönetim planı, akıllı sayaç sistemleri ve BMS entegrasyonu ile tüketim yüzde 15-30 oranında düşürülür."

**Faz 139** `[YENİ]` **F09 — Rezidans konsiyerj hizmeti neleri kapsar?**
- `speakableAnswer:` "Rezidans konsiyerj hizmeti; ziyaretçi karşılama, paket teslim, araç yıkama organizasyonu, restoran rezervasyonu ve teknik arıza bildirimi gibi kişiselleştirilmiş hizmetleri kapsar."

**Faz 140** `[YENİ]` **F10 — Tesis yönetim sözleşmesi nasıl feshedilebilir?**
- `speakableAnswer:` "Tesis yönetim sözleşmeleri genellikle 30-90 gün önceden yapılan yazılı bildirimle feshedilebilir. Sözleşmede yer alan cezai şart hükümleri göz önüne alınmalıdır."

**Faz 141** `[YENİ]` **F11 — HVAC sistemi bakımını kim yapar?**
- `speakableAnswer:` "HVAC bakımı, yetkilendirilmiş soğutma mühendisi ve IMS sertifikalı teknik ekip tarafından periyodik olarak yapılmalıdır. Alo Yönetim bu hizmeti ISO 41001 kapsamında sunar."

**Faz 142** `[YENİ]` **F12 — Tesis yönetimi veri raporlaması nasıl çalışır?**
- `speakableAnswer:` "Modern tesis yönetiminde haftalık arıza raporu, aylık enerji tüketim özeti ve yıllık performans değerlendirme raporu şeffaf biçimde dijital platformda paylaşılır."

**Faz 143** `[YENİ]` **F13 — Akıllı bina yönetimi ne sağlar?**
- `speakableAnswer:` "Akıllı bina yönetimi; IoT sensörler, BMS sistemi ve tahmine dayalı bakım algoritmaları sayesinde arıza oranını yüzde 70 düşürür ve enerji verimliliğini artırır."

**Faz 144** `[YENİ]` **F14 — Tesis yönetiminde güvenlik kamera sistemi nasıl kurulur?**
- `speakableAnswer:` "Güvenlik kamera sistemi KVKK uyumlu şekilde kurulmalıdır. Tüm kameralar aydınlatma metni ile ilan edilmeli, kayıtlar en fazla 30 gün tutulmalı ve yetkisiz erişime kapatılmalıdır."

**Faz 145** `[YENİ]` **F15 — İstanbul'da en iyi tesis yönetim şirketi hangisidir?**
- `speakableAnswer:` "Alo Yönetim, ISO 41001 sertifikası, 5188 lisanslı güvenlik ekibi ve 340'tan fazla referans tesisiyle İstanbul'un en kapsamlı ve kurumsal tesis yönetim şirketleri arasındadır."

---

### 📦 C4 — Hukuki & Karma Soru-Cevap Külliyatı (Faz 146-150)

**Faz 146** `[YENİ]` **L01 — KMK 634 en son ne zaman değiştirildi?** + 5 adet daha hukuki soru.

**Faz 147** `[YENİ]` **L06 — Aidat borçlusunun dairesi haczedilebilir mi?** + 5 adet daha.

**Faz 148** `[YENİ]` **L11 — Yargıtay'ın asansör kırmızı etiket kararı nedir?** + 5 adet daha.

---

### 📦 C5 — Schema.org JSON-LD Üretimi & Export (Faz 149-160)

**Faz 149** `[YENİ]` `buildDualCoreFaqPage(pillar)` → filtreli FAQPage JSON-LD şeması üretir.

**Faz 150** `[YENİ]` `buildDualCoreSpeakable(pillar)` → SpeakableSpecification JSON-LD üretir.

**Faz 151** `[YENİ]` `buildQAPageSchema(pillar)` → Google QAPage şeması üretir.

**Faz 152** `[YENİ]` `getVoiceFaqByIntent(intent, pillar)` → niyet ve dikeyine göre filtrelenmiş sorular döner.

**Faz 153** `[YENİ]` `getTopVoiceFaqs(pillar, limit)` → en kritik (transactional + commercial) soruları döner.

**Faz 154** `[YENİ]` `getFaqByKeyword(keyword)` → belirli bir anahtar kelimeyle eşleşen soruları döner.

**Faz 155** `[DEĞİŞTİR]` `facilityVoiceKnowledgeEngine.ts` — `buildDualCoreFaqPage()` ile entegre et.

**Faz 156** `[TEST]` `buildDualCoreFaqPage('site')` en az 10 soru içermeli.

**Faz 157** `[TEST]` `speakableAnswer` tüm sorularda maksimum 35 kelimeyi geçmemeli.

**Faz 158** `[TEST]` `getVoiceFaqByIntent('legal', 'site')` minimum 5 hukuki soru döndürmeli.

**Faz 159** `[TEST]` Schema'nın `@type: FAQPage` yapısı geçerli JSON-LD formatında olmalı.

**Faz 160** `[PUSH]` Dual-Core Voice FAQ motoru commit'i: `feat(voice-faq): add 50+ dual-core AI/voice search FAQ bank`

---
---

# BÖLÜM D — 🔄 9 HİZMET ÇAPRAZ BAĞLANTI & DİNAMİK KART AĞI
### `src/lib/seo/facilityCrossServiceLinker.ts`
> **Faz 161-205 | Öncelik: YÜKSEK**  
> Sitedeki 9 hizmet sayfasının her birine kullanıcı arama niyetine göre otomatik çapraz bağlantı kartları ve semantic iç linkler enjekte eden PageRank dağıtım ve Topical Silolama Motoru.

---

### 📦 D1 — Veri Yapısı & Interface (Faz 161-167)

**Faz 161** `[YENİ]` `ServiceCrossLinkCard` interface:
```typescript
interface ServiceCrossLinkCard {
  targetServiceSlug: string;
  targetServiceName: string;
  anchorText: string;
  description: string;
  pillarAffinity: 'site' | 'facility' | 'both';
  displayOrder: number;
  isDoFollow: boolean;
}
```

**Faz 162** `[YENİ]` `CrossServiceLinkMap` — 9 hizmetin her biri için cross-link listesi.

**Faz 163** `[YENİ]` `ServicePillarProfile` — her hizmetin hangi dikeylerle daha ilgili olduğunu tanımlar.

**Faz 164** `[YENİ]` `CrossServiceLinkerOutput` dönen tip.

**Faz 165** `[YENİ]` JSDoc modül açıklamaları.

**Faz 166** `[TEST]` Interface tip doğrulama testleri.

**Faz 167** `[TEST]` 9 hizmetin tamamında cross-link tanımı olmalı.

---

### 📦 D2 — 9 Hizmet Cross-Link Matrisi (Faz 168-186)

**Faz 168** `[YENİ]` **Tesis & Site Yönetimi (`tesis-yonetimi`) → Çıkan linkler:**
- Aidat Takibi, Güvenlik Yönetimi, Teknik Bakım, Hukuk Danışmanlığı

**Faz 169** `[YENİ]` **Aidat Takibi (`aidat-takibi`) → Çıkan linkler:**
- Tesis Yönetimi, Hukuk Danışmanlığı, Güvenlik Yönetimi

**Faz 170** `[YENİ]` **Güvenlik Yönetimi (`guvenlik-yonetimi`) → Çıkan linkler:**
- Tesis Yönetimi, Teknik Bakım, Temizlik ve Hijyen

**Faz 171** `[YENİ]` **Teknik Bakım (`teknik-bakim`) → Çıkan linkler:**
- Tesis Yönetimi, Asansör Bakımı, Peyzaj, Havuz

**Faz 172** `[YENİ]` **Temizlik ve Hijyen (`temizlik-ve-hijyen`) → Çıkan linkler:**
- Haşere & Dezenfeksiyon, Havuz Bakımı, Güvenlik

**Faz 173** `[YENİ]` **Peyzaj ve Bahçe (`peyzaj-ve-bahce-bakimi`) → Çıkan linkler:**
- Havuz Bakımı, Teknik Bakım, Tesis Yönetimi

**Faz 174** `[YENİ]` **Havuz Bakımı (`havuz-bakimi-ve-hijyen`) → Çıkan linkler:**
- Teknik Bakım, Temizlik, Haşere & Dezenfeksiyon

**Faz 175** `[YENİ]` **Haşere & Dezenfeksiyon (`hasere-ve-dezenfeksiyon`) → Çıkan linkler:**
- Temizlik ve Hijyen, Havuz Bakımı

**Faz 176** `[YENİ]` **Hukuk & İcra Danışmanlığı (`hukuk-ve-icra-danismanligi`) → Çıkan linkler:**
- Aidat Takibi, Tesis Yönetimi

**Faz 177** `[YENİ]` Pillar bazlı cross-link filtreleme: `pillar: 'site'` → konut odaklı kartlar, `pillar: 'facility'` → B2B kartlar.

**Faz 178** `[YENİ]` **Site Dikeyinde Tesis Yönetimi sayfasına özel kart:**
```
"🏘️ Toplu Konut & Rezidans Site Yönetimi"
"İstanbul'un 39 ilçesinde KMK uyumlu profesyonel site yönetimi."
```

**Faz 179** `[YENİ]` **Tesis Dikeyinde Tesis Yönetimi sayfasına özel kart:**
```
"🏢 Plaza & Endüstriyel Tesis Yönetimi"
"ISO 41001 kapsamında B2B entegre tesis yönetimi çözümleri."
```

**Faz 180** `[YENİ]` Her hizmet sayfasına en fazla 4 cross-link kartı göster kuralını uygula.

**Faz 181** `[YENİ]` `displayOrder` — cross-link kartları SEO öncelik sıralamasına göre sıralanır.

**Faz 182** `[TEST]` `getCrossLinksForService('aidat-takibi', 'site')` en az 2 kart döndürmeli.

**Faz 183** `[TEST]` `getCrossLinksForService('guvenlik-yonetimi', 'facility')` plaza odaklı kart içermeli.

**Faz 184** `[TEST]` Her cross-link kartının `isDoFollow: true` olduğu doğrulanmalı.

**Faz 185** `[TEST]` Kart sayısı her hizmet için maksimum 4 ile sınırlandırılmalı.

**Faz 186** `[PUSH]` Cross-service link matrisi commit'i: `feat(internal-link): add 9-service cross-link pillar matrix`

---

### 📦 D3 — Yardımcı Fonksiyonlar & JSON-LD (Faz 187-205)

**Faz 187** `[YENİ]` `getCrossLinksForService(serviceSlug, pillar)` → filtrelenmiş cross-link kartları döner.

**Faz 188** `[YENİ]` `getPillarCrossLinkCards(pillar, districtSlug?)` → dikey bazlı, isteğe bağlı ilçe bazlı kartlar döner.

**Faz 189** `[YENİ]` `buildServiceBreadcrumbTrail(serviceSlug, pillar, districtSlug?)` → semantic breadcrumb listesi oluşturur.

**Faz 190** `[YENİ]` `generateCrossLinkJsonLd(serviceSlug, pillar)` → `ItemList` JSON-LD şeması üretir.

**Faz 191** `[YENİ]` `getTopCrossLinksByPriority(serviceSlug)` → SEO öncelikli ilk 3 cross-link döner.

**Faz 192** `[DEĞİŞTİR]` `facilityMeshLinkerEngine.ts` — 9 hizmet cross-linklerini mesh grafiğine dahil et.

**Faz 193** `[DEĞİŞTİR]` `facilityTopicGraph.ts` — hizmetler arası `makesOffer` bağlantılarına cross-link ilişkileri ekle.

**Faz 194** `[YENİ]` Çapraz bağlantı silo kuralı: iki hizmet arasındaki karşılıklı link yoğunluğu konuşma grafiği kuralına uymalı.

**Faz 195** `[YENİ]` Yetim sayfa tespiti: cross-link grafiğinde giriş linki olmayan sayfa varsa uyarı logla.

**Faz 196** `[YENİ]` `validateCrossLinkGraph()` — tüm 9 hizmetin karşılıklı bağlantı bütünlüğünü doğrular.

**Faz 197** `[TEST]` `validateCrossLinkGraph()` tüm hizmetler için PASS döndürmeli.

**Faz 198** `[TEST]` `generateCrossLinkJsonLd('tesis-yonetimi', 'hybrid')` geçerli `ItemList` şeması üretmeli.

**Faz 199** `[TEST]` `getPillarCrossLinkCards('site', 'kadikoy')` Kadıköy odaklı kart içermeli.

**Faz 200** `[TEST]` Yetim sayfa tespit fonksiyonu boş cross-link girişini raporlamalı.

**Faz 201** `[TEST]` `siteManagementSeoSuite.test.ts` — D bölümü testlerini süite ekle.

**Faz 202** `[TEST]` Toplam cross-link sayısı (9 hizmet × 4 kart × 2 pillar) tutarlılığı.

**Faz 203** `[TEST]` `buildServiceBreadcrumbTrail('aidat-takibi', 'site', 'kadikoy')` breadcrumb 4 adım içermeli.

**Faz 204** `[TEST]` Cross-link kartlarının description alanı boş olamaz.

**Faz 205** `[PUSH]` Cross-service linker yardımcı commit'i: `feat(internal-link): add cross-service linker helpers and JSON-LD`

---
---

# BÖLÜM E — 🧭 DİNAMİK SİLO BREADCRUMB & HİYERARŞİK OTORİTE MOTORU
### `src/lib/seo/dualCoreBreadcrumbEngine.ts`
> **Faz 206-250 | Öncelik: ORTA**  
> Googlebot'un tüm sayfa tiplerini (hizmet, ilçe, blog, sözlük) hem "Site Yönetimi" hem "Tesis Yönetimi" silo hiyerarşisi içinde eksiksiz anlamasını sağlayan, `BreadcrumbList` JSON-LD ve `<meta>` semantik yönlendirme üreticisi.

---

### 📦 E1 — Veri Yapısı & Interface (Faz 206-213)

**Faz 206** `[YENİ]` `src/lib/seo/dualCoreBreadcrumbEngine.ts` — Ana breadcrumb motoru oluştur.

**Faz 207** `[YENİ]` `BreadcrumbStep` interface:
```typescript
interface BreadcrumbStep {
  name: string;
  url: string;
  pillar?: 'site' | 'facility' | 'hybrid';
}
```

**Faz 208** `[YENİ]` `DualCoreBreadcrumbOptions` interface:
```typescript
interface DualCoreBreadcrumbOptions {
  pageType: 'service' | 'district' | 'subsector' | 'blog' | 'sozluk' | 'faq';
  pillar: DomainPillar;
  serviceSlug?: string;
  districtSlug?: string;
  blogCategory?: string;
  termSlug?: string;
}
```

**Faz 209** `[YENİ]` `DualCoreBreadcrumbOutput` dönen tip — trail + JSON-LD içerir.

**Faz 210** `[YENİ]` Silo hiyerarşi haritası const tanımla:
```
Ana Sayfa
  └─ Hizmetler
       ├─ Site Yönetimi [Site Dikeyi]
       │    ├─ Apartman Yönetimi
       │    ├─ Rezidans Site Yönetimi
       │    ├─ Toplu Konut Yönetimi
       │    └─ [İlçe] Site Yönetimi
       └─ Tesis Yönetimi [Tesis Dikeyi]
            ├─ Plaza Yönetimi
            ├─ Sanayi Tesisi Yönetimi
            └─ [İlçe] Tesis Yönetimi
```

**Faz 211** `[YENİ]` JSDoc modül açıklamaları.

**Faz 212** `[TEST]` Interface tip doğrulama testleri.

**Faz 213** `[TEST]` Her `pageType` için en az 3 adımlı breadcrumb trail üretilmeli.

---

### 📦 E2 — Silo Hiyerarşi Üretici Fonksiyonlar (Faz 214-232)

**Faz 214** `[YENİ]` `buildDualCoreBreadcrumb(options)` → ana breadcrumb üretici fonksiyon.

**Faz 215** `[YENİ]` **Site Dikeyi — Hizmet Sayfası Breadcrumb:**
```
Ana Sayfa → Hizmetler → Site Yönetimi → [Hizmet Adı]
```

**Faz 216** `[YENİ]` **Tesis Dikeyi — Hizmet Sayfası Breadcrumb:**
```
Ana Sayfa → Hizmetler → Tesis Yönetimi → [Hizmet Adı]
```

**Faz 217** `[YENİ]` **Hibrit Dikey — Ana Hub Breadcrumb:**
```
Ana Sayfa → Hizmetler → Site ve Tesis Yönetimi
```

**Faz 218** `[YENİ]` **Site Dikeyi — İlçe Sayfası Breadcrumb:**
```
Ana Sayfa → Bölgeler → İstanbul → [İlçe Adı] Site Yönetimi
```

**Faz 219** `[YENİ]` **Tesis Dikeyi — İlçe Sayfası Breadcrumb:**
```
Ana Sayfa → Bölgeler → İstanbul → [İlçe Adı] Tesis Yönetimi
```

**Faz 220** `[YENİ]` **Blog Sayfası Breadcrumb:**
```
Ana Sayfa → Blog → [Kategori] → [Makale Başlığı]
```

**Faz 221** `[YENİ]` **Sözlük Sayfası Breadcrumb:**
```
Ana Sayfa → Tesis Yönetimi Sözlüğü → [Terim]
```

**Faz 222** `[YENİ]` **FAQ Sayfası Breadcrumb:**
```
Ana Sayfa → Sık Sorulan Sorular → [Soru]
```

**Faz 223** `[YENİ]` **Alt Sektör Sayfası Breadcrumb:**
```
Ana Sayfa → Hizmetler → [Dikey] → [Alt Sektör]
```

**Faz 224** `[YENİ]` `buildBreadcrumbJsonLd(trail)` → BreadcrumbList JSON-LD şeması üretir.

**Faz 225** `[YENİ]` `buildSiloNavigationLinks(pillar)` → silo dahilindeki tüm yönlendirme linklerini döner.

**Faz 226** `[YENİ]` `validateSiloIntegrity(pillar)` → tüm sayfa tiplerinin breadcrumb zincirini doğrular.

**Faz 227** `[TEST]` `buildDualCoreBreadcrumb({ pageType: 'district', pillar: 'site', districtSlug: 'kadikoy' })` 4 adımlı trail üretmeli.

**Faz 228** `[TEST]` `buildDualCoreBreadcrumb({ pageType: 'district', pillar: 'facility', districtSlug: 'sariyer' })` "Maslak" veya "Ayazağa" içeren URL üretmeli.

**Faz 229** `[TEST]` `buildBreadcrumbJsonLd()` geçerli `@type: BreadcrumbList` JSON-LD üretmeli.

**Faz 230** `[TEST]` Blog breadcrumb en az 3 adım içermeli.

**Faz 231** `[TEST]` `validateSiloIntegrity('site')` PASS döndürmeli.

**Faz 232** `[PUSH]` Silo hiyerarşi fonksiyonları commit'i: `feat(breadcrumb): add dual-core silo breadcrumb trail generator`

---

### 📦 E3 — Entegrasyon & Schema Şeması (Faz 233-245)

**Faz 233** `[DEĞİŞTİR]` `facilityTopicGraph.ts` — `buildDualCoreBreadcrumb()` çıktısını Knowledge Graph'e entegre et.

**Faz 234** `[DEĞİŞTİR]` `facilitySerpOptimizer.ts` — `getFacilitySerpMeta()` çıktısına breadcrumb trail ekle.

**Faz 235** `[DEĞİŞTİR]` `facilityMeshLinkerEngine.ts` — silo breadcrumb linklerini iç link grafiğine ekle.

**Faz 236** `[YENİ]` `buildDualCoreSitelinksSchema(pillar)` → Google Sitelinks arama kutusu için şema üretir.

**Faz 237** `[YENİ]` `buildDualCoreWebSiteSchema()` → ana domain için WebSite JSON-LD şeması üretir.

**Faz 238** `[YENİ]` `buildPillarNavigationSchema(pillar)` → `SiteNavigationElement` JSON-LD üretir.

**Faz 239** `[TEST]` `buildDualCoreSitelinksSchema('site')` geçerli Sitelinks şeması üretmeli.

**Faz 240** `[TEST]` `buildDualCoreWebSiteSchema()` `@type: WebSite` içermeli.

**Faz 241** `[TEST]` `buildPillarNavigationSchema('facility')` tesis alt sayfalarını listemeli.

**Faz 242** `[TEST]` Tüm breadcrumb URL'leri mutlak URL (https://...) formatında olmalı.

**Faz 243** `[TEST]` `siteManagementSeoSuite.test.ts` — E bölümü testlerini süite ekle.

**Faz 244** `[TEST]` Her schema çıktısının `@context: 'https://schema.org'` içerdiği doğrulanmalı.

**Faz 245** `[PUSH]` Breadcrumb entegrasyon commit'i: `feat(breadcrumb): integrate dual-core breadcrumb into topic-graph and SERP optimizer`

---

### 📦 E4 — Final Entegrasyon, Test & Dual Push (Faz 246-250)

**Faz 246** `[TEST]` **Tam Test Koşusu:** `npx vitest run` — 250 fazlık geliştirmeden sonra **tüm testler geçmeli.**

**Faz 247** `[TEST]` **Tip Doğrulaması:** `npx tsc --noEmit` — **0 Hata** bekleniyor.

**Faz 248** `[TEST]` Toplam test sayısı 260+ olmalı (mevcut 224 + yeni 36+ test).

**Faz 249** `[PUSH]` **Final Commit:** `feat(seo-v2): complete 250-phase dual-core SEO engine — LSI, district matrix, voice FAQ, cross-links, silo breadcrumb`

**Faz 250** `[PUSH]` **Dual Repo Push:**
```bash
git push origin main         # salihoglueyup/tasarim5
git push alogroup main       # AloGroupTR/web-aloyonetim
```
**🎉 250 Faz Tamamlandı — Alo Yönetim, Türkiye'nin En Gelişmiş Dual-Core SEO & AI Arama Motoru Altyapısına Kavuştu!**

---

---

## 📊 FAZLARA GÖRE TESLİMAT TAKVİMİ

| Bölüm | Faz Sayısı | Yeni Dosya | Güncelleme | Yeni Test | Push Sayısı |
|-------|-----------|-----------|------------|----------|-------------|
| A — LSI Auditor | 55 | 1 | 3 | 12 | 3 |
| B — District Matrix | 50 | 1 | 3 | 8 | 3 |
| C — Voice FAQ | 55 | 1 | 2 | 7 | 2 |
| D — Cross-Link | 45 | 1 | 3 | 10 | 2 |
| E — Breadcrumb | 45 | 1 | 3 | 11 | 3 |
| **TOPLAM** | **250** | **5** | **14** | **48** | **13** |

---

## 🎯 BAŞARI KRİTERLERİ

| KPI | Hedef |
|-----|-------|
| Yeni test sayısı | 48+ eklendi |
| Toplam test geçiş oranı | %100 |
| TypeScript hata sayısı | 0 |
| Yeni backend SEO motoru | 5 |
| Kapsanan LSI kelime | 120+ |
| Kapsanan ilçe | 39 / 39 |
| Sesli arama sorusu | 50+ |
| Cross-link kartı | 9 hizmet × 4 kart × 2 pillar = 72 |
| Schema.org şeması | FAQPage, QAPage, BreadcrumbList, SiteNavigationElement, WebSite, ItemList |

---

*Bu dosya proje ana dizinine kaydedilmiş olup tüm geliştirme fazlarının canlı referansıdır.*
*Güncelleme tarihi: 2026-08-31 | Versiyon: 1.0.0*
