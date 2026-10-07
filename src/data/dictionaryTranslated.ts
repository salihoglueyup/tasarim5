// Sözlükten seçilmiş 20 temel terimin en/ru/ar çevirileri.
// Kaynak: src/data/dictionary.ts (Türkçe tanımlar). Anahtar, Türkçe terimin slug'ıdır (termToSlug).
// Hukuki terimlerde yalnızca doğrulanmış 7579 sayılı Kanun bilgisi kullanılır; son söz hukuk danışmanındadır.

export type TranslatedLang = 'en' | 'ru' | 'ar';

export interface TranslatedTermText {
  term: string;
  definition: string;
}

export interface TranslatedTerm {
  /** Türkçe terimin slug'ı (URL: /{lang}/sozluk/{slug}) */
  slug: string;
  en: TranslatedTermText;
  ru: TranslatedTermText;
  ar: TranslatedTermText;
}

export const TRANSLATED_TERMS: TranslatedTerm[] = [
  {
    slug: 'aidat',
    en: {
      term: 'Dues (Aidat)',
      definition:
        'The monthly contribution through which the common expenses of a complex or building (cleaning, security, lift maintenance, electricity) are shared among unit owners, according to land share or equally. Under Article 20 of the Condominium Law (KMK) it must be paid.',
    },
    ru: {
      term: 'Взносы (Aidat)',
      definition:
        'Ежемесячный взнос, которым общие расходы комплекса или дома (уборка, охрана, обслуживание лифтов, электроэнергия) распределяются между собственниками пропорционально доле в земле или поровну. В соответствии со статьёй 20 Закона о кондоминиумах (KMK) его уплата обязательна.',
    },
    ar: {
      term: 'الاشتراك الشهري (Aidat)',
      definition:
        'المساهمة الشهرية التي تُوزَّع بها المصاريف المشتركة للمجمع أو المبنى (النظافة والأمن وصيانة المصاعد والكهرباء) بين ملّاك الوحدات حسب حصة الأرض أو بالتساوي. ويكون دفعها إلزاميًا وفق المادة 20 من قانون ملكية الطوابق (KMK).',
    },
  },
  {
    slug: 'kat-mulkiyeti-kanunu-kmk',
    en: {
      term: 'Condominium Law (KMK)',
      definition:
        'Law No. 634 on Condominium Ownership (Kat Mülkiyeti Kanunu) is the core legislation regulating the rights and obligations of owners, the form of management and the use of common areas in properties with more than one independent unit.',
    },
    ru: {
      term: 'Закон о кондоминиумах (KMK)',
      definition:
        'Закон № 634 о праве собственности на этажи (Kat Mülkiyeti Kanunu) — основной нормативный акт, регулирующий права и обязанности собственников, форму управления и пользование общими зонами в объектах недвижимости с несколькими самостоятельными помещениями.',
    },
    ar: {
      term: 'قانون ملكية الطوابق (KMK)',
      definition:
        'القانون رقم 634 لملكية الطوابق (Kat Mülkiyeti Kanunu) هو التشريع الأساسي الذي ينظم حقوق الملّاك والتزاماتهم وشكل الإدارة واستخدام المناطق المشتركة في العقارات التي تضم أكثر من وحدة مستقلة.',
    },
  },
  {
    slug: 'kmk-madde-20-genel-giderlere-katilma-aidat-borcu',
    en: {
      term: 'KMK Article 20 (Contribution to Common Expenses & Dues Debt)',
      definition:
        'Article 20 of Law No. 634 provides that unit owners contribute equally to the costs of the caretaker, stoker, gardener and watchman, and in proportion to their land share to insurance and other common expenses. A statutory late-payment compensation of 5% per month applies to dues and advances not paid on time, and they can be pursued directly through enforcement proceedings.',
    },
    ru: {
      term: 'Статья 20 KMK (участие в общих расходах и задолженность по взносам)',
      definition:
        'Статья 20 Закона № 634 устанавливает, что собственники участвуют в расходах на привратника, истопника, садовника и сторожа в равных долях, а в расходах на страхование и прочих общих расходах — пропорционально доле в земле. На несвоевременно уплаченные взносы и авансы начисляется законная компенсация за просрочку в размере 5% в месяц, и они могут взыскиваться напрямую в исполнительном порядке.',
    },
    ar: {
      term: 'المادة 20 من KMK (المساهمة في المصاريف المشتركة ودين الاشتراكات)',
      definition:
        'تنص المادة 20 من القانون رقم 634 على أن يساهم الملّاك بالتساوي في نفقات البواب ومشعل المدفأة والبستاني والحارس، وبنسبة حصة الأرض في التأمين وسائر المصاريف المشتركة. ويُطبَّق تعويض تأخير قانوني بنسبة 5% شهريًا على الاشتراكات والدفعات المقدمة غير المسددة في موعدها، ويمكن مطالبتها مباشرة عبر إجراءات التنفيذ.',
    },
  },
  {
    slug: 'gecici-isletme-projesi-kmk-m37',
    en: {
      term: 'Interim Operating Project (KMK Art. 37)',
      definition:
        'The project that the manager prepares without delay when no operating project approved by the unit owners\' assembly exists. Under the rules introduced by Law No. 7579, it must be approved, as is or amended, by the unit owners\' assembly within 3 months at the latest. Where a project exists, the amount in the interim project may not exceed the previous year\'s revaluation rate.',
    },
    ru: {
      term: 'Временный эксплуатационный проект (ст. 37 KMK)',
      definition:
        'Проект, который управляющий без промедления готовит, если нет эксплуатационного проекта, одобренного собранием собственников. По правилам, введённым Законом № 7579, он должен быть утверждён собранием собственников в прежнем или изменённом виде не позднее чем через 3 месяца. При наличии действующего проекта сумма во временном проекте не может превышать ставку переоценки за предыдущий год.',
    },
    ar: {
      term: 'مشروع التشغيل المؤقت (المادة 37 من KMK)',
      definition:
        'المشروع الذي يعدّه المدير دون تأخير عند عدم وجود مشروع تشغيل أقرّته جمعية الملّاك. ووفق الأحكام التي أتى بها القانون رقم 7579 يجب أن تقرّه جمعية الملّاك كما هو أو معدَّلًا خلال 3 أشهر على الأكثر. وإذا وُجد مشروع قائم فلا يجوز أن يتجاوز المبلغ في المشروع المؤقت معدل إعادة التقييم للسنة السابقة.',
    },
  },
  {
    slug: 'yeniden-degerleme-orani-aidat-artis-siniri',
    en: {
      term: 'Revaluation Rate (Dues Increase Cap)',
      definition:
        'The rate announced each year by the Ministry of Treasury and Finance under supplementary Article 298 of the Tax Procedure Law No. 213. Law No. 7579 provides in KMK Article 37 that, in complexes that already have an operating project, the amount in the interim project cannot be increased by more than this rate for the previous year.',
    },
    ru: {
      term: 'Ставка переоценки (предел повышения взносов)',
      definition:
        'Ставка, ежегодно объявляемая Министерством казначейства и финансов в соответствии со статьёй 298 (повторной) Налогового процессуального закона № 213. Законом № 7579 в статье 37 KMK установлено, что в комплексах, где уже есть эксплуатационный проект, сумма во временном проекте не может быть повышена более чем на эту ставку за предыдущий год.',
    },
    ar: {
      term: 'معدل إعادة التقييم (سقف زيادة الاشتراكات)',
      definition:
        'المعدل الذي تعلنه وزارة الخزانة والمالية كل عام بموجب المادة 298 المكررة من قانون الإجراءات الضريبية رقم 213. وقد نص القانون رقم 7579 في المادة 37 من KMK على أنه في المجمعات التي لديها مشروع تشغيل قائم لا يجوز زيادة المبلغ في المشروع المؤقت بأكثر من هذا المعدل للسنة السابقة.',
    },
  },
  {
    slug: 'isletme-projesi',
    en: {
      term: 'Operating Project (Budget Plan)',
      definition:
        'A budget plan showing the estimated annual income and expenses, the dues amounts and the advance payments. The manager prepares it and submits it to the unit owners\' assembly; since Law No. 7579 of 22 May 2026 the principle is that it is approved by the unit owners\' assembly.',
    },
    ru: {
      term: 'Эксплуатационный проект (план бюджета)',
      definition:
        'Бюджетный план, показывающий ориентировочные годовые доходы и расходы, размеры взносов и авансов. Его готовит управляющий и представляет собранию собственников; с Закона № 7579 от 22 мая 2026 года действует принцип, что он утверждается собранием собственников.',
    },
    ar: {
      term: 'مشروع التشغيل (خطة الميزانية)',
      definition:
        'خطة ميزانية توضح الإيرادات والمصروفات السنوية التقديرية ومبالغ الاشتراكات والدفعات المقدمة. يعدّها المدير ويعرضها على جمعية الملّاك؛ ومنذ القانون رقم 7579 الصادر في 22 مايو 2026 أصبح المبدأ أن تقرّها جمعية الملّاك.',
    },
  },
  {
    slug: 'demirbas',
    en: {
      term: 'Fixtures and Equipment (Demirbaş)',
      definition:
        'Long-lived movable assets belonging to the shared use of the complex and recorded in the inventory (generator, booster pump, security camera, garden equipment). They are handed over by minutes when management changes.',
    },
    ru: {
      term: 'Инвентарь и оборудование (Demirbaş)',
      definition:
        'Долговечное движимое имущество общего пользования комплекса, внесённое в инвентарную опись (генератор, насос, камера наблюдения, садовое оборудование). При смене управления передаётся по акту.',
    },
    ar: {
      term: 'الأصول والتجهيزات (Demirbaş)',
      definition:
        'أصول منقولة طويلة العمر تخص الاستخدام المشترك للمجمع ومسجلة في الجرد (مولد ومضخة تقوية وكاميرا مراقبة ومعدات حدائق). تُسلَّم بمحضر عند تغيير الإدارة.',
    },
  },
  {
    slug: 'kat-malikleri-kurulu',
    en: {
      term: 'Unit Owners\' Assembly (Kat Malikleri Kurulu)',
      definition:
        'The supreme decision-making body of the complex, made up of all the owners of independent units. It elects the manager and approves the operating project and amendments to the management plan.',
    },
    ru: {
      term: 'Собрание собственников (Kat Malikleri Kurulu)',
      definition:
        'Высший орган принятия решений комплекса, состоящий из всех собственников самостоятельных помещений. Оно избирает управляющего, утверждает эксплуатационный проект и изменения плана управления.',
    },
    ar: {
      term: 'جمعية ملّاك الوحدات (Kat Malikleri Kurulu)',
      definition:
        'أعلى جهة لاتخاذ القرار في المجمع وتتألف من جميع ملّاك الوحدات المستقلة. تنتخب المدير وتقرّ مشروع التشغيل والتعديلات على خطة الإدارة.',
    },
  },
  {
    slug: 'yonetim-plani',
    en: {
      term: 'Management Plan (Yönetim Planı)',
      definition:
        'The contract-like document that determines how the complex is managed and binds all unit owners. It is annotated in the land registry, and amending it requires a qualified majority: 4/5 in general buildings (KMK Art. 28/3) and, since 22 May 2026, 2/3 in multi-building complexes (KMK Art. 70).',
    },
    ru: {
      term: 'План управления (Yönetim Planı)',
      definition:
        'Договорный по своей природе документ, определяющий порядок управления комплексом и обязательный для всех собственников. Он отмечается в земельном реестре, а для его изменения требуется квалифицированное большинство: 4/5 в обычных зданиях (ст. 28/3 KMK) и, с 22 мая 2026 года, 2/3 в многокорпусных комплексах (ст. 70 KMK).',
    },
    ar: {
      term: 'خطة الإدارة (Yönetim Planı)',
      definition:
        'وثيقة ذات طبيعة تعاقدية تحدد كيفية إدارة المجمع وتُلزم جميع الملّاك. تُسجَّل بشرح في السجل العقاري، ويتطلب تعديلها أغلبية مؤهلة: 4/5 في المباني العامة (المادة 28/3 من KMK) و2/3 منذ 22 مايو 2026 في المجمعات متعددة المباني (المادة 70 من KMK).',
    },
  },
  {
    slug: 'ortak-alan',
    en: {
      term: 'Common Area (Ortak Alan)',
      definition:
        'The places outside the independent units that all owners use in common (stairs, lift, roof, garden, car park, shelter). The costs of common areas are reflected in the dues.',
    },
    ru: {
      term: 'Общая зона (Ortak Alan)',
      definition:
        'Места за пределами самостоятельных помещений, которыми совместно пользуются все собственники (лестницы, лифт, крыша, сад, парковка, убежище). Расходы на общие зоны отражаются во взносах.',
    },
    ar: {
      term: 'المنطقة المشتركة (Ortak Alan)',
      definition:
        'الأماكن الواقعة خارج الوحدات المستقلة التي يستخدمها جميع الملّاك بشكل مشترك (السلالم والمصعد والسطح والحديقة والموقف والملجأ). وتنعكس تكاليف المناطق المشتركة على الاشتراكات.',
    },
  },
  {
    slug: 'arsa-payi',
    en: {
      term: 'Land Share (Arsa Payı)',
      definition:
        'The ownership share in the land on which the building stands that is allocated to each independent unit in condominium ownership. It is the basic criterion for sharing common expenses and for voting majorities.',
    },
    ru: {
      term: 'Доля в земле (Arsa Payı)',
      definition:
        'Доля собственности на земельный участок, на котором возведено здание, закреплённая за каждым самостоятельным помещением при праве собственности на этажи. Основной критерий распределения общих расходов и подсчёта голосов.',
    },
    ar: {
      term: 'حصة الأرض (Arsa Payı)',
      definition:
        'حصة الملكية في الأرض المقام عليها المبنى والمخصصة لكل وحدة مستقلة في ملكية الطوابق. وهي المعيار الأساسي لتوزيع المصاريف المشتركة ولنصاب التصويت.',
    },
  },
  {
    slug: 'gecikme-tazminati-5-yasal-faiz',
    en: {
      term: 'Late-Payment Compensation (5% Monthly)',
      definition:
        'Under Article 20 of Condominium Law No. 634, the statutory penalty interest charged at 5% per month on dues and common-expense advances that are past their due date.',
    },
    ru: {
      term: 'Компенсация за просрочку (5% в месяц)',
      definition:
        'В соответствии со статьёй 20 Закона о кондоминиумах № 634 — законные штрафные проценты в размере 5% в месяц на взносы и авансы по общим расходам, срок оплаты которых истёк.',
    },
    ar: {
      term: 'تعويض التأخير (5% شهريًا)',
      definition:
        'وفق المادة 20 من قانون ملكية الطوابق رقم 634، هي الفائدة الجزائية القانونية التي تُحتسب بنسبة 5% شهريًا على الاشتراكات ودفعات المصاريف المشتركة المقدمة التي تجاوزت موعد استحقاقها.',
    },
  },
  {
    slug: 'ilamsiz-icra-takibi-aidat-borcu',
    en: {
      term: 'Enforcement Without a Court Judgment (Dues Debt)',
      definition:
        'Under KMK Article 20 and the Enforcement and Bankruptcy Law, the process of sending a payment order (Form No. 7) to the debtor owner through the enforcement office without a court judgment.',
    },
    ru: {
      term: 'Взыскание без судебного решения (задолженность по взносам)',
      definition:
        'В соответствии со статьёй 20 KMK и Законом об исполнении и банкротстве — процедура направления должнику-собственнику платёжного приказа (форма № 7) через исполнительное бюро без судебного решения.',
    },
    ar: {
      term: 'التنفيذ دون حكم قضائي (دين الاشتراكات)',
      definition:
        'وفق المادة 20 من KMK وقانون التنفيذ والإفلاس، هي إجراءات إرسال أمر دفع (النموذج رقم 7) إلى المالك المدين عبر دائرة التنفيذ دون حكم قضائي.',
    },
  },
  {
    slug: 'mali-ibra',
    en: {
      term: 'Financial Discharge (Mali İbra)',
      definition:
        'The act in which, at the ordinary meeting of the Unit Owners\' Assembly, the owners vote on the manager\'s past-period income and expense accounts and operating activities, thereby legally and financially discharging the manager.',
    },
    ru: {
      term: 'Финансовое освобождение от ответственности (Mali İbra)',
      definition:
        'Процедура, при которой на очередном собрании собственников голосованием рассматриваются доходы, расходы и деятельность управляющего за прошедший период, а управляющий юридически и финансово освобождается от ответственности.',
    },
    ar: {
      term: 'الإبراء المالي (Mali İbra)',
      definition:
        'الإجراء الذي يصوّت فيه الملّاك في الاجتماع العادي لجمعية الملّاك على حسابات المدير من إيرادات ومصروفات الفترة السابقة وأنشطته التشغيلية، فيُبرَّأ بذلك قانونيًا وماليًا.',
    },
  },
  {
    slug: 'olagan-ve-olaganustu-genel-kurul',
    en: {
      term: 'Ordinary and Extraordinary General Assembly',
      definition:
        'The meeting held at least once a year on the date stated in the management plan is ordinary; an assembly convened in urgent cases at the request of the manager, the auditor or one third of the owners is extraordinary.',
    },
    ru: {
      term: 'Очередное и внеочередное общее собрание',
      definition:
        'Собрание, проводимое не реже одного раза в год в срок, указанный в плане управления, является очередным; собрание, созываемое в срочных случаях по требованию управляющего, ревизора или трети собственников, — внеочередным.',
    },
    ar: {
      term: 'الجمعية العمومية العادية وغير العادية',
      definition:
        'الاجتماع الذي يُعقد مرة واحدة في السنة على الأقل في التاريخ المحدد في خطة الإدارة هو اجتماع عادي؛ أما الاجتماع الذي يُعقد في الحالات العاجلة بطلب من المدير أو المراقب أو ثلث الملّاك فهو غير عادي.',
    },
  },
  {
    slug: '5188-sayili-kanun',
    en: {
      term: 'Law No. 5188 (Private Security Services)',
      definition:
        'The Law on Private Security Services regulates the training, identity cards and working conditions of private security officers serving in complexes and facilities. Employing security staff without an identity card is prohibited.',
    },
    ru: {
      term: 'Закон № 5188 (частная охранная деятельность)',
      definition:
        'Закон о частных охранных услугах регулирует обучение, удостоверения и условия работы охранников, работающих в комплексах и на объектах. Привлечение охранников без удостоверения запрещено.',
    },
    ar: {
      term: 'القانون رقم 5188 (خدمات الأمن الخاص)',
      definition:
        'ينظم قانون خدمات الأمن الخاص تدريب عناصر الأمن الخاص العاملين في المجمعات والمنشآت وبطاقاتهم وظروف عملهم. ويُحظر تشغيل عناصر الأمن دون بطاقة هوية.',
    },
  },
  {
    slug: 'tesis-yonetimi-entegre-tesis-yonetimi',
    en: {
      term: 'Facility Management (Integrated)',
      definition:
        'The professional management discipline that runs the physical, technical, security, cleaning, landscaping and budget/accounting operations of a building or complex from a single corporate centre to quality standards.',
    },
    ru: {
      term: 'Управление объектами (комплексное)',
      definition:
        'Профессиональная управленческая дисциплина, при которой физические, технические, охранные, уборочные, ландшафтные и бюджетно-бухгалтерские операции здания или комплекса ведутся из единого корпоративного центра по стандартам качества.',
    },
    ar: {
      term: 'إدارة المرافق (المتكاملة)',
      definition:
        'تخصص إداري احترافي يدير العمليات المادية والفنية والأمنية وأعمال النظافة والمساحات الخضراء والميزانية والمحاسبة لمبنى أو مجمع من مركز مؤسسي واحد وفق معايير الجودة.',
    },
  },
  {
    slug: 'hizmet-seviyesi-taahhudu-sla',
    en: {
      term: 'Service Level Agreement (SLA)',
      definition:
        'A performance agreement signed between the facility management company and the complex management that sets out service levels such as fault-response times, cleaning frequency and security patrol counts and secures them contractually.',
    },
    ru: {
      term: 'Соглашение об уровне сервиса (SLA)',
      definition:
        'Соглашение о показателях работы, заключаемое между компанией по управлению объектами и управлением комплекса и закрепляющее в договоре такие параметры, как сроки реагирования на неисправности, периодичность уборки и число патрулей охраны.',
    },
    ar: {
      term: 'اتفاقية مستوى الخدمة (SLA)',
      definition:
        'اتفاقية أداء تُوقَّع بين شركة إدارة المرافق وإدارة المجمع تحدد مستويات الخدمة مثل أزمنة الاستجابة للأعطال وتكرار النظافة وعدد دوريات الأمن وتكفلها تعاقديًا.',
    },
  },
  {
    slug: 'toplu-yapi-kmk-m66-70',
    en: {
      term: 'Multi-Building Complex (KMK Art. 66-70)',
      definition:
        'Structures such as housing estates that consist of more than one building and are bound by a common management plan. Law No. 7579 lowered the majority needed to amend the management plan in such complexes in KMK Article 70 from four-fifths to two-thirds, and provides that plan provisions contrary to this rate will not be applied.',
    },
    ru: {
      term: 'Многокорпусный комплекс (ст. 66–70 KMK)',
      definition:
        'Объекты, такие как жилые комплексы, состоящие из нескольких зданий и подчиняющиеся единому плану управления. Законом № 7579 в статье 70 KMK требуемое большинство для изменения плана управления в таких комплексах снижено с четырёх пятых до двух третей, а положения планов, противоречащие этой доле, применяться не будут.',
    },
    ar: {
      term: 'مجمع متعدد المباني (المواد 66-70 من KMK)',
      definition:
        'منشآت كالمجمعات السكنية تتكون من أكثر من مبنى وتخضع لخطة إدارة مشتركة. وقد خفّض القانون رقم 7579 في المادة 70 من KMK الأغلبية اللازمة لتعديل خطة الإدارة في هذه المجمعات من أربعة أخماس إلى الثلثين، ونص على عدم تطبيق أحكام الخطط المخالفة لهذه النسبة.',
    },
  },
  {
    slug: 'denetci',
    en: {
      term: 'Auditor (Denetçi)',
      definition:
        'The person or board elected by the Unit Owners\' Assembly that audits the management\'s income and expense accounts and transactions. It is the basic safeguard of transparent management.',
    },
    ru: {
      term: 'Ревизор (Denetçi)',
      definition:
        'Лицо или комиссия, избираемые собранием собственников для проверки доходов, расходов и операций управления. Основная гарантия прозрачного управления.',
    },
    ar: {
      term: 'المراقب (Denetçi)',
      definition:
        'الشخص أو اللجنة التي تنتخبها جمعية الملّاك لتدقيق حسابات الإيرادات والمصروفات ومعاملات الإدارة. وهو الضمانة الأساسية لإدارة شفافة.',
    },
  },
];

export const TRANSLATED_TERM_SLUGS: string[] = TRANSLATED_TERMS.map((t) => t.slug);

export function getTranslatedTerm(slug: string, lang: string): (TranslatedTermText & { slug: string }) | undefined {
  if (lang !== 'en' && lang !== 'ru' && lang !== 'ar') return undefined;
  const found = TRANSLATED_TERMS.find((t) => t.slug === slug);
  return found ? { slug, ...found[lang] } : undefined;
}
