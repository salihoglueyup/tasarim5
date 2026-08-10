const fs = require('fs');
const path = require('path');

const locales = ['tr', 'en', 'ar', 'ru'];
const basePath = path.join(__dirname, 'src', 'i18n', 'locales');

const newKeys = {
  about_stats_badge: "Dinamik Büyüme",
  about_stats_title: "Sayılarla Alo Yönetim",
  about_stats_desc: "Kuruluşumuzdan bu yana istikrarlı büyümemizi sürdürüyoruz.",
  about_stats_1_val: "15",
  about_stats_1_label: "Yıllık Tecrübe",
  about_stats_2_val: "45000",
  about_stats_2_label: "Bağımsız Bölüm",
  about_stats_3_val: "1200",
  about_stats_3_label: "Saha Çalışanı",
  about_stats_4_val: "22",
  about_stats_4_label: "Tasarruf Oranı (%)",
  
  about_values_badge: "Kurumsal Prensiplerimiz",
  about_values_title: "Bizi Biz Yapan Değerler",
  about_values_desc: "Tüm süreçlerimizde şeffaflık ve güveni merkeze alarak hareket ediyoruz.",
  
  about_value_1_title: "Şeffaflık",
  about_value_1_desc: "Toplanan her kuruşun nereye harcandığını kat malikleriyle anlık olarak paylaşıyoruz.",
  about_value_2_title: "Güvenilirlik",
  about_value_2_desc: "Özel güvenlik sertifikalarımız ve hukuki güvencelerimizle sitenizi sıfır riskle yönetiyoruz.",
  about_value_3_title: "İnovasyon",
  about_value_3_desc: "Geleneksel yönetimi rafa kaldırıp, mobil uygulamalarımız ve AI destekli kameralarla geleceği tasarlıyoruz.",
  about_value_4_title: "Çevreye Duyarlılık",
  about_value_4_desc: "Sıfır atık, güneş enerjisi ve ekolojik temizlik kimyasallarıyla yeşil doğayı koruyoruz."
};

locales.forEach(locale => {
  const filePath = path.join(basePath, locale, 'common.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const [key, value] of Object.entries(newKeys)) {
      if (!data[key]) {
        data[key] = value;
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${locale}/common.json`);
  }
});
