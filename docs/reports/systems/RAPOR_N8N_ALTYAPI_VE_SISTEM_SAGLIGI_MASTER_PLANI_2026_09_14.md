# Alo Yönetim — n8n Altyapı, Sistem Sağlığı & DevOps Otomasyonları Master Planı
**Tarih:** 14 Eylül 2026  
**Doküman Sürümü:** v1.0.0 — Enterprise Observability & Self-Healing Architecture  
**Kapsam:** Sunucu Altyapısı, Konteyner İzleme, PostgreSQL, Redis, UptimeRobot, SEO Ping ve Güvenlik Otomasyonları  
**Hedef Ortam:** Docker Compose Production (`aloyonetim-web`, `aloyonetim-postgres`, `aloyonetim-redis`, `aloyonetim-n8n`, Host Nginx & Cloudflare)  
**Telegram Durumu:** Kullanıcı talebi doğrultusunda Telegram devre dışı bırakılmış; tüm bildirimler ve alarmlar **E-posta (SMTP / Resend), Webhook ve Dahili Veritabanı / n8n Logları** üzerinden kurgulanmıştır.

---

## 1. Yönetici Özeti & Mimari Yaklaşım

Alo Yönetim platformu, İstanbul genelinde 39 ilçede 5.000'den fazla sayfayla hizmet veren, yüksek trafikli ve çok dilli (TR, EN, RU, AR) kurumsal bir tesistir. Bugün çözümlenen Docker, PostgreSQL şifreleme ve Nginx buffer darboğazları göstermiştir ki: **Sistemin kendi kendini izleyen, aksaklıkları kullanıcıdan önce fark eden ve raporlayan otonom bir nöbetçi katmanına ihtiyacı vardır.**

Sunucumuzda 2 haftadır kesintisiz çalışan `aloyonetim-n8n` servisi, sadece bir pazarlama otomasyonu aracı değil; aynı zamanda **Tier-3 standartlarında bir DevOps Gözlemleme ve Alarm Merkezi (Observability Hub)** olarak konumlandırılmıştır.

```
   ┌─────────────────────────────────────────────────────────────────────────┐
   │                          İNTERNET & KULLANICILAR                        │
   └────────────────────────────────────┬────────────────────────────────────┘
                                        │
                                        ▼
   ┌─────────────────────────────────────────────────────────────────────────┐
   │                      CLOUDFLARE EDGE & WAF PROXY                        │
   └────────────────────────────────────┬────────────────────────────────────┘
                                        │
                                        ▼
   ┌─────────────────────────────────────────────────────────────────────────┐
   │                    HOST NGINX REVERSE PROXY (PORT 80/443)               │
   │               (proxy_buffer_size 128k; proxy_buffers 4 256k;)           │
   └──────────┬─────────────────────────┬─────────────────────────┬──────────┘
              │                         │                         │
              ▼ :3001                   ▼ :5678                   ▼
   ┌──────────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐
   │    aloyonetim-web    │  │    aloyonetim-n8n    │  │ UptimeRobot / Cloud │
   │ Next.js Standalone   │◄─┤ DevOps & Automation  │◄─┤ External Watchdog   │
   │  (/api/health)       │  │ (Observability Hub)  │  └─────────────────────┘
   └──────────┬───────────┘  └──────────┬───────────┘
              │                         │
              ├─────────────────────────┼─────────────────────────┐
              ▼ :5432                   ▼ :6379                   │
   ┌──────────────────────┐  ┌──────────────────────┐             │
   │  aloyonetim-postgres │  │   aloyonetim-redis   │             ▼
   │  PostgreSQL 15 DB    │  │    In-Memory Cache   │   ┌─────────────────────┐
   │ (aloyonetim şeması)  │  │   & Rate Limiting    │   │  E-Posta & Webhook  │
   └──────────────────────┘  └──────────────────────┘   │   Alarm Kanalları   │
                                                        └─────────────────────┘
```

---

## 2. Altyapı & Sistem Sağlığı İş Akışları Kataloğu (W9 — W18)

Mevcut pazarlama iş akışlarına (`w1` — `w8`) ek olarak, doğrudan sunucu sağlığı ve DevOps süreçlerini yöneten **10 adet kritik altyapı iş akışı** tanımlanmıştır:

| Kod | Workflow Adı | Dosya Adı | Tetikleyici | Odak / Görev |
| :--- | :--- | :--- | :--- | :--- |
| **W9** | Master SLA & Uptime Watchdog | `w9-sla-uptime-watchdog.json` | Her 2 Dakikada Bir | `/api/health` RFC 8485 sağlık denetimi, bellek ve gecikme takibi |
| **W10** | PostgreSQL Canlı Performans & Bağlantı | `w10-postgres-performance-monitor.json` | Her 15 Dakikada Bir | Aktif bağlantı, kilitlenen sorgular (deadlock), yavaş sorgu tespiti |
| **W11** | PostgreSQL Otomatik Bakım & İndeksleme | `w11-postgres-maintenance-vacuum.json` | Pazar 04:00 (Haftalık) | `VACUUM ANALYZE`, ölü kayıt temizliği ve indeks istatistik optimizasyonu |
| **W12** | PostgreSQL Otomatik Snapshot & Backup | `w12-postgres-data-snapshot.json` | Her Gece 03:30 (Günlük) | Kritik tabloların (Lead, User, Post, Quote) güvenli JSON dökümü ve rotasyonu |
| **W13** | Redis Bellek & Önbellek Nöbetçisi | `w13-redis-memory-sentinel.json` | Her 30 Dakikada Bir | `INFO memory`, bellek sızıntısı önleme ve anahtar hacmi gözetimi |
| **W14** | UptimeRobot Dış Göz & Senkronizasyon | `w14-uptimerobot-sync.json` | Webhook & Her 1 Saat | Dışarıdan kesinti tespiti, HTTP 502/503 kayıtları ve alarm korelasyonu |
| **W15** | 5072 Sayfa Sitemap Bütünlük Taraması | `w15-sitemap-integrity-crawler.json` | Çarşamba 02:00 (Haftalık)| `/sitemap-index.xml` üzerinden örneklem kırık link (404/500) taraması |
| **W16** | Arama Motorları Otomatik İndeksleme | `w16-search-engine-indexer-ping.json` | Günde 2 Kez (09:00, 18:00)| IndexNow (Bing/Yandex) ve Google WebSub tek tıkla ping döngüsü |
| **W17** | SSL Sertifikası & Güvenlik Başlıkları | `w17-ssl-security-headers-audit.json` | Pazartesi 08:00 (Haftalık)| Let's Encrypt gün sayımı, HSTS, CSP ve RFC 8288 Link doğrulaması |
| **W18** | Sistem Hata & Çökme Log Merkezi | `w18-system-error-aggregator.json` | Webhook POST (Anlık) | Next.js `global-error` ve API hatalarını toplayıp özetleme |

---

## 3. İş Akışlarının Detaylı Mimari Özellikleri

### 🛡️ W9: Master SLA & Uptime Watchdog (`w9-sla-uptime-watchdog.json`)
- **Tetikleyici (Schedule Trigger):** Her 120 saniyede bir (2 dakika).
- **Hedef URL:** `http://web:3001/api/health` (Docker içi doğrudan bağlantı) veya `https://aloyonetim.com.tr/api/health`.
- **Düğüm Zinciri (Nodes):**
  1. `Schedule Trigger (2 mins)`
  2. `HTTP Request Node` ➔ GET `/api/health` (Timeout: 5000ms, Ignore SSL Issues: false).
  3. `Code Node (Evaluate RFC 8485 Payload)`:
     ```javascript
     const data = $json;
     const isHealthy = data.healthy === true && data.status === 'pass';
     const dbStatus = data.services?.database?.status;
     const cacheStatus = data.services?.cache?.status;
     const heapMb = data.services?.system?.heapUsedMb || 0;
     const latency = data.latencyMs || 0;

     return [{
       json: {
         isHealthy,
         alertRequired: !isHealthy || heapMb > 950 || latency > 3000,
         severity: !isHealthy ? 'CRITICAL' : (heapMb > 800 ? 'WARNING' : 'INFO'),
         summary: `SLA Durumu: ${data.status} | DB: ${dbStatus} | Cache: ${cacheStatus} | RAM: ${heapMb}MB | Gecikme: ${latency}ms`,
         timestamp: new Date().toISOString()
       }
     }];
     ```
  4. `If Node (alertRequired === true)`:
     - **True:** E-Posta Gönder (Resend / SMTP) ➔ Konu: `🚨 ACİL: Alo Yönetim Sistem Sağlığı Bozuldu!`
     - **False:** Metrikleri n8n execution loguna sessizce kaydet.

---

### 🐘 W10: PostgreSQL Canlı Performans & Bağlantı Nöbetçisi (`w10-postgres-performance-monitor.json`)
- **Tetikleyici:** Her 15 dakikada bir.
- **Veritabanı Bağlantısı:** Host: `postgres`, Port: `5432`, DB: `aloyonetim`, User: `alo_user`.
- **Yürütülen SQL Sorgusu:**
  ```sql
  SELECT
    (SELECT count(*) FROM pg_stat_activity WHERE state = 'active') as active_connections,
    (SELECT count(*) FROM pg_stat_activity WHERE wait_event_type IS NOT NULL) as waiting_locks,
    (SELECT pg_size_pretty(pg_database_size('aloyonetim'))) as database_size,
    (SELECT count(*) FROM "Lead" WHERE "createdAt" > NOW() - INTERVAL '24 hours') as new_leads_24h;
  ```
- **Kritik Eşik Kontrolü:**
  - Aktif bağlantı > 40 ise ➔ `WARNING` (Bağlantı havuzu sızıntısı uyarısı).
  - Bekleyen kilit (waiting_locks) > 3 ise ➔ `CRITICAL` (Tablo kilitlenmesi uyarısı).

---

### 🧹 W11: PostgreSQL Otomatik Bakım & İndeksleme (`w11-postgres-maintenance-vacuum.json`)
- **Tetikleyici:** Cron `0 4 * * 0` (Her Pazar gecesi 04:00).
- **Amaç:** PostgreSQL MVCC yapısında oluşan ölü satırları (dead tuples) fiziksel diskten geri kazanmak, sorgu planlayıcısının (Query Planner) istatistiklerini tazelemek.
- **Yürütülen Komutlar:**
  ```sql
  VACUUM (ANALYZE, VERBOSE);
  ```
- **Sonuç:** Bakım tamamlandıktan sonra diskte kazanılan alan ve bakım süresi e-posta ile sistem yöneticisine iletilir.

---

### 💾 W12: PostgreSQL Otomatik Snapshot & Backup (`w12-postgres-data-snapshot.json`)
- **Tetikleyici:** Cron `30 3 * * *` (Her gece 03:30).
- **Çalışma Prensibi:**
  1. `Postgres Node`: `SELECT * FROM "Lead" ORDER BY "createdAt" DESC;`
  2. `Postgres Node`: `SELECT * FROM "User";`
  3. `Postgres Node`: `SELECT * FROM "Post";`
  4. `Spreadsheet / JSON Converter Node`: Verileri JSON yapısına dönüştürür.
  5. `Local File / WriteBinaryFile Node`: `/data/backups/alo_snapshot_{{$now.format('YYYY_MM_DD')}}.json` yoluna güvenli şekilde yazar.
  6. `Prune Node`: 7 günden eski snapshot dosyalarını temizler.

---

### ⚡ W13: Redis Bellek & Önbellek Nöbetçisi (`w13-redis-memory-sentinel.json`)
- **Tetikleyici:** Her 30 dakikada bir.
- **Redis Bağlantısı:** Host: `redis`, Port: `6379`, Şifre: `alo_redis_local_dev_2026`.
- **Yürütülen İşlemler:**
  1. `PING` komutu ile canlılık teyidi.
  2. `INFO memory` komutu çıktısından `used_memory_human` ve `used_memory_peak_human` değerlerinin okunması.
  3. `DBSIZE` komutu ile mevcut önbellek anahtar sayısının denetlenmesi.
  4. Bellek kullanımında olağan dışı artış tespit edilirse uyarı e-postası üretilir.

---

### 🌐 W14: UptimeRobot Dış Göz & Senkronizasyon (`w14-uptimerobot-sync.json`)
- **Tetikleyici:**
  - Webhook URL: `http://n8n.aloyonetim.com.tr/webhook/uptimerobot-alert`
  - Zamanlayıcı: Her saat başı API sorgusu.
- **Amaç:** Sunucu tamamen internete kapansa veya Nginx çökse dahi, UptimeRobot bulutunun gönderdiği web hook'u yakalayarak kesinti sürelerini kayıt altına almak.
- **Kayıt Edilen Veriler:** Olay tipi (Down / Up), Kesinti başlangıç zamanı, Çözüm süresi, HTTP durum kodu.

---

### 🔍 W15: 5072 Sayfa Sitemap Bütünlük Taraması (`w15-sitemap-integrity-crawler.json`)
- **Tetikleyici:** Haftada bir (Çarşamba gecesi 02:00).
- **Çalışma Prensibi:**
  1. `https://aloyonetim.com.tr/sitemap-index.xml` adresini okur.
  2. İçindeki alt sitemap'leri (`sitemap.xml`, `sitemap-regions.xml` vb.) ayrıştırır.
  3. Toplam 5.072 sayfa arasından rastgele 100 URL seçerek paralel `HEAD` istekleri atar.
  4. Durum kodları kontrol edilir:
     - 200 OK ➔ Başarılı.
     - 404 / 500 / 502 ➔ Hatalı URL'ler toplanarak e-posta raporuna eklenir.

---

### 🚀 W16: Arama Motorları Otomatik İndeksleme (`w16-search-engine-indexer-ping.json`)
- **Tetikleyici:** Her gün 09:00 ve 18:00 saatlerinde.
- **Çalışma Prensibi:**
  1. `HTTP POST` isteği ile `http://web:3001/api/seo/ping-all` tetiklenir.
  2. Yanıttaki `indexNow` ve `webSub` sonuçları ayrıştırılır.
  3. Bing, Yandex ve Google WebSub'a başarıyla iletilen sayfaların kaydı tutulur.

---

### 🔒 W17: SSL Sertifikası & Güvenlik Başlıkları (`w17-ssl-security-headers-audit.json`)
- **Tetikleyici:** Her Pazartesi 08:00.
- **Kontrol Edilen Parametreler:**
  1. SSL Bitiş Tarihi: Sertifikanın dolmasına 15 günden az kalmışsa acil uyarı verir.
  2. Güvenlik Başlıkları Denetimi:
     - `Strict-Transport-Security` (HSTS)
     - `Content-Security-Policy` (CSP)
     - `X-Frame-Options: DENY`
     - `X-Content-Type-Options: nosniff`
     - `proxy_buffer_size` uyumluluğu (Nginx kesintisizliği).

---

### 🚨 W18: Sistem Hata & Çökme Log Merkezi (`w18-system-error-aggregator.json`)
- **Tetikleyici:** Webhook `POST /webhook/system-error`.
- **Entegrasyon:** Next.js `src/app/global-error.tsx` veya API hata yakalayıcıları (catch blocks), yakalanan kritik hataları bu webhook'a JSON olarak postalar:
  ```json
  {
    "service": "aloyonetim-web",
    "route": "/api/teklif",
    "errorMessage": "PrismaClientKnownRequestError...",
    "severity": "CRITICAL",
    "timestamp": "2026-09-14T13:20:00Z"
  }
  ```
- **Davranış:** Aynı hata 5 dakika içinde tekrar ederse e-postaları spamlememek için filtreler (deduplication) ve yöneticilere konsolide rapor gönderir.

---

## 4. Docker Network İçi Bağlantı Parametreleri

n8n container'ı (`aloyonetim-n8n`), `aloyonetim-network` üzerinde çalıştığı için diğer servislere host IP'si veya domain gerekmeden **en hızlı ve en güvenli iç Docker DNS adlarıyla** erişir:

| Hedef Servis | Protokol & Port | n8n İçin Host Adı | Kimlik Doğrulama |
| :--- | :--- | :--- | :--- |
| **Next.js Web** | HTTP :3001 | `http://web:3001` | Serbest (İç Ağ) |
| **PostgreSQL** | TCP :5432 | `postgres:5432` | User: `alo_user`, Pass: `.env`'deki şifre |
| **Redis** | TCP :6379 | `redis:6379` | Auth: `alo_redis_local_dev_2026` |
| **N8N Webhook** | HTTP :5678 | `http://n8n:5678` | Nginx arkasında `n8n.aloyonetim.com.tr` |

---

## 5. Acil Durum & Kendi Kendini Onarma (Self-Healing) Matrisi

| Yaşanan Olay | Olası Kök Neden | n8n'in Alacağı Aksiyon | Alarm Kanalı |
| :--- | :--- | :--- | :--- |
| **HTTP 502 Bad Gateway** | Nginx buffer yetersizliği veya Web container çökmesi | 2 dakika içinde W9 tetiklenir, ardışık 3 hatada acil bildirim üretilir. | E-Posta + Hata Logu |
| **Postgres Auth Hatası (28P01)** | Disk şifresi ile env şifresi uyuşmazlığı | W10 ve W9 anında "Database Unreachable" uyarısı verir. | Acil Sistem E-Postası |
| **Redis Bellek Taşması** | Rate limit veya sayfa cache birikmesi | W13 %85 eşiğinde uyarı verir, gerekirse `UNLINK cache:*` komutunu tetikler. | DevOps E-Postası |
| **Kırık Sayfa (404/500)** | Dinamik rota veya veri eksikliği | W15 haftalık taramada kırık URL listesini raporlar. | SEO & Yazılım Raporu |
| **SSL Sertifika Bitişi** | Certbot otomatik yenileme arızası | W17 son 15 gün kala her Pazartesi hatırlatma geçer. | Yönetici E-Postası |

---

## 6. Sıradaki Adım & Kurulum Rehberi

1. Bu planda tanımlanan tüm iş akışları için JSON şablonları `docker/n8n-workflows/` klasöründe modüler olarak üretilecektir (`w9-sla-uptime-watchdog.json`, `w10-postgres-performance-monitor.json` vb.).
2. Kullanıcı veya sistem yöneticisi `https://n8n.aloyonetim.com.tr` paneline girerek **"Import from File"** ile tek tıkla yükleyip aktif edebilir.
3. Telegram entegrasyonu ilerleyen fazda kullanıcı hazır olduğunda tek bir API anahtarıyla tüm bu sistemlere anında bağlanabilecektir.
