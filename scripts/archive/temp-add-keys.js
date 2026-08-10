const fs = require('fs');
const path = 'src/i18n/locales/tr/common.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const vizyonMisyonKeys = {
  'values_title': 'Temel Değerlerimiz',
  'values_desc': 'Alo Yönetim olarak attığımız her adımda ve sunduğumuz her hizmette bu dört temel prensibi merkeze alıyoruz.',
  'value_1_title': 'Şeffaflık',
  'value_1_desc': 'Tüm finansal ve operasyonel süreçlerimizde kat maliklerine karşı %100 hesap verebilirlik ilkesiyle hareket ederiz.',
  'value_2_title': 'Güven',
  'value_2_desc': 'Yaşam alanlarınızı emanet ettiğiniz bilinciyle, huzur ve güvenliğinizi en üst düzeyde sağlamak için çalışırız.',
  'value_3_title': 'Yenilikçilik',
  'value_3_desc': 'Sektördeki teknolojik gelişmeleri yakından takip eder, mobil uygulamalarımız ve dijital altyapımızla hayatınızı kolaylaştırırız.',
  'value_4_title': 'Sürdürülebilirlik',
  'value_4_desc': 'Çevreye duyarlı yönetim anlayışımızla, yeşil alanları korur ve enerji verimliliğini ön planda tutan projeler geliştiririz.',
  'ceo_message_title': 'Yönetim Felsefemiz',
  'ceo_message_quote': '"Amacımız sadece binaları yönetmek değil, o binalarda yaşayan insanların hayatlarına dokunmak, huzurlu ve güvenli yaşam alanları inşa etmektir. Bizim için her proje, yeni bir aileye katılmak demektir."',
  'ceo_name': 'Alo Yönetim Ekibi',
  'impact_title': 'Rakamlarla Biz',
  'impact_desc': 'Sektördeki tecrübemiz ve uzman kadromuzla, her geçen gün daha fazla yaşam alanına değer katmaya devam ediyoruz.',
  'stat_1_label': 'Yönetilen Proje',
  'stat_1_value': '150+',
  'stat_2_label': 'Mutlu Sakin',
  'stat_2_value': '10.000+',
  'stat_3_label': 'Uzman Personel',
  'stat_3_value': '450+',
  'stat_4_label': 'Hizmet Yılı',
  'stat_4_value': '12+'
};

const updatedData = { ...data, ...vizyonMisyonKeys };
fs.writeFileSync(path, JSON.stringify(updatedData, null, 2));
console.log('Added legal keys to tr/common.json');
