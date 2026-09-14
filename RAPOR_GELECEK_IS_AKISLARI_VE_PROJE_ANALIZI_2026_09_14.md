# Alo Yönetim — Proje Analizi ve Gelecek İş Akışları (Wave 3) Master Raporu

Bu rapor, projenin mevcut veri mimarisi (`src/data/`), veritabanı modelleri (`prisma/schema.prisma`) ve kütüphanedeki zengin şablon rezervleri incelenerek, Alo Yönetim'in operasyonel verimliliğini ve müşteri memnuniyetini zirveye taşıyacak **en kritik 6 yeni iş akışı önerisini** detaylandırır.

---

## 1. Projenin Mevcut Durumu ve Veri Mimarisi Analizi

Alo Yönetim, klasik bir web sitesinden öte, İstanbul'un 39 ilçesinde Kat Mülkiyeti Kanunu (KMK), Tesis Yönetimi, Biyosidal İlaçlama, Havuz Sağlığı, 5188 Güvenlik ve İcra/Arabuluculuk süreçlerini yöneten tam kapsamlı bir kurumsal platformdur:

1. **Geniş Mevzuat & Tesis Veri Kütüphanesi (`src/data/`):**
   - `facilityPoolHealthData.ts`: Sağlık Bakanlığı Havuz Sağlığı ve Günlük Klor/pH Ölçümleri.
   - `facilityWaterTankSanitationData.ts`: 2007/67 Sayılı Genelge Su Deposu Temizliği & Lejyonella Önleme.
   - `facilityEnergyEvChargingData.ts`: Ortak Alan EV Şarj İstasyonu ve Trafo Yükü Kurulumu.
   - `districtCourthouseMediationData.ts`: 39 İlçe Adliyesi ve KMK 7445 Zorunlu Arabuluculuk Süreçleri.
   - `facilityEnforcementDisputeData.ts`: İİK m.68 / m.67 İtirazın İptali, %20 İcra İnkar Tazminatı.
   - `kmkLegalNoticesTemplatesData.ts`: 8 Resmi KMK Hukuki İhtarname Şablonu.
   - `facilityAnnualMaintenanceScheduleData.ts`: ISO 41001 12 Aylık Tesis Periyodik Bakım Takvimi.

2. **Aktif n8n Altyapısı:**
   - Hali hazırda çalışan **24 kurumsal iş akışı** ve **7 renkli kategori** (`CRM & Saha`, `Finans & Aidat`, `DevOps & Sağlık`, `Veritabanı & DB`, `SEO & Arama`, `Hukuk & İSG`, `Yönetim & Rapor`).

---

## 2. Sıradaki En Kritik 6 İş Akışı Önerisi (Wave 3)

Kütüphanedeki şablon havuzundan elenen ve projenin can damarı olan ihtiyaçlara birebir oturan 6 stratejik iş akışı:

### ⚡ 1. [Tesis & Enerji] W25 — Reaktif Ceza & Kompanzasyon Panosu Risk Nöbetçisi
- **Problem:** Siteler, kompanzasyon panolarındaki kondansatör arızaları nedeniyle BEDAŞ / AYEDAŞ'a her ay yüz binlerce lira "Endüktif/Kapasitif Reaktif Enerji Cezası" ödemektedir.
- **Çözüm (İş Akışı):** Haftalık sayaç endekslerini tarar veya enerji tüketim oranını denetler. Reaktif oran %20'yi (kapasitif %15'i) aştığı anda elektrik mühendisine acil pano kontrol uyarısı yollar; siteyi cezadan kurtarır.
- **Kütüphane Kaynağı:** `IoT/smart_home_energy_saver.json` + `Email_Automation/parse_invoice_emails.json`.

---

### ⛈️ 2. [Tesis & Kriz] W26 — Meteoroloji / AKOM Fırtına & Su Baskını Erken Uyarı Alarmı
- **Problem:** İstanbul'da aniden bastıran şiddetli yağışlarda bodrum katlar, kapalı otoparklar ve asansör çukurları su baskınına uğramakta; hidrofor ve jeneratörler su altında kalmaktadır.
- **Çözüm (İş Akışı):** Meteoroloji / AFAD turuncu/sarı yağış veya fırtına uyarısı verdiğinde; tesis şeflerine ve kapıcılara anında otomatik SMS/E-posta ile checklist yollar: *(1- Çatı yağmur giderlerini açın, 2- Bodrum drenaj dalgıç pompalarını test edin, 3- Otopark bariyerlerini açık konuma getirin).*
- **Kütüphane Kaynağı:** `Misc/disaster_api_sms.json` + `Misc/hourly_weather_log.json`.

---

### ⚖️ 3. [Hukuk & KMK] W27 — Kat Malikleri Hukuki İhtarname & İhlal Bildirim Motoru
- **Problem:** Gürültü, izinsiz ortak alana müdahale (balkon kapatma, kapı önüne ayakkabılık koyma), otopark ihlali veya balkondan çöp atma gibi KMK m.18 ihlallerinde yöneticiler hukuki ihtarname yazmakta zorlanır.
- **Çözüm (İş Akışı):** Webhook üzerinden gelen sakin şikayetini alır; `kmkLegalNoticesTemplatesData.ts` içindeki 8 hukuki ihtarname şablonundan ilgili kanun maddesini seçer, bağımsız bölüm numarası ve kat maliki adıyla resmi ihtarname PDF/HTML taslağını oluşturup yöneticiye sunar.
- **Kütüphane Kaynağı:** `Legal_Tech/contract_clause_extractor.json` + `Legal_Tech/case_law_summarizer.json`.

---

### 📅 4. [Hukuk & Arabuluculuk] W28 — KMK 7445 Zorunlu Arabuluculuk & Duruşma Takipçisi
- **Problem:** 7445 Sayılı Kanun gereği 1 Eylül 2023'ten itibaren tüm kat mülkiyeti ve kira uyuşmazlıklarında dava açmadan önce arabuluculuk zorunludur. Arabuluculuk ilk oturumuna katılmamak yargılama gideri cezası doğurur.
- **Çözüm (İş Akışı):** İstanbul Adliyeleri (Çağlayan, Anadolu, Bakırköy vb.) arabuluculuk bürolarından gelen oturum tarihlerini ve Sulh Hukuk duruşma günlerini takvimleştirir; avukat ve yönetim kuruluna 3 gün ve 24 saat kala hatırlatma geçer.
- **Kütüphane Kaynağı:** `Legal_Tech/court_date_reminder.json`.

---

### 🏊 5. [Sağlık & Çevre] W29 — Havuz Kimyası & Su Deposu Periyodik Dezenfeksiyon Takipçisi
- **Problem:** Sağlık Bakanlığı Biyosidal ve Yüzme Havuzları Yönetmeliği gereği açık/kapalı havuzların klor, pH, bağlı klor testleri her gün yapılmak; su depoları ise 6 ayda bir akredite kuruluşa temizletilmek zorundadır. Aksi halde İl Sağlık Müdürlüğü tesisi mühürler.
- **Çözüm (İş Akışı):** Tesis teknisyeninin girdiği klor/pH değerlerini kontrol eder; klor < 1.0 ppm veya pH > 7.8 ise kimyasal dozaj uyarısı verir. Su deposunun 6 aylık temizlik süresi dolmadan 15 gün önce yöneticiye randevu hatırlatması yapar.
- **Kütüphane Kaynağı:** `IoT/sensor_fault_detector.json` + `Email_Automation/daily_email_digest.json`.

---

### 🤝 6. [Sözleşme & Tedarikçi] W30 — Taşeron Hizmet Sözleşmesi & SLA İhlal Denetçisi
- **Problem:** Asansör bakım firması, özel güvenlik şirketi, peyzaj ve temizlik alt taşeronlarının yıllık sözleşme yenileme tarihleri unutulmakta veya sözleşmedeki arıza SLA süreleri (Örn: 2 saatte müdahale) denetlenememektedir.
- **Çözüm (İş Akışı):** Tüm tedarikçi sözleşmelerinin bitiş tarihlerini 45 gün öncesinden bildirerek ihale / teklif toplama sürecini başlatır. Kapatılmayan arızalarda taşeron gecikme cezası (cezai şart) faturası taslağı oluşturur.
- **Kütüphane Kaynağı:** `Legal_Tech/nda_risk_detector.json` + `Manufacturing/maintenance_ticket_router.json`.

---

## 3. Özet ve Değerlendirme

| Akış | Kod | Kategori | Çözülen Problem | Maddi / Hukuki Katkı |
| :--- | :--- | :--- | :--- | :--- |
| **Reaktif Ceza Nöbetçisi** | `W25` | `Finans & Aidat` | BEDAŞ/AYEDAŞ reaktif enerji cezaları | Ayda on binlerce TL elektrik cezası tasarrufu |
| **AKOM Fırtına/Su Baskını** | `W26` | `CRM & Saha` | Bodrum kat ve otopark su baskınları | Milyonlarca liralık jeneratör/hidrofor koruması |
| **KMK İhtarname Motoru** | `W27` | `Hukuk & İSG` | Sakin uyuşmazlıkları ve ortak alan ihlalleri | Noter ve avukat masrafı olmadan anında resmi ihtar |
| **Arabuluculuk & Duruşma** | `W28` | `Hukuk & İSG` | 7445 Sayılı Kanun zorunlu toplantıları | Hak kaybı ve usulden davanın reddini önleme |
| **Havuz & Su Deposu** | `W29` | `CRM & Saha` | Sağlık Bakanlığı denetimi ve salgın riski | Mühürlenme ve idari para cezasını önleme |
| **Taşeron Sözleşme Takibi** | `W30` | `Yönetim & Rapor` | Tedarikçi sözleşme bitişi ve arıza gecikmeleri | En iyi fiyatla sözleşme yenileme ve SLA garantisi |
