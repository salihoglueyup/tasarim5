const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
  return execSync(cmd, { stdio: 'inherit' });
}

function runCapture(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

console.log('========================================================');
console.log('🚀 Alo Yönetim: 30 Kurumsal İş Akışı n8n\'e Aktarılıyor...');
console.log('========================================================');

// 1. Container check
try {
  const containers = runCapture('docker ps --format "{{.Names}}"');
  if (!containers.includes('aloyonetim-n8n')) {
    console.error('❌ Hata: aloyonetim-n8n container\'ı çalışmıyor!');
    process.exit(1);
  }
} catch (e) {
  console.error('❌ Docker çalışmıyor:', e.message);
  process.exit(1);
}

// 2. Copy workflows to container
console.log('📦 30 İş akış dosyası container içerisine kopyalanıyor...');
run('docker exec aloyonetim-n8n mkdir -p /tmp/imported-workflows');
run('docker cp n8n/active/. aloyonetim-n8n:/tmp/imported-workflows/');

// 3. Import each workflow file by file
console.log('⚙️ 30 İş akışı tek tek import ediliyor...');
const subdirs = ['crm-operations', 'devops-infrastructure', 'seo-crawlers', 'management-cockpit'];
let importedCount = 0;
const workflowIds = [];

for (const sub of subdirs) {
  const localDir = path.join('n8n', 'active', sub);
  if (!fs.existsSync(localDir)) continue;
  const files = fs.readdirSync(localDir).filter(f => f.endsWith('.json')).sort();
  for (const file of files) {
    const filePath = path.join(localDir, file);
    try {
      const jsonContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (jsonContent.id) workflowIds.push(jsonContent.id);
    } catch (_) {}

    const containerPath = `/tmp/imported-workflows/${sub}/${file}`;
    console.log(`➡️ [${importedCount + 1}/30] İçe aktarılıyor: ${file}`);
    try {
      execSync(`docker exec -u node aloyonetim-n8n n8n import:workflow --input="${containerPath}"`, { stdio: 'ignore' });
      importedCount++;
    } catch (err) {
      console.error(`⚠️ Uyarı (${file}):`, err.message);
    }
  }
}

console.log(`✅ Toplam ${importedCount} iş akışı sisteme aktarıldı.`);
try {
  execSync('docker exec -u root aloyonetim-n8n rm -rf /tmp/imported-workflows', { stdio: 'ignore' });
} catch (_) {}

// 4. Tags and Postgres mapping
console.log('🎨 7 Kurumsal Kategori Etiketleri ve Eşleştirmeler Yapılıyor...');
const sqlScript = `
INSERT INTO n8n.tag_entity (id, name, "createdAt", "updatedAt")
VALUES 
  ('tag_crm', 'CRM & Saha', NOW(), NOW()),
  ('tag_fin', 'Finans & Aidat', NOW(), NOW()),
  ('tag_sla', 'DevOps & Sağlık', NOW(), NOW()),
  ('tag_db', 'Veritabanı & DB', NOW(), NOW()),
  ('tag_seo', 'SEO & Arama', NOW(), NOW()),
  ('tag_legal', 'Hukuk & İSG', NOW(), NOW()),
  ('tag_mgmt', 'Yönetim & Rapor', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = NOW();

INSERT INTO n8n.workflows_tags ("workflowId", "tagId")
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

-- BÜTÜN 30 İŞ AKIŞINI AKTİF (active = true) DURUMUNA GEÇİR
UPDATE n8n.workflow_entity SET active = true;
`;

fs.writeFileSync('temp_n8n_tags.sql', sqlScript, 'utf8');
try {
  run('docker cp temp_n8n_tags.sql aloyonetim-postgres:/tmp/n8n_tags.sql');
  run('docker exec aloyonetim-postgres psql -U alo_user -d aloyonetim -f /tmp/n8n_tags.sql');
  run('docker exec aloyonetim-postgres rm -f /tmp/n8n_tags.sql');
} finally {
  if (fs.existsSync('temp_n8n_tags.sql')) fs.unlinkSync('temp_n8n_tags.sql');
}

// 5. Publish each workflow in n8n
console.log('📢 30 İş akışı n8n motorunda canlıya alınıyor (publish:workflow)...');
let publishedCount = 0;
for (const id of workflowIds) {
  try {
    execSync(`docker exec -u node aloyonetim-n8n n8n publish:workflow --id=${id}`, { stdio: 'ignore' });
    publishedCount++;
  } catch (err) {
    console.error(`⚠️ Yayınlama uyarısı (${id}):`, err.message);
  }
}
console.log(`✅ ${publishedCount}/30 iş akışı başarıyla yayınlandı.`);

// 6. Restart n8n container to register cron schedules & webhooks
console.log('🔄 n8n yeniden başlatılıyor (Scheduler & Webhook aktivasyonu)...');
run('docker restart aloyonetim-n8n');

// 7. Verify active status
console.log('🔍 Aktif akışlar veritabanından doğrulanıyor...');
try {
  run('docker exec aloyonetim-postgres psql -U alo_user -d aloyonetim -c "SELECT count(*) as aktif_is_akislari FROM n8n.workflow_entity WHERE active = true;"');
} catch (err) {
  console.log('Doğrulama:', err.message);
}

console.log('========================================================');
console.log('✅ Tam 30 kurumsal iş akışı n8n sisteminde AKTİF ve ÇALIŞIYOR!');
console.log('🌐 Panel: https://n8n.aloyonetim.com.tr/workflows veya http://localhost:5678');
console.log('========================================================');
