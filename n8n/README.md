# Alo Yönetim — n8n Enterprise Automation & Observability Hub

Bu dizin, **Alo Yönetim** platformunun hem kurumsal iş süreçlerini (Teklifler, Lead Senkronizasyonu, Sosyal Medya) hem de sunucu altyapı ve DevOps gözlemlenebilirlik nöbetçilerini (SLA, PostgreSQL, Redis, UptimeRobot, SEO Ping) barındıran merkezi otomasyon merkezidir.

---

## 📁 Dizin Yapısı & Hiyerarşi

```
n8n/
├── active/                         # CANLI & AKTİF İŞ AKIŞLARI (KULLANIMA HAZIR)
│   ├── devops-infrastructure/      # W9 - W18: Sistem sağlığı, veritabanı, önbellek ve izleme
│   │   ├── w9-sla-uptime-watchdog.json             (Her 2 dk: /api/health denetimi)
│   │   ├── w10-postgres-performance-monitor.json   (Her 15 dk: DB bağlantı ve kilit kontrolü)
│   │   ├── w11-postgres-maintenance-vacuum.json    (Haftalık: VACUUM ANALYZE bakımı)
│   │   ├── w12-postgres-data-snapshot.json         (Günlük: JSON veri yedekleme ve snapshot)
│   │   ├── w13-redis-memory-sentinel.json          (Her 30 dk: Redis RAM şişme kontrolü)
│   │   ├── w14-uptimerobot-sync.json               (Dış webhook: Buluttan kesinti alarmı)
│   │   ├── w15-sitemap-integrity-crawler.json      (Haftalık: 5072 sayfa sitemap testi)
│   │   ├── w16-search-engine-indexer-ping.json     (Günde 2 kez: IndexNow & Google WebSub)
│   │   ├── w17-ssl-security-headers-audit.json     (Haftalık: Let's Encrypt ve CSP denetimi)
│   │   └── w18-system-error-aggregator.json        (Webhook: Next.js kritik hata toplayıcı)
│   │
│   └── business-marketing/         # W1 - W8: Teklif yakalama, CRM, LinkedIn, WhatsApp
│       ├── w1-linkedin-autopost.json
│       ├── w2-lead-sync.json
│       ├── w3-teklif-webhook.json
│       ├── w4-competitor-monitoring.json
│       ├── w5-linkedin-stats.json
│       ├── w6-ai-outreach.json
│       ├── w7-daily-followup.json
│       └── w8-weekly-report.json
│
├── library/                        # DEVASA ŞABLON ARŞİVİ (KEŞİF & İLERİ FAZLAR)
│   ├── community-templates/        # 200+ Hazır Sektörel Şablon (Real_Estate, Legal_Tech, AI vb.)
│   └── integration-catalog/        # 188+ Servis Modülü (Postgres, Redis, Sheets, Hubspot vb.)
│
├── docs/                           # REHBERLER & BELGELENDİRME
│   ├── CREDENTIALS_GUIDE.md        # n8n içinde tanımlanacak kimlik bilgileri kılavuzu
│   └── WEBHOOK_CATALOG.md          # Next.js ile n8n arasındaki webhook haritası
│
└── README.md                       # Bu ana kılavuz
```

---

## 🚀 n8n'e İş Akışı Yükleme (Import Adımları)

1. Tarayıcınızdan n8n paneline girin: **`https://n8n.aloyonetim.com.tr`** *(veya yerelde `localhost:5678`)*.
2. Sol menüden **Workflows ➔ Import from file** seçeneğine tıklayın.
3. Yüklemek istediğiniz JSON dosyasını (`n8n/active/devops-infrastructure/` veya `n8n/active/business-marketing/`) seçin.
4. İlgili bağlantı kimlik bilgilerini (Credential) seçin:
   - PostgreSQL ➔ Host: `postgres`, Port: `5432`
   - Redis ➔ Host: `redis`, Port: `6379`
5. Sağ üstteki anahtarı **Active** konumuna getirin.

---

## 📚 Dokümantasyon Bağlantıları
- [Kimlik Bilgileri Yapılandırma Rehberi (CREDENTIALS_GUIDE.md)](docs/CREDENTIALS_GUIDE.md)
- [Webhook Endpoint & Payload Kataloğu (WEBHOOK_CATALOG.md)](docs/WEBHOOK_CATALOG.md)
