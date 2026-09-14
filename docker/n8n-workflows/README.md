# Alo Yönetim — 30 İleri Seviye Kurumsal İş Akışları

Bu dizin, Alo Yönetim'in iç saha operasyonları, arıza kriz yönetimi, kurumsal fatura ayrıştırma, gecikmiş aidat faiz hesaplamaları, sunucu kaynak, disk ve log nöbetçileri, PostgreSQL kilitli sorgu avcısı, SMTP kara liste kontrolü, cron heartbeat ve 39 ilçe SEO kalite güvencesi için yapılandırılmış **30 adet kurumsal iş akışını** içerir.

## Kategori Dağılımı ve 7 Renkli Etiket (Tags)

| Kategori | ID | Standart İş Akışı Adı | Dosya |
| :--- | :--- | :--- | :--- |
| 🔵 **CRM & Saha** | `w01CrmLeadZeng01` | `[CRM & Operasyon] W01 — Teklif Formu & Lead Zenginleştirme Motoru` | `w01-teklif-lead-zenginlestirme.json` |
| 🔵 **CRM & Saha** | `w02CrmDailyTrg01` | `[CRM & Operasyon] W02 — Günlük Talep Triajı & Gecikme Nöbetçisi` | `w02-gunluk-talep-triaji.json` |
| 🔵 **CRM & Saha** | `w13CrmCrisisTrg1` | `[Saha & Kriz] W13 — Acil Tesis Arıza & Kriz Triaj Webhook Motoru` | `w13-acil-tesis-ariza-triaji.json` |
| 🔵 **CRM & Saha** | `w17CrmContractT1` | `[CRM & Sözleşme] W17 — Yönetim Sözleşmesi & Genel Kurul Devir-Teslim Takipçisi` | `w17-genel-kurul-sozlesme-takipcisi.json` |
| 🔵 **CRM & Saha** | `w21FacTicketRoute1` | `[Saha & Bakım] W21 — Akıllı Tesis Arıza Sınıflandırıcı & Taşeron Sevk Motoru` | `w21-akilli-ariza-taseron-sevki.json` |
| 🔵 **CRM & Saha** | `w23FacShiftSummary1` | `[Saha & Güvenlik] W23 — 5188 Özel Güvenlik & Temizlik Günlük Vardiya Devir Bülteni` | `w23-guvenlik-vardiya-devir-bulteni.json` |
| 🟡 **Finans & Aidat** | `w19FinBillParser1` | `[Finans & Fatura] W19 — BEDAŞ/İSKİ/İGDAŞ Fatura & Sayaç Ayrıştırıcı` | `w19-kurumsal-fatura-sayac-ayristirici.json` |
| 🟡 **Finans & Aidat** | `w20FinOverdueRem1` | `[Finans & Borç] W20 — KMK m.20 Gecikmiş Aidat & %5 Yasal Faiz Hatırlatıcı` | `w20-gecikmis-aidat-faiz-hatirlatici.json` |
| ⚖️ **Hukuk & İSG** | `w22LegCompliance1` | `[Hukuk & KMK] W22 — Apartman/Site 6331 İSG & Yangın Mevzuat Denetim Listesi` | `w22-isg-yangin-mevzuat-denetimi.json` |
| ⚖️ **Hukuk & İSG** | `w24HrJobParser1` | `[İK & Personel] W24 — Kapıcı, Güvenlik & Temizlik Personeli Başvuru Tasnifçisi` | `w24-personel-basvuru-tasnifcisi.json` |
| 🔴 **DevOps & Sağlık** | `w03DevOpsUptime1` | `[DevOps & SLA] W03 — Master Uptime & Çift Teyitli Sağlık Nöbetçisi` | `w03-master-uptime-watchdog.json` |
| 🔴 **DevOps & Sağlık** | `w04DevOpsErrAgg1` | `[DevOps & Güvenlik] W04 — Sistem Hata & Çökme Log Merkezi` | `w04-sistem-hata-merkezi.json` |
| 🔴 **DevOps & Sağlık** | `w05DevOpsSslSec1` | `[DevOps & Güvenlik] W05 — SSL Sertifikası & Güvenlik Başlıkları Denetimi` | `w05-ssl-guvenlik-denetimi.json` |
| 🔴 **DevOps & Sağlık** | `w14DevOpsDocker1` | `[DevOps & Sunucu] W14 — Docker Container Kaynak (RAM / CPU / Lag) Nöbetçisi` | `w14-docker-container-nobetcisi.json` |
| 🔴 **DevOps & Sağlık** | `w15DevOpsNginxS1` | `[DevOps & Güvenlik] W15 — Nginx Rate-Limit & Bot Saldırısı Denetçisi` | `w15-nginx-guvenlik-bot-koruma.json` |
| 🔴 **DevOps & Sağlık** | `w18DevOpsExtSla1` | `[DevOps & Dış Göz] W18 — Çoklu Konum SLA Doğrulama & Harici Uptime Eşitleme` | `w18-harici-uptime-sla-dogrulama.json` |
| 🔴 **DevOps & Sağlık** | `w25DevOpsDiskLog1` | `[DevOps & Sunucu] W25 — Sunucu Disk Doluluğu, Inode & Log Şişmesi Nöbetçisi` | `w25-sunucu-disk-ve-log-nobetcisi.json` |
| 🔴 **DevOps & Sağlık** | `w27DevOpsSmtpRbl1` | `[DevOps & Mail] W27 — Kurumsal SMTP İletim Sağlığı, SPF/DKIM & Kara Liste (RBL) Nöbetçisi` | `w27-smtp-sagligi-ve-kara-liste.json` |
| 🔴 **DevOps & Sağlık** | `w28DevOpsCronHbt1` | `[DevOps & Cron] W28 — Arka Plan Görev Kalp Atışı (Cron Heartbeat Nöbetçisi)` | `w28-cron-kalp-atisi-heartbeat.json` |
| 🔴 **DevOps & Sağlık** | `w29DevOpsDnsWhois1` | `[DevOps & Ağ] W29 — Alan Adı (Domain WHOIS) Bitiş & Anycast DNS Hız Nöbetçisi` | `w29-domain-whois-ve-dns-hizi.json` |
| 🔴 **DevOps & Sağlık** | `w30DevOpsNodeLag1` | `[DevOps & Performans] W30 — Node.js / Next.js Event Loop Gecikmesi & Heap Bellek Sızıntısı Nöbetçisi` | `w30-nodejs-lag-ve-heap-nobetcisi.json` |
| 🟣 **Veritabanı & DB** | `w06DevOpsPgPerf1` | `[DevOps & DB] W06 — PostgreSQL Performans, Önbellek & Şişme Nöbetçisi` | `w06-postgres-performans-nobetcisi.json` |
| 🟣 **Veritabanı & DB** | `w07DevOpsPgVacu1` | `[DevOps & DB] W07 — PostgreSQL Otomatik Bakım & Güvenli Vacuum` | `w07-postgres-otomatik-bakim-vacuum.json` |
| 🟣 **Veritabanı & DB** | `w08DevOpsPgSnap1` | `[DevOps & DB] W08 — PostgreSQL Gece Bütünlük & Veri Snapshot'ı` | `w08-postgres-gece-snapshot.json` |
| 🟣 **Veritabanı & DB** | `w09DevOpsRedisM1` | `[DevOps & Cache] W09 — Redis Bellek & Parçalanma Nöbetçisi` | `w09-redis-bellek-parcalanma.json` |
| 🟣 **Veritabanı & DB** | `w26DevOpsPgLock1` | `[DevOps & DB] W26 — PostgreSQL Kilitli / Yavaş Sorgu & Askıda Kalan Bağlantı Avcısı` | `w26-postgres-kilitli-sorgu-avcisi.json` |
| 🟢 **SEO & Arama** | `w10SeoSitemapCr1` | `[SEO & Botlar] W10 — Master Sitemap Bütünlük & 404 Kırık Rota Avcısı` | `w10-sitemap-404-kirik-rota.json` |
| 🟢 **SEO & Arama** | `w11SeoIndexNow1` | `[SEO & Botlar] W11 — IndexNow Anlık Arama Motoru Ping Motoru` | `w11-indexnow-otomatik-ping.json` |
| 🟢 **SEO & Arama** | `w16SeoDistricts1` | `[SEO & Kalite] W16 — 39 İlçe Sayfaları Canlılık, Canonical & Meta Bütünlük Nöbetçisi` | `w16-39-ilce-canlilik-canonical.json` |
| 🟠 **Yönetim & Rapor**| `w12MgmtCockpit1` | `[Yönetim & Kokpit] W12 — Alo Yönetim Haftalık Sistem & Operasyon Kokpiti` | `w12-haftalik-yonetici-kokpiti.json` |

---

## Sunucuda Tek Komutla İçe Aktarma
```bash
git pull origin main && bash scripts/import-n8n-workflows.sh
```
