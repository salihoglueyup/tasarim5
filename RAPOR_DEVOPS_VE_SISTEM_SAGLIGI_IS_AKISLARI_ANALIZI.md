# Alo Yönetim — DevOps & Sistem Sağlığı Kütüphane Analizi ve İş Akışı Yol Haritası

Bu rapor, kullanıcının talebi doğrultusunda **doğrudan sistem sağlığı, sunucu direnci, veritabanı güvenliği ve DevOps otomasyonlarına** odaklanarak hazırlanmıştır. Kütüphanedeki (`n8n/library/`) hazır şablonlar ve üretim ortamı Next.js + PostgreSQL + Redis + Docker mimarimiz analiz edilmiş; sistemi **%99.99 uptime** hedefine ulaştıracak en kritik 6 DevOps iş akışı belirlenmiştir.

---

## 1. Mevcut DevOps Akışlarımız (Halihazırda Çalışanlar)

Şu an devrede olan 24 iş akışımızın **10 tanesi** doğrudan DevOps ve Veritabanı odaklıdır:
- `W03`: Master Uptime & Çift Teyitli Sağlık Nöbetçisi (`/api/health`)
- `W04`: Sistem Hata & Çökme Log Merkezi (`/system-error`)
- `W05`: SSL Sertifikası & Güvenlik Başlıkları (CSP/HSTS) Denetimi
- `W06`: PostgreSQL Performans, Önbellek & Şişme Nöbetçisi
- `W07`: PostgreSQL Otomatik Bakım & Güvenli Vacuum
- `W08`: PostgreSQL Gece Bütünlük & Veri Snapshot'ı
- `W09`: Redis Bellek & Parçalanma Nöbetçisi
- `W14`: Docker Container Kaynak (RAM/CPU/Lag) Nöbetçisi
- `W15`: Nginx Rate-Limit & Bot Saldırısı Denetçisi
- `W18`: Çoklu Konum SLA Doğrulama & Harici Uptime Eşitleme

---

## 2. Eksik Olan ve En Çok İhtiyaç Duyulan 6 Yeni DevOps Akışı (Öneri Paketi)

Gerçek dünya üretim sunucularında sistem çökmelerinin %90'ı şu 6 noktadan çıkar:
*(Disk dolması, kilitlenen DB sorguları, kara listeye düşen mailler, patlayan sessiz cronlar, DNS/Domain gecikmeleri ve event loop kilitlenmeleri)*.

Yedek kütüphaneden uyarlayabileceğimiz en kritik 6 DevOps akışı:

### 💾 1. [DevOps & Sunucu] W25 — Sunucu Disk Doluluğu, Inode & Log Şişmesi Nöbetçisi
- **Neden Gerekli:** Linux sunucularında en ölümcül ve geri dönülemez çökme sebebi, Docker container loglarının (`/var/lib/docker/containers/*-json.log`) veya geçici dosyaların diski %100 doldurmasıdır. Disk dolduğunda PostgreSQL acil koruma moduna geçerek veritabanını kilitler.
- **Nasıl Çalışacak:** Sistem metriklerini tarar. Disk doluluğu %85'i veya Docker logları 5 GB'ı aştığında anında alarm üretir, en çok yer kaplayan dizinleri raporlar ve otomatik log-rotation uyarısı verir.
- **Kütüphane Referansı:** `n8n/library/community-templates/Misc/server_health_grafana.json`.

---

### 🛑 2. [DevOps & DB] W26 — PostgreSQL Kilitli / Yavaş Sorgu & Askıda Kalan Bağlantı Avcısı
- **Neden Gerekli:** Bir sorgu kilitlenirse (`idle in transaction` veya tablo lock), PostgreSQL bağlantı havuzu (`max_connections = 100`) dakikalar içinde dolar. Web sitesi tüm kullanıcılara `PrismaClientKnownRequestError: Can't reach database server` hatası vermeye başlar.
- **Nasıl Çalışacak:** 10 dakikada bir `pg_stat_activity` tablosunu sorgular. 30 saniyeden uzun süren veya birbirini kilitleyen (deadlock) sorguları tespit eder; sorgunun tam metnini ve istemci IP'sini `AuditLog`a yazarak DevOps ekibine acil müdahale e-postası yollar.
- **Kütüphane Referansı:** `n8n/library/integration-catalog/workflows/Code/0307_Code_Postgres_Automate_Triggered.json`.

---

### 📧 3. [DevOps & Mail] W27 — Kurumsal SMTP İletim Sağlığı, SPF/DKIM & Kara Liste (RBL) Nöbetçisi
- **Neden Gerekli:** Alo Yönetim'in aidat makbuzları, teklif bildirimleri ve acil durum mailleri gönderilemezse işler aksar. Sunucu IP adresi Spamhaus, Barracuda veya SORBS gibi global kara listelere (RBL) girerse mailler spama bile düşmeden reddedilir.
- **Nasıl Çalışacak:** Her sabah SMTP portunu (587/465) canlıda test eder. DNS'teki SPF, DKIM ve DMARC TXT kayıtlarının bütünlüğünü doğrular; sunucu IP'sinin kara listelerde olup olmadığını denetler.
- **Kütüphane Referansı:** `n8n/library/community-templates/Email_Automation/sendgrid_bounce_alert.json`.

---

### 💓 4. [DevOps & Cron] W28 — Arka Plan Görev Kalp Atışı (Dead Man's Snitch / Cron Heartbeat Nöbetçisi)
- **Neden Gerekli:** Gece yedeklemesi, haftalık vacuum veya arama motoru sitemap pingleri sessizce çöktüğünde kimse fark etmez. Ta ki bir felaket anında yedeğin 2 aydır alınmadığı anlaşılana kadar.
- **Nasıl Çalışacak:** "Kalp Atışı (Heartbeat)" prensibiyle çalışır. Gece yedeği veya kritik cron görevleri tamamlandığında n8n webhook'una ping atar. Eğer beklenen saat aralığında ping gelmezse: *"ACİL: Gece yedeği veya bakım cronu çalışmadı!"* alarmı çalar.
- **Kütüphane Referansı:** `n8n/library/community-templates/Misc/cron_success_slack.json`.

---

### 🌐 5. [DevOps & Ağ] W29 — Alan Adı (Domain WHOIS) Bitiş & Anycast DNS Hız Nöbetçisi
- **Neden Gerekli:** `aloyonetim.com.tr` alan adının yenilenmesi unutulursa site tüm dünyada erişilmez olur. Ayrıca DNS yanıt süresi 150-200ms üzerine çıkarsa site açılış hızları yerlerde sürünür.
- **Nasıl Çalışacak:** WHOIS süresini izler; bitişe 60, 30 ve 15 gün kala yöneticiye uyarı verir. Google DNS (8.8.8.8) ve Cloudflare DNS (1.1.1.1) üzerinden DNS çözümleme gecikmesini (ms) ölçer.
- **Kütüphane Referansı:** `n8n/library/community-templates/Misc/api_monitor_auto_restart.json`.

---

### ⚡ 6. [DevOps & Performans] W30 — Node.js / Next.js Event Loop Gecikmesi & Heap Bellek Sızıntısı Nöbetçisi
- **Neden Gerekli:** Node.js tek iş parçacıklı (single-threaded) çalıştığı için, ağır bir döngü event loop'u bloke ederse tüm ziyaretçilerin sayfaları donar. Kodda unutulan bir bellek sızıntısı container'ın ansızın çökmesine (OOM Kill) yol açar.
- **Nasıl Çalışacak:** Node.js event loop lag değerini (eşik: >80ms) ve heap bellek büyüme trendini takip eder. Şişme devam ederse container kilitlenmeden önce DevOps'a alarm verir.
- **Kütüphane Referansı:** `n8n/library/community-templates/IoT/edge_device_log_compressor.json`.

---

## 3. DevOps Öneri Özeti Tablosu

| Akış | Kod | Kategori | Kritik Görevi | Önlediği Risk |
| :--- | :--- | :--- | :--- | :--- |
| **Disk & Log Nöbetçisi** | `W25` | `DevOps & Sağlık` | Disk doluluk ve Docker log şişmesi | Sunucunun %100 disk ile kilitlenmesi |
| **PG Kilitli Sorgu Avcısı** | `W26` | `Veritabanı & DB` | Deadlock ve askıda kalan `idle` sorgular | DB bağlantı havuzunun (100 connection) tükenmesi |
| **SMTP & Kara Liste Nöbetçisi**| `W27` | `DevOps & Sağlık` | Mail portu, SPF/DKIM ve RBL blacklist | E-postaların spama düşmesi / reddedilmesi |
| **Cron Kalp Atışı (Heartbeat)** | `W28` | `DevOps & Sağlık` | Sessizce çöken arka plan görevleri | Veri kaybı / yedeğin alınmadığının fark edilmemesi |
| **Domain & DNS Hız Nöbetçisi** | `W29` | `DevOps & Sağlık` | WHOIS bitişi ve DNS çözümleme hızı | Domain düşmesi ve sitenin küresel yayından çıkması |
| **Node.js Lag & Heap Nöbetçisi**| `W30` | `DevOps & Sağlık` | Event loop gecikmesi ve RAM sızıntısı | Sayfaların donması ve ani OOM Kill çökmeleri |
