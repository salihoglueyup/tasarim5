import { BASE_URL } from '@/lib/seo';

export interface VoiceSearchQAItem {
  id: string;
  queryIntent: 'informational' | 'commercial' | 'legal' | 'transactional';
  voiceQuery: string;
  speakableAnswer: string;
  detailedExplanation: string;
  legalReference?: string;
  targetKeyword: string;
}

export interface VoiceKnowledgeGraph {
  totalQuestionsCount: number;
  lastUpdated: string;
  canonicalSource: string;
  appliedIntent?: string;
  questions: VoiceSearchQAItem[];
  speakableSchemaJsonLd: Record<string, any>;
}

/**
 * Tesis Yönetimi Sesli Arama (Voice Search) ve Konuşma Tabanlı AI Yanıt Motoru.
 * 
 * Google Featured Snippet (0. Sıra), Sesli Asistanlar (Google Assistant, Siri)
 * ve LLM Arama Motorları için optimize edilmiş doğrudan, net ve otoriter yanıtlar üretir.
 */
export function buildFacilityVoiceKnowledge(lang: string = 'tr', filterIntent?: string): VoiceKnowledgeGraph {
  const langPrefix = lang === 'tr' ? '' : `/${lang}`;
  const canonicalSource = `${BASE_URL}${langPrefix}/hizmetler/tesis-yonetimi`;

  const trQuestions: VoiceSearchQAItem[] = [
    {
      id: 'kmk-yonetici-aidat-muafiyeti',
      queryIntent: 'legal',
      voiceQuery: 'Site yöneticisi aidat öder mi?',
      speakableAnswer: 'Kat Mülkiyeti Kanunu Madde 40 uyarınca yönetim planında aksine hüküm yoksa yönetici işletme giderlerinin yarısını ödemekten muaf tutulabilir. Profesyonel yönetim şirketlerinde ise tüm malikler aidatını tam öder.',
      detailedExplanation: '634 Sayılı Kat Mülkiyeti Kanunu (KMK) 40. maddesine göre kat malikleri arasından seçilen yöneticinin genel yönetim giderlerine katılma payı kararlaştırılabilir. Profesyonel dış yönetim firmalarında bağımsız malik hakları korunarak şeffaf muhasebe sağlanır.',
      legalReference: '634 Sayılı KMK Madde 40',
      targetKeyword: 'site yöneticisi aidat öder mi',
    },
    {
      id: 'kmk-isletme-projesi-itiraz-suresi',
      queryIntent: 'legal',
      voiceQuery: 'İşletme projesine kaç günde itiraz edilir?',
      speakableAnswer: 'İşletme projesine tebliğ tarihinden itibaren 7 gün içinde yazılı olarak itiraz edilmelidir. 7 gün içinde itiraz edilmeyen işletme projesi kesinleşir ve icra takibine esas belge niteliği kazanır.',
      detailedExplanation: 'KMK Madde 37 gereğince yöneticinin hazırladığı bütçe maliklere taahhütlü mektup veya imza karşılığı tebliğ edilir. Süresinde itiraz edilmezse bütçe kesinleşir ve İcra İflas Kanunu 68. madde uyarınca ilamsız icra takibine başlanabilir.',
      legalReference: '634 Sayılı KMK Madde 37',
      targetKeyword: 'işletme projesine itiraz süresi',
    },
    {
      id: 'kmk-gecikme-tazminati-orani',
      queryIntent: 'legal',
      voiceQuery: 'Gününde ödenmeyen aidata ne kadar gecikme faizi uygulanır?',
      speakableAnswer: 'Gününde ödenmeyen aidat ve avans borçları için Kat Mülkiyeti Kanunu Madde 20 uyarınca aylık yüzde 5 gecikme tazminatı uygulanır.',
      detailedExplanation: 'Gecikme tazminatı yasal faizden bağımsız olarak kanun gereği zorunludur. Yönetim kurulu veya profesyonel yönetici ödeme yapmayan malik hakkında icra takibi ve dava açma hakkına sahiptir.',
      legalReference: '634 Sayılı KMK Madde 20/c',
      targetKeyword: 'aidat gecikme faizi oranı',
    },
    {
      id: 'iso-41001-tesis-yonetimi-nedir',
      queryIntent: 'informational',
      voiceQuery: 'Tesis yönetiminde ISO 41001 standardı nedir?',
      speakableAnswer: 'ISO 41001 uluslararası entegre tesis yönetim standardıdır. Tesislerde teknik bakım, enerji verimliliği, güvenlik ve yaşam kalitesini ölçülebilir KPI standartlarına bağlar.',
      detailedExplanation: 'Alo Yönetim, ISO 41001:2018 sertifikası ile tesislerde yüzde 30 maliyet tasarrufu, 30 dakikanın altında acil teknik müdahale ve 7/24 şeffaf dijital denetim sunar.',
      legalReference: 'ISO 41001:2018 Facility Management System',
      targetKeyword: 'iso 41001 tesis yönetimi',
    },
    {
      id: 'ozel-guvenlik-5188-zorunlulugu',
      queryIntent: 'commercial',
      voiceQuery: 'Sitelerde özel güvenlik çalıştırmak için hangi izinler gerekir?',
      speakableAnswer: 'Sitelerde özel güvenlik personeli istihdam etmek için Valilik Özel Güvenlik Komisyonu izni ve 5188 sayılı kanun kapsamında lisanslı güvenlik şirketi partnerliği zorunludur.',
      detailedExplanation: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun gereğince kimlik kartı olmayan personelin güvenlik unvanıyla çalıştırılması yasal suçtur. Alo Yönetim 5188 lisanslı güvenlik partnerliği ile yasal güvence sağlar.',
      legalReference: '5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun',
      targetKeyword: 'site özel güvenlik izinleri 5188',
    },
    {
      id: 'profesyonel-tesis-yonetimi-avantajlari',
      queryIntent: 'transactional',
      voiceQuery: 'Neden profesyonel tesis yönetim şirketi tercih edilmelidir?',
      speakableAnswer: 'Profesyonel tesis yönetimi komşuluk ilişkilerini zedelemeden aidat tahsilatını yüzde 98 üzerine çıkarır, toplu satın alma gücüyle bütçede yüzde 30 tasarruf sağlar ve hukuki riskleri sıfırlar.',
      detailedExplanation: 'Alo Yönetim, KMK uzmanı hukukçular, 5188 lisanslı güvenlik şefleri ve sertifikalı teknik ekiplerle binaları kurumsal standartlarda yöneterek gayrimenkul değerini artırır.',
      legalReference: 'KMK Madde 34 Yönetici Seçimi',
      targetKeyword: 'profesyonel tesis yönetimi avantajları',
    },
  ];

  const enQuestions: VoiceSearchQAItem[] = [
    {
      id: 'kmk-yonetici-aidat-muafiyeti-en',
      queryIntent: 'legal',
      voiceQuery: 'Does a property manager pay dues in residential complexes?',
      speakableAnswer: 'Under Property Ownership Law Article 40, unless specified otherwise in the management plan, an elected manager may be exempt from half of common operating expenses. With professional management firms, all unit owners pay in full.',
      detailedExplanation: 'According to Article 40 of Law No. 634, an elected manager may receive compensation or partial dues exemption. Professional management firms guarantee full transparency and fair dues accounting for all independent unit owners.',
      legalReference: 'Property Law No. 634 Art. 40',
      targetKeyword: 'does property manager pay dues',
    },
    {
      id: 'kmk-isletme-projesi-itiraz-suresi-en',
      queryIntent: 'legal',
      voiceQuery: 'How many days to appeal against an annual operating budget?',
      speakableAnswer: 'An operating budget must be appealed in writing within 7 days of official notification. Uncontested budgets become legally finalized and enforceable under debt recovery laws.',
      detailedExplanation: 'Under Article 37, the annual operating project must be notified to unit owners against signature or via registered mail. If not objected to within 7 days, it acquires the status of a binding legal title.',
      legalReference: 'Property Law No. 634 Art. 37',
      targetKeyword: 'operating budget appeal period',
    },
    {
      id: 'kmk-gecikme-tazminati-orani-en',
      queryIntent: 'legal',
      voiceQuery: 'What is the late penalty interest rate for unpaid property dues?',
      speakableAnswer: 'Under Property Ownership Law Article 20, unpaid dues and advance payments accrue a statutory delay compensation of 5% per month.',
      detailedExplanation: 'Statutory delay compensation of 5% monthly accrues automatically under law. Professional management can initiate fast-track execution proceedings without a notary notice.',
      legalReference: 'Property Law No. 634 Art. 20/c',
      targetKeyword: 'dues late payment interest rate',
    },
    {
      id: 'iso-41001-tesis-yonetimi-nedir-en',
      queryIntent: 'informational',
      voiceQuery: 'What is the ISO 41001 standard in facility management?',
      speakableAnswer: 'ISO 41001 is the international facility management benchmark standard governing technical maintenance, energy efficiency, security, and quality of life.',
      detailedExplanation: 'Alo Management delivers 30% cost savings, under 30 minutes emergency technical response, and 24/7 transparent digital reporting with accredited ISO 41001:2018 certification.',
      legalReference: 'ISO 41001:2018 Facility Management Standard',
      targetKeyword: 'iso 41001 facility management',
    },
    {
      id: 'ozel-guvenlik-5188-zorunlulugu-en',
      queryIntent: 'commercial',
      voiceQuery: 'What permits are required to employ security personnel in residential complexes?',
      speakableAnswer: 'Deploying security guards requires official authorization from the Governorate Security Commission and partnership with an Interior Ministry licensed security provider.',
      detailedExplanation: 'Under Law No. 5188, employing guards without official certification is illegal. Alo Management ensures full regulatory compliance with accredited security operations.',
      legalReference: 'Law No. 5188 on Private Security Services',
      targetKeyword: 'residential complex security permits 5188',
    },
    {
      id: 'profesyonel-tesis-yonetimi-avantajlari-en',
      queryIntent: 'transactional',
      voiceQuery: 'Why choose a professional facility management company in Istanbul?',
      speakableAnswer: 'Professional management boosts collection rates above 98%, lowers operating expenses by 30% through bulk purchasing power, and eliminates legal liabilities.',
      detailedExplanation: 'Alo Management deploys legal advisors, 5188 licensed security supervisors, and certified technicians to elevate living standards and enhance asset valuation.',
      legalReference: 'Property Law Art. 34',
      targetKeyword: 'professional facility management advantages',
    },
  ];

  const ruQuestions: VoiceSearchQAItem[] = [
    {
      id: 'kmk-yonetici-aidat-muafiyeti-ru',
      queryIntent: 'legal',
      voiceQuery: 'Обязан ли управляющий жилым комплексом платить ежемесячные взносы?',
      speakableAnswer: 'Согласно Закону о кондоминиумах статья 40, если иное не указано в плане управления, управляющий может быть освобожден от половины общих расходов. В профессиональных управляющих компаниях все собственники платят взносы в полном объеме.',
      detailedExplanation: 'Согласно статье 40 Закона 634, избранный управляющий может получить освобождение от взносов. Профессиональная компания Alo Management обеспечивает независимый учет и равные права всех собственников.',
      legalReference: 'Закон KMK № 634 Статья 40',
      targetKeyword: 'управляющий платит взносы стамбул',
    },
    {
      id: 'kmk-isletme-projesi-itiraz-suresi-ru',
      queryIntent: 'legal',
      voiceQuery: 'В течение какого срока можно обжаловать годовой бюджет жилого комплекса?',
      speakableAnswer: 'Письменное возражение против бюджета должно быть подано в течение 7 дней с момента официального уведомления.',
      detailedExplanation: 'В соответствии со статьей 37 Закона KMK, проект бюджета вручается под подпись. При отсутствии возражений в 7-дневный срок бюджет вступает в силу.',
      legalReference: 'Закон KMK № 634 Статья 37',
      targetKeyword: 'срок обжалования бюджета айдат',
    },
    {
      id: 'kmk-gecikme-tazminati-orani-ru',
      queryIntent: 'legal',
      voiceQuery: 'Какой штраф начисляется за просрочку уплаты коммунальных взносов айдат?',
      speakableAnswer: 'Согласно статье 20 Закона KMK, за каждый месяц просрочки платежей айдат начисляется законная пеня в размере 5 процентов.',
      detailedExplanation: 'Пеня начисляется в силу закона автоматически. Управляющая компания имеет право немедленно инициировать процедуру принудительного взыскания.',
      legalReference: 'Закон KMK № 634 Статья 20',
      targetKeyword: 'штраф просрочка айдат турция',
    },
    {
      id: 'iso-41001-tesis-yonetimi-nedir-ru',
      queryIntent: 'informational',
      voiceQuery: 'Что представляет собой стандарт управления объектами ISO 41001?',
      speakableAnswer: 'ISO 41001 — это международный стандарт комплексного управления объектами недвижимости, энергоэффективностью и охраной.',
      detailedExplanation: 'Alo Management гарантирует экономию бюджета на 30%, прибытие технической службы менее чем за 30 минут и прозрачную отчетность по ISO 41001:2018.',
      legalReference: 'Стандарт ISO 41001:2018',
      targetKeyword: 'iso 41001 управление недвижимостью',
    },
    {
      id: 'ozel-guvenlik-5188-zorunlulugu-ru',
      queryIntent: 'commercial',
      voiceQuery: 'Каковы требования к лицензированию охраны в жилых комплексах Турции?',
      speakableAnswer: 'Для работы физической охраны в жилых комплексах требуется официальное разрешение Губернаторства и лицензия по Закону 5188.',
      detailedExplanation: 'Работа нелицензированных охранников без служебного удостоверения запрещена законом. Alo Management предоставляет полностью сертифицированную охрану 5188.',
      legalReference: 'Закон № 5188 об охранной деятельности',
      targetKeyword: 'охрана жилого комплекса турция 5188',
    },
    {
      id: 'profesyonel-tesis-yonetimi-avantajlari-ru',
      queryIntent: 'transactional',
      voiceQuery: 'В чем преимущества профессионального управления недвижимостью в Стамбуле?',
      speakableAnswer: 'Профессиональное управление обеспечивает сбор взносов свыше 98%, снижает расходы комплекса на 30% и устраняет юридические споры между соседями.',
      detailedExplanation: 'Компания Alo Management привлекает юристов, лицензированную охрану 5188 и сертифицированных инженеров для поддержания высокой стоимости недвижимости.',
      legalReference: 'Закон KMK Статья 34',
      targetKeyword: 'преимущества управляющей компании стамбул',
    },
  ];

  const arQuestions: VoiceSearchQAItem[] = [
    {
      id: 'kmk-yonetici-aidat-muafiyeti-ar',
      queryIntent: 'legal',
      voiceQuery: 'هل يدفع مدير المجمع السكني رسوم العائدات الشهرية؟',
      speakableAnswer: 'وفقاً للمادة 40 من قانون الملكية الطابقية، يجوز إعفاء المدير المنتخب من نصف الرسوم ما لم ينص مخطط الإدارة على خلاف ذلك. أما مع شركات الإدارة الاحترافية، فيدفع جميع الملاك رسومهم كاملة.',
      detailedExplanation: 'تنص المادة 40 من القانون رقم 634 على إمكانية إعفاء المدير من بعض المصاريف. وتضمن شركة ألو للإدارة الشفافية الكاملة وحفظ حقوق الملاك.',
      legalReference: 'قانون الملكية الطابقية رقم 634 مادة 40',
      targetKeyword: 'رسوم مدير المجمع السكني اسطنبول',
    },
    {
      id: 'kmk-isletme-projesi-itiraz-suresi-ar',
      queryIntent: 'legal',
      voiceQuery: 'كم يوماً يحق لمالك العقار الاعتراض على الميزانية التشغيلية السنوية؟',
      speakableAnswer: 'يجب تقديم الاعتراض الخطي على ميزانية التشغيل خلال 7 أيام من تاريخ التبليغ الرسمي لتعتبر سارية وقابلة للتنفيذ القانوني.',
      detailedExplanation: 'تُبلغ الميزانية للملاك بالبريد المسجل أو التوقيع المباشر وفق المادة 37، وتصبح سنداً نهائياً بعد مرور 7 أيام.',
      legalReference: 'قانون الملكية الطابقية رقم 634 مادة 37',
      targetKeyword: 'مدة الاعتراض ميزانية المجمع السكني',
    },
    {
      id: 'kmk-gecikme-tazminati-orani-ar',
      queryIntent: 'legal',
      voiceQuery: 'ما هي نسبة غرامة التأخير عن دفع رسوم العائدات الشهرية؟',
      speakableAnswer: 'وفقاً للمادة 20 من قانون الملكية الطابقية، يتم تطبيق غرامة تأخير قانونية بنسبة 5 بالمائة شهرياً على المبالغ المستحقة غير المسددة.',
      detailedExplanation: 'تُفرض غرامة 5% الشهرية بقوة القانون، ويحق لشركة الإدارة المعتمدة البدء بإجراءات التحصيل والتنفيذ القضائي فوراً.',
      legalReference: 'قانون الملكية الطابقية مادة 20',
      targetKeyword: 'غرامة تأخير العائدات تركيا',
    },
    {
      id: 'iso-41001-tesis-yonetimi-nedir-ar',
      queryIntent: 'informational',
      voiceQuery: 'ما هو معيار آيزو 41001 لإدارة المرافق والمنشآت؟',
      speakableAnswer: 'آيزو 41001 هو المعيار الدولي المعتمد لإدارة المرافق والمنشآت المتكاملة وضمان كفاءة الطاقة والصيانة والسلامة.',
      detailedExplanation: 'توفر شركة ألو للإدارة تخفيضاً بنسبة 30% في المصاريف واستجابة طارئة خلال أقل من 30 دقيقة باعتماد آيزو 41001:2018.',
      legalReference: 'معيار آيزو 41001:2018',
      targetKeyword: 'ايزو 41001 ادارة المرافق',
    },
    {
      id: 'ozel-guvenlik-5188-zorunlulugu-ar',
      queryIntent: 'commercial',
      voiceQuery: 'ما هي الشروط القانونية لتوظيف حراس أمن في المجمعات السكنية في إسطنبول؟',
      speakableAnswer: 'يتطلب توظيف حراس أمن ترخيصاً رسمياً من لجنة الأمن الخاصة بالولاية والتعاقد مع شركة مرخصة بموجب القانون 5188.',
      detailedExplanation: 'يُحظر قانوناً تشغيل حراس دون بطاقة هوية أمنية معتمدة. وتضمن شركة ألو خدمات أمنية مرخصة ومتوافقة بالكامل مع القانون 5188.',
      legalReference: 'قانون الأمن الخاص رقم 5188',
      targetKeyword: 'ترخيص الامن المجمعات السكنية 5188',
    },
    {
      id: 'profesyonel-tesis-yonetimi-avantajlari-ar',
      queryIntent: 'transactional',
      voiceQuery: 'لماذا يجب اختيار شركة إدارة مرافق احترافية في إسطنبول؟',
      speakableAnswer: 'تحقق الإدارة الاحترافية نسبة تحصيل تتجاوز 98%، وتوفر 30% من المصاريف بفضل القوة الشرائية المجمعة، وتزيل النزاعات بين الجيران.',
      detailedExplanation: 'تعتمد ألو للإدارة على نخبة من المستشارين القانونيين والمشرفين الأمنيين المرخصين والمهندسين لرفع القيمة السوقية للعقار.',
      legalReference: 'قانون الملكية الطابقية مادة 34',
      targetKeyword: 'مزايا شركة ادارة المرافق اسطنبول',
    },
  ];

  const allQuestions = lang === 'en' ? enQuestions : lang === 'ru' ? ruQuestions : lang === 'ar' ? arQuestions : trQuestions;

  let questions = allQuestions;
  if (filterIntent) {
    const cleanIntent = filterIntent.trim().toLowerCase();
    questions = allQuestions.filter((q) => q.queryIntent.toLowerCase() === cleanIntent);
  }

  const speakableSchemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    '@id': `${canonicalSource}#voice-qa`,
    inLanguage: lang,
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.voiceQuery,
      text: q.voiceQuery,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.detailedExplanation,
        inLanguage: lang,
        url: `${canonicalSource}#${q.id}`,
        author: {
          '@type': 'Organization',
          name: 'Alo Yönetim',
          legalName: 'Alo Yönetim ve Organizasyon A.Ş.',
          url: BASE_URL,
          telephone: '+90 216 550 48 48',
        },
      },
    })),
    speakable: {
      '@type': 'SpeakableSpecification',
      inLanguage: lang,
      xpath: [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content",
        "//div[contains(@class, 'voice-faq-answer')]"
      ],
    },
  };

  return {
    totalQuestionsCount: questions.length,
    lastUpdated: '2026-08-28T09:00:00+03:00',
    canonicalSource,
    appliedIntent: filterIntent,
    questions,
    speakableSchemaJsonLd,
  };
}
