# Alo Yönetim — 30 İleri Seviye Kurumsal İş Akışını & Renkli Etiketleri İçe Aktarma (PowerShell)
$ErrorActionPreference = "Stop"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "🚀 Alo Yönetim: 30 Kurumsal İş Akışı İçe Aktarılıyor..." -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# n8n container'ı çalışıyor mu?
$n8nRunning = docker ps --filter "name=aloyonetim-n8n" --format "{{.Names}}"
if (-not $n8nRunning) {
    Write-Host "❌ Hata: aloyonetim-n8n container'ı çalışır durumda değil!" -ForegroundColor Red
    Write-Host "Lütfen önce 'cd docker; docker compose up -d n8n' komutunu çalıştırın." -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 30 İş akış dosyası container içerisine kopyalanıyor..." -ForegroundColor Green
docker exec aloyonetim-n8n mkdir -p /home/node/imported-workflows
docker cp n8n/active/. aloyonetim-n8n:/home/node/imported-workflows/
docker exec aloyonetim-n8n chmod -R 777 /home/node/imported-workflows

Write-Host "⚙️ 30 Aktif iş akışı n8n sistemine kaydediliyor (--activeState=fromJson)..." -ForegroundColor Green
docker exec -u node aloyonetim-n8n sh -c '
  for file in $(find /home/node/imported-workflows -name "*.json" | sort); do
    echo "➡️ İçe aktarılıyor: $(basename "$file")"
    n8n import:workflow --input="$file" --activeState=fromJson
  done
'

# Geçici dosyaları temizle
docker exec aloyonetim-n8n rm -rf /home/node/imported-workflows

Write-Host "🎨 n8n Kategorilendirme Etiketleri (Tags) & Eşleştirmeler Yapılıyor..." -ForegroundColor Green

$pgRunning = docker ps --filter "name=aloyonetim-postgres" --format "{{.Names}}"
if ($pgRunning) {
    Write-Host "🏷️ 7 Kategori etiketi oluşturuluyor..." -ForegroundColor Green
    docker exec aloyonetim-postgres psql -U alo_user -d aloyonetim -c "
      INSERT INTO n8n.tag_entity (id, name, `"createdAt`", `"updatedAt`")
      VALUES 
        ('tag_crm', 'CRM & Saha', NOW(), NOW()),
        ('tag_fin', 'Finans & Aidat', NOW(), NOW()),
        ('tag_sla', 'DevOps & Sağlık', NOW(), NOW()),
        ('tag_db', 'Veritabanı & DB', NOW(), NOW()),
        ('tag_seo', 'SEO & Arama', NOW(), NOW()),
        ('tag_legal', 'Hukuk & İSG', NOW(), NOW()),
        ('tag_mgmt', 'Yönetim & Rapor', NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, `"updatedAt`" = NOW();
    "

    Write-Host "🔗 30 İş akışı 7 kurumsal kategoriye bağlanıyor..." -ForegroundColor Green
    docker exec aloyonetim-postgres psql -U alo_user -d aloyonetim -c "
      INSERT INTO n8n.workflows_tags (`"workflowId`", `"tagId`")
      VALUES
        ('w01CrmLeadZeng01', 'tag_crm'),
        ('w02CrmDailyTrg01', 'tag_crm'),
        ('w03DevOpsUptime1', 'tag_sla'),
        ('w04DevOpsErrAgg1', 'tag_sla'),
        ('w05DevOpsSslSec1', 'tag_sla'),
        ('w06DevOpsPgPerf1', 'tag_db'),
        ('w07DevOpsPgVacu1', 'tag_db'),
        ('w08DevOpsPgSnap1', 'tag_db'),
        ('w09DevOpsRedisM1', 'tag_db'),
        ('w10SeoSitemapCr1', 'tag_seo'),
        ('w11SeoIndexNow1', 'tag_seo'),
        ('w12MgmtCockpit1', 'tag_mgmt'),
        ('w13CrmCrisisTrg1', 'tag_crm'),
        ('w14DevOpsDocker1', 'tag_sla'),
        ('w15DevOpsNginxS1', 'tag_sla'),
        ('w16SeoDistricts1', 'tag_seo'),
        ('w17CrmContractT1', 'tag_crm'),
        ('w18DevOpsExtSla1', 'tag_sla'),
        ('w19FinBillParser1', 'tag_fin'),
        ('w20FinOverdueRem1', 'tag_fin'),
        ('w21FacTicketRoute1', 'tag_crm'),
        ('w22LegCompliance1', 'tag_legal'),
        ('w23FacShiftSummary1', 'tag_crm'),
        ('w24HrJobParser1', 'tag_legal'),
        ('w25DevOpsDiskLog1', 'tag_sla'),
        ('w26DevOpsPgLock1', 'tag_db'),
        ('w27DevOpsSmtpRbl1', 'tag_sla'),
        ('w28DevOpsCronHbt1', 'tag_sla'),
        ('w29DevOpsDnsWhois1', 'tag_sla'),
        ('w30DevOpsNodeLag1', 'tag_sla')
      ON CONFLICT DO NOTHING;
    "

    Write-Host "⚡ Tüm 30 kurumsal iş akışı otomatik çalışma moduna (active = true) geçiriliyor..." -ForegroundColor Green
    docker exec aloyonetim-postgres psql -U alo_user -d aloyonetim -c "
      UPDATE n8n.workflow_entity SET active = true;
    "
}

Write-Host "🔄 n8n servisi zamanlanmış tetikleyicileri (Cron/Schedule) devreye almak için yeniden başlatılıyor..." -ForegroundColor Yellow
docker restart aloyonetim-n8n

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "✅ Tam 30 kurumsal iş akışı n8n'de AKTİF ve OTOMATİK ÇALIŞIYOR!" -ForegroundColor Green
Write-Host "🌐 Paneli kontrol edin: https://n8n.aloyonetim.com.tr/workflows" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
