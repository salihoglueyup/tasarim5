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
  datePublished: string;
  about: string;
  keywords: string[];
  relatedPath?: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    slug: 'dogaya-saygi',
    name: 'Doğaya Saygı Sertifikası',
    subtitle: 'Çevreye Duyarlı Hizmet',
    description: 'Operasyonlarımızın doğaya ve ekosisteme saygılı şekilde yürütüldüğünü belgeleyen çevre sorumluluk sertifikası.',
    longDescription: 'Alo Yönetim olarak tüm operasyonel süreçlerimizde çevresel etkiyi en aza indirmeyi taahhüt ediyoruz. Doğaya Saygı Sertifikamız; yönettiğimiz sitelerde kimyasal temizlik ürünlerinin kontrollü kullanımı, atık ayrıştırma sistemleri, su tasarrufu uygulamaları ve enerji verimliliği önlemlerini kapsayan bütüncül çevre politikamızı belgeler. Bu sertifika, ekosisteme duyduğumuz sorumluluğun somut ve denetlenebilir kanıtıdır.',
    icon: 'eco',
    color: 'from-emerald-500 to-teal-700',
    pdf: '/certificates/dogaya-saygi.pdf',
    issuer: 'Türkiye Çevre ve Orman Bakanlığı',
    datePublished: '2025-01-01',
    about: 'Çevre Sorumluluğu',
    keywords: ['çevre sertifikası', 'doğaya saygı', 'sürdürülebilir tesis yönetimi'],
    relatedPath: '/surdurulebilirlik',
  },
  {
    slug: 'iso-14001',
    name: 'ISO 14001:2026',
    subtitle: 'Çevre Yönetim Sistemi',
    description: 'Doğal kaynakların etkin kullanımı ve atık yönetimi konularında uluslararası standartlara uygunluk belgesi.',
    longDescription: 'ISO 14001, dünya genelinde kabul görmüş Çevre Yönetim Sistemi standardıdır. Alo Yönetim bu standardı; enerji tüketiminin izlenmesi ve azaltılması, kimyasal atık yönetimi, yeşil satın alma politikası ve karbon ayak izi takibini kapsayan kapsamlı bir çevre yönetim çerçevesiyle uygulamaktadır. Sertifikasyon, bağımsız denetim kuruluşu tarafından yıllık olarak yenilenmektedir.',
    icon: 'public',
    color: 'from-teal-500 to-emerald-700',
    pdf: '/certificates/iso-14001.pdf',
    issuer: 'ISO / TÜV Rheinland',
    issuerUrl: 'https://www.iso.org/iso-14001-environmental-management.html',
    datePublished: '2026-01-01',
    about: 'Çevre Yönetim Sistemi',
    keywords: ['ISO 14001', 'çevre yönetim sistemi', 'çevre sertifikası istanbul'],
    relatedPath: '/surdurulebilirlik',
  },
  {
    slug: 'iso-26000',
    name: 'ISO 26000:2021',
    subtitle: 'Sosyal Sorumluluk',
    description: 'Topluma ve paydaşlara karşı etik, adil ve şeffaf bir sorumluluk anlayışının uluslararası belgesi.',
    longDescription: 'ISO 26000 rehber standardı, kuruluşların topluma ve çevreye karşı sorumlu davranmasını sağlayan ilkeleri tanımlar. Alo Yönetim bu standart kapsamında; çalışan hakları, adil ücret politikası, tedarik zinciri etik denetimi, yerel toplulukla ilişkiler ve engelli erişilebilirliği konularında sistematik bir yaklaşım benimsemiştir. Sosyal sorumluluk taahhüdümüz, yönettiğimiz her sitede hissedilebilir iyileştirmeler olarak yansımaktadır.',
    icon: 'diversity_3',
    color: 'from-purple-500 to-pink-700',
    pdf: '/certificates/iso-26000.pdf',
    issuer: 'ISO',
    issuerUrl: 'https://www.iso.org/iso-26000-social-responsibility.html',
    datePublished: '2021-01-01',
    about: 'Sosyal Sorumluluk',
    keywords: ['ISO 26000', 'sosyal sorumluluk', 'kurumsal sosyal sorumluluk tesis yönetimi'],
    relatedPath: '/surdurulebilirlik',
  },
  {
    slug: 'iso-45001',
    name: 'ISO 45001:2018',
    subtitle: 'İş Sağlığı ve Güvenliği',
    description: 'Çalışanların ve site sakinlerinin sağlığını ve güvenliğini garanti eden uluslararası yönetim standardı.',
    longDescription: 'ISO 45001, iş sağlığı ve güvenliği yönetim sistemleri için uluslararası standarttır. Alo Yönetim\'in güvenlik personeli, teknik ekipleri ve temizlik kadrosu bu standart çerçevesinde; kişisel koruyucu ekipman kullanımı, acil durum prosedürleri, risk değerlendirmesi ve periyodik sağlık taramaları kapsamında çalışmaktadır. Ayrıca yönettiğimiz sitelerde ortak alanlardaki güvenlik tehlikelerinin tespiti ve giderilmesi süreçlerini düzenler.',
    icon: 'health_and_safety',
    color: 'from-amber-500 to-orange-700',
    pdf: '/certificates/iso-45001.pdf',
    issuer: 'ISO',
    issuerUrl: 'https://www.iso.org/iso-45001-occupational-health-and-safety.html',
    datePublished: '2018-03-12',
    about: 'İş Sağlığı ve Güvenliği',
    keywords: ['ISO 45001', 'iş güvenliği sertifikası', 'OHSAS tesis yönetimi'],
    relatedPath: '/hizmetler/guvenlik-yonetimi',
  },
  {
    slug: 'iso-22301',
    name: 'ISO 22301:2019',
    subtitle: 'İş Sürekliliği Yönetimi',
    description: 'Kriz ve kesinti durumlarında hizmetlerin kesintisiz devam etmesini sağlayan uluslararası standart.',
    longDescription: 'ISO 22301, iş sürekliliği yönetim sistemleri için uluslararası standarttır. Alo Yönetim bu sertifika kapsamında; doğal afet, siber saldırı, altyapı arızası veya salgın gibi olağanüstü durumlarda hizmet sürekliliğini garanti eden prosedürleri oluşturmuş ve test etmiştir. Yönettiğimiz sitelerde kritik sistemler (güvenlik, asansör, jeneratör) için yedek kapasite ve acil eylem planları hazır tutulmaktadır.',
    icon: 'all_inclusive',
    color: 'from-cyan-500 to-blue-700',
    pdf: '/certificates/iso-22301.pdf',
    issuer: 'ISO',
    issuerUrl: 'https://www.iso.org/iso-22301-business-continuity.html',
    datePublished: '2019-10-31',
    about: 'İş Sürekliliği Yönetimi',
    keywords: ['ISO 22301', 'iş sürekliliği', 'acil durum yönetimi tesis'],
    relatedPath: '/hizmetler/tesis-yonetimi',
  },
  {
    slug: 'iso-31000',
    name: 'ISO 31000:2018',
    subtitle: 'Kurumsal Risk Yönetimi',
    description: 'Finansal ve operasyonel risklerin proaktif biçimde tanımlanması ve yönetilmesi için uluslararası standart.',
    longDescription: 'ISO 31000, risk yönetimi prensiplerini ve kılavuzunu tanımlayan uluslararası standarttır. Alo Yönetim bu çerçevede; operasyonel risk değerlendirmesi, finansal risk yönetimi, tedarikçi risk analizi ve yasal uyum risk izlemesini sistematik biçimde uygulamaktadır. Site yönetiminde karşılaşılabilecek teknik, hukuki ve finansal risklerin önceden tespit edilerek minimize edilmesi, bu standardın sunduğu çerçeveyle gerçekleştirilmektedir.',
    icon: 'security',
    color: 'from-blue-600 to-indigo-800',
    pdf: '/certificates/iso-31000.pdf',
    issuer: 'ISO',
    issuerUrl: 'https://www.iso.org/iso-31000-risk-management.html',
    datePublished: '2018-02-15',
    about: 'Risk Yönetimi',
    keywords: ['ISO 31000', 'risk yönetimi sertifikası', 'kurumsal risk tesis yönetimi'],
    relatedPath: '/hizmetler/tesis-yonetimi',
  },
  {
    slug: 'iso-10002',
    name: 'ISO 10002:2018',
    subtitle: 'Müşteri Memnuniyeti Yönetimi',
    description: 'Sakinlerden gelen tüm talep ve şikayetlerin hızlı ve sistematik biçimde çözüme kavuşturulmasını belgeleyen standart.',
    longDescription: 'ISO 10002, müşteri şikayeti yönetimi için uluslararası standarttır. Alo Yönetim bu standart kapsamında; şikayet kayıt sistemi, çözüm süresi taahhütleri, eskalasyon prosedürleri ve memnuniyet anketleri uygulayan yapılandırılmış bir müşteri deneyim yönetim sistemi kurmuştur. Yönettiğimiz sitelerdeki kat maliklerinin ve sakinlerin tüm geri bildirimleri, dijital platform üzerinden takip edilerek sonuçlandırılmaktadır.',
    icon: 'support_agent',
    color: 'from-rose-500 to-red-700',
    pdf: '/certificates/iso-10002.pdf',
    issuer: 'ISO',
    issuerUrl: 'https://www.iso.org/iso-10002-customer-satisfaction.html',
    datePublished: '2018-07-01',
    about: 'Müşteri Memnuniyeti',
    keywords: ['ISO 10002', 'müşteri memnuniyeti sertifikası', 'şikayet yönetimi site'],
    relatedPath: '/hizmetler/aidat-takibi',
  },
];

export function getCertificate(slug: string): Certificate | undefined {
  return CERTIFICATES.find((c) => c.slug === slug);
}
