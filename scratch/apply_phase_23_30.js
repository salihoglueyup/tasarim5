const fs = require('fs');
const path = require('path');

const projectPath = 'c:\\Gelistirme\\Alo Yönetim\\Bazı Tasarımlar\\Tasarım 5';

// 1. Translations Güncellemesi
const transPath = path.join(projectPath, 'src', 'i18n', 'translations.ts');
let transContent = fs.readFileSync(transPath, 'utf8');

// (TR) eklenecek SEO verileri
const trSeo = `
    // Faz 23-30 SEO Metinleri
    guvenlik_seo_title: "İstanbul Özel Güvenlik ve Site Güvenlik Yönetimi",
    guvenlik_seo_p1: "Alo Yönetim olarak, İstanbul site yönetimi hizmetlerimizin merkezine 7/24 kesintisiz ve profesyonel özel güvenlik hizmetini koyuyoruz. Site ve tesislerinizin güvenliği yapay zeka destekli kamera sistemleri, otomatik plaka tanıma, ziyaretçi takip modülleri ve 5188 sayılı kanuna tam uyumlu profesyonel güvenlik kadromuzla garanti altına alınır.",
    guvenlik_seo_p2: "Taşeron güvenlik firmalarıyla yaşanan karmaşaya son veriyor, tüm güvenlik personelinin yasal sorumluluklarını bizzat üstleniyoruz. Risk analizini yaparak tamamen size özel bir güvenlik altyapısı kuruyoruz.",
    tesis_seo_title: "Profesyonel Bina ve Tesis Yönetimi İstanbul",
    tesis_seo_p1: "Profesyonel bina yönetimi, bir yaşam alanının tüm fonksiyonlarının uyum içinde, kesintisiz ve minimum maliyetle çalışmasını sağlamaktır. Alışveriş merkezlerinden lüks rezidanslara kadar her ölçekteki yapının teknik, idari ve finansal süreçlerini uçtan uca dijitalleştiriyoruz.",
    tesis_seo_p2: "Toplu satın alma gücü (elektrik, sigorta, malzeme) sayesinde site bütçenizi optimize ediyor, hem zaman hem de nakit tasarrufu sağlıyoruz.",
    temizlik_seo_title: "Site ve Ortak Alan Temizlik Hizmetleri",
    temizlik_seo_p1: "Endüstriyel temizlik firması standartlarını butik hizmet anlayışıyla birleştiren Alo Yönetim, sitenizin her metrekaresinde üst düzey hijyen sağlar. Otoparklar, asansörler ve ortak alanlar ekolojik ürünlerle temizlenir.",
    temizlik_seo_p2: "Mermer zeminlerin cilalanması, dış cephe cam temizliği gibi süreçler profesyonellerce yürütülür. Temizlik personelinin tüm yasal yükümlülükleri tarafımızca karşılanır.",
    teknik_seo_title: "Asansör ve Teknik Bakım Hizmetleri",
    teknik_seo_p1: "Asansör bakım firması İstanbul ihtiyaçlarınızda ve tüm mekanik/elektrik altyapı sorunlarında önleyici bakım (preventive maintenance) stratejisi uyguluyoruz. Jeneratör, hidrofor, yangın ve havuz dairesi sistemleri düzenli olarak kontrol edilir.",
    teknik_seo_p2: "Beklenmedik arızalara ve sürpriz maliyetlere son veriyoruz. 7/24 hazır bekleyen mobil teknik ekibimiz acil durumlarda ortalama 20 dakikada müdahale eder.",
    peyzaj_seo_title: "Site Peyzaj Bakımı ve Bahçe Düzenleme",
    peyzaj_seo_p1: "Site peyzaj bakımı, yaşam alanlarınızın nefes almasını ve görsel değerini korumasını sağlar. Mevsimsel budama, çim havalandırma, gübreleme ve otomatik sulama sistemleri bakımları ziraat mühendisleri kontrolünde yapılır.",
    peyzaj_seo_p2: "Sitenizin yeşil alanları 4 mevsim canlı ve estetik kalır. Dış mekan bitkilerinin hastalık ve zararlılardan korunması için periyodik zirai ilaçlama (bitki koruma) uygulanır.",
    havuz_seo_title: "Havuz Bakımı ve Hijyen Yönetimi İstanbul",
    havuz_seo_p1: "Havuz bakımı İstanbul genelinde en çok özen gerektiren konudur. Sağlık Bakanlığı standartlarında periyodik havuz kimyasalları ölçümü, filtre temizliği ve ph/klor dengelemesi sertifikalı havuz operatörlerimizce yapılır.",
    havuz_seo_p2: "Sakinlerimizin ve çocukların sağlığı için havuz sularının mikrobiyolojik analizleri düzenli olarak akredite laboratuvarlara gönderilir, şeffaf raporlama ile site sakinlerine duyurulur.",
    hasere_seo_title: "Profesyonel İlaçlama Firması ve Dezenfeksiyon",
    hasere_seo_p1: "İlaçlama firması İstanbul ihtiyaçlarınızda, Sağlık Bakanlığı onaylı biyosidal ürünlerle kemirgen, haşere ve böceklere karşı kesin çözüm sunuyoruz. Kapalı otoparklar, sığınaklar ve ortak alanlarda periyodik dezenfeksiyon işlemleri yürütülür.",
    hasere_seo_p2: "İnsan ve evcil hayvan sağlığına zarar vermeyen, ekosisteme duyarlı ilaçlama yöntemlerimizle sitenizde hijyenik ve güvenli bir ortam sağlıyoruz.",
    hukuk_seo_title: "Aidat Borcu İcra Takibi ve Hukuki Danışmanlık",
    hukuk_seo_p1: "Aidat borcu hukuki takip süreçleri, komşuluk ilişkilerini zedelemeden tamamen profesyonel ve yasal çerçevede (Kat Mülkiyeti Kanunu) yürütülür. Geciken ödemeler için otomatik ihtarnameler ve uzman avukat kadromuzla icra süreçleri başlatılır.",
    hukuk_seo_p2: "Sitenin taraf olduğu sözleşmeler, personel iş davaları ve taşeron firma uyuşmazlıklarında yönetimi yasal güvence altına alıyoruz. Sıfır hukuki risk ile huzurlu yönetim.",`;

const enSeo = `
    // Phase 23-30 SEO Texts
    guvenlik_seo_title: "Istanbul Private Security and Property Security Management",
    guvenlik_seo_p1: "At Alo Yönetim, we place 24/7 uninterrupted and professional private security at the center of our property management services. AI-supported camera systems, license plate recognition, and a highly trained security staff guarantee your peace of mind.",
    guvenlik_seo_p2: "We take full legal responsibility for all security personnel, eliminating the chaos of subcontracted firms. We build a fully customized security infrastructure based on your project's risk analysis.",
    tesis_seo_title: "Professional Building and Facility Management Istanbul",
    tesis_seo_p1: "Professional building management digitizes technical, administrative, and financial processes from end to end. From shopping malls to luxury residences, we ensure all functions work in harmony.",
    tesis_seo_p2: "With our bulk purchasing power, we optimize your budget up to 20%, saving both time and money.",
    temizlik_seo_title: "Complex and Common Area Cleaning Services",
    temizlik_seo_p1: "Combining industrial cleaning standards with a boutique service approach, we ensure top-level hygiene in every square meter. Common areas are cleaned daily with eco-friendly products.",
    temizlik_seo_p2: "Processes like marble polishing and facade cleaning are carried out by certified professionals, and all legal obligations of the cleaning staff are handled by us.",
    teknik_seo_title: "Elevator and Technical Maintenance Services",
    teknik_seo_p1: "We apply a preventive maintenance strategy for elevators, generators, fire systems, and all mechanical/electrical infrastructure.",
    teknik_seo_p2: "Say goodbye to unexpected breakdowns and surprise costs. Our 24/7 mobile technical team responds to emergencies in an average of 20 minutes.",
    peyzaj_seo_title: "Landscape Maintenance and Gardening",
    peyzaj_seo_p1: "Seasonal pruning, lawn aeration, fertilization, and irrigation maintenance are performed under the supervision of agricultural engineers.",
    peyzaj_seo_p2: "Your green areas stay vibrant for 4 seasons. Periodic agricultural spraying protects plants from diseases and pests.",
    havuz_seo_title: "Pool Maintenance and Hygiene Management Istanbul",
    havuz_seo_p1: "Periodic pool chemical measurements, filter cleaning, and pH balancing are done by certified pool operators according to Ministry of Health standards.",
    havuz_seo_p2: "Microbiological analysis of pool water is regularly sent to accredited laboratories to ensure the health of residents.",
    hasere_seo_title: "Professional Pest Control and Disinfection",
    hasere_seo_p1: "We provide definitive solutions against rodents and pests with Ministry of Health approved biocidal products.",
    hasere_seo_p2: "Our eco-friendly and pet-safe pest control methods ensure a hygienic environment in your property.",
    hukuk_seo_title: "Dues Debt Execution Tracking and Legal Consulting",
    hukuk_seo_p1: "Dues debt legal tracking is carried out entirely professionally without damaging neighborly relations. Automatic warnings and execution processes are initiated by our expert lawyers.",
    hukuk_seo_p2: "We legally secure the management in contracts, personnel labor disputes, and subcontractor conflicts. Peaceful management with zero legal risk.",`;

if (!transContent.includes('guvenlik_seo_title')) {
  transContent = transContent.replace('    services_seo_p2: "Sitenizin ihtiyaçlarına göre şekillendirdiğimiz esnek hizmet paketlerimizle, ister butik bir apartman olun ister binlerce konutluk devasa bir proje, Alo Yönetim farkını ilk günden hissedersiniz. Hedefimiz; komşuluk ilişkilerini zedelemeden, %100 yasalara uygun, huzurlu ve sorunsuz bir yaşam alanı inşa etmektir.",', '    services_seo_p2: "Sitenizin ihtiyaçlarına göre şekillendirdiğimiz esnek hizmet paketlerimizle, ister butik bir apartman olun ister binlerce konutluk devasa bir proje, Alo Yönetim farkını ilk günden hissedersiniz. Hedefimiz; komşuluk ilişkilerini zedelemeden, %100 yasalara uygun, huzurlu ve sorunsuz yaşam alanı inşa etmektir.",\n' + trSeo);
  
  transContent = transContent.replace('    services_seo_p2: "With our flexible service packages tailored to the needs of your complex, whether you are a boutique apartment or a massive project with thousands of residences, you will feel the Alo Yönetim difference from day one. Our goal is to build a peaceful and trouble-free living space, 100% compliant with the law, without damaging neighborly relations.",', '    services_seo_p2: "With our flexible service packages tailored to the needs of your complex, whether you are a boutique apartment or a massive project with thousands of residences, you will feel the Alo Yönetim difference from day one. Our goal is to build a peaceful and trouble-free living space, 100% compliant with the law, without damaging neighborly relations.",\n' + enSeo);
  
  fs.writeFileSync(transPath, transContent, 'utf8');
  console.log('Translations updated.');
} else {
  console.log('Translations already exist.');
}

// 2. Sayfalara SeoTextSection ekleme
const pages = [
  { file: 'guvenlik-yonetimi/page.tsx', prefix: 'guvenlik' },
  { file: 'tesis-yonetimi/page.tsx', prefix: 'tesis' },
  { file: 'temizlik-ve-hijyen/page.tsx', prefix: 'temizlik' },
  { file: 'teknik-bakim/page.tsx', prefix: 'teknik' },
  { file: 'peyzaj-ve-bahce-bakimi/page.tsx', prefix: 'peyzaj' },
  { file: 'havuz-bakimi-ve-hijyen/page.tsx', prefix: 'havuz' },
  { file: 'hasere-ve-dezenfeksiyon/page.tsx', prefix: 'hasere' },
  { file: 'hukuk-ve-icra-danismanligi/page.tsx', prefix: 'hukuk' }
];

pages.forEach(p => {
  const filePath = path.join(projectPath, 'src', 'app', 'hizmetler', p.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('SeoTextSection')) {
      content = content.replace("import PageHeader from '@/components/layout/PageHeader';", "import PageHeader from '@/components/layout/PageHeader';\nimport { SeoTextSection } from '@/components';");
      
      const seoBlock = `\n\n        <SeoTextSection \n          titleKey="${p.prefix}_seo_title" \n          p1Key="${p.prefix}_seo_p1" \n          p2Key="${p.prefix}_seo_p2" \n        />\n\n        {/* Bottom Call To Action Banner */}`;
      
      content = content.replace('{/* Bottom Call To Action Banner */}', seoBlock);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + p.file);
    } else {
      console.log('Already updated: ' + p.file);
    }
  }
});
