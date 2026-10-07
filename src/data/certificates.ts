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
    description: 'Çevreye duyarlı hizmet yaklaşımına ilişkin BELCERT belgesi.',
    longDescription: 'Doğaya Saygı Sertifikası, kuruluşun çevreye duyarlı hizmet yaklaşımına ilişkin BELCERT Uluslararası Belgelendirme tarafından düzenlenen belgedir. Belgenin kapsamı, üzerindeki resmi ifadede yer alır.',
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
    faydalar: [],
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
    description: 'Çevre yönetim sistemi standardı kapsamında BELCERT/ILAS belgesi.',
    longDescription: 'ISO 14001, çevre yönetim sistemleri için uluslararası standarttır; kuruluşların çevresel etkilerini yönetmesine yönelik bir çerçeve sunar. Belge, BELCERT Uluslararası Belgelendirme tarafından ILAS akreditasyonu kapsamında düzenlenmiştir; kapsamı belgedeki resmi ifadede yer alır.',
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
    faydalar: [],
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
    description: 'Sosyal sorumluluk rehber standardı kapsamında BELCERT/ILAS belgesi.',
    longDescription: 'ISO 26000, kuruluşların topluma ve çevreye karşı sorumlu davranmasına ilişkin ilkeleri tanımlayan uluslararası rehber standarttır. Belge, BELCERT Uluslararası Belgelendirme tarafından ILAS akreditasyonu kapsamında düzenlenmiştir; kapsamı belgedeki resmi ifadede yer alır.',
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
    faydalar: [],
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
    description: 'İş sağlığı ve güvenliği yönetim sistemi standardı kapsamında BELCERT/ILAS belgesi.',
    longDescription: 'ISO 45001, iş sağlığı ve güvenliği yönetim sistemleri için uluslararası standarttır; çalışanların güvenliğine ilişkin risklerin yönetilmesine yönelik bir çerçeve sunar. Belge, BELCERT Uluslararası Belgelendirme tarafından ILAS akreditasyonu kapsamında düzenlenmiştir; kapsamı belgedeki resmi ifadede yer alır.',
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
    faydalar: [],
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
    description: 'İş sürekliliği yönetim sistemi standardı kapsamında BELCERT/ILAS belgesi.',
    longDescription: 'ISO 22301, iş sürekliliği yönetim sistemleri için uluslararası standarttır; olağanüstü durumlarda hizmetlerin sürdürülebilirliğinin planlanmasına yönelik bir çerçeve sunar. Belge, BELCERT Uluslararası Belgelendirme tarafından ILAS akreditasyonu kapsamında düzenlenmiştir; kapsamı belgedeki resmi ifadede yer alır.',
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
    faydalar: [],
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
    description: 'Risk yönetimi rehber standardı kapsamında BELCERT/ILAS belgesi.',
    longDescription: 'ISO 31000, risk yönetiminin ilke ve rehberliğini tanımlayan uluslararası standarttır. Belge, BELCERT Uluslararası Belgelendirme tarafından ILAS akreditasyonu kapsamında düzenlenmiştir; kapsamı belgedeki resmi ifadede yer alır.',
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
    faydalar: [],
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
    description: 'Müşteri memnuniyeti ve şikâyet yönetimi standardı kapsamında BELCERT/ILAS belgesi.',
    longDescription: 'ISO 10002, şikâyetlerin ele alınmasına ve müşteri memnuniyetine ilişkin uluslararası standarttır. Belge, BELCERT Uluslararası Belgelendirme tarafından ILAS akreditasyonu kapsamında düzenlenmiştir; kapsamı belgedeki resmi ifadede yer alır.',
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
    faydalar: [],
    denetimSureci: COMMON_AUDIT_STEPS,
    mevzuat: [
      { law: '634 Sayılı KMK (Kat Mülkiyeti Kanunu)', desc: 'Yöneticinin sakinlere karşı hesap verme ve şikayet yanıtlama yükümlülüğü.' },
      { law: '6502 Sayılı Tüketicinin Korunması Kanunu', desc: 'Hizmet sağlayıcıların şikayete yanıt verme süresi zorunluluğu.' },
      { law: '6698 Sayılı KVKK', desc: 'Şikayet sürecinde toplanan kişisel verilerin işlenmesi ve korunması.' },
    ],
    departments: ['Sakin Hizmetleri', 'Çağrı Merkezi', 'Tesis Yönetimi', 'Kalite & Süreç'],
  },
];

export const CERTIFICATION_BODY = 'BELCERT Uluslararası Belgelendirme (ILAS-MS-0089)';

export const HELD_CERTIFICATIONS = CERTIFICATES.map((c) => ({
  standard: c.name,
  title: c.subtitle,
  certBody: CERTIFICATION_BODY,
  certificateNumber: c.certificateNumber,
  validUntil: c.validUntil,
  url: `/kurumsal/sertifikalar/${c.slug}`,
}));

export const CERTIFICATION_SUMMARY = `${CERTIFICATES.map((c) => c.name).join(', ')} — ${CERTIFICATION_BODY} tarafından verilmiştir`;

export function getCertificate(slug: string): Certificate | undefined {
  return CERTIFICATES.find((c) => c.slug === slug);
}
