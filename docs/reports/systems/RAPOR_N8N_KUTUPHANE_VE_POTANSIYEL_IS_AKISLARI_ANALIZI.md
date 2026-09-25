# Alo Yönetim — n8n Kütüphane Analizi ve Kurumsal İş Akışı Master Planı

Bu rapor; projenin `n8n/library/` dizininde yer alan **2.279 adet hazır şablonun** (202 Topluluk Şablonu + 2.077 Entegrasyon Kataloğu) detaylı analizini, çöp/alakasız şablonların ayıklanmasını ve **Alo Yönetim'in tesis yönetimi, KMK hukuku, aidat finansı ve operasyonlarına doğrudan değer katacak en seçkin şablonların** sisteme entegrasyon yol haritasını sunar.

---

## 1. Mevcut Kütüphane Envanteri

| Dizin | Şablon Sayısı | Nitelik & Kapsam | Değerlendirme |
| :--- | :--- | :--- | :--- |
| `n8n/library/community-templates` | **202 Adet** | 26 sektör kategorisinde (Gayrimenkul, Hukuk, Finans, İSG, IoT, İK vb.) uçtan uca kurgulanmış gerçek dünya senaryoları. | 💎 **Çok Yüksek Değer.** İçerisinde tesis yönetimine birebir uyarlanabilecek zengin iş mantıkları barındırıyor. |
| `n8n/library/integration-catalog` | **2.077 Adet** | 188 farklı node türüne göre ayrılmış (Splitout, Webhook, Code, Wait, Slack vb.) teknik entegrasyon test parçacıkları. | ⚙️ **Teknik Referans.** Doğrudan iş akışı olarak değil, karmaşık düğüm bağlantılarında kod referansı olarak kullanılmalıdır. |

---

## 2. Elenen Alakasız / Çöp Kategoriler

Alo Yönetim bir B2B & B2C Kat Mülkiyeti, Tesis ve Site Yönetimi platformu olduğu için aşağıdaki alanlar **sisteme dahil edilmeyerek sistemin temiz ve hafif kalması sağlanmıştır**:
- ❌ **E-Ticaret & Perakende:** Shopify, WooCommerce, Etsy, kargo iade takipleri.
- ❌ **Oyun & Eğlence:** Discord botları, Twitch yayın bildirimleri, Spotify çalma listeleri.
- ❌ **Kripto & Borsa:** Kripto para fiyat uyarıları, Binance webhookları.
- ❌ **Sosyal Tüketim:** TikTok yorum yanıtlayıcıları, Reddit beğeni alarmları, Instagram carousel üreticileri.
- ❌ **Turizm:** Airbnb misafir rehberi, uçak bileti takipçisi.

---

## 3. Alo Yönetim İçin "Altın Değerindeki" 12 Potansiyel Şablon

Bu şablonlar kütüphaneden seçilmiş olup, Alo Yönetim'in PostgreSQL altyapısına, Türk Lirası / KMK kurallarına ve kurumsal e-posta sistemine uyarlanmaya hazırdır:

### 🏢 A. Tesis, Saha & Arıza Operasyonları
1. **`Maintenance Ticket Router` (`Manufacturing/maintenance_ticket_router.json`)**
   - **İş Mantığı:** Sakinlerden gelen arıza taleplerini (Asansör, Hidrofor/Tesisat, Elektrik, Peyzaj, Temizlik) ayrıştırır.
   - **Alo Yönetim Katkısı:** Arıza türüne göre ilgili anlaşmalı taşeron firmaya (Örn: Asansör bakım firmasına) otomatik iş emri açar ve takip numarası üretir.
2. **`Predictive Maintenance Alert` (`IoT/predictive_maintenance_alert.json`)**
   - **İş Mantığı:** Cihazların periyodik çalışma sürelerini ve bakım takvimlerini izler.
   - **Alo Yönetim Katkısı:** Hidroforlar, yangın pompaları, jeneratörler ve asansörlerin yasal periyodik kontrol günleri (MMO / TSE) yaklaştığında site müdürüne hatırlatır.
3. **`Shift Handover Summary` (`Manufacturing/shift_handover_summary.json`)**
   - **İş Mantığı:** Vardiya değişimindeki nöbet notlarını konsolide bir bültene dönüştürür.
   - **Alo Yönetim Katkısı:** 5188 Sayılı Kanun kapsamındaki Özel Güvenlik ve Temizlik vardiyalarının devir teslim tutanaklarını her sabah site yöneticisine raporlar.
4. **`Safety Incident Alert` (`Manufacturing/safety_incident_alert.json`)**
   - **İş Mantığı:** İş sağlığı, güvenlik ihlali veya kaza durumlarında anında kriz protokolünü tetikler.
   - **Alo Yönetim Katkısı:** Havuz kazası, elektrik çarpması, yangın alarmı veya asansörde düşme riski gibi durumlarda İSG uzmanı ve yöneticiye acil vaka dosyası oluşturur.

### 💰 B. Finans, Aidat & Gider Yönetimi
5. **`HOA Fee Analyzer` (`Real_Estate/hoa_fee_analyzer.json`)**
   - **İş Mantığı:** HOA (Homeowners Association / Apartman & Site) aidat bütçesini ve tahsilat oranlarını inceler.
   - **Alo Yönetim Katkısı:** KMK m.20 kapsamında aylık aidat tahsilat performansını ve işletme projesi bütçe sapmalarını yönetici paneline sunar.
6. **`Unpaid Invoice Reminder` (`Finance_Accounting/unpaid_invoice_reminder.json`)**
   - **İş Mantığı:** Vadesi geçmiş fatura ve aidat borçlarını listeler.
   - **Alo Yönetim Katkısı:** KMK m.20/c uyarınca vadesi geçen aidat borçlularına aylık %5 yasal gecikme tazminatı hesaplayarak nazik hatırlatma mektubu hazırlar.
7. **`Parse Invoice Emails` (`Email_Automation/parse_invoice_emails.json`)**
   - **İş Mantığı:** Gelen e-posta eklerindeki faturaları (PDF) okuyup tutar ve abone numaralarını ayıklar.
   - **Alo Yönetim Katkısı:** BEDAŞ, AYEDAŞ, İSKİ, İGDAŞ sayaç faturalarını yakalayıp ortak alan gider tablosuna otomatik kaydeder.
8. **`Monthly Expense Report` (`Finance_Accounting/monthly_expense_report.json`)**
   - **İş Mantığı:** Ay sonu tüm gider kalemlerini konsolide eder.
   - **Alo Yönetim Katkısı:** Denetim kuruluna ve kat malikleri kuruluna sunulacak aylık gelir-gider kesin hesap mizanını üretir.

### ⚖️ C. Hukuk, KMK & Mevzuat Uyumu
9. **`Compliance Checklist Builder` (`Legal_Tech/compliance_checklist_builder.json`)**
   - **İş Mantığı:** Kanuni zorunlulukları periyodik kontrol listesine çevirir.
   - **Alo Yönetim Katkısı:** Yangın merdiveni, sığınak mevzuatı, asansör yeşil etiket ve su deposu temizliği zorunluluklarını yılda bir denetim listesi olarak yöneticiye sunar.
10. **`Case Law Summarizer` (`Legal_Tech/case_law_summarizer.json`)**
    - **İş Mantığı:** Hukuki uyuşmazlıklarda Yargıtay emsal kararlarını özetler.
    - **Alo Yönetim Katkısı:** Kat maliki ile kiracı veya yönetim arasındaki KMK m.18 (doğruluk kuralları), m.22 (sorumluluk sınırı) içtihatlarını derler.
11. **`Court Date Reminder` (`Legal_Tech/court_date_reminder.json`)**
    - **İş Mantığı:** Dava, icra ve arabuluculuk sürelerini takip eder.
    - **Alo Yönetim Katkısı:** Sulh Hukuk KMK davaları, İİK m.68 icra itirazları ve zorunlu arabuluculuk oturumlarını avukat ekibine 3 gün önceden takvimleştirir.

### 👥 D. İletişim, Sakin & İK Yönetimi
12. **`Auto Reply to FAQs` (`Email_Automation/auto_reply_to_faqs.json`)**
    - **İş Mantığı:** Sıkça sorulan sorulara anında kurumsal yanıt döner.
    - **Alo Yönetim Katkısı:** Taşınma prosedürleri, tadilat saatleri, aidat ödeme günleri gibi rutin sorulara otomatik e-posta/bilgi verir.
13. **`New Job Application Parser` (`HR/new_job_application_parser.json`)**
    - **İş Mantığı:** Gelen personel başvurularını ayıklar.
    - **Alo Yönetim Katkısı:** Apartman görevlisi, temizlik elemanı ve 5188 kimlikli özel güvenlik adaylarını niteliklerine göre İK havuzuna kaydeder.

---

## 4. Uygulama & Uyarlama Stratejisi

Kütüphanedeki bu şablonlar orijinal hallerinde Weaviate, Airtable, Slack veya generic İngilizce promptlar kullanmaktadır. Bunları Alo Yönetim'e alırken şu 4 standarda dönüştüreceğiz:
1. **Veri Depolama:** Weaviate/Airtable yerine doğrudan sunucumuzdaki **PostgreSQL (`AuditLog`, `Lead`, `Facility`)** tabloları.
2. **Bildirim Kanalı:** Telegram/Slack yerine **Alo Yönetim Kurumsal HTML E-Posta Motoru (`istanbul@aloyonetim.com.tr`)**.
3. **Mevzuat:** Amerikan/uluslararası terminoloji yerine **634 Sayılı Kat Mülkiyeti Kanunu (KMK), 6331 İSG ve Türk Lirası**.
4. **Kod Bütünlüğü:** 16 karakterlik benzersiz ID (`w19...`, `w20...`), 0 hata ve tam Docker n8n uyumluluğu.
