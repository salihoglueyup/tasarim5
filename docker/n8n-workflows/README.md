# Alo Yönetim — n8n Aktif İç Sistem İş Akışları

Bu dizin, Alo Yönetim'in doğrudan iç operasyonları, veritabanı bakımı, yüksek erişilebilirlik nöbetçileri ve SEO botları için yapılandırılmış 12 adet aktif iş akışını içerir.

## Kategori Dağılımı ve Renkli Etiketler

| Kategori | ID | Standart İş Akışı Adı | Dosya |
| :--- | :--- | :--- | :--- |
| 🔵 **CRM & Saha Operasyonları** | `w01CrmLeadZeng01` | `[CRM & Operasyon] W01 — Teklif Formu & Lead Zenginleştirme Motoru` | `w01-teklif-lead-zenginlestirme.json` |
| 🔵 **CRM & Saha Operasyonları** | `w02CrmDailyTrg01` | `[CRM & Operasyon] W02 — Günlük Talep Triajı & Gecikme Nöbetçisi` | `w02-gunluk-talep-triaji.json` |
| 🔴 **DevOps & Sistem Sağlığı** | `w03DevOpsUptime1` | `[DevOps & SLA] W03 — Master Uptime & Çift Teyitli Sağlık Nöbetçisi` | `w03-master-uptime-watchdog.json` |
| 🔴 **DevOps & Sistem Sağlığı** | `w04DevOpsErrAgg1` | `[DevOps & Güvenlik] W04 — Sistem Hata & Çökme Log Merkezi` | `w04-sistem-hata-merkezi.json` |
| 🔴 **DevOps & Sistem Sağlığı** | `w05DevOpsSslSec1` | `[DevOps & Güvenlik] W05 — SSL Sertifikası & Güvenlik Başlıkları Denetimi` | `w05-ssl-guvenlik-denetimi.json` |
| 🟣 **Veritabanı & Önbellek** | `w06DevOpsPgPerf1` | `[DevOps & DB] W06 — PostgreSQL Performans, Önbellek & Şişme Nöbetçisi` | `w06-postgres-performans-nobetcisi.json` |
| 🟣 **Veritabanı & Önbellek** | `w07DevOpsPgVacu1` | `[DevOps & DB] W07 — PostgreSQL Otomatik Bakım & Güvenli Vacuum` | `w07-postgres-otomatik-bakim-vacuum.json` |
| 🟣 **Veritabanı & Önbellek** | `w08DevOpsPgSnap1` | `[DevOps & DB] W08 — PostgreSQL Gece Bütünlük & Veri Snapshot'ı` | `w08-postgres-gece-snapshot.json` |
| 🟣 **Veritabanı & Önbellek** | `w09DevOpsRedisM1` | `[DevOps & Cache] W09 — Redis Bellek & Parçalanma Nöbetçisi` | `w09-redis-bellek-parcalanma.json` |
| 🟢 **SEO & Arama Motorları** | `w10SeoSitemapCr1` | `[SEO & Botlar] W10 — Master Sitemap Bütünlük & 404 Kırık Rota Avcısı` | `w10-sitemap-404-kirik-rota.json` |
| 🟢 **SEO & Arama Motorları** | `w11SeoIndexNow1` | `[SEO & Botlar] W11 — IndexNow Anlık Arama Motoru Ping Motoru` | `w11-indexnow-otomatik-ping.json` |
| 🟠 **Yönetim & Haftalık Rapor**| `w12MgmtCockpit1` | `[Yönetim & Kokpit] W12 — Alo Yönetim Haftalık Sistem & Operasyon Kokpiti` | `w12-haftalik-yonetici-kokpiti.json` |

## İçe Aktarma (Import)
Sunucuda aşağıdaki komutu çalıştırarak tüm akışları ve etiketleri n8n'e aktarabilirsiniz:
```bash
bash scripts/import-n8n-workflows.sh
```
