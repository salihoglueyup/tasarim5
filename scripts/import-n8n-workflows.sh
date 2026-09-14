#!/bin/bash
# Alo Yönetim — n8n Hazır İş Akışlarını & Renkli Etiketleri Otomatik İçe Aktarma Scripti
set -e

echo "========================================================"
echo "🚀 Alo Yönetim: n8n İç Sistem İş Akışları İçe Aktarılıyor..."
echo "========================================================"

# n8n container'ı çalışıyor mu kontrol et
if ! docker ps | grep -q "aloyonetim-n8n"; then
  echo "❌ Hata: aloyonetim-n8n container'ı çalışır durumda değil!"
  echo "Lütfen önce 'cd docker && docker compose up -d n8n' komutunu çalıştırın."
  exit 1
fi

echo "📦 İş akış dosyaları container içerisine aktarılıyor..."

# Volume bağımlılığını sıfırlamak için doğrudan container içine kopyala
docker exec aloyonetim-n8n mkdir -p /home/node/imported-workflows
docker cp n8n/active/. aloyonetim-n8n:/home/node/imported-workflows/
docker exec aloyonetim-n8n chmod -R 777 /home/node/imported-workflows

echo "⚙️ 12 Aktif iş akışı n8n sistemine kaydediliyor..."

# Container içindeki iş akışlarını içe aktar
docker exec -u node aloyonetim-n8n sh -c '
  for file in $(find /home/node/imported-workflows -name "*.json" | sort); do
    echo "➡️ İçe aktarılıyor: $(basename "$file")"
    n8n import:workflow --input="$file"
  done
'

# Geçici dosyaları temizle
docker exec aloyonetim-n8n rm -rf /home/node/imported-workflows

echo "🎨 n8n Kategorilendirme Etiketleri (Tags) & Temizlik Yapılıyor..."

# n8n PostgreSQL şemasına renkli etiketleri ve akış eşleşmelerini yaz
if docker ps | grep -q "aloyonetim-postgres"; then
  echo "🏷️ Kategori etiketleri oluşturuluyor..."
  docker exec aloyonetim-postgres psql -U alo_user -d aloyonetim -c "
    INSERT INTO n8n.tag_entity (id, name, \"createdAt\", \"updatedAt\")
    VALUES 
      ('tag_crm', 'CRM & Saha Operasyonları', NOW(), NOW()),
      ('tag_sla', 'DevOps & Sistem Sağlığı', NOW(), NOW()),
      ('tag_db', 'Veritabanı & Önbellek', NOW(), NOW()),
      ('tag_seo', 'SEO & Arama Motorları', NOW(), NOW()),
      ('tag_mgmt', 'Yönetim & Haftalık Rapor', NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, \"updatedAt\" = NOW();
  "

  echo "🔗 İş akışları kategorilerine bağlanıyor..."
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
      ('w12MgmtCockpit1', 'tag_mgmt')
    ON CONFLICT DO NOTHING;
  "

  echo "🧹 Eski/mükerrer iş akışları temizleniyor..."
  docker exec aloyonetim-postgres psql -U alo_user -d aloyonetim -c "
    DELETE FROM n8n.workflows_tags WHERE \"workflowId\" NOT IN (
      'w01CrmLeadZeng01', 'w02CrmDailyTrg01', 'w03DevOpsUptime1',
      'w04DevOpsErrAgg1', 'w05DevOpsSslSec1', 'w06DevOpsPgPerf1',
      'w07DevOpsPgVacu1', 'w08DevOpsPgSnap1', 'w09DevOpsRedisM1',
      'w10SeoSitemapCr1', 'w11SeoIndexNow1', 'w12MgmtCockpit1'
    );
    DELETE FROM n8n.shared_workflow WHERE \"workflowId\" NOT IN (
      'w01CrmLeadZeng01', 'w02CrmDailyTrg01', 'w03DevOpsUptime1',
      'w04DevOpsErrAgg1', 'w05DevOpsSslSec1', 'w06DevOpsPgPerf1',
      'w07DevOpsPgVacu1', 'w08DevOpsPgSnap1', 'w09DevOpsRedisM1',
      'w10SeoSitemapCr1', 'w11SeoIndexNow1', 'w12MgmtCockpit1'
    );
    DELETE FROM n8n.workflow_entity WHERE id NOT IN (
      'w01CrmLeadZeng01', 'w02CrmDailyTrg01', 'w03DevOpsUptime1',
      'w04DevOpsErrAgg1', 'w05DevOpsSslSec1', 'w06DevOpsPgPerf1',
      'w07DevOpsPgVacu1', 'w08DevOpsPgSnap1', 'w09DevOpsRedisM1',
      'w10SeoSitemapCr1', 'w11SeoIndexNow1', 'w12MgmtCockpit1'
    );
  " 2>/dev/null || true

  echo "✅ 5 Kategori etiketi bağlandı ve eski akışlar temizlendi!"
fi

echo "========================================================"
echo "✅ Sadece 12 aktif iç sistem akışı tertemiz n8n'de yayında!"
echo "🌐 Paneli yenileyin: https://n8n.aloyonetim.com.tr/workflows"
echo "========================================================"
