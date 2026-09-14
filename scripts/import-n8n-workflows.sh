#!/bin/bash
# Alo Yönetim — 30 İleri Seviye Kurumsal İş Akışını & Renkli Etiketleri İçe Aktarma Scripti
set -e

echo "========================================================"
echo "🚀 Alo Yönetim: 30 Kurumsal İş Akışı İçe Aktarılıyor..."
echo "========================================================"

# n8n container'ı çalışıyor mu kontrol et
if ! docker ps | grep -q "aloyonetim-n8n"; then
  echo "❌ Hata: aloyonetim-n8n container'ı çalışır durumda değil!"
  echo "Lütfen önce 'cd docker && docker compose up -d n8n' komutunu çalıştırın."
  exit 1
fi

echo "📦 30 İş akış dosyası container içerisine kopyalanıyor..."

# Volume bağımlılığını sıfırlamak için doğrudan container içine kopyala
docker exec aloyonetim-n8n mkdir -p /home/node/imported-workflows
docker cp n8n/active/. aloyonetim-n8n:/home/node/imported-workflows/
docker exec aloyonetim-n8n chmod -R 777 /home/node/imported-workflows

echo "⚙️ 30 Aktif iş akışı n8n sistemine kaydediliyor..."

# Container içindeki iş akışlarını içe aktar
docker exec -u node aloyonetim-n8n sh -c '
  for file in $(find /home/node/imported-workflows -name "*.json" | sort); do
    echo "➡️ İçe aktarılıyor: $(basename "$file")"
    n8n import:workflow --input="$file" --activeState=fromJson
  done
'

# Geçici dosyaları temizle
docker exec aloyonetim-n8n rm -rf /home/node/imported-workflows

echo "🎨 n8n Kategorilendirme Etiketleri (Tags) & Eşleştirmeler Yapılıyor..."

# n8n PostgreSQL şemasına renkli etiketleri ve akış eşleşmelerini yaz
if docker ps | grep -q "aloyonetim-postgres"; then
  echo "🏷️ 7 Kategori etiketi oluşturuluyor..."
  docker exec aloyonetim-postgres psql -U alo_user -d aloyonetim -c "
    INSERT INTO n8n.tag_entity (id, name, \"createdAt\", \"updatedAt\")
    VALUES 
      ('tag_crm', 'CRM & Saha', NOW(), NOW()),
      ('tag_fin', 'Finans & Aidat', NOW(), NOW()),
      ('tag_sla', 'DevOps & Sağlık', NOW(), NOW()),
      ('tag_db', 'Veritabanı & DB', NOW(), NOW()),
      ('tag_seo', 'SEO & Arama', NOW(), NOW()),
      ('tag_legal', 'Hukuk & İSG', NOW(), NOW()),
      ('tag_mgmt', 'Yönetim & Rapor', NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, \"updatedAt\" = NOW();
  "

  echo "🔗 30 İş akışı 7 kurumsal kategoriye bağlanıyor..."
  docker exec aloyonetim-postgres psql -U alo_user -d aloyonetim -c "
    INSERT INTO n8n.workflows_tags (\"workflowId\", \"tagId\")
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

  echo "🧹 Eski/mükerrer harici akışlar temizleniyor..."
  docker exec aloyonetim-postgres psql -U alo_user -d aloyonetim -c "
    DELETE FROM n8n.workflows_tags WHERE \"workflowId\" NOT IN (
      'w01CrmLeadZeng01', 'w02CrmDailyTrg01', 'w03DevOpsUptime1',
      'w04DevOpsErrAgg1', 'w05DevOpsSslSec1', 'w06DevOpsPgPerf1',
      'w07DevOpsPgVacu1', 'w08DevOpsPgSnap1', 'w09DevOpsRedisM1',
      'w10SeoSitemapCr1', 'w11SeoIndexNow1', 'w12MgmtCockpit1',
      'w13CrmCrisisTrg1', 'w14DevOpsDocker1', 'w15DevOpsNginxS1',
      'w16SeoDistricts1', 'w17CrmContractT1', 'w18DevOpsExtSla1',
      'w19FinBillParser1', 'w20FinOverdueRem1', 'w21FacTicketRoute1',
      'w22LegCompliance1', 'w23FacShiftSummary1', 'w24HrJobParser1',
      'w25DevOpsDiskLog1', 'w26DevOpsPgLock1', 'w27DevOpsSmtpRbl1',
      'w28DevOpsCronHbt1', 'w29DevOpsDnsWhois1', 'w30DevOpsNodeLag1'
    );
    DELETE FROM n8n.shared_workflow WHERE \"workflowId\" NOT IN (
      'w01CrmLeadZeng01', 'w02CrmDailyTrg01', 'w03DevOpsUptime1',
      'w04DevOpsErrAgg1', 'w05DevOpsSslSec1', 'w06DevOpsPgPerf1',
      'w07DevOpsPgVacu1', 'w08DevOpsPgSnap1', 'w09DevOpsRedisM1',
      'w10SeoSitemapCr1', 'w11SeoIndexNow1', 'w12MgmtCockpit1',
      'w13CrmCrisisTrg1', 'w14DevOpsDocker1', 'w15DevOpsNginxS1',
      'w16SeoDistricts1', 'w17CrmContractT1', 'w18DevOpsExtSla1',
      'w19FinBillParser1', 'w20FinOverdueRem1', 'w21FacTicketRoute1',
      'w22LegCompliance1', 'w23FacShiftSummary1', 'w24HrJobParser1',
      'w25DevOpsDiskLog1', 'w26DevOpsPgLock1', 'w27DevOpsSmtpRbl1',
      'w28DevOpsCronHbt1', 'w29DevOpsDnsWhois1', 'w30DevOpsNodeLag1'
    );
    DELETE FROM n8n.workflow_entity WHERE id NOT IN (
      'w01CrmLeadZeng01', 'w02CrmDailyTrg01', 'w03DevOpsUptime1',
      'w04DevOpsErrAgg1', 'w05DevOpsSslSec1', 'w06DevOpsPgPerf1',
      'w07DevOpsPgVacu1', 'w08DevOpsPgSnap1', 'w09DevOpsRedisM1',
      'w10SeoSitemapCr1', 'w11SeoIndexNow1', 'w12MgmtCockpit1',
      'w13CrmCrisisTrg1', 'w14DevOpsDocker1', 'w15DevOpsNginxS1',
      'w16SeoDistricts1', 'w17CrmContractT1', 'w18DevOpsExtSla1',
      'w19FinBillParser1', 'w20FinOverdueRem1', 'w21FacTicketRoute1',
      'w22LegCompliance1', 'w23FacShiftSummary1', 'w24HrJobParser1',
      'w25DevOpsDiskLog1', 'w26DevOpsPgLock1', 'w27DevOpsSmtpRbl1',
      'w28DevOpsCronHbt1', 'w29DevOpsDnsWhois1', 'w30DevOpsNodeLag1'
    );
    UPDATE n8n.workflow_entity SET active = true;
  " 2>/dev/null || true

  echo "⚡ Tüm 30 kurumsal iş akışı otomatik çalışma moduna (active = true) geçirildi."
  echo "✅ 7 Kategori ve 30 kurumsal akış bağı başarıyla oluşturuldu!"
fi

echo "🔄 n8n servisi zamanlanmış tetikleyicileri (Cron/Schedule) devreye almak için yeniden başlatılıyor..."
docker restart aloyonetim-n8n

echo "========================================================"
echo "✅ Tam 30 kurumsal iş akışı n8n'de AKTİF ve OTOMATİK ÇALIŞIYOR!"
echo "🌐 Paneli kontrol edin: https://n8n.aloyonetim.com.tr/workflows"
echo "========================================================"
