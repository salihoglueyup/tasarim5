export type CertificateBenefit = {
  icon: string;
  title: string;
  desc: string;
};

export type AuditStep = {
  step: number;
  title: string;
  desc: string;
};

export type LegalRef = {
  law: string;
  desc: string;
};

export type Certificate = {
  slug: string;
  category: 'cevre' | 'is-sagligi' | 'risk-sureklillik' | 'musteri' | 'sosyal';
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  pdf: string;
  issuer: string;
  issuerUrl?: string;
  certificateNumber: string;
  sealNumber: string;
  certificateCode: string;
  accreditation: string;
  datePublished: string;
  validUntil: string;
  period: string;
  verificationUrl: string;
  officialScopeTr: string;
  officialScopeEn: string;
  holderName: string;
  holderAddress: string;
  about: string;
  keywords: string[];
  relatedPath?: string;
  relatedLabel?: string;
  faydalar: CertificateBenefit[];
  denetimSureci: AuditStep[];
  mevzuat: LegalRef[];
  departments: string[];
};

const COMMON_HOLDER_NAME = 'ALO YÖNETİM VE ORGANİZASYON ANONİM ŞİRKETİ';
const COMMON_HOLDER_ADDRESS = 'OSMANAĞA MAH. MİSAK-I MİLLİ SK. UÇAR NO: 94 A KADIKÖY/ İSTANBUL';
const COMMON_CERT_CODE = 'ALO YÖNETİM';
const COMMON_ISSUER = 'BELCERT Uluslararası Belgelendirme Şirketi';
const COMMON_ISSUER_URL = 'https://www.belcert.com';
const COMMON_ACCREDITATION = 'ILAS ACCREDITED (ILAS-MS-0089)';
const COMMON_ISSUE_DATE = '2026-08-04';
const COMMON_VALID_UNTIL = '2027-08-04';
const COMMON_PERIOD = '1 Yıl / 1 Year';
const COMMON_VERIFICATION_URL = 'https://www.belcert.com';
const COMMON_SCOPE_TR = 'BİR ÜCRET VEYA SÖZLEŞMEYE DAYALI OLARAK GAYRİMENKUL YÖNETİMİ FAALİYETLERİ VE İŞLETME VE DİĞER İDARİ DANIŞMANLIK FAALİYETLERİ (GENEL YÖNETİM VE ORGANİZASYON DANIŞMANLIĞI)';
const COMMON_SCOPE_EN = 'REAL ESTATE MANAGEMENT ACTIVITIES AND BUSINESS AND OTHER ADMINISTRATIVE CONSULTING ACTIVITIES (GENERAL MANAGEMENT AND ORGANIZATION CONSULTING) ON A FEE OR CONTRACT BASIS.';

const COMMON_AUDIT_STEPS: AuditStep[] = [
  { step: 1, title: 'Başvuru ve Belge İncelemesi', desc: 'BELCERT denetçisi, tüm yönetim sistemi dokümantasyonunu, prosedürlerini ve kayıtlarını inceler.' },
  { step: 2, title: 'Saha Denetimi', desc: 'Bağımsız BELCERT denetçisi Alo Yönetim ofislerine ve yönetilen tesislere yerinde ziyarette bulunur.' },
  { step: 3, title: 'Uygunsuzluk ve Kapatma', desc: 'Denetim bulgularına göre tespit edilen uygunsuzluklar için düzeltici eylem planları hazırlanır ve onaylanır.' },
  { step: 4, title: 'Sertifikasyon Kararı', desc: 'ILAS akreditasyonu çerçevesinde BELCERT Teknik Komitesi belgelendirme kararını verir.' },
  { step: 5, title: 'Yıllık Gözetim Denetimi', desc: 'Geçerlilik süresi boyunca yılda bir kez gözetim denetimi yapılarak sürekli uyumluluk teyit edilir.' },
];

export const CERTIFICATES: Certificate[] = [
  {
    slug: 'dogaya-saygi',
    category: 'cevre',
    name: 'Doğaya Saygı Sertifikası',
    subtitle: 'Çevreye Duyarlı Hizmet',
    description: 'Operasyonlarımızın doğaya ve ekosisteme saygılı şekilde yürütüldüğünü belgeleyen çevre sorumluluk sertifikası.',
    longDescription: 'Alo Yönetim olarak tüm operasyonel süreçlerimizde çevresel etkiyi en aza indirmeyi taahhüt ediyoruz. Doğaya Saygı Sertifikamız; yönettiğimiz sitelerde kimyasal temizlik ürünlerinin kontrollü kullanımı, atık ayrıştırma sistemleri, su tasarrufu uygulamaları ve enerji verimliliği önlemlerini kapsayan bütüncül çevre politikamızı belgeler. BELCERT Uluslararası Belgelendirme tarafından denetlenmiş ve onaylanmıştır.',
    icon: 'eco',
    color: 'from-emerald-500 to-teal-700',
    pdf: '/certificates/dogaya-saygi.pdf',
    issuer: COMMON_ISSUER,
    issuerUrl: COMMON_ISSUER_URL,
    certificateNumber: 'A1808967',
    sealNumber: '064786',
    certificateCode: COMMON_CERT_CODE,
    accreditation: COMMON_ACCREDITATION,
    datePublished: COMMON_ISSUE_DATE,
    validUntil: COMMON_VALID_UNTIL,
    period: COMMON_PERIOD,
    verificationUrl: COMMON_VERIFICATION_URL,
    officialScopeTr: COMMON_SCOPE_TR,
    officialScopeEn: COMMON_SCOPE_EN,
    holderName: COMMON_HOLDER_NAME,
    holderAddress: COMMON_HOLDER_ADDRESS,
    about: 'Çevre Sorumluluğu',
    keywords: ['çevre sertifikası', 'doğaya saygı', 'sürdürülebilir tesis yönetimi', 'belcert doğaya saygı'],
    relatedPath: '/surdurulebilirlik',
    relatedLabel: 'Sürdürülebilirlik Yaklaşımımız',
    faydalar: [
      { icon: 'water_drop', title: 'Su Tasarrufu', desc: 'Akıllı sulama ve sızıntı tespit sistemleriyle yönetilen tesislerde yıllık %30 su tüketimi azalması.' },
      { icon: 'recycling', title: 'Sıfır Atık Hedefi', desc: 'Kaynağında ayrıştırma ve yetkili geri dönüşüm firmaları ile atıkların %95 değerlendirilmesi.' },
      { icon: 'bolt', title: 'Enerji Verimliliği', desc: 'LED aydınlatma ve hareket sensörleriyle ortak alanlarda yıllık %25 elektrik tasarrufu.' },
      { icon: 'psychiatry', title: 'Sakin Memnuniyeti', desc: 'Çevre duyarlılığını belgeleyen tesislerde sakin memnuniyet skorlarında ölçülebilir artış.' },
    ],
    denetimSureci: COMMON_AUDIT_STEPS,
    mevzuat: [
      { law: '2872 Sayılı Çevre Kanunu', desc: 'Çevre kirliliğinin önlenmesi ve çevrenin korunması yükümlülükleri.' },
      { law: 'Atık Yönetimi Yönetmeliği (2015/3)', desc: 'Evsel atıkların kaynağında ayrıştırılması ve toplanmasına ilişkin kurallar.' },
      { law: 'Sıfır Atık Yönetmeliği', desc: 'Kamuya açık ve ticari binalarda sıfır atık uygulamaları zorunluluğu.' },
    ],
    departments: ['Teknik Ofis', 'Temizlik ve Hijyen Ekibi', 'Bahçe ve Peyzaj', 'Ortak Alan Yönetimi'],
  },
  {
    slug: 'iso-14001',
    category: 'cevre',
    name: 'ISO 14001:2026',
    subtitle: 'Çevre Yönetim Sistemi',
    description: 'Doğal kaynakların etkin kullanımı ve atık yönetimi konularında uluslararası standartlara uygunluk belgesi.',
    longDescription: 'ISO 14001:2026, dünya genelinde kabul görmüş Çevre Yönetim Sistemi standardıdır. Alo Yönetim bu standardı; enerji tüketiminin izlenmesi ve azaltılması, kimyasal atık yönetimi, yeşil satın alma politikası ve karbon ayak izi takibini kapsayan kapsamlı bir çevre yönetim çerçevesiyle uygulamaktadır. BELCERT Uluslararası Belgelendirme Şirketi tarafından ILAS akreditasyonu kapsamında tescil edilmiştir.',
    icon: 'public',
    color: 'from-teal-500 to-emerald-700',
    pdf: '/certificates/iso-14001.pdf',
    issuer: COMMON_ISSUER,
    issuerUrl: COMMON_ISSUER_URL,
    certificateNumber: 'A1808962',
    sealNumber: '064792',
    certificateCode: COMMON_CERT_CODE,
    accreditation: COMMON_ACCREDITATION,
    datePublished: COMMON_ISSUE_DATE,
    validUntil: COMMON_VALID_UNTIL,
    period: COMMON_PERIOD,
    verificationUrl: COMMON_VERIFICATION_URL,
    officialScopeTr: COMMON_SCOPE_TR,
    officialScopeEn: COMMON_SCOPE_EN,
    holderName: COMMON_HOLDER_NAME,
    holderAddress: COMMON_HOLDER_ADDRESS,
    about: 'Çevre Yönetim Sistemi',
    keywords: ['ISO 14001', 'çevre yönetim sistemi', 'çevre sertifikası istanbul', 'belcert iso 14001'],
    relatedPath: '/surdurulebilirlik',
    relatedLabel: 'Yeşil Tesis Yönetimi',
    faydalar: [
      { icon: 'co2', title: 'Karbon Ayak İzi Takibi', desc: 'Tüm tesislerde yıllık karbon emisyon ölçümü ve azaltma hedeflerinin izlenmesi.' },
      { icon: 'energy_savings_leaf', title: 'Yeşil Satın Alma', desc: 'Çevre dostu ürün ve hizmetlerin tedarikçi değerlendirmesine dahil edilmesi.' },
      { icon: 'nature_people', title: 'Ekosistem Koruma', desc: 'Biyoçeşitliliği destekleyen peyzaj uygulamaları ve kimyasal ilaç kullanımının sıfırlanması.' },
      { icon: 'assessment', title: 'Yasal Uyumluluk', desc: 'Çevre mevzuatı değişikliklerinin anlık takibi ve süreçlere yansıtılması.' },
    ],
    denetimSureci: COMMON_AUDIT_STEPS,
    mevzuat: [
      { law: '2872 Sayılı Çevre Kanunu', desc: 'Çevre koruma yükümlülükleri ve kirletenin öder prensibi.' },
      { law: 'Sera Gazı Emisyonlarının Takibi Yönetmeliği', desc: 'İşletmelerin karbon emisyonlarını izleme ve raporlama zorunluluğu.' },
      { law: 'Kimyasal Madde Yönetmeliği (KKDIK)', desc: 'Tehlikeli kimyasal maddelerin güvenli kullanımı ve depolanması.' },
    ],
    departments: ['Temizlik ve Hijyen Ekibi', 'Teknik Ofis', 'Satın Alma', 'Bahçe ve Peyzaj'],
  },
  {
    slug: 'iso-26000',
    category: 'sosyal',
    name: 'ISO 26000:2021',
    subtitle: 'Sosyal Sorumluluk',
    description: 'Topluma ve paydaşlara karşı etik, adil ve şeffaf bir sorumluluk anlayışının uluslararası belgesi.',
    longDescription: 'ISO 26000:2021 rehber standardı, kuruluşların topluma ve çevreye karşı sorumlu davranmasını sağlayan ilkeleri tanımlar. Alo Yönetim bu standart kapsamında; çalışan hakları, adil ücret politikası, tedarik zinciri etik denetimi, yerel toplulukla ilişkiler ve engelli erişilebilirliği konularında sistematik bir yaklaşım benimsemiştir. BELCERT tarafından ILAS akreditasyonu ile belgelenmiştir.',
    icon: 'diversity_3',
    color: 'from-purple-500 to-pink-700',
    pdf: '/certificates/iso-26000.pdf',
    issuer: COMMON_ISSUER,
    issuerUrl: COMMON_ISSUER_URL,
    certificateNumber: 'A1808964',
    sealNumber: '064790',
    certificateCode: COMMON_CERT_CODE,
    accreditation: COMMON_ACCREDITATION,
    datePublished: COMMON_ISSUE_DATE,
    validUntil: COMMON_VALID_UNTIL,
    period: COMMON_PERIOD,
    verificationUrl: COMMON_VERIFICATION_URL,
    officialScopeTr: COMMON_SCOPE_TR,
    officialScopeEn: COMMON_SCOPE_EN,
    holderName: COMMON_HOLDER_NAME,
    holderAddress: COMMON_HOLDER_ADDRESS,
    about: 'Sosyal Sorumluluk',
    keywords: ['ISO 26000', 'sosyal sorumluluk', 'kurumsal sosyal sorumluluk tesis yönetimi', 'belcert iso 26000'],
    relatedPath: '/surdurulebilirlik',
    relatedLabel: 'Sürdürülebilirlik & KSS',
    faydalar: [
      { icon: 'handshake', title: 'Adil Çalışma Koşulları', desc: 'Tüm personel için asgari ücretin üzerinde ücret garantisi ve sosyal hakların korunması.' },
      { icon: 'accessible', title: 'Engelli Erişilebilirliği', desc: 'Yönetilen tesislerde engelli bireylerin her alana erişimini sağlayan altyapı standartları.' },
      { icon: 'diversity_1', title: 'Tedarik Zinciri Etiği', desc: 'Tedarikçi seçiminde çocuk işçi, zorla çalıştırma ve ayrımcılık denetimi.' },
      { icon: 'volunteer_activism', title: 'Toplum Katkısı', desc: 'Yerel sivil toplum kuruluşlarıyla ortaklıklar ve çevre gönüllülük projeleri.' },
    ],
    denetimSureci: COMMON_AUDIT_STEPS,
    mevzuat: [
      { law: '4857 Sayılı İş Kanunu', desc: 'Çalışan hakları, iş sözleşmeleri ve ayrımcılık yasağı hükümleri.' },
      { law: '7146 Sayılı Engelli Hakları Kanunu', desc: 'Binalarda engelli erişilebilirlik zorunlulukları.' },
      { law: 'UN SDGs (Sürdürülebilir Kalkınma Hedefleri)', desc: 'Uluslararası sosyal sorumluluk çerçevesi ve raporlama standartları.' },
    ],
    departments: ['İnsan Kaynakları', 'Satın Alma', 'Tesis Yönetimi', 'İletişim & Halkla İlişkiler'],
  },
  {
    slug: 'iso-45001',
    category: 'is-sagligi',
    name: 'ISO 45001:2018',
    subtitle: 'İş Sağlığı ve Güvenliği',
    description: 'Çalışanların ve site sakinlerinin sağlığını ve güvenliğini garanti eden uluslararası yönetim standardı.',
    longDescription: 'ISO 45001:2018, iş sağlığı ve güvenliği yönetim sistemleri için uluslararası standarttır. Alo Yönetim güvenlik personeli, teknik ekipleri ve temizlik kadrosu bu standart çerçevesinde; kişisel koruyucu donanım denetimi, acil durum prosedürleri, risk değerlendirmesi ve periyodik sağlık taramaları kapsamında çalışmaktadır. BELCERT tarafından ILAS akreditasyonu ile tescillenmiştir.',
    icon: 'health_and_safety',
    color: 'from-amber-500 to-orange-700',
    pdf: '/certificates/iso-45001.pdf',
    issuer: COMMON_ISSUER,
    issuerUrl: COMMON_ISSUER_URL,
    certificateNumber: 'A1808966',
    sealNumber: '064787',
    certificateCode: COMMON_CERT_CODE,
    accreditation: COMMON_ACCREDITATION,
    datePublished: COMMON_ISSUE_DATE,
    validUntil: COMMON_VALID_UNTIL,
    period: COMMON_PERIOD,
    verificationUrl: COMMON_VERIFICATION_URL,
    officialScopeTr: COMMON_SCOPE_TR,
    officialScopeEn: COMMON_SCOPE_EN,
    holderName: COMMON_HOLDER_NAME,
    holderAddress: COMMON_HOLDER_ADDRESS,
    about: 'İş Sağlığı ve Güvenliği',
    keywords: ['ISO 45001', 'iş güvenliği sertifikası', 'OHSAS tesis yönetimi', 'belcert iso 45001'],
    relatedPath: '/hizmetler/guvenlik-yonetimi',
    relatedLabel: 'Güvenlik Yönetimi Hizmetimiz',
    faydalar: [
      { icon: 'emergency', title: 'Sıfır Kaza Hedefi', desc: 'Risk değerlendirme ve önleyici tedbirlerle yönetilen tesislerde iş kazası sıklık oranı hedefi.' },
      { icon: 'shield_person', title: 'Yönetim Kurulu Koruması', desc: 'İSG yükümlülüklerinin karşılanması ile yönetim kurulu üyelerinin 6331 kapsamındaki şahsi cezai sorumluluğundan korunması.' },
      { icon: 'medical_services', title: 'Periyodik Sağlık Takibi', desc: 'Tüm personele yıllık işe giriş ve periyodik sağlık muayenelerinin yaptırılması.' },
      { icon: 'fire_truck', title: 'Acil Durum Tatbikatları', desc: 'Her tesiste yılda en az iki kez yangın ve tahliye tatbikatı ile dokümantasyon.' },
    ],
    denetimSureci: COMMON_AUDIT_STEPS,
    mevzuat: [
      { law: '6331 Sayılı İSG Kanunu', desc: 'İş sağlığı ve güvenliğine ilişkin tüm işveren yükümlülükleri.' },
      { law: '634 Sayılı KMK (Kat Mülkiyeti Kanunu)', desc: 'Ortak alanlarda işveren olarak site yönetiminin iş güvenliği sorumluluğu.' },
      { law: 'İSG Risk Değerlendirmesi Yönetmeliği', desc: 'Periyodik risk değerlendirmesi ve dokümantasyon zorunluluğu.' },
    ],
    departments: ['Güvenlik Yönetimi', 'Teknik Bakım Ekibi', 'Temizlik Ekibi', 'İnsan Kaynakları'],
  },
  {
    slug: 'iso-22301',
    category: 'risk-sureklillik',
    name: 'ISO 22301:2019',
    subtitle: 'İş Sürekliliği Yönetimi',
    description: 'Kriz ve kesinti durumlarında hizmetlerin kesintisiz devam etmesini sağlayan uluslararası standart.',
    longDescription: 'ISO 22301:2019, iş sürekliliği yönetim sistemleri için uluslararası standarttır. Alo Yönetim bu sertifika kapsamında; doğal afet, siber saldırı, altyapı arızası veya salgın gibi olağanüstü durumlarda hizmet sürekliliğini garanti eden prosedürleri oluşturmuş ve test etmiştir. Kritik sistemler için yedek kapasite ve acil eylem planları hazır tutulmaktadır. BELCERT ve ILAS onaylıdır.',
    icon: 'all_inclusive',
    color: 'from-cyan-500 to-blue-700',
    pdf: '/certificates/iso-22301.pdf',
    issuer: COMMON_ISSUER,
    issuerUrl: COMMON_ISSUER_URL,
    certificateNumber: 'A1808963',
    sealNumber: '064791',
    certificateCode: COMMON_CERT_CODE,
    accreditation: COMMON_ACCREDITATION,
    datePublished: COMMON_ISSUE_DATE,
    validUntil: COMMON_VALID_UNTIL,
    period: COMMON_PERIOD,
    verificationUrl: COMMON_VERIFICATION_URL,
    officialScopeTr: COMMON_SCOPE_TR,
    officialScopeEn: COMMON_SCOPE_EN,
    holderName: COMMON_HOLDER_NAME,
    holderAddress: COMMON_HOLDER_ADDRESS,
    about: 'İş Sürekliliği Yönetimi',
    keywords: ['ISO 22301', 'iş sürekliliği', 'acil durum yönetimi tesis', 'belcert iso 22301'],
    relatedPath: '/hizmetler/tesis-yonetimi',
    relatedLabel: 'Entegre Tesis Yönetimi',
    faydalar: [
      { icon: 'backup', title: 'Yedek Sistemler', desc: 'Kritik altyapı ve yazılım sistemleri için yedekli (redundant) kapasiteler ve failover prosedürleri.' },
      { icon: 'wifi_off', title: 'Siber Kriz Planı', desc: 'Siber saldırı, veri kaybı ve ağ kesintisi senaryolarına karşı hazır BCP (İş Sürekliliği Planı).' },
      { icon: 'groups', title: 'Kriz Komite Yapısı', desc: 'Anlık kriz müdahalesi için görev ve sorumlulukları tanımlı kriz yönetim komitesi.' },
      { icon: 'timeline', title: 'RTO & RPO Hedefleri', desc: 'Kritik sistemler için 4 saatlik kurtarma süresi (RTO) ve 2 saatlik veri kaybı (RPO) hedefleri.' },
    ],
    denetimSureci: COMMON_AUDIT_STEPS,
    mevzuat: [
      { law: '5902 Sayılı AFAD Kanunu', desc: 'Afet ve acil durum yönetimi yükümlülükleri ve tatbikat zorunluluğu.' },
      { law: '6698 Sayılı KVKK', desc: 'Kişisel verilerin olağanüstü durumlarda korunması ve ihlal bildirimi.' },
      { law: '5369 Sayılı Elektronik Haberleşme Kanunu', desc: 'Kritik iletişim altyapısının sürekliliğine ilişkin yükümlülükler.' },
    ],
    departments: ['Teknik Ofis', 'Bilgi Sistemleri', 'Güvenlik Yönetimi', 'Genel Müdürlük'],
  },
  {
    slug: 'iso-31000',
    category: 'risk-sureklillik',
    name: 'ISO 31000:2018',
    subtitle: 'Kurumsal Risk Yönetimi',
    description: 'Finansal ve operasyonel risklerin proaktif biçimde tanımlanması ve yönetilmesi için uluslararası standart.',
    longDescription: 'ISO 31000:2018, risk yönetimi prensiplerini ve kılavuzunu tanımlayan uluslararası standarttır. Alo Yönetim bu çerçevede; operasyonel risk değerlendirmesi, finansal risk yönetimi, tedarikçi risk analizi ve yasal uyum risk izlemesini sistematik biçimde uygulamaktadır. Site yönetiminde teknik, hukuki ve finansal riskler önceden tespit edilerek bertaraf edilir. BELCERT tarafından ILAS akreditasyonu ile onaylanmıştır.',
    icon: 'security',
    color: 'from-blue-600 to-indigo-800',
    pdf: '/certificates/iso-31000.pdf',
    issuer: COMMON_ISSUER,
    issuerUrl: COMMON_ISSUER_URL,
    certificateNumber: 'A1808965',
    sealNumber: '064789',
    certificateCode: COMMON_CERT_CODE,
    accreditation: COMMON_ACCREDITATION,
    datePublished: COMMON_ISSUE_DATE,
    validUntil: COMMON_VALID_UNTIL,
    period: COMMON_PERIOD,
    verificationUrl: COMMON_VERIFICATION_URL,
    officialScopeTr: COMMON_SCOPE_TR,
    officialScopeEn: COMMON_SCOPE_EN,
    holderName: COMMON_HOLDER_NAME,
    holderAddress: COMMON_HOLDER_ADDRESS,
    about: 'Risk Yönetimi',
    keywords: ['ISO 31000', 'risk yönetimi sertifikası', 'kurumsal risk tesis yönetimi', 'belcert iso 31000'],
    relatedPath: '/hizmetler/tesis-yonetimi',
    relatedLabel: 'Tesis Yönetim Hizmetleri',
    faydalar: [
      { icon: 'trending_down', title: 'Proaktif Risk Tespiti', desc: 'Olaylar gerçekleşmeden önce riski tanımlayan erken uyarı sistemleri ve risk haritaları.' },
      { icon: 'account_balance', title: 'Finansal Güvenlik', desc: 'Site aidat gelirlerinin ve fon hesaplarının finansal riske karşı güvence altına alınması.' },
      { icon: 'gavel', title: 'Hukuki Risk Yönetimi', desc: 'KMK, İş Kanunu ve çevre mevzuatındaki değişikliklerin anlık takibi ve uyum sağlanması.' },
      { icon: 'handyman', title: 'Teknik Risk Azaltma', desc: 'Kritik tesis ekipmanları için önleyici bakım programı ve arıza risk matrisleri.' },
    ],
    denetimSureci: COMMON_AUDIT_STEPS,
    mevzuat: [
      { law: '634 Sayılı KMK (Kat Mülkiyeti Kanunu)', desc: 'Site yönetiminin mali ve idari yükümlülükleri.' },
      { law: '6102 Sayılı Türk Ticaret Kanunu', desc: 'Kurumsal risk yönetim sistemi zorunluluğu.' },
      { law: 'Sermaye Piyasası Kurumu (SPK) Risk Yönetimi Tebliği', desc: 'Yönetim kurullarının risk gözetim ve denetim yükümlülükleri.' },
    ],
    departments: ['Genel Müdürlük', 'Muhasebe & Finans', 'Hukuk', 'Tesis Yönetimi'],
  },
  {
    slug: 'iso-10002',
    category: 'musteri',
    name: 'ISO 10002:2018',
    subtitle: 'Müşteri Memnuniyeti Yönetimi',
    description: 'Sakinlerden gelen tüm talep ve şikayetlerin hızlı ve sistematik biçimde çözüme kavuşturulmasını belgeleyen standart.',
    longDescription: 'ISO 10002:2018, müşteri şikayeti ve memnuniyeti yönetimi için uluslararası standarttır. Alo Yönetim bu standart kapsamında; şikayet kayıt sistemi, çözüm süresi taahhütleri, eskalasyon prosedürleri ve memnuniyet anketleri uygulayan yapılandırılmış bir müşteri deneyim yönetim sistemi kurmuştur. BELCERT Uluslararası Belgelendirme Şirketi tarafından ILAS akreditasyonu ile denetlenmiş ve onaylanmıştır.',
    icon: 'support_agent',
    color: 'from-rose-500 to-red-700',
    pdf: '/certificates/iso-10002.pdf',
    issuer: COMMON_ISSUER,
    issuerUrl: COMMON_ISSUER_URL,
    certificateNumber: 'A1808961',
    sealNumber: '064794',
    certificateCode: COMMON_CERT_CODE,
    accreditation: COMMON_ACCREDITATION,
    datePublished: COMMON_ISSUE_DATE,
    validUntil: COMMON_VALID_UNTIL,
    period: COMMON_PERIOD,
    verificationUrl: COMMON_VERIFICATION_URL,
    officialScopeTr: COMMON_SCOPE_TR,
    officialScopeEn: COMMON_SCOPE_EN,
    holderName: COMMON_HOLDER_NAME,
    holderAddress: COMMON_HOLDER_ADDRESS,
    about: 'Müşteri Memnuniyeti',
    keywords: ['ISO 10002', 'müşteri memnuniyeti sertifikası', 'şikayet yönetimi site', 'belcert iso 10002'],
    relatedPath: '/hizmetler/aidat-takibi',
    relatedLabel: 'Sakin Hizmetleri & Aidat Takibi',
    faydalar: [
      { icon: 'timer', title: '24 Saat Yanıt Garantisi', desc: 'Tüm sakin taleplerinin ilk iş günü içinde kayıt altına alınması ve yanıtlanması.' },
      { icon: 'star_rate', title: 'NPS Takibi', desc: 'Net Promoter Score (NPS) ile dönemsel sakin memnuniyet ölçümü ve trend analizi.' },
      { icon: 'forum', title: 'Çok Kanallı Destek', desc: 'WhatsApp, mobil uygulama, e-posta ve şikayet hattı üzerinden merkezi şikayet yönetimi.' },
      { icon: 'leaderboard', title: 'SLA Performans Raporları', desc: 'Aylık şikayet çözüm oranı ve ortalama kapatma süresi raporları yönetim kuruluna sunulur.' },
    ],
    denetimSureci: COMMON_AUDIT_STEPS,
    mevzuat: [
      { law: '634 Sayılı KMK (Kat Mülkiyeti Kanunu)', desc: 'Yöneticinin sakinlere karşı hesap verme ve şikayet yanıtlama yükümlülüğü.' },
      { law: '6502 Sayılı Tüketicinin Korunması Kanunu', desc: 'Hizmet sağlayıcıların şikayete yanıt verme süresi zorunluluğu.' },
      { law: '6698 Sayılı KVKK', desc: 'Şikayet sürecinde toplanan kişisel verilerin işlenmesi ve korunması.' },
    ],
    departments: ['Sakin Hizmetleri', 'Çağrı Merkezi', 'Tesis Yönetimi', 'Kalite & Süreç'],
  },
];

export function getCertificate(slug: string): Certificate | undefined {
  return CERTIFICATES.find((c) => c.slug === slug);
}
