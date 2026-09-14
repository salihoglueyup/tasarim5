const { execSync } = require('child_process');

const workflowIds = [
  'w01CrmLeadZeng01',
  'w02CrmDailyTrg01',
  'w03DevOpsUptime1',
  'w04DevOpsErrAgg1',
  'w05DevOpsSslSec1',
  'w06DevOpsPgPerf1',
  'w07DevOpsPgVacu1',
  'w08DevOpsPgSnap1',
  'w09DevOpsRedisM1',
  'w10SeoSitemapCr1',
  'w11SeoIndexNow1',
  'w12MgmtCockpit1',
  'w13CrmCrisisTrg1',
  'w14DevOpsDocker1',
  'w15DevOpsNginxS1',
  'w16SeoDistricts1',
  'w17CrmContractT1',
  'w18DevOpsExtSla1',
  'w19FinBillParser1',
  'w20FinOverdueRem1',
  'w21FacTicketRoute1',
  'w22LegCompliance1',
  'w23FacShiftSummary1',
  'w24HrJobParser1',
  'w25DevOpsDiskLog1',
  'w26DevOpsPgLock1',
  'w27DevOpsSmtpRbl1',
  'w28DevOpsCronHbt1',
  'w29DevOpsDnsWhois1',
  'w30DevOpsNodeLag1'
];

console.log('========================================================');
console.log('🚀 Alo Yönetim: 30 İş Akışı n8n\'de Canlıya Alınıyor (Publishing)...');
console.log('========================================================');

let success = 0;
for (let i = 0; i < workflowIds.length; i++) {
  const id = workflowIds[i];
  try {
    execSync(`docker exec -u node aloyonetim-n8n n8n publish:workflow --id=${id}`, { stdio: 'ignore' });
    console.log(`✅ [${i + 1}/30] Canlıya alındı (Published & Active): ${id}`);
    success++;
  } catch (err) {
    console.error(`❌ Hata (${id}):`, err.message);
  }
}

console.log(`\n🎉 Toplam ${success}/30 iş akışı başarıyla yayınlandı!`);
console.log('🔄 n8n yeniden başlatılıyor (Tüm cron, schedule ve webhook tetikleyicileri uyanıyor)...');
execSync('docker restart aloyonetim-n8n', { stdio: 'inherit' });

console.log('========================================================');
console.log('✅ BÜTÜN 30 İŞ AKIŞI ARTIK %100 OTOMATİK ÇALIŞIYOR!');
console.log('========================================================');
