export interface ReferenceProject {
  id: string;
  title: string;
  title_en?: string;
  title_ru?: string;
  title_ar?: string;
  slug: string;
  category: 'Rezidans' | 'Konut' | 'Ticari' | 'Karma Yaşam';
  category_en?: string;
  category_ru?: string;
  category_ar?: string;
  units: string;
  units_en?: string;
  units_ru?: string;
  units_ar?: string;
  location: string;
  location_en?: string;
  location_ru?: string;
  location_ar?: string;
  image: string;
  clientLogo?: string;
  published: boolean;
  order: number;
  content: string;
  content_en?: string;
  content_ru?: string;
  content_ar?: string;
  services: string[];
  services_en?: string[];
  services_ru?: string[];
  services_ar?: string[];
  gallery: string[];
  testimonialText: string;
  testimonialText_en?: string;
  testimonialText_ru?: string;
  testimonialText_ar?: string;
  testimonialAuthor: string;
  testimonialRole?: string;
  stats: { label: string; value: string }[];
  coordinates: string;
  isSuccessStory?: boolean;
}

export interface PartnerBrand {
  id: string;
  name: string;
  logo?: string;
  order: number;
}

export const PARTNERS_DATA: PartnerBrand[] = [
  { id: 'p1', name: 'Rönesans Holding', order: 1 },
  { id: 'p2', name: 'Acıbadem Sağlık', order: 2 },
  { id: 'p3', name: 'Ağaoğlu Şirketler Grubu', order: 3 },
  { id: 'p4', name: 'Sur Yapı', order: 4 },
  { id: 'p5', name: 'Sinpaş GYO', order: 5 },
  { id: 'p6', name: 'DAP Yapı', order: 6 },
  { id: 'p7', name: 'Ege Yapı', order: 7 },
  { id: 'p8', name: 'Tahincioğlu Gayrimenkul', order: 8 },
  { id: 'p9', name: 'Mesa Mesken', order: 9 },
  { id: 'p10', name: 'Torunlar GYO', order: 10 },
];

export const REFERENCES_DATA: ReferenceProject[] = [
  {
    id: 'ref-1',
    title: 'Lalezar Konakları',
    title_en: 'Lalezar Mansions',
    title_ru: 'Особняки Лалезар',
    title_ar: 'قصور لاليزار',
    slug: 'lalezar-konaklari',
    category: 'Konut',
    category_en: 'Residential',
    category_ru: 'Жилой комплекс',
    category_ar: 'سكني',
    units: '240 Daire',
    units_en: '240 Apartments',
    units_ru: '240 квартир',
    units_ar: '240 شقة',
    location: 'Kadıköy, İstanbul',
    location_en: 'Kadikoy, Istanbul',
    location_ru: 'Кадыкёй, Стамбул',
    location_ar: 'كاديكوي، إسطنبول',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 1,
    content: `
      <h3>Kadıköy'ün Kalbinde Prestijli ve Güvenli Yaşam</h3>
      <p>Lalezar Konakları, Kadıköy sahil şeridine ve Bağdat Caddesi'ne komşu, 8 blok ve 240 seçkin daireden oluşan prestijli bir yaşam projesidir. Alo Yönetim olarak 2021 yılından bu yana sitenin <strong>entegre tesis yönetimi, 7/24 lisanslı özel güvenlik, yarı olimpik kapalı/açık havuz bakımı, 12.000 m² peyzaj bahçe işletmesi ve KMK 634 uyumlu aidat tahsilat yönetimini</strong> kesintisiz yürütmekteyiz.</p>
      <h4>Uygulanan Yönetim Çözümleri</h4>
      <p>Gelişmiş bütçe optimizasyonu sayesinde ortak alan elektrik tüketiminde LED ve fotosel otomasyonuna geçilmiş, yıllık işletme bütçesinde <strong>%28 net tasarruf</strong> sağlanmıştır. Dijital sakin portalımız üzerinden aidat tahsilat başarı oranı <strong>%99.6</strong> seviyesine ulaşmıştır.</p>
    `,
    content_en: `
      <h3>Prestigious and Secure Living in the Heart of Kadikoy</h3>
      <p>Lalezar Mansions is a prestigious residential community comprising 8 blocks and 240 exclusive residences next to Bagdat Avenue. Alo Management provides comprehensive facility management, 24/7 licensed security, pool maintenance, 12,000 sqm landscape care and automated dues collection.</p>
    `,
    content_ru: `
      <h3>Престижная и безопасная жизнь в самом сердце Кадыкёй</h3>
      <p>Особняки Лалезар — престижный жилой комплекс из 8 блоков и 240 квартир возле проспекта Багдат. Alo Management обеспечивает комплексное управление объектом, круглосуточную охрану и автоматизацию взносов.</p>
    `,
    content_ar: `
      <h3>حياة راقية وآمنة في قلب كاديكوي</h3>
      <p>تعد قصور لاليزار مجمعاً سكنياً فاخراً يضم 8 مبانٍ و 240 شقة بالقرب من شارع بغداد. تقدم ألو للإدارة إدارة متكاملة للمرافق وأمناً مرخصاً على مدار الساعة.</p>
    `,
    services: [
      '7/24 Silahlı & Silahsız Özel Güvenlik',
      'Endüstriyel Ortak Alan Temizliği',
      'Yarı Olimpik Havuz Bakımı & Kimyasal Analiz',
      '12.000 m² Peyzaj & Otomatik Sulama',
      'Nöbetçi Elektrik & Mekanik Teknik Servis',
      'KMK 634 Dijital Muhasebe & Hukuki Danışmanlık'
    ],
    services_en: [
      '24/7 Licensed Private Security',
      'Industrial Common Area Cleaning',
      'Semi-Olympic Pool Maintenance & Lab Testing',
      '12,000 sqm Landscape & Smart Irrigation',
      'On-Call Electrical & Mechanical Engineering',
      'Digital Dues Accounting & Legal Consulting'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Alo Yönetim göreve başladığından beri aidat tahsilatımız %100’e yaklaştı, ortak alan bakım masraflarımız belirgin şekilde azaldı. Kat malikleri olarak ilk kez huzur içinde şeffaf bir yönetim yaşıyoruz.',
    testimonialText_en: 'Since Alo Management took over, our dues collection reached nearly 100%, and maintenance costs decreased noticeably. We enjoy transparent and professional management.',
    testimonialText_ru: 'С момента начала работы Alo Management собираемость взносов приблизилась к 100%, а расходы на содержание заметно снизились. Мы очень довольны сервисом.',
    testimonialText_ar: 'منذ تولي ألو للإدارة، اقتربت نسبة تحصيل الرسوم من 100% وانخفضت تكاليف الصيانة بشكل ملحوظ. نحن راضون تماماً عن الشفافية والاحترافية.',
    testimonialAuthor: 'Av. Mehmet Rıza Yaman',
    testimonialRole: 'Site Yönetim Kurulu Başkanı',
    stats: [
      { label: 'Aidat Tahsilat Oranı', value: '%99.6' },
      { label: 'Enerji & Bütçe Tasarrufu', value: '%28' },
      { label: 'SLA Müdahale Süresi', value: '25 Dk' },
      { label: 'Sakin Memnuniyeti', value: '%98.4' },
    ],
    coordinates: '40.9785,29.0520',
    isSuccessStory: true,
  },
  {
    id: 'ref-2',
    title: 'Sapphire Residence',
    title_en: 'Sapphire Residence',
    title_ru: 'Сапфир Резиденс',
    title_ar: 'سافاير ريزيدنس',
    slug: 'sapphire-residence',
    category: 'Rezidans',
    category_en: 'Luxury Residence',
    category_ru: 'Элитная резиденция',
    category_ar: 'ريزيدنس فاخر',
    units: '320 Daire & Penthouse',
    units_en: '320 Apartments & Penthouses',
    units_ru: '320 апартаментов и пентхаусов',
    units_ar: '320 شقة وبنتهاوس',
    location: 'Ataşehir, İstanbul',
    location_en: 'Atasehir, Istanbul',
    location_ru: 'Аташехир, Стамбул',
    location_ar: 'أتاشهير، إسطنبول',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 2,
    content: `
      <h3>İstanbul Finans Merkezi Komşusu Ultra Lüks Kule Yönetimi</h3>
      <p>Ataşehir Finans Merkezi aksında yükselen 38 katlı Sapphire Residence, 320 lüks bağımsız bölüm, kapalı spa merkezi, helikopter pisti ve VIP resepsiyon hizmetleriyle A+ rezidans standartlarını temsil eder.</p>
      <p>Alo Yönetim olarak BMS (Bina Yönetim Sistemi), VRF iklimlendirme ve yüksek katlı yangın otomasyon sistemlerinin 7/24 kesintisiz teknik idaresini yürütmekteyiz.</p>
    `,
    content_en: `
      <h3>Ultra-Luxury Tower Management Adjacent to Istanbul Financial Center</h3>
      <p>Rising 38 stories in Atasehir, Sapphire Residence features 320 luxury units, a spa wellness center, and VIP concierge services managed 24/7 by Alo Management.</p>
    `,
    content_ru: `
      <h3>Управление ультрароскошной башней рядом с Финансовым центром</h3>
      <p>38-этажный комплекс Sapphire Residence в Аташехире включает 320 апартаментов класса люкс, спа-центр и круглосуточную консьерж-службу.</p>
    `,
    content_ar: `
      <h3>إدارة برج فائق الفخامة بجوار مركز إسطنبول المالي</h3>
      <p>يرتفع برج سافاير ريزيدنس 38 طابقاً في أتاشهير، ويضم 320 وحدة فاخرة ومركز سبا وخدمات كونسيرج VIP بإشراف كامل من ألو للإدارة.</p>
    `,
    services: [
      'VIP Vale & Resepsiyon Karşılama',
      '7/24 Merkezi Güvenlik Kontrol Odası (CCTV)',
      'BMS & VRF İklimlendirme Otomasyonu',
      'Fitness, Sauna & Kapalı Spa İşletmesi',
      'Jeneratör & Yüksek Gerilim Trafo Bakımı',
      'Mobil Sakin Uygulaması & Akıllı Kapı Geçişi'
    ],
    services_en: [
      'VIP Valet & Concierge Desk',
      '24/7 CCTV Central Security Command Room',
      'BMS & VRF Climate Automation',
      'Fitness, Sauna & Indoor Spa Facility Ops',
      'Generator & High Voltage Transformer Maintenance',
      'Mobile Resident App & Smart Access Control'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Yüksek katlı kule yönetiminde teknik ve güvenlik uzmanlığı hayati önem taşır. Alo Yönetim’in mühendis kökenli kadrosu sayesinde rezidansımız kusursuz bir 5 yıldızlı otel konforunda işletiliyor.',
    testimonialText_en: 'Alo Management’s engineering-backed team ensures our high-rise tower operates seamlessly with 5-star hotel comfort.',
    testimonialText_ru: 'Инженерный опыт команды Alo Management гарантирует бесперебойную работу нашей башни со стандартами 5-звездочного отеля.',
    testimonialText_ar: 'يضمن فريق ألو للإدارة ذو الخبرة الهندسية تشغيل البرج بأعلى معايير الراحة الفندقية فئة 5 نجوم.',
    testimonialAuthor: 'Dr. Kerem Tanrıkulu',
    testimonialRole: 'Rezidans Denetim Kurulu Üyesi',
    stats: [
      { label: 'BMS Enerji Verimliliği', value: '%34' },
      { label: 'Sakin Memnuniyeti', value: '%99.1' },
      { label: 'Aidat Tahsilat Oranı', value: '%99.8' },
      { label: 'Güvenlik SLA', value: '7/24 Kesintisiz' },
    ],
    coordinates: '40.9923,29.1187',
    isSuccessStory: true,
  },
  {
    id: 'ref-3',
    title: 'Horizon Plaza & Loft',
    title_en: 'Horizon Plaza & Loft',
    title_ru: 'Горизонт Плаза и Лофт',
    title_ar: 'هورايزون بلازا ولوفت',
    slug: 'horizon-plaza-loft',
    category: 'Ticari',
    category_en: 'Commercial Plaza',
    category_ru: 'Коммерческий комплекс',
    category_ar: 'تجاري',
    units: '210 Ofis + 40 Mağaza',
    units_en: '210 Offices + 40 Retail Stores',
    units_ru: '210 офисов + 40 магазинов',
    units_ar: '210 مكاتب + 40 متجراً',
    location: 'Şişli, İstanbul',
    location_en: 'Sisli, Istanbul',
    location_ru: 'Шишли, Стамбул',
    location_ar: 'شيشلي، إسطنبول',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 3,
    content: `
      <h3>Şişli & Mecidiyeköy Ticaret Aksında A+ Plaza İşletmesi</h3>
      <p>Horizon Plaza, uluslararası kurumsal şirketlere, hukuk bürolarına ve perakende markalarına ev sahipliği yapan 250 bağımsız bölümlü A+ karma ticari merkezdir.</p>
      <p>Alo Yönetim bünyesinde ISO 41001 Tesis Yönetim Standartlarına uygun olarak; yangın algılama, X-Ray giriş güvenliği, fiber omurga altyapısı ve ortak alan hijyen protokolleri yönetilmektedir.</p>
    `,
    content_en: `
      <h3>A+ Commercial Plaza Operations in Sisli Business Corridor</h3>
      <p>Horizon Plaza hosts multinational corporations and premium retail outlets across 250 units, managed under ISO 41001 international standards by Alo Management.</p>
    `,
    content_ru: `
      <h3>Управление бизнес-центром класса А+ в деловом центре Шишли</h3>
      <p>Horizon Plaza объединяет 250 офисов и торговых площадей международных компаний с комплексным управлением по стандартам ISO 41001.</p>
    `,
    content_ar: `
      <h3>تشغيل مجمع تجاري فئة A+ في ممر الأعمال في شيشلي</h3>
      <p>يضم هورايزون بلازا 250 مكتباً ومتجراً لشركات عالمية، وتتم إدارته بالكامل وفق معايير ISO 41001 العالمية.</p>
    `,
    services: [
      'X-Ray & Turnike Turnstile Geçiş Güvenliği',
      'Kurumsal Resepsiyon & Kargo / Evrak Yönetimi',
      'Merkezi İklimlendirme (HVAC) & Yangın Söndürme',
      'Plaza Cam & Dış Cephe Dağcı Temizliği',
      'Otopark Otomasyonu & Plaka Tanıma (PTS)',
      'Gider Paylaşım & Ortak Alan İhale Yönetimi'
    ],
    services_en: [
      'X-Ray & Turnstile Security Access',
      'Corporate Reception & Mailroom Logistics',
      'Central HVAC & Fire Suppression Systems',
      'Facade Rope-Access Window Cleaning',
      'Smart License Plate Recognition (LPR) Parking',
      'Cost Sharing & Vendor Procurement Management'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Plazamızda yüzlerce çalışan ve her gün binlerce ziyaretçi var. Alo Yönetim’in X-Ray güvenlik disiplini ve temizlik ekibi kurumsal imajımızı en üst seviyede tutuyor.',
    testimonialText_en: 'With hundreds of employees and thousands of daily visitors, Alo Management’s security and cleaning standards maintain our premier corporate image.',
    testimonialText_ru: 'Высокие стандарты безопасности и безупречная чистота от Alo Management поддерживают безупречный корпоративный имидж нашего бизнес-центра.',
    testimonialText_ar: 'مع وجود مئات الموظفين وآلاف الزوار يومياً، تحافظ معايير ألو للإدارة على الصورة المؤسسية المرموقة لمركزنا التجاري.',
    testimonialAuthor: 'Cemil Serdar Özkan',
    testimonialRole: 'Plaza Genel Koordinatörü',
    stats: [
      { label: 'Yıllık Ziyaretçi Girişi', value: '450.000+' },
      { label: 'Ortak Gider Optimizasyonu', value: '%31' },
      { label: 'Kira/Aidat Tahsilatı', value: '%99.9' },
      { label: 'Yangın & İSG Denetim Puanı', value: '100 / 100' },
    ],
    coordinates: '41.0601,28.9877',
    isSuccessStory: true,
  },
  {
    id: 'ref-4',
    title: 'Marina Towers',
    title_en: 'Marina Towers Dragos',
    title_ru: 'Марина Тауэрс Драгос',
    title_ar: 'مارينا تاورز دراغوس',
    slug: 'marina-towers',
    category: 'Rezidans',
    category_en: 'Luxury Residence',
    category_ru: 'Элитная резиденция',
    category_ar: 'ريزيدنس فاخر',
    units: '480 Daire & Marinalı Yaşam',
    units_en: '480 Seafront Residences',
    units_ru: '480 апартаментов с видом на марину',
    units_ar: '480 شقة بإطلالة بحرية',
    location: 'Kartal - Dragos, İstanbul',
    location_en: 'Kartal - Dragos, Istanbul',
    location_ru: 'Картал - Драгос, Стамбул',
    location_ar: 'كارتال - دراغوس، إسطنبول',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 4,
    content: `
      <h3>Adalar Manzaralı Sahil Şeridinde 480 Haneli Mega Rezidans</h3>
      <p>Kartal Dragos sahilinde yer alan Marina Towers, Prens Adaları panoraması, 3 adet açık yüzme havuzu, tenis kortları ve 25.000 m² yeşil alanıyla Anadolu Yakası'nın en prestijli sahil sitelerinden biridir.</p>
    `,
    content_en: `
      <h3>480-Unit Coastal Mega Residence with Princes' Islands View</h3>
      <p>Located on Dragos coastline, Marina Towers offers 3 swimming pools, tennis courts, and 25,000 sqm landscape maintained to perfection by Alo Management.</p>
    `,
    content_ru: `
      <h3>Мега-резиденция на 480 квартир с видом на Принцевы острова</h3>
      <p>Комплекс Marina Towers на побережье Драгос включает 3 бассейна, теннисные корты и 25 000 кв.м ухоженной парковой территории.</p>
    `,
    content_ar: `
      <h3>مجمع ساحلي ضخم يضم 480 شقة مع إطلالة على جزر الأميرات</h3>
      <p>يقع مارينا تاورز على ساحل دراغوس، ويضم 3 مسابح وملاعب تنس ومساحات خضراء بمساحة 25,000 متر مربع.</p>
    `,
    services: [
      'Adalar Manzaralı 3 Açık Havuz İşletmesi',
      '7/24 Motorize Güvenlik Devriyesi',
      'Tenis & Basketbol Kortları Yönetimi',
      'Deniz Tuzu Korozyonuna Karşı Teknik Koruma',
      'Bina Dış Cephe & Peyzaj Aydınlatma Otomasyonu'
    ],
    services_en: [
      '3 Outdoor Pool Operations with Islands View',
      '24/7 Motorized Security Patrol Fleet',
      'Tennis & Sports Courts Management',
      'Anti-Corrosion Marine Technical Maintenance',
      'Smart Architectural Landscape Lighting'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: '480 dairelik böylesine büyük bir sitede su arıtmadan güvenliğe kadar her detayın saat gibi işlemesi inanılmaz bir başarı.',
    testimonialText_en: 'Running a 480-unit complex like clockwork is a true testament to Alo Management’s professionalism.',
    testimonialText_ru: 'Безупречная организация всех процессов в комплексе на 480 квартир — великолепное достижение Alo Management.',
    testimonialText_ar: 'تشغيل مجمع ضخم يضم 480 شقة بدقة متناهية هو دليل حقيقي على احترافية ألو للإدارة.',
    testimonialAuthor: 'Müh. Selim Cengiz',
    testimonialRole: 'Site Denetçisi',
    stats: [
      { label: 'Yeşil Alan Büyüklüğü', value: '25.000 m²' },
      { label: 'Sakin Sayısı', value: '1.600+' },
      { label: 'Su & Enerji Tasarrufu', value: '%26' },
      { label: 'Tahsilat Oranı', value: '%99.3' },
    ],
    coordinates: '40.9023,29.1764',
    isSuccessStory: true,
  },
  {
    id: 'ref-5',
    title: 'Vadi Panorama Projesi',
    title_en: 'Vadi Panorama Homes',
    title_ru: 'Панорама Долины',
    title_ar: 'مشروع وادي بانوراما',
    slug: 'vadi-panorama-projesi',
    category: 'Konut',
    category_en: 'Residential Complex',
    category_ru: 'Жилой комплекс',
    category_ar: 'مجمع سكني',
    units: '410 Daire & Orman Bitişiği',
    units_en: '410 Forest-Side Apartments',
    units_ru: '410 квартир у леса',
    units_ar: '410 شقق بجوار الغابة',
    location: 'Sarıyer - Maslak, İstanbul',
    location_en: 'Sariyer - Maslak, Istanbul',
    location_ru: 'Сарыер - Маслак, Стамбул',
    location_ar: 'ساريير - مسلك، إسطنبول',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 5,
    content: `
      <h3>Belgrad Ormanı Eteklerinde Doğa ile İç İçe Mega Yaşam</h3>
      <p>Maslak iş merkezine 5 dakika mesafede, Belgrad Ormanı sınırında yer alan Vadi Panorama, 410 aileye temiz hava ve huzurlu bir yaşam sunar. Alo Yönetim olarak atık ayrıştırma, kompost üretimi ve sıfır atık sertifikasyonu süreçlerini yürütüyoruz.</p>
    `,
    content_en: `
      <h3>Eco-Friendly Forest-Side Living near Maslak Financial District</h3>
      <p>Located on the edge of Belgrad Forest, Vadi Panorama houses 410 families with certified zero-waste and green facility operations managed by Alo Management.</p>
    `,
    content_ru: `
      <h3>Экологичный жилой комплекс рядом с лесом Белград и Маслаком</h3>
      <p>Комплекс Vadi Panorama на 410 семей с программой нулевых отходов и комплексным обслуживанием территории.</p>
    `,
    content_ar: `
      <h3>حياة صديقة للبيئة بجوار غابات بلغراد بالقرب من مسلك</h3>
      <p>يقع وادي بانوراما على حدود غابة بلغراد ويضم 410 عائلات مع تطبيق معايير الاستدامة وإدارة المرافق الخضراء.</p>
    `,
    services: [
      'Sıfır Atık & Çevre Şehircilik Bakanlığı Entegrasyonu',
      'Orman Sınırı Termal Kamera Güvenlik Çiti',
      'Organik Kompost & Biyolojik Bahçe Bakımı',
      'Elektrikli Araç (AC/DC) Şarj İstasyonları Yönetimi',
      'Sosyal Tesis, Kafe & Kreş Alanı İşletmesi'
    ],
    services_en: [
      'Certified Zero Waste & Environmental Compliance',
      'Forest Boundary Thermal Camera Security Fence',
      'Organic Composting & Botanical Gardening',
      'EV Charging Station Infrastructure Management',
      'Social Club, Cafe & Child Care Facility Ops'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Sitemizde sıfır atık yönetimi ve elektrikli şarj altyapısı Alo Yönetim sayesinde kuruldu. Çocuklarımız için güvenli ve tertemiz bir doğa yarattılar.',
    testimonialText_en: 'Zero waste management and EV charging infrastructure were established seamlessly thanks to Alo Management.',
    testimonialText_ru: 'Раздельный сбор отходов и зарядки для электромобилей появились благодаря Alo Management. Отличный сервис!',
    testimonialText_ar: 'تم إنشاء بنية الشحن الكهربائي وإدارة النفايات المستدامة بسلاسة بفضل ألو للإدارة.',
    testimonialAuthor: 'Deniz Gökmen',
    testimonialRole: 'Site Sakini & Çevre Temsilcisi',
    stats: [
      { label: 'Geri Dönüşüm Oranı', value: '%78' },
      { label: 'Ortak Alan LED Tasarrufu', value: '%35' },
      { label: 'Sakin Memnuniyeti', value: '%97.8' },
      { label: 'EV Şarj Noktası', value: '18 Adet' },
    ],
    coordinates: '41.1345,29.0112',
    isSuccessStory: true,
  },
  {
    id: 'ref-6',
    title: 'Koru Park Evleri',
    title_en: 'Koru Park Residences',
    title_ru: 'Парковые дома Кору',
    title_ar: 'منازل كورو بارك',
    slug: 'koru-park-evleri',
    category: 'Konut',
    category_en: 'Residential Boutique',
    category_ru: 'Бутик-комплекс',
    category_ar: 'مجمع سكني راقي',
    units: '180 Daire & Müstakil Bloklar',
    units_en: '180 Boutique Residences',
    units_ru: '180 бутик-квартир',
    units_ar: '180 شقة بوتيك',
    location: 'Çekmeköy, İstanbul',
    location_en: 'Cekmekoy, Istanbul',
    location_ru: 'Чекмекёй, Стамбул',
    location_ar: 'تشيكميكوي، إسطنبول',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 6,
    content: `
      <h3>Çekmeköy Çam Ormanları Yanında Butik ve Huzurlu Site</h3>
      <p>Koru Park Evleri, sakin ve müstakil yaşam arayan aileler için tasarlanmış 180 haneli elit bir projedir. Alo Yönetim 2022'den bu yana su depoları dezenfeksiyonu, hidrofor bakımı ve 24 saat kesintisiz teknik destek sunmaktadır.</p>
    `,
    content_en: `
      <h3>Boutique Serene Living Next to Cekmekoy Pine Forests</h3>
      <p>Koru Park Residences offers a peaceful community for 180 families, backed by 24/7 technical and security support from Alo Management.</p>
    `,
    content_ru: `
      <h3>Бутиковый уютный жилой комплекс у соснового леса в Чекмекёй</h3>
      <p>Элитный комплекс на 180 квартир с круглосуточной технической поддержкой и безопасностью.</p>
    `,
    content_ar: `
      <h3>حياة بوتيكية هادئة بجوار غابات الصنوبر في تشيكميكوي</h3>
      <p>يوفر كورو بارك مجمعاً هادئاً لـ 180 عائلة مع دعم فني وأمني على مدار الساعة.</p>
    `,
    services: [
      'Güneş Enerjili Bahçe Aydınlatma Sistemi',
      'Otomatik Çim Biçme & Budama Takvimi',
      'Çocuk Oyun Parkı Güvenlik ve Hijyen Sertifikası',
      'Yıllık İşletme Projesi & Şeffaf Bütçe Raporu'
    ],
    services_en: [
      'Solar-Powered Garden Illumination System',
      'Automated Lawn Care & Tree Pruning Schedule',
      'Certified Child Playground Safety & Hygiene',
      'Annual Operating Project & Transparent Budgeting'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Butik sitemizin her ihtiyacına anında koşan güler yüzlü bir ekip. Aidat hesaplamalarındaki şeffaflık tüm kat maliklerinin takdirini topladı.',
    testimonialText_en: 'A dedicated team that responds instantly. The transparency in budget calculations won the praise of all property owners.',
    testimonialText_ru: 'Отзывчивая команда, которая мгновенно решает любые вопросы. Полная прозрачность бюджета!',
    testimonialText_ar: 'فريق مخلص يستجيب على الفور. الشفافية في حساب الميزانية حازت على ثقة جميع الملاك.',
    testimonialAuthor: 'Merve Altınbilek',
    testimonialRole: 'Site Yönetim Denetçisi',
    stats: [
      { label: 'Tahsilat Başarısı', value: '%99.7' },
      { label: 'Sakin Memnuniyeti', value: '%99.2' },
      { label: 'Ortalama Arıza Çözüm', value: '40 Dk' },
      { label: 'Yıllık Tasarruf', value: '%24' },
    ],
    coordinates: '41.0342,29.1845',
    isSuccessStory: false,
  },
  {
    id: 'ref-7',
    title: 'Bosphorus View Rezidans',
    title_en: 'Bosphorus View Residence',
    title_ru: 'Босфор Вью Резиденс',
    title_ar: 'بوسفور فيو ريزيدنس',
    slug: 'bosphorus-view-rezidans',
    category: 'Rezidans',
    category_en: 'Luxury Residence',
    category_ru: 'Элитная резиденция',
    category_ar: 'ريزيدنس فاخر',
    units: '160 Lüks Daire',
    units_en: '160 Luxury Residences',
    units_ru: '160 элитных апартаментов',
    units_ar: '160 شقة فاخرة',
    location: 'Üsküdar - Kandilli, İstanbul',
    location_en: 'Uskudar - Kandilli, Istanbul',
    location_ru: 'Ускюдар - Кандилли, Стамбул',
    location_ar: 'أوسكودار - كانديلي، إسطنبول',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 7,
    content: `
      <h3>Boğazın En Değerli Tepesinde Tarihi Doku ile Modern Konfor</h3>
      <p>Kandilli sırtlarında Boğaziçi'ne hakim Bosphorus View, tarihi tescilli ağaçları ve çağdaş mimarisiyle 160 seçkin aileye ev sahipliği yapar. Alo Yönetim, Boğaziçi İmar mevzuatına tam uyumlu çevre ve tesis yönetimi icra etmektedir.</p>
    `,
    content_en: `
      <h3>Historical Splendor Meets Modern Luxury Overlooking the Bosphorus</h3>
      <p>Overlooking the Bosphorus in Kandilli, this boutique luxury residence houses 160 families under stringent compliance and 5-star concierge standards.</p>
    `,
    content_ru: `
      <h3>Исторический шарм и современная роскошь с видом на Босфор</h3>
      <p>Элитный комплекс на холмах Кандилли с панорамой Босфора и пятизвездочным консьерж-сервисом.</p>
    `,
    content_ar: `
      <h3>روعة تاريخية وفخامة عصرية بإطلالة ساحرة على مضيق البوسفور</h3>
      <p>يطل المجمع على مضيق البوسفور في كانديلي، ويضم 160 عائلة مع خدمات كونسيرج 5 نجوم.</p>
    `,
    services: [
      'VIP Concierge & Özel Şoför Koordinasyonu',
      'Boğaziçi Doğal Sit Koruma Uyumlu Peyzaj Bakımı',
      'Yüksek Güvenlikli Biyometrik Parmak İzi Giriş',
      'Sonsuzluk Havuzu & Spa Bakımı'
    ],
    services_en: [
      'VIP Concierge & Chauffeur Coordination',
      'Bosphorus Conservation-Compliant Landscape Care',
      'Biometric Fingerprint Security Access',
      'Infinity Pool & Private Spa Operations'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Boğaz hattındaki mülkümüzün değerini koruyan ve yükselten en profesyonel tesis yönetimi firması.',
    testimonialText_en: 'The most professional facility management company that protects and enhances the value of our Bosphorus property.',
    testimonialText_ru: 'Самая профессиональная управляющая компания, которая сохраняет и приумножает ценность нашей недвижимости.',
    testimonialText_ar: 'الشركة الأكثر احترافية في إدارة المرافق والتي تحافظ على قيمة عقاراتنا وتزيدها.',
    testimonialAuthor: 'Bülent Karamahmutoğlu',
    testimonialRole: 'Yönetim Kurulu Üyesi',
    stats: [
      { label: 'Sakin Memnuniyeti', value: '%99.5' },
      { label: 'Tahsilat Oranı', value: '%100' },
      { label: 'Güvenlik Puanı', value: '5 / 5' },
      { label: 'Müdahale Hızı', value: '15 Dk' },
    ],
    coordinates: '41.0745,29.0623',
    isSuccessStory: false,
  },
  {
    id: 'ref-8',
    title: 'Maslak Tower Plaza',
    title_en: 'Maslak Tower Plaza',
    title_ru: 'Маслак Тауэр Плаза',
    title_ar: 'برج مسلك بلازا',
    slug: 'maslak-tower-plaza',
    category: 'Ticari',
    category_en: 'Commercial Tower',
    category_ru: 'Бизнес-центр',
    category_ar: 'برج تجاري',
    units: '180 Kurumsal Ofis',
    units_en: '180 Corporate Offices',
    units_ru: '180 корпоративных офисов',
    units_ar: '180 مكتباً للشركات',
    location: 'Sarıyer - Maslak, İstanbul',
    location_en: 'Sariyer - Maslak, Istanbul',
    location_ru: 'Сарыер - Маслак, Стамбул',
    location_ar: 'ساريير - مسلك، إسطنبول',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 8,
    content: `
      <h3>Finans ve Teknoloji Devlerinin Buluştuğu 42 Katlı Akıllı Plaza</h3>
      <p>Maslak gökdelenler bölgesinde yer alan Maslak Tower, 180 kurumsal merkez ve 4.000 çalışan kapasitesiyle akıllı bina teknolojilerini kullanır.</p>
    `,
    content_en: `
      <h3>42-Story Smart Corporate Tower in Maslak Financial District</h3>
      <p>Hosting multinational tech and finance giants, Maslak Tower integrates smart automation and high-capacity security infrastructure managed by Alo Management.</p>
    `,
    content_ru: `
      <h3>42-этажный умный бизнес-центр в финансовом районе Маслак</h3>
      <p>Штаб-квартиры международных технологических и финансовых корпораций с умной автоматизацией здания.</p>
    `,
    content_ar: `
      <h3>برج ذكي للشركات مكون من 42 طابقاً في المنطقة المالية بمسلك</h3>
      <p>يستضيف البرج كبرى شركات التكنولوجيا والمال العالمية مع بنية تحتية ذكية بإدارة ألو للمرافق.</p>
    `,
    services: [
      '7/24 Turnike & Yüz Tanıma Güvenliği',
      'Merkezi Jeneratör & UPS Güç Güvencesi',
      'Toplantı & Konferans Salonu Rezervasyon Yönetimi',
      'Akıllı Bina Otomasyonu (BMS)'
    ],
    services_en: [
      '24/7 Facial Recognition & Turnstile Security',
      'Central Generator & Redundant UPS Power',
      'Conference & Boardroom Reservation Management',
      'Integrated Smart Building Management System'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Uluslararası banka genel merkezimiz için güvenlik ve enerji sürekliliği şart. Alo Yönetim sıfır kesintiyle 3 yıldır yanımızda.',
    testimonialText_en: 'Security and power continuity are critical for our banking HQ. Alo Management has delivered zero downtime for 3 years.',
    testimonialText_ru: 'Безопасность и непрерывность питания критичны для нашей штаб-квартиры. Alo Management работает безупречно.',
    testimonialText_ar: 'استمرارية الطاقة والأمن أمران حاسمان لمقر بنكنا. قدمت ألو للإدارة تشغيلاً خالياً من أي انقطاع.',
    testimonialAuthor: 'Hande Demirel',
    testimonialRole: 'İdari İşler Direktörü',
    stats: [
      { label: 'Uptime Oranı', value: '%99.99' },
      { label: 'Günlük Kullanıcı', value: '4.200+' },
      { label: 'Enerji Tasarrufu', value: '%29' },
      { label: 'Yangın Güvenlik Skoru', value: '100 / 100' },
    ],
    coordinates: '41.1123,29.0210',
    isSuccessStory: false,
  },
  {
    id: 'ref-9',
    title: 'Akatlar Flora Evleri',
    title_en: 'Akatlar Flora Residences',
    title_ru: 'Акатлар Флора',
    title_ar: 'مساكن أكاتلار فلورا',
    slug: 'akatlar-flora-evleri',
    category: 'Konut',
    category_en: 'Residential Boutique',
    category_ru: 'Жилой комплекс',
    category_ar: 'سكني',
    units: '120 Daire & Sosyal Tesis',
    units_en: '120 Boutique Apartments',
    units_ru: '120 квартир',
    units_ar: '120 شقة',
    location: 'Beşiktaş - Akatlar, İstanbul',
    location_en: 'Besiktas - Akatlar, Istanbul',
    location_ru: 'Бешикташ - Акатлар, Стамбул',
    location_ar: 'بشكتاش - أكاتلار، إسطنبول',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 9,
    content: `
      <h3>Beşiktaş ve Levent Hattında Nezih ve Butik Yaşam</h3>
      <p>Akatlar’ın nezih sokaklarında yer alan Flora Evleri, kapalı otoparkı, çocuk parkı ve 24 saat fiziki güvenliğiyle seçkin ailelerin ilk tercihidir.</p>
    `,
    content_en: `
      <h3>Boutique Urban Living between Besiktas and Levent</h3>
      <p>Located in prestigious Akatlar, Flora Residences offers 24/7 security and pristine common areas managed by Alo Management.</p>
    `,
    content_ru: `
      <h3>Уютная городская жизнь между Бешикташем и Левентом</h3>
      <p>Престижный жилой комплекс в Акатларе с круглосуточной охраной и чистыми общественными зонами.</p>
    `,
    content_ar: `
      <h3>حياة حضرية راقية بين بشكتاش وليفنت</h3>
      <p>يقع مساكن فلورا في أكاتلار الراقية، ويوفر أماناً على مدار الساعة ومرافق مشتركة مميزة.</p>
    `,
    services: [
      '24 Saat Fiziki Güvenlik & Plaka Tanıma',
      'Çevre Dostu Ortak Alan Aydınlatması',
      'Düzenli Bahçe İlaçlama ve Dezenfeksiyon'
    ],
    services_en: [
      '24/7 Physical Security & LPR Gate',
      'Eco-Friendly Common Area Lighting',
      'Regular Pest Control & Sanitization'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Beşiktaş merkezine bu kadar yakınken sitemizde bir kasaba dinginliği yaşıyoruz. Emeği geçen tüm personele teşekkürler.',
    testimonialText_en: 'We enjoy serene peace so close to the city center. Thanks to Alo Management team.',
    testimonialText_ru: 'Мы наслаждаемся тишиной и уютом в самом центре города. Спасибо команде Alo Management!',
    testimonialText_ar: 'نستمتع بالهدوء التام على مقربة من قلب المدينة. شكراً لفريق ألو للإدارة.',
    testimonialAuthor: 'Emre Çakıroğlu',
    testimonialRole: 'Site Sakini',
    stats: [
      { label: 'Sakin Memnuniyeti', value: '%98.9' },
      { label: 'Tahsilat Oranı', value: '%99.4' },
      { label: 'SLA Hızı', value: '20 Dk' },
      { label: 'Tasarruf Oranı', value: '%27' },
    ],
    coordinates: '41.0823,29.0289',
    isSuccessStory: false,
  },
  {
    id: 'ref-10',
    title: 'Göktürk Prime Loft',
    title_en: 'Gokturk Prime Loft',
    title_ru: 'Гёктюрк Прайм Лофт',
    title_ar: 'غوكتورك برايم لوفت',
    slug: 'gokturk-prime-loft',
    category: 'Karma Yaşam',
    category_en: 'Mixed-Use Community',
    category_ru: 'Многофункциональный комплекс',
    category_ar: 'مجمع متعدد الاستخدامات',
    units: '95 Loft Daire + Cadde Mağazaları',
    units_en: '95 Loft Residences + Street Retail',
    units_ru: '95 лофт-квартир + бутики',
    units_ar: '95 شقة لوفت + متاجر تجارية',
    location: 'Eyüpsultan - Göktürk, İstanbul',
    location_en: 'Eyupsultan - Gokturk, Istanbul',
    location_ru: 'Эюпсултан - Гёктюрк, Стамбул',
    location_ar: 'أيوب سلطان - غوكتورك، إسطنبول',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 10,
    content: `
      <h3>İstanbul Havalimanı Aksında Loft Mimarisi ve Gastronomi Caddesi</h3>
      <p>Göktürk merkezinde yer alan Göktürk Prime Loft, yüksek tavanlı loft yaşam alanları ve zemin katındaki seçkin restoran ve kafelerle karma yaşam modelini hayata geçirmiştir.</p>
    `,
    content_en: `
      <h3>High-Ceiling Loft Living on the Istanbul Airport Highway</h3>
      <p>Gokturk Prime Loft features high-ceiling residential lofts and upscale street dining managed collaboratively by Alo Management.</p>
    `,
    content_ru: `
      <h3>Лофты с высокими потолками на трассе к новому аэропорту Стамбула</h3>
      <p>Жилые лофты и рестораны первого этажа под единым управлением Alo Management.</p>
    `,
    content_ar: `
      <h3>شقق لوفت بسقوف عالية على طريق مطار إسطنبول</h3>
      <p>يتميز غوكتورك برايم لوفت بشقق سكنية ومطاعم راقية تحت إدارة متكاملة من ألو للإدارة.</p>
    `,
    services: [
      'Karma Yaşam Gider Ayrıştırma & Sub-Metering',
      'Açık Cadde Mağazaları Güvenlik & Zabıta Koordinasyonu',
      'Yeraltı Otopark Vale & Şarj Hizmeti'
    ],
    services_en: [
      'Mixed-Use Utility Sub-Metering & Expense Allocation',
      'Retail Street Perimeter Security & Municipal Liaison',
      'Underground Valet & EV Fast Charging'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Hem konut sakinlerinin hem ticari işletmelerin aynı çatı altında sorunsuz anlaşabilmesi Alo Yönetim’in uzlaştırıcı hukukçu kadrosu sayesindedir.',
    testimonialText_en: 'Harmonizing residential residents and commercial businesses under one roof is made possible by Alo Management’s legal team.',
    testimonialText_ru: 'Гармония между жильцами и коммерческими арендаторами достигнута благодаря профессиональным юристам Alo Management.',
    testimonialText_ar: 'تم تحقيق التوافق بين السكان والمحلات التجارية بفضل الفريق القانوني المحترف لألو للإدارة.',
    testimonialAuthor: 'Murat Başaran',
    testimonialRole: 'Ticari Alan Temsilcisi',
    stats: [
      { label: 'Karma Yaşam Memnuniyeti', value: '%97.4' },
      { label: 'Ticari Tahsilat', value: '%100' },
      { label: 'Gider Ayrıştırma Doğruluğu', value: '%100' },
      { label: 'Ortalama Müdahale', value: '30 Dk' },
    ],
    coordinates: '41.1823,28.8923',
    isSuccessStory: false,
  },
  {
    id: 'ref-11',
    title: 'Finans Merkezi Business Park',
    title_en: 'Finance Center Business Park',
    title_ru: 'Бизнес-парк Финансового центра',
    title_ar: 'بيزنس بارك المركز المالي',
    slug: 'finans-merkezi-business-park',
    category: 'Ticari',
    category_en: 'Business Campus',
    category_ru: 'Бизнес-парк',
    category_ar: 'مجمع أعمال',
    units: '260 Ofis & Veri Merkezi',
    units_en: '260 Offices & Data Center Facility',
    units_ru: '260 офисов и дата-центр',
    units_ar: '260 مكتباً ومركز بيانات',
    location: 'Ümraniye, İstanbul',
    location_en: 'Umraniye, Istanbul',
    location_ru: 'Умрание, Стамбул',
    location_ar: 'عمرانية، إسطنبول',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 11,
    content: `
      <h3>İstanbul Finans Merkezi Kalbinde Yüksek Güvenlikli İş Kampüsü</h3>
      <p>Bankacılık, fintech ve yazılım şirketlerine ev sahipliği yapan Business Park, Tier-3 veri merkezi standartlarında kesintisiz jeneratör ve fiber altyapı yönetimine sahiptir.</p>
    `,
    content_en: `
      <h3>High-Security Business Campus in Istanbul International Financial Center</h3>
      <p>Home to banking and fintech leaders, Business Park features Tier-3 redundant power and mission-critical facility services managed by Alo Management.</p>
    `,
    content_ru: `
      <h3>Высокотехнологичный бизнес-парк в Международном финансовом центре</h3>
      <p>Офисы ведущих банков и финтех-компаний с резервным электропитанием и круглосуточным управлением.</p>
    `,
    content_ar: `
      <h3>مجمع أعمال عالي الأمان في مركز إسطنبول المالي الدولي</h3>
      <p>يضم مقرات للبنوك وشركات التكنولوجيا المالية مع طاقة احتياطية وتشغيل منشآت حيوي من ألو للإدارة.</p>
    `,
    services: [
      'Tier-3 Veri Merkezi Enerji ve İklimlendirme Yedekliliği',
      'Biyometrik Damar İzi Güvenlik Kontrolü',
      'Kurumsal İkram & Konferans Lojistik Hizmetleri'
    ],
    services_en: [
      'Tier-3 Redundant Power & Cooling Facility Maintenance',
      'Biometric Security Access Control',
      'Executive Catering & Conference Logistics'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Veri merkezimizin saniyeler bile kesintiye tahammülü yok. Alo Yönetim teknik kadrosu 24 saat nöbette, gözümüz arkada kalmıyor.',
    testimonialText_en: 'Our data center cannot tolerate even seconds of downtime. Alo Management’s engineering crew guards us 24/7.',
    testimonialText_ru: 'Наш дата-центр не допускает простоев. Команда инженеров Alo Management дежурит 24/7.',
    testimonialText_ar: 'لا يتحمل مركز بياناتنا أي انقطاع. يتولى فريق مهندسي ألو للإدارة حراسة مرافقنا على مدار الساعة.',
    testimonialAuthor: 'Koray Yalçın',
    testimonialRole: 'Bilgi Teknolojileri Direktörü',
    stats: [
      { label: 'Enerji Sürekliliği', value: '%100 SLA' },
      { label: 'Ofis Doluluk Oranı', value: '%98.5' },
      { label: 'Tahsilat Başarısı', value: '%99.9' },
      { label: 'Güvenlik Puanı', value: '5 / 5' },
    ],
    coordinates: '40.9989,29.1120',
    isSuccessStory: false,
  },
  {
    id: 'ref-12',
    title: 'Batı Ataşehir Ticaret Merkezi',
    title_en: 'West Atasehir Trade Center',
    title_ru: 'Торговый центр Западный Аташехир',
    title_ar: 'مركز تجارة غرب أتاشهير',
    slug: 'bati-atasehir-ticaret-merkezi',
    category: 'Ticari',
    category_en: 'Commercial Center',
    category_ru: 'Торговый комплекс',
    category_ar: 'مركز تجاري',
    units: '140 Ticari Ofis & Showroom',
    units_en: '140 Commercial Offices & Showrooms',
    units_ru: '140 офисов и шоурумов',
    units_ar: '140 مكتباً ومعرضاً',
    location: 'Ataşehir, İstanbul',
    location_en: 'Atasehir, Istanbul',
    location_ru: 'Аташехир, Стамбул',
    location_ar: 'أتاشهير، إسطنبول',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    published: true,
    order: 12,
    content: `
      <h3>Batı Ataşehir’de Showroom ve Ticari Ofis Yönetimi</h3>
      <p>Batı Ataşehir’in işlek bulvarında konumlanan 140 bağımsız bölümlü merkez; otomotiv, mobilya ve mimarlık showroomlarına profesyonel bina yönetimi hizmeti sunar.</p>
    `,
    content_en: `
      <h3>Commercial Showroom and Office Management in West Atasehir</h3>
      <p>Hosting premium automotive and interior showrooms, West Atasehir Trade Center is managed for highest tenant satisfaction by Alo Management.</p>
    `,
    content_ru: `
      <h3>Управление шоурумами и коммерческими офисами в Западном Аташехире</h3>
      <p>Комплексное обслуживание престижных автосалонов и дизайнерских студий.</p>
    `,
    content_ar: `
      <h3>إدارة المعارض والمكاتب التجارية في غرب أتاشهير</h3>
      <p>يوفر المركز إدارة متكاملة للمعارض والمكاتب التجارية مع أعلى مستويات الرضا للمستأجرين.</p>
    `,
    services: [
      'Geniş Otopark & Müşteri Karşılama Yönetimi',
      'Yüksek Tavanlı Showroom İklimlendirme Bakımı',
      'Dış Cephe & Işıklı Tabela Temizliği'
    ],
    services_en: [
      'Spacious Visitor Parking & Host Management',
      'High-Ceiling Showroom HVAC Maintenance',
      'Exterior Facade & Architectural Signage Cleaning'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
    ],
    testimonialText: 'Showroomlarımızın lüks algısına yakışır bir bina temizliği ve güvenlik hizmeti alıyoruz.',
    testimonialText_en: 'We receive pristine building maintenance that reflects the prestige of our premium showrooms.',
    testimonialText_ru: 'Безупречная чистота и презентабельность, соответствующая уровню наших люксовых шоурумов.',
    testimonialText_ar: 'نحصل على صيانة ونظافة مبنى راقية تليق بمستوى معارضنا الفاخرة.',
    testimonialAuthor: 'Zafer Karadağ',
    testimonialRole: 'Yönetim Temsilcisi',
    stats: [
      { label: 'Kiracı Memnuniyeti', value: '%98.7' },
      { label: 'Ortak Alan Tasarrufu', value: '%25' },
      { label: 'Tahsilat Oranı', value: '%99.6' },
      { label: 'SLA Çözüm', value: '30 Dk' },
    ],
    coordinates: '40.9899,29.1023',
    isSuccessStory: false,
  }
];

export function getReferencesList(lang: string = 'tr') {
  return REFERENCES_DATA.map(p => ({
    id: p.id,
    title: lang === 'en' && p.title_en ? p.title_en : lang === 'ru' && p.title_ru ? p.title_ru : lang === 'ar' && p.title_ar ? p.title_ar : p.title,
    slug: p.slug,
    category: lang === 'en' && p.category_en ? p.category_en : lang === 'ru' && p.category_ru ? p.category_ru : lang === 'ar' && p.category_ar ? p.category_ar : p.category,
    units: lang === 'en' && p.units_en ? p.units_en : lang === 'ru' && p.units_ru ? p.units_ru : lang === 'ar' && p.units_ar ? p.units_ar : p.units,
    location: lang === 'en' && p.location_en ? p.location_en : lang === 'ru' && p.location_ru ? p.location_ru : lang === 'ar' && p.location_ar ? p.location_ar : p.location,
    image: p.image,
    clientLogo: p.clientLogo,
    published: p.published,
    order: p.order,
  }));
}

export function getReferenceBySlug(slug: string, lang: string = 'tr') {
  const p = REFERENCES_DATA.find(r => r.slug === slug);
  if (!p) return null;
  return {
    ...p,
    title: lang === 'en' && p.title_en ? p.title_en : lang === 'ru' && p.title_ru ? p.title_ru : lang === 'ar' && p.title_ar ? p.title_ar : p.title,
    category: lang === 'en' && p.category_en ? p.category_en : lang === 'ru' && p.category_ru ? p.category_ru : lang === 'ar' && p.category_ar ? p.category_ar : p.category,
    units: lang === 'en' && p.units_en ? p.units_en : lang === 'ru' && p.units_ru ? p.units_ru : lang === 'ar' && p.units_ar ? p.units_ar : p.units,
    location: lang === 'en' && p.location_en ? p.location_en : lang === 'ru' && p.location_ru ? p.location_ru : lang === 'ar' && p.location_ar ? p.location_ar : p.location,
    content: lang === 'en' && p.content_en ? p.content_en : lang === 'ru' && p.content_ru ? p.content_ru : lang === 'ar' && p.content_ar ? p.content_ar : p.content,
    services: lang === 'en' && p.services_en ? p.services_en : lang === 'ru' && p.services_ru ? p.services_ru : lang === 'ar' && p.services_ar ? p.services_ar : p.services,
    testimonialText: lang === 'en' && p.testimonialText_en ? p.testimonialText_en : lang === 'ru' && p.testimonialText_ru ? p.testimonialText_ru : lang === 'ar' && p.testimonialText_ar ? p.testimonialText_ar : p.testimonialText,
  };
}

export { REFERENCES_META, type ReferenceProjectMeta } from './referencesMetadata';
