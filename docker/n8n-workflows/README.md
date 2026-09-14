# Alo Yönetim — 18 İleri Seviye İç Sistem İş Akışları

Bu dizin, Alo Yönetim'in iç saha operasyonları, acil durum kriz yönetimi, sunucu kaynak ve güvenlik nöbetçileri, veritabanı bakımı ve 39 ilçe SEO kalite güvencesi için yapılandırılmış **18 adet kurumsal iş akışını** içerir.

## Kategori Dağılımı ve 5 Renkli Etiket (Tags)

| Kategori | ID | Standart İş Akışı Adı | Dosya |
| :--- | :--- | :--- | :--- |
| 🔵 **CRM & Saha Operasyonları** | `w01CrmLeadZeng01` | `[CRM & Operasyon] W01 — Teklif Formu & Lead Zenginleştirme Motoru` | `w01-teklif-lead-zenginlestirme.json` |
| 🔵 **CRM & Saha Operasyonları** | `w02CrmDailyTrg01` | `[CRM & Operasyon] W02 — Günlük Talep Triajı & Gecikme Nöbetçisi` | `w02-gunluk-talep-triaji.json` |
| 🔵 **CRM & Saha Operasyonları** | `w13CrmCrisisTrg1` | `[Saha & Kriz] W13 — Acil Tesis Arıza & Kriz Triaj Webhook Motoru` | `w13-acil-tesis-ariza-triaji.json` |
| 🔵 **CRM & Saha Operasyonları** | `w17CrmContractT1` | `[CRM & Sözleşme] W17 — Yönetim Sözleşmesi & Genel Kurul Devir-Teslim Takipçisi` | `w17-genel-kurul-sozlesme-takipcisi.json` |
| 🔴 **DevOps & Sistem Sağlığı** | `w03DevOpsUptime1` | `[DevOps & SLA] W03 — Master Uptime & Çift Teyitli Sağlık Nöbetçisi` | `w03-master-uptime-watchdog.json` |
| 🔴 **DevOps & Sistem Sağlığı** | `w04DevOpsErrAgg1` | `[DevOps & Güvenlik] W04 — Sistem Hata & Çökme Log Merkezi` | `w04-sistem-hata-merkezi.json` |
| 🔴 **DevOps & Sistem Sağlığı** | `w05DevOpsSslSec1` | `[DevOps & Güvenlik] W05 — SSL Sertifikası & Güvenlik Başlıkları Denetimi` | `w05-ssl-guvenlik-denetimi.json` |
| 🔴 **DevOps & Sistem Sağlığı** | `w14DevOpsDocker1` | `[DevOps & Sunucu] W14 — Docker Container Kaynak (RAM / CPU / Lag) Nöbetçisi` | `w14-docker-container-nobetcisi.json` |
| 🔴 **DevOps & Sistem Sağlığı** | `w15DevOpsNginxS1` | `[DevOps & Güvenlik] W15 — Nginx Rate-Limit & Bot Saldırısı Denetçisi` | `w15-nginx-guvenlik-bot-koruma.json` |
| 🔴 **DevOps & Sistem Sağlığı** | `w18DevOpsExtSla1` | `[DevOps & Dış Göz] W18 — Çoklu Konum SLA Doğrulama & Harici Uptime Eşitleme` | `w18-harici-uptime-sla-dogrulama.json` |
| 🟣 **Veritabanı & Önbellek** | `w06DevOpsPgPerf1` | `[DevOps & DB] W06 — PostgreSQL Performans, Önbellek & Şişme Nöbetçisi` | `w06-postgres-performans-nobetcisi.json` |
| 🟣 **Veritabanı & Önbellek** | `w07DevOpsPgVacu1` | `[DevOps & DB] W07 — PostgreSQL Otomatik Bakım & Güvenli Vacuum` | `w07-postgres-otomatik-bakim-vacuum.json` |
| 🟣 **Veritabanı & Önbellek** | `w08DevOpsPgSnap1` | `[DevOps & DB] W08 — PostgreSQL Gece Bütünlük & Veri Snapshot'ı` | `w08-postgres-gece-snapshot.json` |
| 🟣 **Veritabanı & Önbellek** | `w09DevOpsRedisM1` | `[DevOps & Cache] W09 — Redis Bellek & Parçalanma Nöbetçisi` | `w09-redis-bellek-parcalanma.json` |
| 🟢 **SEO & Arama Motorları** | `w10SeoSitemapCr1` | `[SEO & Botlar] W10 — Master Sitemap Bütünlük & 404 Kırık Rota Avcısı` | `w10-sitemap-404-kirik-rota.json` |
| 🟢 **SEO & Arama Motorları** | `w11SeoIndexNow1` | `[SEO & Botlar] W11 — IndexNow Anlık Arama Motoru Ping Motoru` | `w11-indexnow-otomatik-ping.json` |
| 🟢 **SEO & Arama Motorları** | `w16SeoDistricts1` | `[SEO & Kalite] W16 — 39 İlçe Sayfaları Canlılık, Canonical & Meta Bütünlük Nöbetçisi` | `w16-39-ilce-canlilik-canonical.json` |
| 🟠 **Yönetim & Haftalık Rapor**| `w12MgmtCockpit1` | `[Yönetim & Kokpit] W12 — Alo Yönetim Haftalık Sistem & Operasyon Kokpiti` | `w12-haftalik-yonetici-kokpiti.json` |

---

## Sunucuda Tek Komutla İçe Aktarma
```bash
git pull origin main && bash scripts/import-n8n-workflows.sh
```
