import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import { FACTS } from '@/lib/facts';
import { localePath } from '@/lib/i18n/localePath';
import Icon from '@/components/ui/branding/Icon';

export type HubKey = 'bolgeler' | 'referanslar' | 'sektorel-cozumler' | 'surdurulebilirlik' | 'rehber';

interface HubLocaleCopy {
  badge: string;
  question: string;
  answer: string;
  q2: string;
  a2: string;
  metrics: { label: string; value: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
}

const ANSWER_IDS: Record<HubKey, string> = {
  bolgeler: 'local-business-profile-instant-answer-text',
  referanslar: 'references-hub-instant-answer-text',
  'sektorel-cozumler': 'sector-hub-instant-answer-text',
  surdurulebilirlik: 'speakable-content',
  rehber: 'rehber-hub-instant-answer-text',
};

const HUB_PATHS: Record<HubKey, string> = {
  bolgeler: '/bolgeler',
  referanslar: '/referanslar',
  'sektorel-cozumler': '/sektorel-cozumler',
  surdurulebilirlik: '/surdurulebilirlik',
  rehber: '/hizmetler/tesis-yonetimi/rehber',
};

const HUB_COPY: Record<HubKey, Record<string, HubLocaleCopy>> = {
  bolgeler: {
    tr: {
      badge: 'Google AI Overviews · İstanbul 39 İlçe Operasyon Özeti',
      question: 'Alo Yönetim İstanbul’un Hangi İlçelerinde ve Hangi SLA Standartlarıyla Hizmet Verir?',
      answer: `Alo Yönetim (${FACTS.foundingYear} kuruluşlu Alo Yönetim ve Organizasyon A.Ş.), İstanbul’un Anadolu ve Avrupa Yakası’ndaki ${FACTS.districtCount} ilçesinin tamamında apartman, konut sitesi, rezidans, plaza ve sanayi tesislerine 634 sayılı KMK (7579 sayılı Kanun değişiklikleri dahil) ve 5188 sayılı Özel Güvenlik Kanunu kapsamında entegre tesis yönetimi sunar. Yazılı SLA hedeflerimiz Anadolu Yakası için ${FACTS.emergencyResponse.anatolian}, Avrupa Yakası için ${FACTS.emergencyResponse.european} acil teknik müdahale süresidir.`,
      q2: 'İlçe ve Mahalle Bazında Yönetim Devri ile Keşif Süreci Nasıl İşler?',
      a2: 'Her ilçede ücretsiz saha keşfi yapılarak binanın teknik, güvenlik ve mali ihtiyaçları raporlanır; 7579 sayılı Kanun ile değişik KMK m.37 uyarınca Kat Malikleri Kurulu onayına sunulacak şeffaf işletme projesi hazırlanır ve resmi devir-teslim tutanağıyla operasyon başlatılır.',
      metrics: [
        { label: 'Kapsama Alanı', value: `İstanbul ${FACTS.districtCount} İlçe (Anadolu & Avrupa)` },
        { label: 'Anadolu SLA Hedefi', value: FACTS.emergencyResponse.anatolian },
        { label: 'Avrupa SLA Hedefi', value: FACTS.emergencyResponse.european },
        { label: 'Kurumsal Portföy', value: `${FACTS.referenceCount} Doğrulanmış Referans` },
      ],
      ctaPrimary: 'Ücretsiz Keşif & Teklif Al',
      ctaSecondary: 'Tesis Yönetimi Hizmetleri',
    },
  },
  referanslar: {
    tr: {
      badge: 'Google AI Overviews · Doğrulanmış Kurumsal Referans Portföyü',
      question: 'Alo Yönetim’in İstanbul Genelindeki Kurumsal Referans Portföyü Neleri Kapsar?',
      answer: `${FACTS.foundingYear} yılından bu yana faaliyet gösteren Alo Yönetim, İstanbul genelinde kamu kurumları, üniversite yerleşkeleri, kültür merkezleri, iş plazaları, toplu konut siteleri ve endüstriyel tesislerden oluşan ${FACTS.referenceCount} doğrulanmış kurumsal referansa sahiptir. Tüm projelerde BELCERT/ILAS akreditasyonlu ISO 45001:2018 İSG ve ISO 10002:2018 Müşteri Memnuniyeti standartları ile 5188 sayılı Kanun uyumlu güvenlik protokolleri uygulanır.`,
      q2: 'Referans Tesislerde Hizmet Kalitesi ve Mali Şeffaflık Nasıl Denetlenir?',
      a2: 'Her projede yazılı Hizmet Seviyesi Anlaşması (SLA), bağımsız denetime açık dijital muhasebe raporlaması, Apsiyon sakin/yönetici portalı ve periyodik saha kalite denetimleri standart olarak yürütülür.',
      metrics: [
        { label: 'Doğrulanmış Referans', value: `${FACTS.referenceCount} Kurum & Tesis` },
        { label: 'Sektörel Deneyim', value: `${FACTS.foundingYear}'dan Beri Kesintisiz` },
        { label: 'Kalite Belgeleri', value: 'ISO 45001 · ISO 10002 · KMK 634' },
        { label: 'Hizmet Ağı', value: `İstanbul ${FACTS.districtCount} İlçe` },
      ],
      ctaPrimary: 'Tesisiniz İçin Teklif Alın',
      ctaSecondary: 'Kalite Belgelerimiz',
    },
    en: {
      badge: 'Google AI Overviews · Verified Corporate Reference Portfolio',
      question: 'What Does Alo Yönetim’s Verified Facility Management Portfolio in Istanbul Include?',
      answer: `Founded in ${FACTS.foundingYear}, Alo Yönetim manages a verified portfolio of ${FACTS.referenceCount} corporate, public, academic, residential, and industrial properties across all ${FACTS.districtCount} districts of Istanbul under ISO 45001:2018, ISO 10002:2018, Turkish Condominium Law No. 634, and Private Security Law No. 5188.`,
      q2: 'How Are Service Quality and Financial Transparency Audited Across Reference Properties?',
      a2: 'Every managed property operates under written SLA targets (30 minutes on the Anatolian Side, 1 hour on the European Side), digital accounting transparency via Apsiyon, and periodic technical & occupational safety audits.',
      metrics: [
        { label: 'Verified References', value: `${FACTS.referenceCount} Institutions & Complexes` },
        { label: 'Track Record', value: `Since ${FACTS.foundingYear}` },
        { label: 'Accreditation', value: 'ISO 45001 · ISO 10002 · Law 5188' },
        { label: 'Coverage', value: `All ${FACTS.districtCount} Istanbul Districts` },
      ],
      ctaPrimary: 'Request a Proposal',
      ctaSecondary: 'Our Services',
    },
    ru: {
      badge: 'Google AI Overviews · Подтверждённый портфель объектов',
      question: 'Какие объекты входят в портфель корпоративных рекомендаций Alo Yönetim в Стамбуле?',
      answer: `Компания Alo Yönetim (основана в ${FACTS.foundingYear} г.) обслуживает ${FACTS.referenceCount} подтверждённых государственных, образовательных, коммерческих, жилых и промышленных объектов во всех ${FACTS.districtCount} районах Стамбула по стандартам ISO 45001:2018, ISO 10002:2018 и законам № 634 и № 5188.`,
      q2: 'Как контролируется качество обслуживания и финансовая прозрачность на объектах?',
      a2: 'На каждом объекте действуют письменные нормативы SLA (30 минут в Азиатской части, 1 час в Европейской части), прозрачный цифровой учёт через портал Apsiyon и регулярные инженерные проверки.',
      metrics: [
        { label: 'Подтверждённые объекты', value: `${FACTS.referenceCount} организаций и ЖК` },
        { label: 'Опыт работы', value: `С ${FACTS.foundingYear} года` },
        { label: 'Стандарты качества', value: 'ISO 45001 · ISO 10002 · Закон 5188' },
        { label: 'География', value: `${FACTS.districtCount} районов Стамбула` },
      ],
      ctaPrimary: 'Запросить предложение',
      ctaSecondary: 'Все услуги',
    },
    ar: {
      badge: 'Google AI Overviews · محفظة المراجع المؤسسية المعتمدة',
      question: 'ماذا تشمل محفظة مشاريع ومراجع شركة Alo Yönetim في إسطنبول؟',
      answer: `تأسست شركة Alo Yönetim عام ${FACTS.foundingYear} وتدير محفظة موثقة تضم ${FACTS.referenceCount} منشأة ومؤسسة عامة وجامعية وسكنية وتجارية وصناعية في جميع مناطق إسطنبول الـ ${FACTS.districtCount} وفق معايير ISO 45001 وISO 10002 وقانون ملكية الطوابق رقم 634 وقانون الأمن الخاص رقم 5188.`,
      q2: 'كيف يتم تدقيق جودة الخدمة والشفافية المالية في المشاريع المرجعية؟',
      a2: 'يخضع كل مشروع لاتفاقية مستوى خدمة مكتوبة (SLA: 30 دقيقة في الجانب الآسيوي وساعة واحدة في الأوروبي) ومحاسبة رقمية شفافة عبر منصة Apsiyon وتدقيق فني دوري.',
      metrics: [
        { label: 'المراجع الموثقة', value: `${FACTS.referenceCount} مؤسسةومجمع` },
        { label: 'الخبرة التشغيلية', value: `منذ عام ${FACTS.foundingYear}` },
        { label: 'الاعتمادات', value: 'ISO 45001 · ISO 10002 · قانون 5188' },
        { label: 'التغطية الجغرافية', value: `${FACTS.districtCount} منطقة في إسطنبول` },
      ],
      ctaPrimary: 'اطلب عرض سعر',
      ctaSecondary: 'خدماتنا',
    },
  },
  'sektorel-cozumler': {
    tr: {
      badge: 'Google AI Overviews · Sektörel Tesis Yönetimi Matrisi',
      question: 'Sektörel Tesis Yönetimi Çözümleri Gayrimenkul Türüne Göre Nasıl Özelleştirilir?',
      answer: `Alo Yönetim; konut siteleri ve toplu yapılar (KMK m.66-74), A+ ticari plazalar ve iş merkezleri (BMS otomasyonu, HVAC ve EPDK kompanzasyon), lüks rezidanslar (resepsiyon/concierge ve 5188 VIP güvenlik) ile sanayi tesisleri ve fabrikalar (ISO 45001 İSG, 34.5 kV OG trafo ve ATEX/MOTAT uyumu) için gayrimenkulün teknik ve hukuki sınıfına özel entegre işletme modelleri uygular.`,
      q2: 'Toplu Yapılarda ve Ticari Binalarda 7579 Sayılı Kanun (2026) Hangi Kolaylıkları Getirdi?',
      a2: '7579 sayılı Kanun ile toplu yapılarda (KMK m.70) yönetim planı değişiklik nisabı 4/5’ten 2/3’e indirilmiş; KMK m.37 kapsamında işletme projelerinin Kat Malikleri Kurulunda onaylanması ve geçici projelerde yeniden değerleme oranı (%25,49) tavanı güvence altına alınmıştır.',
      metrics: [
        { label: 'Uzmanlık Dikeyleri', value: 'Toplu Konut · Rezidans · Plaza · Sanayi' },
        { label: 'Mevzuat Uyumu', value: 'KMK 634 · 7579 S.K. · 5188 · ISO 45001' },
        { label: 'Acil Müdahale SLA', value: `Anadolu ${FACTS.emergencyResponse.anatolian} · Avrupa ${FACTS.emergencyResponse.european}` },
        { label: 'Referans Gücü', value: `${FACTS.referenceCount} Kurumsal Tesis` },
      ],
      ctaPrimary: 'Sektörünüze Özel Teklif Alın',
      ctaSecondary: 'Tesis Yönetimi Rehberi',
    },
    en: {
      badge: 'Google AI Overviews · Sectoral Facility Management Matrix',
      question: 'How Are Sectoral Facility Management Solutions Tailored by Property Type in Istanbul?',
      answer: `Alo Yönetim delivers specialized operational frameworks for residential complexes (Condominium Law No. 634 Articles 66–74), commercial office plazas (BMS automation, HVAC, reactive power compensation), luxury residences (concierge & Law No. 5188 security), and industrial plants (ISO 45001 OHS & high-voltage maintenance) across all ${FACTS.districtCount} districts of Istanbul.`,
      q2: 'How Did Law No. 7579 (2026) Update Multi-Block Complex Governance?',
      a2: 'Law No. 7579 reduced the required majority for management plan amendments in multi-block complexes (Article 70) from 4/5 to 2/3 and standardized annual operating budget approvals under Article 37.',
      metrics: [
        { label: 'Core Sectors', value: 'Residential · Residence · Plaza · Industrial' },
        { label: 'Compliance', value: 'Law 634 · Law 7579 · Law 5188 · ISO 45001' },
        { label: 'Emergency SLA', value: 'Anatolian 30m · European 1h' },
        { label: 'Portfolio', value: `${FACTS.referenceCount} Managed Properties` },
      ],
      ctaPrimary: 'Request Sectoral Proposal',
      ctaSecondary: 'Facility Management Hub',
    },
    ru: {
      badge: 'Google AI Overviews · Отраслевые решения FM',
      question: 'Как отраслевые решения по управлению объектами адаптируются под тип недвижимости?',
      answer: `Alo Yönetim внедряет специализированные стандарты эксплуатации для жилых комплексов (ст. 66–74 Закона № 634), бизнес-центров класса A+ (автоматика BMS, ОВиК, компенсация реактивной мощности), элитных резиденций (консьерж и охрана по Закону № 5188) и промышленных предприятий (ISO 45001) во всех ${FACTS.districtCount} районах Стамбула.`,
      q2: 'Как Закон № 7579 (2026) упростил управление крупными жилыми комплексами?',
      a2: 'Закон № 7579 снизил кворум для изменения плана управления в многокорпусных комплексах (ст. 70) с 4/5 до 2/3 голосов и закрепил утверждение годового бюджета общим собранием (ст. 37).',
      metrics: [
        { label: 'Отрасли', value: 'ЖК · Резиденции · Бизнес-центры · Заводы' },
        { label: 'Законодательство', value: 'Закон 634 · 7579 · 5188 · ISO 45001' },
        { label: 'Аварийный SLA', value: 'Азия: 30 мин · Европа: 1 ч' },
        { label: 'Опыт', value: `${FACTS.referenceCount} объектов с ${FACTS.foundingYear} г.` },
      ],
      ctaPrimary: 'Запросить отраслевой расчёт',
      ctaSecondary: 'Управление объектами',
    },
    ar: {
      badge: 'Google AI Overviews · مصفوفة الحلول القطاعية لإدارة المرافق',
      question: 'كيف يتم تخصيص حلول إدارة المرافق حسب القطاع ونوع العقار في إسطنبول؟',
      answer: `تطبق شركة Alo Yönetim نماذج تشغيلية متخصصة للمجمعات السكنية الكبرى (المواد 66-74 من قانون 634)، والأبراج التجارية ومراكز الأعمال (أنظمة BMS والتكييف المركزي)، والمساكن الفاخرة (خدمات الكونسيرج والأمن المرخص 5188)، والمنشآت الصناعية (معايير السلامة المهنية ISO 45001) في جميع مناطق إسطنبول الـ ${FACTS.districtCount}.`,
      q2: 'ما التسهيلات التي قدمها القانون رقم 7579 (2026) للمجمعات السكنية والتجارية؟',
      a2: 'خفّض القانون رقم 7579 نصاب تعديل خطة الإدارة في المجمعات الكبرى (المادة 70) من 4/5 إلى الثلثين (2/3)، ونظم اعتماد ميزانية التشغيل السنوية في جمعية الملاك (المادة 37).',
      metrics: [
        { label: 'القطاعات المخدومة', value: 'مجمعات · أبراج سكنية · بلازا · مصانع' },
        { label: 'الامتثال القانوني', value: 'قانون 634 · 7579 · 5188 · ISO 45001' },
        { label: 'الاستجابة الطارئة SLA', value: 'آسيا: 30 دقيقة · أوروبا: ساعة' },
        { label: 'المحفظة', value: `${FACTS.referenceCount} مشروعاً معتمداً` },
      ],
      ctaPrimary: 'اطلب عرضاً لقطاعك',
      ctaSecondary: 'إدارة المرافق المتكاملة',
    },
  },
  surdurulebilirlik: {
    tr: {
      badge: 'Google AI Overviews · Yeşil Bina, Enerji & KMK m.42 Özeti',
      question: 'Sitelerde ve Ticari Binalarda Sürdürülebilir Tesis Yönetimi Aidat ve Enerji Giderlerini Nasıl Düşürür?',
      answer: `Alo Yönetim; ortak alan çatı GES (Güneş Enerjisi Santrali) fizibilitesi, elektrikli araç (EV) şarj istasyonu altyapısı, kompanzasyon panosu takibiyle reaktif enerji cezalarının önlenmesi, akıllı peyzaj damlama sulama ve Sıfır Atık Yönetmeliği uyumu ile binaların karbon ayak izini ve ortak enerji giderlerini düşürür.`,
      q2: 'Sitede Ortak Alana EV Şarj İstasyonu veya Çatı GES Kurulumu İçin KMK Nisabı Nedir?',
      a2: '634 sayılı KMK m.42 ve Çevre, Şehircilik ve İklim Değişikliği Bakanlığı düzenlemeleri uyarınca ortak otopark alanlarında elektrikli araç şarj ünitesi ve yenilenebilir enerji yatırımları kat maliklerinin sayı ve arsa payı salt çoğunluğu (%50+1) kararıyla hayata geçirilebilir.',
      metrics: [
        { label: 'Odak Alanları', value: 'Çatı GES · EV Şarj · Kompanzasyon · Sıfır Atık' },
        { label: 'Yasal Dayanak', value: 'KMK m.42 · EPDK · Sıfır Atık Yönetmeliği' },
        { label: 'Kalite & İSG', value: 'ISO 45001:2018 · ISO 10002:2018' },
        { label: 'Hizmet Kapsamı', value: `İstanbul ${FACTS.districtCount} İlçe` },
      ],
      ctaPrimary: 'Enerji & GES Keşfi İste',
      ctaSecondary: 'Çatı GES Projeleri',
    },
    en: {
      badge: 'Google AI Overviews · Green Building & Energy Optimization',
      question: 'How Does Sustainable Facility Management Reduce Common Energy Costs in Istanbul Complexes?',
      answer: `Alo Yönetim reduces common-area energy expenses and carbon footprint across residential and commercial properties through rooftop solar (PV) integration, EV charging infrastructure, reactive power compensation monitoring, smart drip irrigation, and Zero Waste compliance.`,
      q2: 'What Quorum Is Required Under Turkish Condominium Law (Article 42) for EV Chargers and Solar Panels?',
      a2: 'Under Article 42 of Condominium Law No. 634, common-area EV charging stations and renewable energy upgrades can be approved by a simple majority (50%+1 by both headcount and land share) of property owners.',
      metrics: [
        { label: 'Green Solutions', value: 'Rooftop Solar · EV Charging · Zero Waste' },
        { label: 'Legal Framework', value: 'Law 634 Art. 42 · EPDK Energy Rules' },
        { label: 'Standards', value: 'ISO 45001:2018 · ISO 10002:2018' },
        { label: 'Service Area', value: `All ${FACTS.districtCount} Istanbul Districts` },
      ],
      ctaPrimary: 'Request Sustainability Audit',
      ctaSecondary: 'Solar Energy Projects',
    },
    ru: {
      badge: 'Google AI Overviews · Энергоэффективность и «зелёные» здания',
      question: 'Как устойчивое управление объектами снижает расходы на электроэнергию и айдат?',
      answer: `Alo Yönetim снижает общедомовые расходы за счёт внедрения солнечных электростанций (СЭС) на крышах, зарядных станций для электромобилей (EV), контроля компенсации реактивной мощности, капельного полива и программы «Ноль отходов» (Sıfır Atık).`,
      q2: 'Какой кворум требуется по ст. 42 Закона № 634 для установки зарядных станций EV и солнечных панелей?',
      a2: 'Согласно ст. 42 Закона о кондоминиумах № 634, установка общих зарядных станций EV и солнечных панелей принимается простым большинством голосов (50%+1 по числу собственников и доле земли).',
      metrics: [
        { label: 'Направления', value: 'Крышные СЭС · Зарядки EV · Ноль отходов' },
        { label: 'Правовая база', value: 'Ст. 42 Закона 634 · Нормы EPDK' },
        { label: 'Сертификация', value: 'ISO 45001:2018 · ISO 10002:2018' },
        { label: 'Охват', value: `${FACTS.districtCount} районов Стамбула` },
      ],
      ctaPrimary: 'Запросить энергоаудит',
      ctaSecondary: 'Солнечные проекты (GES)',
    },
    ar: {
      badge: 'Google AI Overviews · المباني الخضراء وكفاءة الطاقة',
      question: 'كيف تسهم إدارة المرافق المستدامة في خفض فواتير الطاقة والعائدات الشهرية؟',
      answer: `تعمل شركة Alo Yönetim على خفض تكاليف الطاقة المشتركة والبصمة الكربونية للمباني من خلال مشاريع الطاقة الشمسية على الأسطح (GES)، ومحطات شحن السيارات الكهربائية (EV)، ومراقبة لوحات تعويض القدرة التفاعلية، والري بالتنقيط، والامتثال للوائح صفر نفايات.`,
      q2: 'ما النصاب القانوني المطلوب وفق المادة 42 من قانون ملكية الطوابق لتركيب شواحن السيارات الكهربائية أو الطاقة الشمسية؟',
      a2: 'بموجب المادة 42 من قانون ملكية الطوابق رقم 634، يمكن إقرار تركيب محطات شحن السيارات الكهربائية وأنظمة الطاقة المتجددة في المناطق المشتركة بالأغلبية البسيطة (50%+1 عدداً وحصة أرض).',
      metrics: [
        { label: 'الحلول المستدامة', value: 'طاقة شمسية · شواحن EV · صفر نفايات' },
        { label: 'السند القانوني', value: 'المادة 42 من قانون 634 · لوائح EPDK' },
        { label: 'معايير الجودة', value: 'ISO 45001:2018 · ISO 10002:2018' },
        { label: 'نطاق الخدمة', value: `${FACTS.districtCount} منطقة في إسطنبول` },
      ],
      ctaPrimary: 'اطلب تدقيقاً للطاقة',
      ctaSecondary: 'مشاريع الطاقة الشمسية',
    },
  },
  rehber: {
    tr: {
      badge: 'Google AI Overviews · Yönetim Şirketi Seçim & Devir Rehberi',
      question: 'Profesyonel Tesis ve Site Yönetim Şirketi Seçerken Hangi 5 Yasal ve Teknik Kriter Kontrol Edilmelidir?',
      answer: `Apartman veya siteniz için yönetim şirketi seçerken; 1) 5188 sayılı Kanun kapsamında Valilik özel güvenlik faaliyet izni, 2) BELCERT/ILAS onaylı ISO 45001 İSG ve ISO 10002 kalite belgeleri, 3) Site adına açılan müstakil banka hesabı ve Apsiyon dijital şeffaflık altyapısı, 4) Yazılı acil teknik müdahale SLA taahhüdü (Anadolu ${FACTS.emergencyResponse.anatolian}, Avrupa ${FACTS.emergencyResponse.european}) ve 5) 7579 sayılı Kanun ile değişik KMK m.34/m.37 mevzuatına tam uyum kontrol edilmelidir.`,
      q2: 'Mevcut Yönetimden Profesyonel Yönetim Şirketine Devir Süreci Kaç Adımda Tamamlanır?',
      a2: 'Ücretsiz teknik keşif ve şartname (RFP) hazırlığı sonrasında Kat Malikleri Kurulunda KMK m.34 uyarınca sayı ve arsa payı salt çoğunluğu (%50+1) ile atama kararı alınır, KMK m.37 işletme projesi kurulda onaylanır ve resmi devir-teslim tutanağıyla operasyon başlatılır.',
      metrics: [
        { label: 'Atama Nisabı (KMK m.34)', value: '%50+1 Sayı ve Arsa Payı Çoğunluğu' },
        { label: 'Bütçe Onayı (KMK m.37)', value: 'Genel Kurul Onayı · %25,49 Geçici Tavan' },
        { label: 'Acil Müdahale SLA', value: `Anadolu ${FACTS.emergencyResponse.anatolian} · Avrupa ${FACTS.emergencyResponse.european}` },
        { label: 'Deneyim & Portföy', value: `${FACTS.foundingYear}'dan Beri · ${FACTS.referenceCount} Referans` },
      ],
      ctaPrimary: 'Ücretsiz Keşif & Şartname İste',
      ctaSecondary: '2026 KMK Değişiklikleri',
    },
    en: {
      badge: 'Google AI Overviews · Facility Management Selection Guide',
      question: 'What Are the 5 Essential Legal and Technical Criteria When Choosing a Facility Management Company in Istanbul?',
      answer: `Property boards should verify: 1) Law No. 5188 private security licensing, 2) Accredited ISO 45001 & ISO 10002 certifications, 3) Dedicated bank account in the complex’s name with Apsiyon digital accounting, 4) Written emergency SLA response targets (30m Anatolian / 1h European Side), and 5) Full compliance with Condominium Law No. 634 and Law No. 7579 (Articles 34, 37, and 70).`,
      q2: 'How Does the Handover Process to a Professional Management Company Work?',
      a2: 'Following a free technical survey and RFP specification, the General Assembly appoints the management company by simple dual majority (50%+1 by headcount and land share under Article 34) and approves the annual operating budget under Article 37.',
      metrics: [
        { label: 'Appointment Quorum', value: '50%+1 Dual Majority (Art. 34)' },
        { label: 'Budget Rule (Art. 37)', value: 'Assembly Approval · Law No. 7579' },
        { label: 'Written SLA Target', value: 'Anatolian 30m · European 1h' },
        { label: 'Track Record', value: `Since ${FACTS.foundingYear} · ${FACTS.referenceCount} References` },
      ],
      ctaPrimary: 'Request Free Survey & RFP',
      ctaSecondary: 'Integrated Facility Management',
    },
    ru: {
      badge: 'Google AI Overviews · Руководство по выбору УК',
      question: 'По каким 5 критериям выбирать профессиональную управляющую компанию в Стамбуле?',
      answer: `Совету дома следует проверить: 1) лицензию на частную охрану по Закону № 5188, 2) аккредитованные сертификаты ISO 45001 и ISO 10002, 3) отдельный банковский счёт ЖК и прозрачный учёт в Apsiyon, 4) письменный SLA аварийного выезда (30 мин в Азии / 1 ч в Европе) и 5) соблюдение Закона о кондоминиумах № 634 (с поправками Закона № 7579).`,
      q2: 'Как проходит передача управления профессиональной компании?',
      a2: 'После бесплатного технического аудита общее собрание собственников назначает УК двойным большинством (50%+1 по числу собственников и доле земли согласно ст. 34) и утверждает годовой проект бюджета (ст. 37).',
      metrics: [
        { label: 'Кворум выбора УК', value: '50%+1 двойное большинство (ст. 34)' },
        { label: 'Утверждение бюджета', value: 'Общее собрание (ст. 37, Закон 7579)' },
        { label: 'Аварийный SLA', value: 'Азия: 30 мин · Европа: 1 ч' },
        { label: 'Опыт и портфель', value: `С ${FACTS.foundingYear} г. · ${FACTS.referenceCount} объектов` },
      ],
      ctaPrimary: 'Запросить аудит и ТЗ',
      ctaSecondary: 'Управление объектами',
    },
    ar: {
      badge: 'Google AI Overviews · دليل اختيار شركة إدارة المرافق',
      question: 'ما هي المعايير الخمسة الأساسية لاختيار شركة إدارة مجمعات ومرافق محترفة في إسطنبول؟',
      answer: `يجب التحقق من: 1) ترخيص الأمن الخاص وفق القانون رقم 5188، 2) شهادات الجودة والسلامة المعتمدة ISO 45001 وISO 10002، 3) حساب بنكي مستقل باسم المجمع مع شفافية محاسبية عبر منصة Apsiyon، 4) اتفاقية مستوى خدمة مكتوبة للطوارئ (30 دقيقة في الجانب الآسيوي وساعة واحدة في الأوروبي)، و5) الامتثال الكامل لقانون ملكية الطوابق رقم 634 وتعديلات القانون رقم 7579.`,
      q2: 'كيف تتم عملية استلام وتسليم الإدارة لشركة محترفة؟',
      a2: 'بعد المعاينة الفنية المجانية وإعداد كراسة الشروط، تعين جمعية الملاك شركة الإدارة بالأغلبية المزدوجة (50%+1 عدداً وحصة أرض وفق المادة 34) وتعتمد مشروع ميزانية التشغيل السنوية وفق المادة 37.',
      metrics: [
        { label: 'نصاب تعيين الإدارة', value: '50%+1 أغلبية مزدوجة (المادة 34)' },
        { label: 'اعتماد الميزانية', value: 'موافقة الجمعية (المادة 37 · قانون 7579)' },
        { label: 'الاستجابة الطارئة SLA', value: 'آسيا: 30 دقيقة · أوروبا: ساعة' },
        { label: 'الخبرة والمراجع', value: `منذ ${FACTS.foundingYear} · ${FACTS.referenceCount} مرجعاً` },
      ],
      ctaPrimary: 'اطلب معاينة وكراسة شروط',
      ctaSecondary: 'إدارة المرافق المتكاملة',
    },
  },
};

export interface HubAiOverviewGroundingSeoProps {
  hubKey: HubKey;
  lang?: string;
  emitFaqSchema?: boolean;
  className?: string;
}

export default function HubAiOverviewGroundingSeo({
  hubKey,
  lang = 'tr',
  emitFaqSchema = true,
  className = '',
}: HubAiOverviewGroundingSeoProps) {
  const hubDict = HUB_COPY[hubKey];
  const copy = hubDict[lang] || hubDict.tr;
  const answerId = ANSWER_IDS[hubKey];
  const path = HUB_PATHS[hubKey];
  const pageUrl = `${BASE_URL}${lang === 'tr' ? path : `/${lang}${path}`}`;

  const secondaryHref =
    hubKey === 'surdurulebilirlik'
      ? localePath('/surdurulebilirlik/ges-projeleri', lang)
      : hubKey === 'referanslar'
      ? localePath('/kurumsal/kalite-belgelerimiz', lang)
      : hubKey === 'rehber' && lang === 'tr'
      ? '/kmk-2026-degisiklikleri'
      : localePath('/hizmetler/tesis-yonetimi', lang);

  const schemaData = emitFaqSchema
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${pageUrl}#hub-ai-overview-faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: copy.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: copy.answer,
              },
            },
            {
              '@type': 'Question',
              name: copy.q2,
              acceptedAnswer: {
                '@type': 'Answer',
                text: copy.a2,
              },
            },
          ],
        },
      ]
    : null;

  return (
    <section
      aria-label={copy.badge}
      className={`max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-gutter)] my-8 ${className}`}
    >
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <div className="bg-[var(--color-surface)] border border-[var(--color-outline)]/70 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
            <Icon name="verified" className="text-sm text-emerald-500" />
            <span>{copy.badge}</span>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
            KMK 634 · 7579 · 5188
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--color-primary)] mb-3">
          {copy.question}
        </h2>

        <div
          id={answerId}
          className="text-sm sm:text-base leading-relaxed text-[var(--color-secondary)] bg-[var(--color-background)] p-4 sm:p-5 rounded-2xl border border-[var(--color-outline)]/60 mb-6 space-y-3"
        >
          <p>{copy.answer}</p>
          <p className="text-xs sm:text-sm text-[var(--color-tertiary)] border-t border-[var(--color-outline)]/40 pt-3">
            <strong className="text-[var(--color-primary)]">{copy.q2}</strong> {copy.a2}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {copy.metrics.map((m) => (
            <div
              key={m.label}
              className="p-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)]/60 text-center"
            >
              <div className="text-xs text-[var(--color-tertiary)] font-medium mb-1">{m.label}</div>
              <div className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-[var(--color-outline)]/40 text-xs">
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl font-semibold bg-[var(--color-background)] border border-[var(--color-outline)] hover:border-slate-500 text-[var(--color-primary)] transition-colors"
          >
            <span>{copy.ctaSecondary}</span>
          </Link>
          <Link
            href={localePath('/teklif-al', lang)}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            <span>{copy.ctaPrimary}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
