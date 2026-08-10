const fs = require('fs');
const path = require('path');

const newTranslations = {
  "about_stats_1_label": "Yıllık Tecrübe",
  "about_stats_2_label": "Bağımsız Bölüm",
  "about_stats_3_label": "Saha Çalışanı",
  "about_stats_4_label": "Tasarruf Oranı",
  "about_values_badge": "Kurumsal Prensiplerimiz",
  "about_values_title": "Bizi Biz Yapan Değerler",
  "about_values_desc": "Tüm süreçlerimizde şeffaflık ve güveni merkeze alarak hareket ediyoruz.",
  "about_value_1_title": "Şeffaflık",
  "about_value_1_desc": "Toplanan her kuruşun nereye harcandığını kat malikleriyle anlık olarak paylaşıyoruz.",
  "about_value_2_title": "Güvenilirlik",
  "about_value_2_desc": "Özel güvenlik sertifikalarımız ve hukuki güvencelerimizle sitenizi sıfır riskle yönetiyoruz.",
  "about_value_3_title": "İnovasyon",
  "about_value_3_desc": "Geleneksel yönetimi rafa kaldırıp, mobil uygulamalarımız ve AI kameralarla geleceği tasarlıyoruz.",
  "about_value_4_title": "Çevreye Duyarlılık",
  "about_value_4_desc": "Sıfır atık, güneş enerjisi ve ekolojik temizlik kimyasallarıyla yeşil doğayı koruyoruz.",
  "about_hero_title": "Geleneksel yönetimi <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500\">dijitalleştirdik.</span>",
  "btn_contact_us": "Bize Ulaşın",
  "about_value_4_badge": "Sürdürülebilir Operasyon"
};

const commonPath = path.join(__dirname, '../src/i18n/locales/tr/common.json');
const trData = require(commonPath);

let keysAdded = 0;
for (const [key, val] of Object.entries(newTranslations)) {
  if (!trData[key]) {
    trData[key] = val;
    keysAdded++;
  }
}

fs.writeFileSync(commonPath, JSON.stringify(trData, null, 2));
console.log(`Successfully added ${keysAdded} translation keys to tr/common.json for Hakkimizda!`);
