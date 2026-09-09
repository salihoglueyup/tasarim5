export type Certificate = {
  slug: string;
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

export const CERTIFICATES: Certificate[] = [
  {
    slug: 'dogaya-saygi',
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
  },
  {
    slug: 'iso-14001',
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
  },
  {
    slug: 'iso-26000',
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
  },
  {
    slug: 'iso-45001',
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
  },
  {
    slug: 'iso-22301',
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
  },
  {
    slug: 'iso-31000',
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
  },
  {
    slug: 'iso-10002',
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
  },
];

export function getCertificate(slug: string): Certificate | undefined {
  return CERTIFICATES.find((c) => c.slug === slug);
}
