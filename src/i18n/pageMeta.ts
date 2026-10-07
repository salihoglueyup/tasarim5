// Statik sayfaların Türkçe dışındaki diller için <title> / description çevirileri.
// buildMetadata (src/lib/seo.ts) lang !== 'tr' iken, yolu burada varsa sayfanın verdiği Türkçe
// başlık/açıklama yerine bunları kullanır; böylece çevrilmiş sayfaların arama sonucu metni de
// o dilde olur. Marka eki (" | Alo Yönetim") formatBrandTitle tarafından eklenir.
//
// Not: Doğrulanamayan rakamlar (tasarruf yüzdesi, tahsilat garantisi) ve sahip olunmayan
// belge/standart adları (ör. ISO 41001) bilinçli olarak bu metinlere alınmadı.

export type MetaLocale = 'en' | 'ru' | 'ar';
export interface LocalizedMeta {
  title: string;
  description: string;
}

export const PAGE_META: Record<string, Partial<Record<MetaLocale, LocalizedMeta>>> = {
  '/hizmetler': {
    en: { title: 'Building & Facility Management Services', description: 'Corporate facility management across Istanbul, including licensed private security, cleaning, technical maintenance, dues enforcement and landscaping.' },
    ru: { title: 'Услуги по управлению зданиями и объектами', description: 'Корпоративные решения по управлению объектами по всему Стамбулу: лицензированная охрана, уборка, техобслуживание, взыскание взносов и ландшафт.' },
    ar: { title: 'خدمات إدارة المباني والمرافق', description: 'حلول مؤسسية لإدارة المرافق في جميع أنحاء إسطنبول تشمل الأمن الخاص المرخّص والنظافة والصيانة الفنية وتحصيل الاشتراكات وتنسيق الحدائق.' },
  },
  '/hizmetler/site-yonetimi': {
    en: { title: 'Complex Management Companies in Istanbul — Condominium Law No. 634 & 24/7', description: 'Professional management of housing complexes, apartment buildings and residences across Istanbul\'s 39 districts in line with Condominium Law No. 634: transparent dues collection and licensed security. Get a free survey.' },
    ru: { title: 'Управляющие компании комплексов в Стамбуле — Закон № 634 и 24/7', description: 'Профессиональное управление жилыми комплексами, многоквартирными домами и резиденциями в 39 районах Стамбула в соответствии с Законом № 634: прозрачный сбор взносов и лицензированная охрана. Запросите бесплатный осмотр.' },
    ar: { title: 'شركات إدارة المجمعات في إسطنبول — القانون رقم 634 وعلى مدار الساعة', description: 'إدارة احترافية للمجمعات السكنية والعمارات والإقامات في مناطق إسطنبول التسع والثلاثين وفق قانون ملكية الطوابق رقم 634: تحصيل شفاف للاشتراكات وأمن مرخّص. احصلوا على معاينة مجانية.' },
  },
  '/hizmetler/guvenlik-yonetimi': {
    en: { title: 'Licensed Private Security Companies — Complex & Facility Security', description: 'A private security company licensed by the Governorate commission under Law No. 5188: 24/7 RFID patrols, CCTV monitoring, severance-pay protection and professional protection.' },
    ru: { title: 'Лицензированные охранные компании — охрана комплексов и объектов', description: 'Частная охранная компания с разрешением губернаторской комиссии по Закону № 5188: RFID-патрули 24/7, видеонаблюдение, защита по выходным пособиям и профессиональная охрана.' },
    ar: { title: 'شركات الأمن الخاص المرخّصة — أمن المجمعات والمنشآت', description: 'شركة أمن خاص مرخّصة من لجنة الولاية بموجب القانون رقم 5188: دوريات RFID على مدار الساعة ومراقبة بالكاميرات وحماية من مخاطر تعويضات نهاية الخدمة وحراسة احترافية.' },
  },
  '/hizmetler/temizlik-ve-hijyen': {
    en: { title: 'Apartment & Complex Common-Area Cleaning Company', description: 'Block, floor-lobby and parking cleaning with industrial floor machines and payroll staff. Get a transparent quote within 48 hours.' },
    ru: { title: 'Клининговая компания для общих зон домов и комплексов', description: 'Уборка подъездов, холлов и парковок промышленными поломоечными машинами силами штатного персонала. Получите прозрачное предложение в течение 48 часов.' },
    ar: { title: 'شركة تنظيف المناطق المشتركة للعمارات والمجمعات', description: 'تنظيف المباني وردهات الطوابق والمواقف بآلات أرضيات صناعية وعاملين ضمن الملاك الوظيفي. احصلوا على عرض شفاف خلال 48 ساعة.' },
  },
  '/hizmetler/teknik-bakim': {
    en: { title: 'Building & Complex Technical Maintenance — Elevator & Generator SLA', description: 'Type A elevator green-label inspection, generator synchronisation, power-factor compensation to avoid reactive-power penalties and emergency technical service with a 45-minute SLA.' },
    ru: { title: 'Техническое обслуживание зданий и комплексов — SLA по лифтам и генераторам', description: 'Проверка лифтов типа A для получения зелёной этикетки, синхронизация генераторов, компенсация реактивной мощности для отсутствия штрафов и аварийная техническая служба с SLA 45 минут.' },
    ar: { title: 'الصيانة الفنية للمباني والمجمعات — اتفاقية خدمة المصاعد والمولدات', description: 'فحص المصاعد من النوع A للحصول على الملصق الأخضر ومزامنة المولدات وتعويض القدرة لتفادي غرامات الطاقة الردية وخدمة فنية طارئة باتفاقية مستوى خدمة 45 دقيقة.' },
  },
  '/hizmetler/aidat-takibi': {
    en: { title: 'Professional Dues Tracking & Collection Management', description: 'A digital dues tracking system for complexes and apartment buildings with online card payment, automatic bank integration and legal enforcement follow-up.' },
    ru: { title: 'Профессиональный учёт и сбор взносов', description: 'Цифровая система учёта взносов для комплексов и многоквартирных домов: онлайн-оплата картой, автоматическая интеграция с банком и юридическое взыскание.' },
    ar: { title: 'متابعة الاشتراكات وإدارة التحصيل باحترافية', description: 'نظام رقمي لمتابعة اشتراكات المجمعات والعمارات مع الدفع الإلكتروني بالبطاقة والتكامل التلقائي مع البنوك والمتابعة التنفيذية القانونية.' },
  },
  '/hizmetler/peyzaj-ve-bahce-bakimi': {
    en: { title: 'Complex & Facility Landscaping & Garden Maintenance', description: 'Year-round lawn mowing, tree pruning, fertilising and smart automatic irrigation for complexes, supervised by an agricultural engineer.' },
    ru: { title: 'Ландшафт и уход за садом для комплексов и объектов', description: 'Круглогодичная стрижка газонов, обрезка деревьев, удобрение и умный автоматический полив для комплексов под контролем инженера-агронома.' },
    ar: { title: 'تنسيق الحدائق وصيانتها للمجمعات والمنشآت', description: 'قصّ العشب وتقليم الأشجار والتسميد والري الأوتوماتيكي الذكي على مدار الفصول الأربعة للمجمعات بإشراف مهندس زراعي.' },
  },
  '/hizmetler/havuz-bakimi-ve-hijyen': {
    en: { title: 'Complex & Residence Pool Maintenance Service', description: 'Daily chlorine and pH measurement, filter backwashing and pool maintenance by certified operators for complexes and residences, with periodic analysis to Ministry of Health standards.' },
    ru: { title: 'Обслуживание бассейнов в комплексах и резиденциях', description: 'Ежедневные замеры хлора и pH, обратная промывка фильтров и обслуживание бассейнов сертифицированными операторами; периодические анализы по стандартам Министерства здравоохранения.' },
    ar: { title: 'خدمة صيانة المسابح للمجمعات والإقامات', description: 'قياس يومي للكلور ودرجة الحموضة وغسيل عكسي للمرشحات وصيانة للمسابح بمشغّلين معتمدين مع تحاليل دورية وفق معايير وزارة الصحة.' },
  },
  '/hizmetler/hukuk-ve-icra-danismanligi': {
    en: { title: 'Condominium Law No. 634 Legal & Dues Enforcement Advisory', description: 'Notary notices for unpaid dues under Law No. 634, enforcement without a court judgment, 5% monthly late-payment compensation and advice on finalised operating budgets.' },
    ru: { title: 'Юридические консультации по Закону № 634 и взыскание взносов', description: 'Нотариальные уведомления по неоплаченным взносам согласно Закону № 634, взыскание без судебного решения, компенсация за просрочку 5 % в месяц и консультации по утверждённым сметам.' },
    ar: { title: 'الاستشارات القانونية وفق القانون رقم 634 وتحصيل الاشتراكات', description: 'إنذارات عبر كاتب العدل للاشتراكات غير المسددة وفق القانون رقم 634 والتنفيذ دون حكم قضائي وتعويض تأخير 5٪ شهريًا واستشارات بشأن مشاريع التشغيل النهائية.' },
  },
  '/hizmetler/hasere-ve-dezenfeksiyon': {
    en: { title: 'Apartment & Complex Pest Control Service', description: 'Odourless insect, rat and rodent control for complexes, apartment buildings and facilities using biocidal products licensed by the Ministry of Health. Appointments: 0216 550 48 48.' },
    ru: { title: 'Борьба с вредителями в домах и комплексах', description: 'Обработка от насекомых, крыс и грызунов без запаха для комплексов, домов и объектов биоцидными препаратами, лицензированными Министерством здравоохранения. Запись: 0216 550 48 48.' },
    ar: { title: 'خدمة مكافحة الحشرات للعمارات والمجمعات', description: 'مكافحة الحشرات والفئران والقوارض بلا رائحة للمجمعات والعمارات والمنشآت بمبيدات حيوية مرخّصة من وزارة الصحة. للحجز: 0216 550 48 48.' },
  },
  '/hizmetler/tesis-yonetimi/plaza-yonetimi': {
    en: { title: 'Plaza Facility Management — Grade A Business Center & Office Operations', description: 'Plaza management for Grade A plazas, business towers and commercial centers across Istanbul: licensed security, HVAC/BMS automation and uninterrupted generator power.' },
    ru: { title: 'Управление бизнес-центрами — эксплуатация офисных зданий класса A', description: 'Управление бизнес-центрами, деловыми башнями и коммерческими комплексами класса A по всему Стамбулу: лицензированная охрана, автоматизация HVAC/BMS и бесперебойное питание от генераторов.' },
    ar: { title: 'إدارة الأبراج التجارية — تشغيل مراكز الأعمال والمكاتب من الفئة A', description: 'إدارة الأبراج ومراكز الأعمال والمراكز التجارية من الفئة A في جميع أنحاء إسطنبول: أمن مرخّص وأتمتة HVAC/BMS وطاقة مولدات دون انقطاع.' },
  },
  '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi': {
    en: { title: 'Residence Facility Management — Luxury Complex & Concierge Service', description: 'Professional residence management for residence towers and luxury complexes across Istanbul, with 24/7 concierge, licensed security, technical operations and transparent dues tracking.' },
    ru: { title: 'Управление резиденциями — элитные комплексы и консьерж-сервис', description: 'Профессиональное управление резиденциями и элитными комплексами по всему Стамбулу: консьерж 24/7, лицензированная охрана, техническая эксплуатация и прозрачный учёт взносов.' },
    ar: { title: 'إدارة الإقامات السكنية — المجمعات الفاخرة وخدمة الكونسيرج', description: 'إدارة احترافية لأبراج الإقامات والمجمعات الفاخرة في جميع أنحاء إسطنبول مع كونسيرج على مدار الساعة وأمن مرخّص وتشغيل فني ومتابعة شفافة للاشتراكات.' },
  },
  '/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi': {
    en: { title: 'Industrial Facility Management — Factory, Warehouse & OIZ Operations', description: 'Integrated facility management for organised industrial zones, factories and logistics warehouses, with ISO 45001 occupational health and safety, transformer maintenance and industrial security.' },
    ru: { title: 'Управление промышленными объектами — заводы, склады и ОПЗ', description: 'Комплексное управление объектами для организованных промышленных зон, заводов и логистических складов: охрана труда по ISO 45001, обслуживание трансформаторов и промышленная безопасность.' },
    ar: { title: 'إدارة المنشآت الصناعية — المصانع والمستودعات والمناطق الصناعية المنظمة', description: 'إدارة متكاملة للمرافق في المناطق الصناعية المنظمة والمصانع ومستودعات اللوجستيات مع السلامة والصحة المهنية ISO 45001 وصيانة المحولات والأمن الصناعي.' },
  },
  '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi': {
    en: { title: 'Mass Housing Facility Management — Mega Complexes', description: 'Integrated facility management and a centralised operating budget for complexes of 500+ homes and mass housing projects. Get a quote within 48 hours.' },
    ru: { title: 'Управление жилыми массивами — мегакомплексы', description: 'Комплексное управление объектами и централизованная смета для комплексов от 500 жилых единиц и массовой застройки. Получите предложение в течение 48 часов.' },
    ar: { title: 'إدارة مرافق الإسكان الجماعي — المجمعات الضخمة', description: 'إدارة متكاملة للمرافق وميزانية تشغيل مركزية للمجمعات التي تضم أكثر من 500 وحدة سكنية ومشاريع الإسكان الجماعي. احصلوا على عرض خلال 48 ساعة.' },
  },
  '/hizmetler/tesis-yonetimi/rehber': {
    en: { title: 'How to Choose a Facility Management Company? 2026 Selection & Specification Guide', description: 'What to consider when choosing a complex or facility management company: B2B technical specification (RFP) preparation, Law No. 5188 licence, Condominium Law Art. 34 handover protocol, budget audit and a 10-point company scorecard.' },
    ru: { title: 'Как выбрать управляющую компанию? Руководство по выбору и ТЗ на 2026 год', description: 'На что обратить внимание при выборе управляющей компании комплекса или объекта: подготовка B2B-технического задания (RFP), лицензия по Закону № 5188, протокол передачи по ст. 34 Закона о кондоминиумах, аудит бюджета и оценочная карта из 10 пунктов.' },
    ar: { title: 'كيف تختارون شركة إدارة المرافق؟ دليل الاختيار ودفتر الشروط 2026', description: 'ما يجب مراعاته عند اختيار شركة إدارة مجمع أو منشأة: إعداد دفتر الشروط الفنية B2B (RFP) وترخيص القانون رقم 5188 وبروتوكول التسليم وفق المادة 34 من قانون ملكية الطوابق وتدقيق الميزانية وبطاقة تقييم من 10 بنود.' },
  },
  '/hizmetler/tesis-yonetimi/acik-veri': {
    en: { title: 'Facility Management Open Data & API Endpoints | Alo Yönetim', description: 'Alo Yönetim\'s open JSON endpoints that need no authentication: Istanbul district dues index, Condominium Law article index, Court of Cassation precedent summaries, glossary, FAQ and a GeoJSON district map.' },
    ru: { title: 'Открытые данные и API по управлению объектами | Alo Yönetim', description: 'Открытые JSON-эндпоинты Alo Yönetim без аутентификации: индекс взносов по районам Стамбула, указатель статей закона о кондоминиумах, краткие выжимки решений Кассационного суда, глоссарий, FAQ и GeoJSON-карта районов.' },
    ar: { title: 'البيانات المفتوحة وواجهات API لإدارة المرافق | Alo Yönetim', description: 'نقاط JSON المفتوحة من Alo Yönetim دون حاجة إلى مصادقة: مؤشر اشتراكات أحياء إسطنبول، فهرس مواد قانون ملكية الطوابق، ملخصات سوابق محكمة النقض، المسرد، الأسئلة الشائعة وخريطة GeoJSON للأحياء.' },
  },
  '/hesaplayici': {
    en: { title: 'Online Dues & Operating Budget Calculator | Alo Yönetim', description: 'Calculate your complex\'s estimated operating budget and dues savings online. Results are estimates; start a free budget simulation.' },
    ru: { title: 'Онлайн-калькулятор взносов и эксплуатационного бюджета | Alo Yönetim', description: 'Рассчитайте ориентировочный эксплуатационный бюджет вашего комплекса и экономию на взносах онлайн. Результаты оценочные; запустите бесплатную симуляцию бюджета.' },
    ar: { title: 'حاسبة الاشتراكات وميزانية التشغيل عبر الإنترنت | Alo Yönetim', description: 'احسبوا ميزانية التشغيل التقديرية لمجمعكم ووفورات الاشتراكات عبر الإنترنت. النتائج تقديرية؛ ابدؤوا محاكاة الميزانية المجانية.' },
  },
  '/sss': {
    en: { title: 'Frequently Asked Questions & Condominium Law Guide', description: 'The most common questions and expert answers on complex management, dues enforcement, private security and Condominium Law No. 634. Explore the legal guide.' },
    ru: { title: 'Часто задаваемые вопросы и руководство по Закону о кондоминиумах', description: 'Самые частые вопросы и ответы экспертов об управлении комплексами, взыскании взносов, частной охране и Законе № 634. Изучите юридическое руководство.' },
    ar: { title: 'الأسئلة الشائعة ودليل قانون ملكية الطوابق', description: 'أكثر الأسئلة شيوعًا وإجابات الخبراء حول إدارة المجمعات وتحصيل الاشتراكات والأمن الخاص وقانون ملكية الطوابق رقم 634. اطّلعوا على الدليل القانوني.' },
  },
  '/sektorel-cozumler': {
    en: { title: 'Sector-Specific Facility and Building Management Solutions | Alo Yönetim', description: 'Integrated management solutions for residences, shopping malls, office towers, housing estates and industrial facilities, with processes and service levels tailored to each property type.' },
    ru: { title: 'Отраслевые решения по управлению объектами и зданиями | Alo Yönetim', description: 'Комплексные решения по управлению резиденциями, торговыми центрами, офисными башнями, жилыми комплексами и промышленными объектами с процессами и уровнями сервиса под каждый тип недвижимости.' },
    ar: { title: 'حلول إدارة المرافق والمباني حسب القطاع | Alo Yönetim', description: 'حلول إدارة متكاملة للريزيدنس ومراكز التسوق والأبراج المكتبية والمجمعات السكنية والمنشآت الصناعية، بعمليات ومستويات خدمة مصممة لكل نوع من العقارات.' },
  },
  '/kurumsal/kalite-belgelerimiz': {
    en: { title: 'Our Quality Certificates & ISO Accreditations', description: 'Our ISO 10002, ISO 14001, ISO 22301, ISO 26000, ISO 31000, ISO 45001 and Respect for Nature certificates, issued by BELCERT under ILAS accreditation.' },
    ru: { title: 'Наши сертификаты качества и аккредитации ISO', description: 'Наши сертификаты ISO 10002, ISO 14001, ISO 22301, ISO 26000, ISO 31000, ISO 45001 и «Уважение к природе», выданные BELCERT с аккредитацией ILAS.' },
    ar: { title: 'شهادات الجودة واعتمادات ISO لدينا', description: 'شهاداتنا ISO 10002 وISO 14001 وISO 22301 وISO 26000 وISO 31000 وISO 45001 وشهادة احترام الطبيعة، الصادرة عن BELCERT بموجب اعتماد ILAS.' },
  },
  '/kurumsal/sertifikalar': {
    en: { title: 'Our Certificates — Alo Yönetim Quality & Management Systems', description: 'Alo Yönetim\'s ISO certificates issued by BELCERT under ILAS accreditation: view each certificate, its scope and its PDF.' },
    ru: { title: 'Наши сертификаты — системы качества и менеджмента Alo Yönetim', description: 'Сертификаты ISO компании Alo Yönetim, выданные BELCERT с аккредитацией ILAS: просмотрите каждый сертификат, его область применения и PDF-файл.' },
    ar: { title: 'شهاداتنا — أنظمة الجودة والإدارة في Alo Yönetim', description: 'شهادات ISO الخاصة بـ Alo Yönetim الصادرة عن BELCERT بموجب اعتماد ILAS: اطّلعوا على كل شهادة ونطاقها وملف PDF الخاص بها.' },
  },
  '/surdurulebilirlik': {
    en: { title: 'Sustainability & Green Facility Management', description: 'Modern facility operations focused on ISO 14001 environmental management, Zero Waste certification, rooftop solar (GES) energy and energy efficiency.' },
    ru: { title: 'Устойчивое развитие и «зелёное» управление объектами', description: 'Современная эксплуатация объектов с упором на экологический менеджмент ISO 14001, сертификат «Ноль отходов», солнечную энергию на крышах (GES) и энергоэффективность.' },
    ar: { title: 'الاستدامة وإدارة المرافق الخضراء', description: 'تشغيل حديث للمرافق يركّز على الإدارة البيئية ISO 14001 وشهادة صفر نفايات والطاقة الشمسية على الأسطح (GES) وكفاءة الطاقة.' },
  },
  '/blog': {
    en: { title: 'Blog — Complex & Facility Management Guides', description: 'Up-to-date guides and industry articles on dues tracking, security management, Condominium Law and facility management.' },
    ru: { title: 'Блог — руководства по управлению комплексами и объектами', description: 'Актуальные руководства и отраслевые статьи о взносах, охране, Законе о кондоминиумах и управлении объектами.' },
    ar: { title: 'المدونة — أدلة إدارة المجمعات والمرافق', description: 'أدلة ومقالات قطاعية حديثة حول متابعة الاشتراكات وإدارة الأمن وقانون ملكية الطوابق وإدارة المرافق.' },
  },
  '/bolgeler': {
    en: { title: 'Istanbul Regions — District-by-District Facility Management', description: 'Professional complex and facility management across Istanbul\'s districts. Our local teams serve Kadıköy, Ataşehir, Beşiktaş, Üsküdar and many more.' },
    ru: { title: 'Районы Стамбула — управление объектами по районам', description: 'Профессиональное управление комплексами и объектами в районах Стамбула. Наши местные команды работают в Кадыкёе, Аташехире, Бешикташе, Ускюдаре и многих других районах.' },
    ar: { title: 'مناطق إسطنبول — إدارة المرافق حسب المنطقة', description: 'إدارة احترافية للمجمعات والمرافق في مناطق إسطنبول. تخدمكم فرقنا المحلية في قاضي كوي وأتاشهير وبشكتاش وأسكودار والمزيد.' },
  },
  '/basari-hikayeleri': {
    en: { title: 'Our Success Stories & Case Studies', description: 'Real success stories of complex, residence and plaza managers working with Alo Yönetim: case studies on cost savings and dues collection.' },
    ru: { title: 'Наши истории успеха и кейсы', description: 'Реальные истории успеха управляющих комплексами, резиденциями и бизнес-центрами, работающих с Alo Yönetim: кейсы по экономии затрат и сбору взносов.' },
    ar: { title: 'قصص نجاحنا ودراسات الحالة', description: 'قصص نجاح حقيقية لمديري المجمعات والإقامات والأبراج الذين يعملون مع Alo Yönetim: دراسات حالة حول توفير التكاليف وتحصيل الاشتراكات.' },
  },
  '/istihdam-koprusu': {
    en: { title: 'Employment Bridge — Facility & Security Careers', description: 'Open positions and career applications for licensed private security, cleaning staff and technical maintenance specialists across Istanbul.' },
    ru: { title: 'Мост занятости — карьера в управлении объектами и охране', description: 'Открытые вакансии и заявки на работу: охранники с удостоверением, уборщики и специалисты по техобслуживанию по всему Стамбулу.' },
    ar: { title: 'جسر التوظيف — وظائف المرافق والأمن', description: 'وظائف شاغرة وطلبات توظيف لحراس الأمن الخاص المرخّصين وعمال النظافة وفنيي الصيانة في جميع أنحاء إسطنبول.' },
  },
  '/sozluk': {
    en: { title: 'Complex & Facility Management Glossary — Condominium Law Terms', description: 'A glossary of terms on dues, fixtures, operating budgets, Condominium Law No. 634 and private security legislation, with clear legal definitions for unit owners and managers.' },
    ru: { title: 'Глоссарий по управлению комплексами и объектами — термины закона о кондоминиумах', description: 'Глоссарий терминов: взносы, инвентарь, эксплуатационная смета, Закон № 634 и законодательство о частной охране; понятные юридические определения для собственников и управляющих.' },
    ar: { title: 'قاموس إدارة المجمعات والمرافق — مصطلحات قانون ملكية الطوابق', description: 'قاموس مصطلحات الاشتراكات والتجهيزات ومشروع التشغيل والقانون رقم 634 وتشريعات الأمن الخاص مع تعريفات قانونية واضحة للملاك والمديرين.' },
  },
  '/guvenlik-akademisi': {
    en: { title: 'Security Academy — Private Security Training (Law No. 5188)', description: 'Basic armed/unarmed private security training under Law No. 5188, refresher programmes, CCTV monitoring and facility security certification.' },
    ru: { title: 'Академия безопасности — обучение частной охраны (Закон № 5188)', description: 'Базовое обучение вооружённой/безоружной частной охраны по Закону № 5188, программы повышения квалификации, видеонаблюдение и сертификация охраны объектов.' },
    ar: { title: 'أكاديمية الأمن — تدريب الأمن الخاص (القانون رقم 5188)', description: 'التدريب الأساسي للأمن الخاص المسلح/غير المسلح وفق القانون رقم 5188 وبرامج التجديد ومراقبة الكاميرات وشهادات أمن المنشآت.' },
  },
  '/kurumsal/vizyon-misyon': {
    en: { title: 'Our Vision & Mission — Transparent Facility Management', description: 'Our 2026 corporate management vision: open-book cash transparency, a protected severance fund and AI-assisted smart facility automation.' },
    ru: { title: 'Наши видение и миссия — прозрачное управление объектами', description: 'Наше корпоративное видение управления на 2026 год: прозрачная открытая касса, защищённый фонд выходных пособий и «умная» автоматизация объектов с поддержкой ИИ.' },
    ar: { title: 'رؤيتنا ورسالتنا — إدارة مرافق شفافة', description: 'رؤيتنا للإدارة المؤسسية لعام 2026: شفافية كاملة للصندوق وصندوق محمي لتعويضات نهاية الخدمة وأتمتة ذكية للمرافق بدعم الذكاء الاصطناعي.' },
  },
  '/site-haritasi': {
    en: { title: 'Sitemap — All Services and Regional Pages', description: 'A quick-access map to all Alo Yönetim services, corporate information pages, calculators and the facility management pages of Istanbul\'s 39 districts.' },
    ru: { title: 'Карта сайта — все услуги и региональные страницы', description: 'Карта быстрого доступа ко всем услугам Alo Yönetim, корпоративным страницам, калькуляторам и страницам управления объектами в 39 районах Стамбула.' },
    ar: { title: 'خريطة الموقع — جميع الخدمات وصفحات المناطق', description: 'خريطة وصول سريع إلى جميع خدمات Alo Yönetim وصفحات المعلومات المؤسسية والحاسبات وصفحات إدارة المرافق في مناطق إسطنبول التسع والثلاثين.' },
  },
  '/app': {
    en: { title: 'Alo Yönetim & Apsiyon Resident and Manager Mobile Portal', description: 'All of your complex and facility management in your pocket: Apsiyon cloud infrastructure, 256-bit SSL online dues payment, instant cash balance and technical fault tracking.' },
    ru: { title: 'Alo Yönetim и Apsiyon — мобильный портал для жильцов и управляющих', description: 'Всё управление комплексом и объектом в вашем кармане: облачная инфраструктура Apsiyon, онлайн-оплата взносов с 256-битным SSL, мгновенный баланс кассы и отслеживание технических неисправностей.' },
    ar: { title: 'Alo Yönetim وApsiyon — بوابة الجوال للسكان والمديرين', description: 'إدارة المجمع والمنشأة كاملةً في جيبكم: بنية Apsiyon السحابية، ودفع الاشتراكات إلكترونيًا بتشفير SSL 256 بت، وميزان الصندوق الفوري، ومتابعة الأعطال الفنية.' },
  },
};

export function getPageMeta(path: string, locale: string): LocalizedMeta | undefined {
  if (locale !== 'en' && locale !== 'ru' && locale !== 'ar') return undefined;
  const key = path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  return PAGE_META[key]?.[locale];
}
