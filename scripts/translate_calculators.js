const fs = require('fs');
const dir = 'src/components/sections/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Calculator.tsx') || f.endsWith('Testimonials.tsx'));

const dict = {
  'Tahmini Aylık Bütçe': 'calc_est_budget',
  'Ücretsiz Keşif İste': 'calc_btn_free_discovery',
  'Detaylı Rapor İste': 'calc_btn_detail_report',
  'Hemen Alacak Dosyası Aç': 'calc_btn_open_file',
  '* KDV hariç ortalama maliyettir. Kesin fiyat keşif sonrası belirlenir.': 'calc_disclaimer_standard',
  '* Personel maaşı, sgk, yol, yemek ve temel sarf malzemeleri dahildir. Kesin fiyat keşif sonrası belirlenir.': 'calc_disclaimer_cleaning',
  '* Kayıp/kaçak önleme, hukuki tam tahsilat ve toplu alım iskontoları ile elde edilen tahmini ortalama kazançtır.': 'calc_disclaimer_facility',
  '* Sitenizin genel giderleri (elektrik, sigorta, malzeme) üzerinden öngörülen ortalama tasarruf miktarıdır.': 'calc_disclaimer_dues',
  '* Gübreleme, budama, çim biçme ve periyodik ilaçlama (bitki koruma) tahmini asgari maliyetleridir.': 'calc_disclaimer_landscape',
  '* Jeneratör, hidrofor, yangın pompaları ve asansör periyodik bakım (parça hariç) asgari maliyetleridir.': 'calc_disclaimer_maintenance',
  '* Ortak alanlar, sığınaklar, depolar ve kapalı otoparklar dahil periyodik ilaçlama (kemirgen ve haşere) tahmini asgari maliyetleridir.': 'calc_disclaimer_pest',
  '* Havuz operatörü kontrolü, ph/klor dengelemesi ve standart kimyasal kullanımı tahmini asgari maliyetleridir.': 'calc_disclaimer_pool',
  'Gecikme Zammı + Yasal Faiz Dahildir!': 'calc_legal_included',
  'Güvenlik Personeli Sayısı': 'calc_sec_personnel',
  'Kamera Sayısı (Tahmini)': 'calc_sec_cameras',
  'Toplam Ortak Alan (m²)': 'calc_clean_area',
  'Önerilen Optimum Personel Sayısı': 'calc_clean_optimum',
  'Daire Sayısı': 'calc_fac_flats',
  'Ortalama Aidat Tutarı': 'calc_fac_avg_dues',
  'Aylık Net Bütçe Tasarrufu': 'calc_fac_net_savings',
  'Bağımsız Bölüm Sayısı': 'calc_dues_units',
  'Tahmini Yıllık Tasarruf': 'calc_dues_yearly_savings',
  'Toplam Yeşil Alan (m²)': 'calc_land_area',
  'Ziraat Mühendisi Kontrolü': 'calc_land_engineer',
  'Standart Pakete Dahildir': 'calc_included_standard',
  'Ödenmeyen Aidat (Gecikmiş Alacak)': 'calc_legal_debt',
  'Site Yönetimine Maliyeti': 'calc_legal_cost',
  '₺0 (Avukatlık Ücreti Borçludan Alınır)': 'calc_legal_zero_cost',
  'Geri Kazanılacak Tutar': 'calc_legal_recovery',
  'Asansör / Yürüyen Merdiven Sayısı': 'calc_maint_elevators',
  'Mekanik ve Ortak Alan (m²)': 'calc_maint_area',
  'Blok (Bina) Sayısı': 'calc_pest_blocks',
  'Kullanılan Ürünler': 'calc_pest_products',
  'Sağlık Bakanlığı Onaylı & Çevre Dostu': 'calc_pest_eco',
  'Havuz Hacmi (m³)': 'calc_pool_volume',
  'Mikrobiyolojik Su Analizi': 'calc_pool_analysis',
  'Akredite Laboratuvar Dahildir': 'calc_pool_lab_included',
  'Hızlı Güvenlik Bütçesi Hesapla': 'calc_sec_title',
  'Tesisinizin ihtiyaç duyduğu güvenlik altyapısı için ortalama aylık maliyeti anında görün.': 'calc_sec_desc',
  'Optimum Personel & Bütçe Hesaplayıcı': 'calc_clean_title',
  'Sitenizin veya tesisinizin ortak alan büyüklüğünü (m²) girerek, ideal temizlik personeli sayısını ve tahmini asgari bütçeyi görün.': 'calc_clean_desc',
  'Aidat Tasarruf Simülatörü': 'calc_fac_title',
  'Sitenizdeki bağımsız bölüm (daire/dükkan) sayısını girerek, toplu satınalma gücümüzle yıllık ortalama ne kadar tasarruf edebileceğinizi görün.': 'calc_fac_desc',
  'Aidat Optimizasyon ve Tasarruf Simülatörü': 'calc_dues_title',
  'Sitenizin özelliklerini girerek, profesyonel yönetim ve şeffaf bilanço modelimizle yıllık bütçenizde ne kadar tasarruf edebileceğinizi görün.': 'calc_dues_desc',
  'Yeşil Alan Bütçe Hesaplayıcı': 'calc_land_title',
  'Sitenizin yeşil alan büyüklüğünü girerek aylık periyodik bakım, gübreleme ve budama asgari maliyetlerini öğrenin.': 'calc_land_desc',
  'İcra & Tahsilat Simülatörü': 'calc_legal_title',
  'Sitenizin ödenmeyen aidat alacağı toplamını girerek, uzman avukatlarımız aracılığıyla ne kadar tahsilat yapabileceğimizi görün.': 'calc_legal_desc',
  'Önleyici Bakım Bütçe Analizi': 'calc_maint_title',
  'Asansör sayısı ve mekanik/ortak alan büyüklüğüne göre aylık periyodik (önleyici) teknik bakım bütçesi tahmini.': 'calc_maint_desc',
  'Periyodik İlaçlama Bütçesi': 'calc_pest_title',
  'Sitenizdeki blok (bina) sayısını girerek Sağlık Bakanlığı onaylı biyosidal ürünlerle yapılacak aylık periyodik haşere/kemirgen ilaçlama maliyetini öğrenin.': 'calc_pest_desc',
  'Havuz İşletme Bütçesi': 'calc_pool_title',
  'Sitenizin havuz hacmini girerek aylık periyodik bakım, Sağlık Bakanlığı onaylı kimyasal ve akredite test maliyetlerini öğrenin.': 'calc_pool_desc',
  'Güvenlerini Bize Emanet Edenler': 'testi_sec_title',
  'Güvenlik hizmeti verdiğimiz yüzlerce projeden bazılarının deneyimleri.': 'testi_sec_desc',
  'Hijyende Bize Güvenenler': 'testi_clean_title',
  'Profesyonel temizlik ve hijyen hizmetlerimizden faydalanan projelerin deneyimleri.': 'testi_clean_desc',
  'Şeffaf Yönetimde Bize Güvenenler': 'testi_fac_title',
  'Dijital aidat takibi ve %100 tahsilat garantisiyle finansal özgürlüğe kavuşan projeler.': 'testi_fac_desc',
  'Tesis Yönetiminde Fark Yaratanlar': 'testi_dues_title',
  'Profesyonel tesis yönetimi çözümlerimizle tanışan projelerin deneyimleri.': 'testi_dues_desc',
  'Yeşile Hayat Verenler': 'testi_land_title',
  'Peyzaj ve bahçe bakım hizmetlerimizle doğayla iç içe, prestijli yaşam alanlarına kavuşan projeler.': 'testi_land_desc',
  'Hukuki Güvenlikte Bize Güvenenler': 'testi_legal_title',
  'Hızlı tahsilat ve sıfır hukuki risk ile rahat bir nefes alan projeler.': 'testi_legal_desc',
  'Teknik Altyapıda Bize Güvenenler': 'testi_maint_title',
  'Önleyici bakım ve 7/24 mobil teknik servis ağımızı deneyimleyen projeler.': 'testi_maint_desc',
  'Sağlıklı Yaşam Alanları İçin Bize Güvenenler': 'testi_pest_title',
  'Profesyonel haşere kontrolü ve dezenfeksiyon hizmetimizle hijyeni garanti altına alan projeler.': 'testi_pest_desc',
  'Sağlıklı Kulaçlar İçin Bize Güvenenler': 'testi_pool_title',
  'Profesyonel havuz bakımı ve hijyen yönetimimizle pırıl pırıl tesisler.': 'testi_pool_desc'
};

const extractedDict = {};

function escapeRegex(string) {
    return string.split('').map(c => (/[a-zA-Z0-9\s]/.test(c) ? c : '\\\\' + c)).join('');
}

files.forEach(f => {
  let content = fs.readFileSync(dir + f, 'utf8');
  let changed = false;
  
  for (let [tr, key] of Object.entries(dict)) {
    // Some have exact match >Text<
    if (content.includes('>' + tr + '<')) {
      content = content.replaceAll('>' + tr + '<', `>{t('${key}')}<`);
      extractedDict[key] = tr;
      changed = true;
    }
    // Some might have newlines like >\n Text \n<
    if (content.includes('>\\n' + tr + '\\n<')) {
      content = content.replaceAll('>\\n' + tr + '\\n<', `>{t('${key}')}<`);
      extractedDict[key] = tr;
      changed = true;
    }
    // Check if it exists at all
    if (content.includes(tr) && !content.includes(`t('${key}')`)) {
       // ...
    }
  } // closes the for loop
  
  if (f.endsWith('Testimonials.tsx')) {
    if(!content.includes('useLanguage')) {
      content = content.replace(/import { motion } from 'framer-motion';/, "import { motion } from 'framer-motion';\nimport { useLanguage } from '@/context/LanguageContext';");
      content = content.replace(/export default function \w+\(\) {/, "$&\n  const { t } = useLanguage();");
      changed = true;
    } else if (!content.includes('const { t } = useLanguage();')) {
      content = content.replace(/export default function \w+\(\) {/, "$&\n  const { t } = useLanguage();");
      changed = true;
    }
    
    // Fix naming collision in map
    content = content.split('testimonials.map((t,').join('testimonials.map((item,');
    content = content.split('{t.').join('{item.');
    
    const prefix = f.split('Testimonials')[0].toLowerCase();
    
    let i = 1;
    let newContent = content.replace(/quote:\s*"([^"]+)"/g, (m, p1) => {
      const key = `testi_${prefix}_q${i++}`;
      extractedDict[key] = p1;
      return `quote: "${key}"`; 
    });
    
    newContent = newContent.replace(/{item\.quote}/g, "{t(item.quote as any)}");
    
    i = 1;
    newContent = newContent.replace(/role:\s*"([^"]+)"/g, (m, p1) => {
      const key = `testi_${prefix}_r${i++}`;
      extractedDict[key] = p1;
      return `role: "${key}"`;
    });
    
    newContent = newContent.replace(/{item\.role}/g, "{t(item.role as any)}");
    
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(dir + f, content);
  }
});

fs.writeFileSync('new_translations.json', JSON.stringify(extractedDict, null, 2));
console.log('Processed all files and generated new_translations.json!');
