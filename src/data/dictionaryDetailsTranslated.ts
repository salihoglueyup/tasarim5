/**
 * 20 çevrilmiş sözlük terimi için ayrıntı açıklamalarının en/ru/ar sürümleri.
 * Kaynak: dictionaryDetails.ts / dictionaryDetails2.ts (Türkçe). Anahtar: terim slug'ı.
 */
import type { TermDetail } from './dictionaryDetails';

export type DetailLang = 'en' | 'ru' | 'ar';

export const TERM_DETAILS_TRANSLATED: Record<string, Record<DetailLang, TermDetail>> = {
  aidat: {
    en: {
      explain: [
        'Dues (aidat) are the regular contribution an owner makes to common expenses. Expenses such as electricity, water, elevator maintenance, cleaning, security, staff salaries and small repairs are shown in the annual operating budget; the share for each unit is collected as a monthly advance.',
        "The sharing rule is set out in KMK Article 20: unless the management plan says otherwise, all owners share janitor, stoker, gardener and watchman costs equally, and other common expenses in proportion to land share. Dues depend on ownership, not use; the owner pays even if the apartment is empty.",
      ],
      tips: [
        'The dues amount should be based on the items in the operating budget and notified to owners in writing.',
        'For late payment, 5% per month late-payment compensation applies under KMK Article 20.',
        'The tenant may be jointly liable with the owner up to the amount of rent (KMK Article 22).',
      ],
      faq: [
        ['Who is responsible for dues?', 'The primary debtor is the unit owner. The tenant is jointly liable up to the amount of rent; see the management plan and the lease for details.'],
        ['How is a dues increase determined?', "The manager prepares the operating budget and the unit owners' assembly approves it. After Law No. 7579, in complexes with an existing budget the provisional budget amount cannot exceed the previous year's revaluation rate."],
      ],
    },
    ru: {
      explain: [
        'Взносы (aidat) — это регулярный вклад собственника в общие расходы. Такие расходы, как электричество, вода, обслуживание лифта, уборка, охрана, зарплата персонала и мелкий ремонт, указываются в годовом бюджете эксплуатации; доля каждого помещения собирается в виде ежемесячного аванса.',
        'Правило распределения закреплено в ст. 20 KMK: если план управления не предусматривает иное, расходы на привратника, истопника, садовника и сторожа все собственники делят поровну, а прочие общие расходы — пропорционально доле земельного участка. Взносы зависят от права собственности, а не от использования; собственник платит, даже если квартира пустует.',
      ],
      tips: [
        'Размер взносов должен опираться на статьи бюджета эксплуатации и доводиться до собственников письменно.',
        'При просрочке по ст. 20 KMK начисляется компенсация в размере 5% в месяц.',
        'Арендатор может нести солидарную ответственность с собственником в пределах арендной платы (ст. 22 KMK).',
      ],
      faq: [
        ['Кто отвечает за взносы?', 'Основной должник — собственник. Арендатор несёт солидарную ответственность в пределах арендной платы; подробности — в плане управления и договоре аренды.'],
        ['Как определяется повышение взносов?', 'Управляющий готовит бюджет эксплуатации, а собрание собственников его утверждает. После Закона № 7579 в комплексах с действующим бюджетом сумма временного бюджета не может превышать ставку переоценки предыдущего года.'],
      ],
    },
    ar: {
      explain: [
        'المستحقات (Aidat) هي مساهمة المالك المنتظمة في المصروفات المشتركة. وتُبيَّن بنود مثل الكهرباء والمياه وصيانة المصعد والنظافة والأمن وأجور الموظفين والإصلاحات الصغيرة في مشروع التشغيل السنوي؛ وتُجمع حصة كل وحدة كدفعة مقدمة شهرية.',
        'قاعدة التوزيع واردة في المادة 20 من KMK: ما لم تنص خطة الإدارة على خلاف ذلك، يتشارك جميع الملاك بالتساوي في مصروفات البواب والمُدفئ والبستاني والحارس، وفي سائر المصروفات المشتركة بنسبة حصة الأرض. وترتبط المستحقات بالملكية لا بالاستخدام؛ فيدفعها المالك حتى لو كانت الشقة فارغة.',
      ],
      tips: [
        'ينبغي أن يستند مبلغ المستحقات إلى بنود مشروع التشغيل وأن يُبلَّغ للملاك كتابةً.',
        'عند التأخر يسري تعويض تأخير بنسبة 5% شهرياً وفق المادة 20 من KMK.',
        'قد يكون المستأجر مسؤولاً بالتضامن مع المالك بقدر مبلغ الإيجار (المادة 22 من KMK).',
      ],
      faq: [
        ['من المسؤول عن المستحقات؟', 'المدين الأصلي هو المالك. ويكون المستأجر مسؤولاً بالتضامن بقدر مبلغ الإيجار؛ وللتفاصيل راجعوا خطة الإدارة وعقد الإيجار.'],
        ['كيف تُحدَّد زيادة المستحقات؟', 'يعد المدير مشروع التشغيل وتعتمده جمعية الملاك. وبعد القانون رقم 7579، في المجمعات التي لديها مشروع قائم لا يجوز أن يتجاوز مبلغ المشروع المؤقت معدل إعادة التقييم للعام السابق.'],
      ],
    },
  },
  'kat-mulkiyeti-kanunu-kmk': {
    en: {
      explain: [
        'Condominium Ownership Law No. 634 (KMK) regulates separate ownership of the independent units of a building and the management of common areas. The establishment of floor easement and condominium ownership, the management plan, the unit owners\' assembly, the manager and auditor, and common expenses and the rules for contributing to them are in this law.',
        "The law was amended by Law No. 7579 of 22 May 2026: the approval of the operating budget by the unit owners' assembly and the provisional budget procedure (Articles 35, 37), and a two-thirds majority to amend the management plan in collective structures (Article 70), were regulated.",
      ],
      tips: [
        'A management plan can set rules different from the supplementary provisions of the law; check your plan first.',
        'For the current text of the law articles, the Official Gazette or mevzuat.gov.tr should be used.',
      ],
      faq: [
        ['What does KMK stand for, what is KMK?', "KMK stands for Condominium Ownership Law No. 634. It sets out owners' rights, the sharing of dues and management rules in apartment buildings, residential complexes, residences and commercial plazas."],
        ['To which buildings does the KMK apply?', 'To buildings with more than one independent unit where floor easement or condominium ownership has been established, and to collective structures.'],
        ['What did Law No. 7579 change?', 'KMK Articles 35, 37 and 70 changed: the approval procedure of the operating budget, the provisional budget and the majority for collective structures were regulated.'],
      ],
    },
    ru: {
      explain: [
        'Закон о праве собственности на этажи № 634 (KMK) регулирует раздельную собственность на отдельные помещения здания и управление общими зонами. В этом законе содержатся нормы об установлении этажного сервитута и этажной собственности, плане управления, собрании собственников, управляющем и ревизоре, общих расходах и правилах участия в них.',
        'Закон был изменён Законом № 7579 от 22 мая 2026 г.: урегулированы утверждение бюджета эксплуатации собранием собственников и порядок временного бюджета (ст. 35, 37), а также большинство в две трети для изменения плана управления в комплексах из нескольких зданий (ст. 70).',
      ],
      tips: [
        'План управления может устанавливать правила, отличающиеся от дополнительных положений закона; сначала изучите свой план.',
        'Актуальный текст статей закона следует брать из Официальной газеты или mevzuat.gov.tr.',
      ],
      faq: [
        ['Что означает KMK?', 'KMK — это Закон о праве собственности на этажи № 634. Он определяет права собственников, распределение взносов и правила управления в многоквартирных домах, жилых комплексах, резиденциях и торговых центрах.'],
        ['К каким зданиям применяется KMK?', 'К зданиям с несколькими отдельными помещениями, где установлен этажный сервитут или этажная собственность, а также к комплексам из нескольких зданий.'],
        ['Что изменил Закон № 7579?', 'Изменены ст. 35, 37 и 70 KMK: урегулированы порядок утверждения бюджета эксплуатации, временный бюджет и большинство для комплексов из нескольких зданий.'],
      ],
    },
    ar: {
      explain: [
        'ينظم قانون ملكية الطوابق رقم 634 (KMK) الملكية المنفصلة للوحدات المستقلة في المبنى وإدارة المناطق المشتركة. وفيه أحكام إنشاء ارتفاق الطوابق وملكية الطوابق وخطة الإدارة وجمعية الملاك والمدير والمراقب والمصروفات المشتركة وقواعد المساهمة فيها.',
        'عُدِّل القانون بالقانون رقم 7579 الصادر في 22 مايو 2026: فنُظِّم اعتماد جمعية الملاك لمشروع التشغيل وإجراء المشروع المؤقت (المادتان 35 و37)، وأغلبية الثلثين لتعديل خطة الإدارة في المباني الجماعية (المادة 70).',
      ],
      tips: [
        'يجوز لخطة الإدارة أن تضع قواعد تختلف عن الأحكام التكميلية للقانون؛ فراجعوا خطتكم أولاً.',
        'للاطلاع على النص الحالي لمواد القانون يُعتمد على الجريدة الرسمية أو mevzuat.gov.tr.',
      ],
      faq: [
        ['ما معنى KMK؟', 'KMK هو قانون ملكية الطوابق رقم 634. وهو يحدد حقوق الملاك وتوزيع المساهمات وقواعد الإدارة في العمارات والمجمعات السكنية والإقامات والبلازا التجارية.'],
        ['على أي مبانٍ يسري KMK؟', 'على المباني ذات الوحدات المستقلة المتعددة التي أُنشئ فيها ارتفاق الطوابق أو ملكية الطوابق، وعلى المباني الجماعية.'],
        ['ماذا غيّر القانون رقم 7579؟', 'تغيرت المواد 35 و37 و70 من KMK: نُظِّم إجراء اعتماد مشروع التشغيل والمشروع المؤقت وأغلبية المباني الجماعية.'],
      ],
    },
  },
  'kmk-madde-20-genel-giderlere-katilma-aidat-borcu': {
    en: {
      explain: [
        "KMK Article 20 regulates how unit owners contribute to common expenses and advance shares. As a rule, maintenance, protection and repair costs of common areas and the manager's fee are shared in proportion to land share; the costs of staff such as the janitor, stoker, gardener and watchman are shared equally. The management plan can set a different measure.",
        'The second paragraph of the article provides for 5% per month compensation for delay. Against an owner who does not pay the expense or advance share, the manager or other owners can file a lawsuit or start enforcement proceedings.',
      ],
      tips: [
        'An owner cannot refuse to pay dues by giving up the use of common areas.',
        'Before enforcement, the operating budget, decision book and debt statement should be ready.',
      ],
      faq: [
        ['Is interest charged on top of the late-payment compensation?', 'The five percent monthly compensation under KMK Article 20/2 is a statutory delay sanction by nature; as a rule, interest on interest (compound interest) is not applied. For the receivable items in enforcement proceedings, get advice from a legal advisor.'],
        ['Can late-payment compensation be removed by general assembly decision?', 'Late-payment compensation is regulated by law; it is recommended to get advice from a legal advisor on the consequences of waiver or reduction decisions.'],
        ['In what proportion are dues shared?', 'Equally for staff costs and in proportion to land share for other common expenses, unless the management plan says otherwise.'],
      ],
    },
    ru: {
      explain: [
        'Ст. 20 KMK регулирует, как собственники участвуют в общих расходах и авансовых взносах. Как правило, расходы на обслуживание, охрану и ремонт общих зон и вознаграждение управляющего делятся пропорционально доле земельного участка, а расходы на привратника, истопника, садовника и сторожа — поровну. План управления может установить иной критерий.',
        'Вторая часть статьи предусматривает компенсацию за просрочку в размере 5% в месяц. Против собственника, не оплатившего расходы или авансовый взнос, управляющий или другие собственники могут подать иск или начать исполнительное производство.',
      ],
      tips: [
        'Собственник не может отказаться от оплаты взносов, отказавшись от пользования общими зонами.',
        'Перед взысканием должны быть готовы бюджет эксплуатации, книга решений и расчёт долга.',
      ],
      faq: [
        ['Начисляются ли проценты сверх компенсации за просрочку?', 'Ежемесячная компенсация в размере пяти процентов по ст. 20/2 KMK по своей природе является законной санкцией за просрочку; как правило, проценты на проценты (сложный процент) не начисляются. По статьям требований в исполнительном производстве получите заключение юридического консультанта.'],
        ['Можно ли отменить компенсацию за просрочку решением общего собрания?', 'Компенсация за просрочку установлена законом; о последствиях решений об отказе от неё или её уменьшении рекомендуется получить консультацию юриста.'],
        ['В какой пропорции распределяются взносы?', 'Поровну — расходы на персонал, и пропорционально доле земельного участка — прочие общие расходы, если план управления не предусматривает иное.'],
      ],
    },
    ar: {
      explain: [
        'تنظم المادة 20 من KMK كيفية مساهمة الملاك في المصروفات المشتركة والدفعات المقدمة. وكقاعدة تُوزَّع تكاليف صيانة المناطق المشتركة وحمايتها وإصلاحها وأجر المدير بنسبة حصة الأرض، بينما تُوزَّع تكاليف الموظفين كالبواب والمُدفئ والبستاني والحارس بالتساوي. ويجوز لخطة الإدارة أن تحدد معياراً مختلفاً.',
        'وتنص الفقرة الثانية من المادة على تعويض تأخير بنسبة 5% شهرياً. وضد المالك الذي لا يسدد حصة المصروف أو الدفعة المقدمة يجوز للمدير أو لبقية الملاك رفع دعوى أو بدء متابعة تنفيذية.',
      ],
      tips: [
        'لا يستطيع المالك رفض دفع المستحقات بالتنازل عن استخدام المناطق المشتركة.',
        'قبل المتابعة التنفيذية ينبغي أن يكون مشروع التشغيل ودفتر القرارات وكشف المديونية جاهزة.',
      ],
      faq: [
        ['هل تُحتسب فوائد إضافة إلى تعويض التأخير؟', 'إن تعويض التأخير الشهري بنسبة خمسة بالمئة وفق المادة 20/2 من KMK جزاء قانوني للتأخير بطبيعته؛ والأصل ألا تُحتسب فائدة على الفائدة (الفائدة المركبة). وبالنسبة لبنود المطالبة في المتابعة التنفيذية استشيروا مستشاراً قانونياً.'],
        ['هل يمكن إلغاء تعويض التأخير بقرار من الجمعية العمومية؟', 'تعويض التأخير منصوص عليه في القانون؛ ويُنصح بأخذ مشورة مستشار قانوني بشأن نتائج قرارات التنازل أو التخفيض.'],
        ['بأي نسبة تُوزَّع المستحقات؟', 'بالتساوي لتكاليف الموظفين وبنسبة حصة الأرض لسائر المصروفات المشتركة، ما لم تنص خطة الإدارة على خلاف ذلك.'],
      ],
    },
  },
  'gecici-isletme-projesi-kmk-m37': {
    en: {
      explain: [
        "If there is no operating budget accepted by the unit owners' assembly, the manager prepares a provisional operating budget without delay. According to Law No. 7579, this budget must be approved by the unit owners' assembly, as is or amended, within three months at the latest.",
        "If an existing budget is present, the amount in the provisional budget cannot exceed the previous year's revaluation rate. Therefore the manager should keep both the meeting calendar and the notification records in order.",
      ],
      tips: [
        'Keep a record (signature, registered mail) proving that you notified the provisional budget to the owners.',
        "Plan the three-month period backwards from the assembly's meeting calendar.",
      ],
      faq: [
        ['How long is a provisional budget valid?', 'It must be submitted for approval by the assembly within three months at the latest; after approval it is applied as the operating budget.'],
        ['Is there an upper limit on the increase in the provisional budget?', "In complexes with an existing budget, the previous year's revaluation rate is the upper limit."],
      ],
    },
    ru: {
      explain: [
        'Если нет бюджета эксплуатации, принятого собранием собственников, управляющий без промедления готовит временный бюджет эксплуатации. По Закону № 7579 этот бюджет должен быть утверждён собранием собственников в первоначальном или изменённом виде не позднее чем в течение трёх месяцев.',
        'Если есть действующий бюджет, сумма во временном бюджете не может превышать ставку переоценки предыдущего года. Поэтому управляющему следует аккуратно вести и календарь собраний, и записи об уведомлениях.',
      ],
      tips: [
        'Сохраняйте запись (подпись, заказное письмо), подтверждающую уведомление собственников о временном бюджете.',
        'Планируйте трёхмесячный срок от календаря собраний в обратном порядке.',
      ],
      faq: [
        ['Как долго действует временный бюджет?', 'Он должен быть представлен собранию на утверждение не позднее чем через три месяца; после утверждения применяется как бюджет эксплуатации.'],
        ['Есть ли верхний предел повышения во временном бюджете?', 'В комплексах с действующим бюджетом верхним пределом является ставка переоценки предыдущего года.'],
      ],
    },
    ar: {
      explain: [
        'إذا لم يوجد مشروع تشغيل قبلته جمعية الملاك فيعد المدير مشروع تشغيل مؤقتاً دون تأخير. ووفق القانون رقم 7579 يجب أن تعتمد جمعية الملاك هذا المشروع كما هو أو معدلاً في موعد أقصاه ثلاثة أشهر.',
        'وإذا وُجد مشروع قائم فلا يجوز أن يتجاوز المبلغ في المشروع المؤقت معدل إعادة التقييم للعام السابق. لذا ينبغي للمدير أن ينظم تقويم الاجتماعات وسجلات الإبلاغ معاً.',
      ],
      tips: [
        'احتفظوا بسجل (توقيع أو بريد مسجل) يثبت إبلاغ الملاك بالمشروع المؤقت.',
        'خطّطوا لمدة الأشهر الثلاثة بالعد العكسي من تقويم اجتماعات الجمعية.',
      ],
      faq: [
        ['ما مدة سريان المشروع المؤقت؟', 'يجب عرضه على الجمعية للاعتماد في موعد أقصاه ثلاثة أشهر؛ وبعد الاعتماد يُطبَّق كمشروع تشغيل.'],
        ['هل يوجد حد أعلى للزيادة في المشروع المؤقت؟', 'في المجمعات التي لديها مشروع قائم يكون معدل إعادة التقييم للعام السابق هو الحد الأعلى.'],
      ],
    },
  },
  'yeniden-degerleme-orani-aidat-artis-siniri': {
    en: {
      explain: [
        "The revaluation rate is the rate announced every year in tax legislation that updates various monetary limits. Law No. 7579 introduced into KMK Article 37 the provision that, in complexes with an existing operating budget, the amount in the provisional budget cannot be increased by more than the previous year's revaluation rate.",
        'Because the rate changes every year, the currently announced rate for the year should be verified from the official announcement when calculating a dues increase. The calculator on our site provides a sample calculation; consult a legal advisor for the exact application.',
      ],
      tips: [
        'Confirm the rate from the current official announcement, not from an old article.',
        'Write in the assembly decision on what basis the increase was made.',
      ],
      faq: [
        ['Does the upper limit apply to all increases?', 'The provision limits the provisional budget amount in complexes with an existing operating budget; get legal opinion on how it applies to budgets approved by the assembly.'],
      ],
    },
    ru: {
      explain: [
        'Ставка переоценки — это ежегодно объявляемая в налоговом законодательстве ставка, обновляющая различные денежные пороги. Законом № 7579 в ст. 37 KMK введено положение, согласно которому в комплексах с действующим бюджетом эксплуатации сумма во временном бюджете не может быть повышена более чем на ставку переоценки предыдущего года.',
        'Поскольку ставка меняется каждый год, при расчёте повышения взносов актуальную объявленную ставку следует проверять по официальному объявлению. Калькулятор на нашем сайте даёт примерный расчёт; для точного применения обратитесь к юристу.',
      ],
      tips: [
        'Проверяйте ставку по актуальному официальному объявлению, а не по старой статье.',
        'Запишите в решение собрания, на каком основании сделано повышение.',
      ],
      faq: [
        ['Распространяется ли верхний предел на все повышения?', 'Положение ограничивает сумму временного бюджета в комплексах с действующим бюджетом эксплуатации; о применении к бюджетам, утверждённым собранием, получите юридическое заключение.'],
      ],
    },
    ar: {
      explain: [
        'معدل إعادة التقييم هو المعدل المعلن كل عام في التشريعات الضريبية والذي يحدّث حدوداً مالية متعددة. وقد أدخل القانون رقم 7579 في المادة 37 من KMK حكماً مفاده أنه في المجمعات التي لديها مشروع تشغيل قائم لا يجوز زيادة المبلغ في المشروع المؤقت بأكثر من معدل إعادة التقييم للعام السابق.',
        'ولأن المعدل يتغير كل عام ينبغي، عند احتساب زيادة المستحقات، التحقق من المعدل المعلن للعام الحالي من الإعلان الرسمي. وتقدم الحاسبة على موقعنا حساباً تقريبياً؛ ولمعرفة التطبيق الدقيق استشيروا مستشاراً قانونياً.',
      ],
      tips: [
        'تحققوا من المعدل في الإعلان الرسمي الحالي لا من مقال قديم.',
        'اكتبوا في قرار الجمعية الأساس الذي تمت عليه الزيادة.',
      ],
      faq: [
        ['هل يسري الحد الأعلى على جميع الزيادات؟', 'ينظم الحكم حد مبلغ المشروع المؤقت في المجمعات التي لديها مشروع تشغيل قائم؛ وخذوا رأياً قانونياً بشأن تطبيقه على المشاريع التي اعتمدتها الجمعية.'],
      ],
    },
  },
  'isletme-projesi': {
    en: {
      explain: [
        "The operating budget (işletme projesi) is the budget document showing the complex's estimated annual income and expenses and each unit's advance share (KMK Article 37). Staff, energy, maintenance contracts, insurance and expected small repairs are written item by item.",
        'Since Law No. 7579, the budget is approved by the unit owners\' assembly; if there is no approved budget, the manager prepares a provisional one within three months at the latest. Proof of approval and notification is important in dues collection.',
      ],
      tips: [
        "Base it on last year's actual expenses and contract increases.",
        'Show major renovations separately from regular dues.',
        'Prepare a supplementary budget if the budget is exceeded.',
      ],
      faq: [
        ['Who prepares the operating budget?', "The manager (or the management company in charge) prepares it; the authority to approve belongs to the unit owners' assembly."],
        ['What if the budget is not enough during the year?', "A justified supplementary operating budget is prepared and submitted to the assembly."],
      ],
    },
    ru: {
      explain: [
        'Бюджет эксплуатации (işletme projesi) — это бюджетный документ, показывающий примерные годовые доходы и расходы комплекса и авансовую долю каждого помещения (ст. 37 KMK). Персонал, энергия, договоры обслуживания, страхование и ожидаемый мелкий ремонт указываются по статьям.',
        'После Закона № 7579 бюджет утверждается собранием собственников; при отсутствии утверждённого бюджета управляющий готовит временный не позднее чем за три месяца. Подтверждение утверждения и уведомления важно при сборе взносов.',
      ],
      tips: [
        'Опирайтесь на фактические расходы прошлого года и рост стоимости договоров.',
        'Крупные работы по обновлению показывайте отдельно от обычных взносов.',
        'При превышении бюджета подготовьте дополнительный бюджет.',
      ],
      faq: [
        ['Кто готовит бюджет эксплуатации?', 'Его готовит управляющий (или ответственная управляющая компания); право утверждения принадлежит собранию собственников.'],
        ['Что делать, если бюджета не хватает в течение года?', 'Готовится обоснованный дополнительный бюджет эксплуатации и представляется собранию.'],
      ],
    },
    ar: {
      explain: [
        'مشروع التشغيل (işletme projesi) وثيقة ميزانية تبين التقدير السنوي لإيرادات المجمع ومصروفاته والدفعة المقدمة لكل وحدة (المادة 37 من KMK). وتُكتب بنود الموظفين والطاقة وعقود الصيانة والتأمين والإصلاحات الصغيرة المتوقعة بنداً بنداً.',
        'وبعد القانون رقم 7579 تعتمد جمعية الملاك المشروع؛ وإن لم يوجد مشروع معتمد فيعد المدير مشروعاً مؤقتاً في موعد أقصاه ثلاثة أشهر. وإثبات الاعتماد والإبلاغ مهم في تحصيل المستحقات.',
      ],
      tips: [
        'استندوا إلى المصروفات الفعلية للعام الماضي وزيادات العقود.',
        'أظهروا أعمال التجديد الكبرى بشكل منفصل عن المستحقات الاعتيادية.',
        'أعدّوا مشروعاً إضافياً إذا جرى تجاوز الميزانية.',
      ],
      faq: [
        ['من يعد مشروع التشغيل؟', 'يعده المدير (أو شركة الإدارة المكلفة)؛ وصلاحية الاعتماد لجمعية الملاك.'],
        ['ماذا لو لم تكفِ الميزانية خلال العام؟', 'يُعدّ مشروع تشغيل إضافي معلل ويُعرض على الجمعية.'],
      ],
    },
  },
  demirbas: {
    en: {
      explain: [
        'Fixtures (demirbaş) are long-lasting items used in common areas: a generator, booster pump, garden equipment, elevator cabin parts and the like. An inventory of fixtures should be kept and handed over against a written record when the manager changes.',
        'Purchase and renewal costs of fixtures are assessed separately from regular operating expenses. For major purchases, a survey, multiple offers and an assembly decision are recommended.',
      ],
      tips: [
        'Count the inventory at least once a year and update it with a record.',
        'Show fixture renewal costs as a separate item in the operating budget.',
      ],
      faq: [
        ['Does the tenant pay fixture costs?', 'Regular operating expenses may also bind the tenant up to the rent; costs of fixtures and renovation of the main property belong to the owner.'],
      ],
    },
    ru: {
      explain: [
        'Инвентарь (demirbaş) — это долговечные предметы, используемые в общих зонах: генератор, гидрофор, садовое оборудование, детали кабины лифта и т. п. Опись инвентаря следует вести и передавать по письменному акту при смене управляющего.',
        'Расходы на покупку и замену инвентаря рассматриваются отдельно от обычных эксплуатационных расходов. Для крупных закупок рекомендуются обследование, несколько предложений и решение собрания.',
      ],
      tips: [
        'Пересчитывайте опись не реже раза в год и обновляйте её по акту.',
        'Показывайте расходы на замену инвентаря отдельной статьёй в бюджете эксплуатации.',
      ],
      faq: [
        ['Оплачивает ли арендатор расходы на инвентарь?', 'Обычные эксплуатационные расходы могут обязывать и арендатора в пределах арендной платы; расходы на инвентарь и обновление основного имущества лежат на собственнике.'],
      ],
    },
    ar: {
      explain: [
        'المهمات (demirbaş) هي أصناف معمّرة تُستخدم في المناطق المشتركة: كالمولد ومضخة الضغط ومعدات الحديقة وأجزاء كابينة المصعد وما شابه. وينبغي مسك جرد للمهمات وتسليمه بمحضر مكتوب عند تغيير المدير.',
        'وتُقيَّم تكاليف شراء المهمات وتجديدها بمعزل عن مصروفات التشغيل الاعتيادية. وفي المشتريات الكبيرة يُوصى بكشف وعدة عروض وقرار من الجمعية.',
      ],
      tips: [
        'أجروا جرد المهمات مرة واحدة على الأقل سنوياً وحدّثوه بمحضر.',
        'أظهروا تكاليف تجديد المهمات كبند منفصل في مشروع التشغيل.',
      ],
      faq: [
        ['هل يدفع المستأجر تكاليف المهمات؟', 'قد تُلزم مصروفات التشغيل الاعتيادية المستأجر أيضاً بقدر الإيجار؛ أما تكاليف المهمات وتجديد العقار الأساسي فتخص المالك.'],
      ],
    },
  },
  'kat-malikleri-kurulu': {
    en: {
      explain: [
        "The unit owners' assembly is the decision-making body made up of the owners of a building or complex. The election of the manager and auditor, approval of the operating budget and important decisions concerning common areas are taken in the assembly.",
        'The ordinary meeting is held once a year; an extraordinary meeting can be called when needed. Making the call in writing, writing the agenda clearly and recording everything completely in the decision book are important for the validity of decisions.',
      ],
      tips: [
        'Keep the meeting call and the list of attendees (attendance register).',
        'See the management plan for rules on attendance by proxy.',
      ],
      faq: [
        ['How is the decision majority required?', 'As a rule, a majority by number and land share in the first meeting; if insufficient, a majority of those attending in the second meeting. Higher thresholds apply to some decisions.'],
      ],
    },
    ru: {
      explain: [
        'Собрание собственников — орган принятия решений, состоящий из собственников здания или комплекса. Избрание управляющего и ревизора, утверждение бюджета эксплуатации и важные решения по общим зонам принимаются на собрании.',
        'Очередное собрание проводится раз в год; при необходимости можно созвать внеочередное. Письменное уведомление, чёткая повестка и полное внесение решений в книгу решений важны для действительности решений.',
      ],
      tips: [
        'Сохраняйте уведомление о собрании и список участников (лист регистрации).',
        'О правилах участия по доверенности см. план управления.',
      ],
      faq: [
        ['Какое большинство требуется для решений?', 'Как правило, на первом собрании — большинство по числу и доле земельного участка; при недостатке — на втором собрании большинство присутствующих. Для некоторых решений установлены более высокие пороги.'],
      ],
    },
    ar: {
      explain: [
        'جمعية الملاك هي هيئة اتخاذ القرار المكونة من ملاك مبنى أو مجمع. وفيها يُنتخب المدير والمراقب ويُعتمد مشروع التشغيل وتُتخذ القرارات المهمة المتعلقة بالمناطق المشتركة.',
        'يُعقد الاجتماع العادي مرة سنوياً، ويمكن عقد اجتماع استثنائي عند الحاجة. والدعوة المكتوبة وجدول الأعمال الواضح وتدوين القرارات كاملة في دفتر القرارات مهمة لصحة القرارات.',
      ],
      tips: [
        'احتفظوا بدعوة الاجتماع وقائمة الحاضرين (سجل الحضور).',
        'راجعوا خطة الإدارة لمعرفة قواعد الحضور بالوكالة.',
      ],
      faq: [
        ['كيف تُشترط أغلبية القرار؟', 'كقاعدة، أغلبية من حيث العدد وحصة الأرض في الاجتماع الأول؛ وإن لم تكفِ فأغلبية الحاضرين في الاجتماع الثاني. وتُشترط نسب أعلى لبعض القرارات.'],
      ],
    },
  },
  'yonetim-plani': {
    en: {
      explain: [
        'The management plan is the document that regulates the way the main property is managed, rules of use and fees, and binds all owners and later acquirers (KMK Article 28). It is annotated in the land registry.',
        'In single buildings, four-fifths of the owners is needed to amend the plan (Article 28/3); in collective structures, two-thirds is required under Article 70 as amended by Law No. 7579. Provisions contrary to the law are not applied.',
      ],
      tips: [
        'Write car park, common-area use and the expense-sharing measure clearly in the plan.',
        'Announce plan changes to tenants as well; the plan binds them too.',
      ],
      faq: [
        ['Does the management plan bind the tenant?', 'Yes, tenants must also comply with the usage rules in the plan.'],
      ],
    },
    ru: {
      explain: [
        'План управления — это документ, регулирующий порядок управления основным имуществом, правила пользования и размеры платежей и обязательный для всех собственников и последующих приобретателей (ст. 28 KMK). Он отмечается в земельном реестре.',
        'В отдельных зданиях для изменения плана нужно четыре пятых собственников (ст. 28/3); в комплексах из нескольких зданий требуется две трети по ст. 70 в редакции Закона № 7579. Положения, противоречащие закону, не применяются.',
      ],
      tips: [
        'Чётко пропишите в плане парковку, использование общих зон и критерий распределения расходов.',
        'Доводите изменения плана до арендаторов; план обязателен и для них.',
      ],
      faq: [
        ['Обязателен ли план управления для арендатора?', 'Да, арендаторы также обязаны соблюдать правила пользования, указанные в плане.'],
      ],
    },
    ar: {
      explain: [
        'خطة الإدارة هي الوثيقة التي تنظم طريقة إدارة العقار الأساسي وقواعد الاستخدام والأجور وتلزم جميع الملاك ومن يكتسب لاحقاً (المادة 28 من KMK). وتُسجَّل بشرح في سجل الطابو.',
        'لتعديل الخطة في المباني المنفردة يلزم أربعة أخماس الملاك (المادة 28/3)؛ وفي المباني الجماعية يُشترط الثلثان وفق المادة 70 المعدلة بالقانون رقم 7579. ولا تُطبَّق الأحكام المخالفة للقانون.',
      ],
      tips: [
        'اكتبوا الموقف واستخدام المناطق المشتركة ومعيار توزيع المصروفات بوضوح في الخطة.',
        'أعلنوا تعديلات الخطة للمستأجرين أيضاً؛ فالخطة تلزمهم كذلك.',
      ],
      faq: [
        ['هل تلزم خطة الإدارة المستأجر؟', 'نعم، فالمستأجرون ملزمون أيضاً بقواعد الاستخدام الواردة في الخطة.'],
      ],
    },
  },
  'ortak-alan': {
    en: {
      explain: [
        'Common areas are places used by all owners, such as the entrance, stairs, elevator, roof, garden, car park, shelter and social facilities. Their maintenance, repair and operating costs are shared as common expenses.',
        'The use of common areas is regulated by the management plan and assembly decisions. On matters such as allocating car parking or leasing an area to third parties, advice should be taken on decision thresholds and legal consequences.',
      ],
      tips: [
        'Announce common-area use rules in writing.',
        'Make changes to common areas by assembly decision and, if needed, with a permit.',
      ],
      faq: [
        ['Can one avoid common-area costs?', 'Not using common areas does not remove the obligation to contribute to the costs.'],
      ],
    },
    ru: {
      explain: [
        'Общие зоны — места, которыми пользуются все собственники: вход, лестницы, лифт, кровля, сад, парковка, убежище и социальные объекты. Расходы на их обслуживание, ремонт и эксплуатацию делятся как общие расходы.',
        'Пользование общими зонами регулируется планом управления и решениями собрания. По таким вопросам, как закрепление парковочных мест или сдача зоны в аренду третьим лицам, следует получить консультацию о порогах принятия решений и правовых последствиях.',
      ],
      tips: [
        'Доводите правила пользования общими зонами письменно.',
        'Изменения в общих зонах вносите решением собрания и при необходимости с разрешением.',
      ],
      faq: [
        ['Можно ли избежать расходов на общие зоны?', 'Отказ от пользования общими зонами не снимает обязанность участвовать в расходах.'],
      ],
    },
    ar: {
      explain: [
        'المناطق المشتركة هي الأماكن التي يستفيد منها جميع الملاك مثل المدخل والدرج والمصعد والسقف والحديقة والموقف والملجأ والمرافق الاجتماعية. وتُوزَّع تكاليف صيانتها وإصلاحها وتشغيلها كمصروفات مشتركة.',
        'ويُنظَّم استخدام المناطق المشتركة بخطة الإدارة وقرارات الجمعية. وفي مسائل مثل تخصيص مواقف السيارات أو تأجير منطقة لأطراف ثالثة ينبغي أخذ المشورة بشأن نصابات القرار ونتائجه القانونية.',
      ],
      tips: [
        'أعلنوا قواعد استخدام المناطق المشتركة كتابةً.',
        'أجروا التغييرات في المناطق المشتركة بقرار من الجمعية وبتصريح عند الحاجة.',
      ],
      faq: [
        ['هل يمكن التهرب من تكاليف المناطق المشتركة؟', 'عدم استخدام المناطق المشتركة لا يسقط الالتزام بالمساهمة في التكاليف.'],
      ],
    },
  },
  'arsa-payi': {
    en: {
      explain: [
        "Land share (arsa payı) is the share ratio of an independent unit in the land of the main property and is written in the land registry. The sharing of common expenses, the voting majority and some decision thresholds are calculated by land share.",
        'Unless a different expense measure is set in the management plan, staff costs such as the janitor are shared equally and other common expenses in proportion to land share (KMK Article 20). For the manager and some decisions, a majority by both number of persons and land share is required.',
      ],
      tips: [
        'Verify your land shares from the title deed record.',
        'You can see a sample distribution with the dues-sharing calculator.',
      ],
      faq: [
        ['Can the land share be changed?', 'Changing land shares depends on land registry and statutory conditions and requires legal advice.'],
      ],
    },
    ru: {
      explain: [
        'Доля земельного участка (arsa payı) — это доля отдельного помещения в земельном участке основного имущества, указанная в земельном реестре. Распределение общих расходов, большинство голосов и некоторые пороги решений рассчитываются по доле земельного участка.',
        'Если план управления не устанавливает иной критерий расходов, расходы на персонал, такой как привратник, делятся поровну, а прочие общие расходы — пропорционально доле земельного участка (ст. 20 KMK). Для выбора управляющего и некоторых решений требуется большинство и по числу лиц, и по доле земельного участка.',
      ],
      tips: [
        'Проверьте свои доли земельного участка по правоустанавливающим документам.',
        'Примерное распределение можно увидеть в калькуляторе распределения взносов.',
      ],
      faq: [
        ['Можно ли изменить долю земельного участка?', 'Изменение долей зависит от условий земельного реестра и закона и требует юридической консультации.'],
      ],
    },
    ar: {
      explain: [
        'حصة الأرض (arsa payı) هي نسبة حصة الوحدة المستقلة في أرض العقار الأساسي وهي مكتوبة في سجل الطابو. ويُحسب توزيع المصروفات المشتركة وأغلبية التصويت وبعض نصابات القرار بحسب حصة الأرض.',
        'ما لم تحدد خطة الإدارة معيار مصروفات مختلفاً، تُوزَّع تكاليف الموظفين كالبواب بالتساوي وسائر المصروفات المشتركة بنسبة حصة الأرض (المادة 20 من KMK). وللمدير ولبعض القرارات تُشترط أغلبية من حيث عدد الأشخاص وحصة الأرض معاً.',
      ],
      tips: [
        'تحققوا من حصص أرضكم من سجل سند الملكية.',
        'يمكنكم مشاهدة توزيع تقريبي عبر حاسبة توزيع المستحقات.',
      ],
      faq: [
        ['هل يمكن تغيير حصة الأرض؟', 'يعتمد تغيير حصص الأرض على شروط الطابو والقانون ويتطلب استشارة قانونية.'],
      ],
    },
  },
  'gecikme-tazminati-5-yasal-faiz': {
    en: {
      explain: [
        'KMK Article 20/2 provides for late-payment compensation of 5% per month, for the period of delay, for an owner who does not pay the expense or advance share. This compensation is independent of statutory interest and is an obligation arising from the law.',
        'For collection, management should tie the reminder, warning and enforcement steps to a written procedure. Support from a legal advisor should be obtained on the calculation of the compensation and details of putting it into enforcement.',
      ],
      tips: [
        "Set the start date of the delay according to the dues due date.",
        'Prepare the debt statement month by month.',
      ],
      faq: [
        ['Is late-payment compensation monthly or annual?', 'The law sets it at 5% per month.'],
      ],
    },
    ru: {
      explain: [
        'Ст. 20/2 KMK предусматривает для собственника, не оплатившего расходы или авансовый взнос, компенсацию за просрочку в размере 5% в месяц за период просрочки. Эта компенсация не зависит от законных процентов и является обязательством, вытекающим из закона.',
        'Для взыскания управлению следует закрепить напоминания, претензии и шаги исполнительного производства в письменной процедуре. По расчёту компенсации и деталям её включения в исполнительное производство следует получить поддержку юриста.',
      ],
      tips: [
        'Определяйте начало просрочки по сроку оплаты взносов.',
        'Готовьте расчёт долга помесячно.',
      ],
      faq: [
        ['Компенсация за просрочку месячная или годовая?', 'Закон устанавливает её в размере 5% в месяц.'],
      ],
    },
    ar: {
      explain: [
        'تنص المادة 20/2 من KMK على تعويض تأخير بنسبة 5% شهرياً عن مدة التأخير للمالك الذي لا يسدد حصة المصروف أو الدفعة المقدمة. وهذا التعويض مستقل عن الفائدة القانونية وهو التزام ناشئ عن القانون.',
        'وللتحصيل ينبغي للإدارة ربط خطوات التذكير والإنذار والمتابعة التنفيذية بإجراء مكتوب. وينبغي أخذ دعم مستشار قانوني بشأن احتساب التعويض وتفاصيل إدراجه في المتابعة التنفيذية.',
      ],
      tips: [
        'حدّدوا بداية التأخر بحسب موعد استحقاق المستحقات.',
        'أعدّوا كشف المديونية شهراً بشهر.',
      ],
      faq: [
        ['هل تعويض التأخير شهري أم سنوي؟', 'حدده القانون بنسبة 5% شهرياً.'],
      ],
    },
  },
  'ilamsiz-icra-takibi-aidat-borcu': {
    en: {
      explain: [
        "Non-judgment enforcement is the route a creditor starts through UYAP without a court decision. For dues debt, the manager starts the proceedings with the approved operating budget, the decision book and a debt statement; a payment order is served on the debtor.",
        'If no objection is made in time, the proceedings become final and move to the attachment stage; if there is an objection, the proceedings stop and an action to annul the objection comes up. Because missing documents can prolong the process, it is important to prepare the file completely before the proceedings.',
      ],
      tips: [
        'Verify the service address and the debt amount in advance.',
        'Plan the time limits together with a lawyer.',
      ],
      faq: [
        ['Is a lawyer mandatory for the proceedings?', 'The manager can also start the proceedings; lawyer support is recommended at the objection and lawsuit stages.'],
      ],
    },
    ru: {
      explain: [
        'Исполнительное производство без судебного решения — это путь, который кредитор начинает через UYAP без решения суда. При долге по взносам управляющий начинает производство с утверждённым бюджетом эксплуатации, книгой решений и расчётом долга; должнику вручается платёжный приказ.',
        'Если возражение не подано в срок, производство становится окончательным и переходит к аресту имущества; если возражение подано, производство приостанавливается и возникает иск об отмене возражения. Поскольку отсутствие документов может затянуть процесс, важно полностью подготовить дело до начала производства.',
      ],
      tips: [
        'Заранее проверьте адрес вручения и сумму долга.',
        'Планируйте сроки вместе с юристом.',
      ],
      faq: [
        ['Обязателен ли юрист для производства?', 'Производство может начать и управляющий; на стадиях возражения и иска рекомендуется помощь юриста.'],
      ],
    },
    ar: {
      explain: [
        'المتابعة التنفيذية دون حكم هي الطريق الذي يبدأه الدائن عبر UYAP دون قرار من المحكمة. وفي دين المستحقات يبدأ المدير المتابعة بمشروع التشغيل المعتمد ودفتر القرارات وكشف المديونية؛ ويُبلَّغ المدين بأمر الدفع.',
        'وإن لم يُعترض في الموعد تصبح المتابعة نهائية وتنتقل إلى مرحلة الحجز؛ وإن وُجد اعتراض تتوقف المتابعة وتُطرح دعوى إبطال الاعتراض. ولأن نقص المستندات قد يطيل العملية، من المهم إعداد الملف كاملاً قبل المتابعة.',
      ],
      tips: [
        'تحققوا مسبقاً من عنوان التبليغ ومبلغ الدين.',
        'خطّطوا للمدد مع محامٍ.',
      ],
      faq: [
        ['هل المحامي إلزامي للمتابعة؟', 'يستطيع المدير بدء المتابعة أيضاً؛ ويُنصح بدعم محامٍ في مرحلتي الاعتراض والدعوى.'],
      ],
    },
  },
  'mali-ibra': {
    en: {
      explain: [
        "Financial release (mali ibra) is the unit owners' assembly examining and approving the manager's accounts and activities for a certain period and thereby releasing them from responsibility. It is usually voted at the ordinary general assembly on the basis of the auditor's report and the income-expense statement.",
        'For a manager who is not released, account disputes or compensation processes may come up depending on the case. The reasoning of the release decision should be written clearly in the decision book.',
      ],
      tips: [
        'Open the documents for owners to review before the release vote.',
        'A handover record makes release easier when the manager changes.',
      ],
      faq: [
        ['What does not being released mean?', 'It means the accounts are not accepted; the consequences vary with the nature of the situation and may require legal advice.'],
      ],
    },
    ru: {
      explain: [
        'Финансовое освобождение от ответственности (mali ibra) — это рассмотрение и одобрение собранием собственников счетов и деятельности управляющего за определённый период с освобождением его от ответственности. Обычно голосуется на очередном общем собрании на основе отчёта ревизора и таблицы доходов и расходов.',
        'В отношении управляющего, не получившего освобождения, в зависимости от обстоятельств могут возникнуть споры о счетах или процедуры взыскания ущерба. Обоснование решения об освобождении следует чётко записать в книгу решений.',
      ],
      tips: [
        'Перед голосованием откройте документы для изучения собственниками.',
        'Акт передачи облегчает освобождение при смене управляющего.',
      ],
      faq: [
        ['Что означает непредоставление освобождения?', 'Это означает, что счета не приняты; последствия зависят от характера ситуации и могут требовать юридической консультации.'],
      ],
    },
    ar: {
      explain: [
        'الإبراء المالي (mali ibra) هو قيام جمعية الملاك بفحص حسابات المدير وأنشطته عن فترة معينة والموافقة عليها وإبراء ذمته من المسؤولية. ويُصوَّت عليه عادةً في الجمعية العمومية العادية على أساس تقرير المراقب وجدول الإيرادات والمصروفات.',
        'وبحق المدير غير المبرَّأ قد تنشأ، بحسب الحالة، نزاعات حول الحسابات أو إجراءات تعويض. وينبغي كتابة تعليل قرار الإبراء بوضوح في دفتر القرارات.',
      ],
      tips: [
        'أتيحوا المستندات للملاك للاطلاع عليها قبل التصويت على الإبراء.',
        'محضر التسليم يسهّل الإبراء عند تغيير المدير.',
      ],
      faq: [
        ['ماذا يعني عدم الإبراء؟', 'يعني عدم قبول الحسابات؛ وتختلف النتائج بحسب طبيعة الحالة وقد تتطلب استشارة قانونية.'],
      ],
    },
  },
  'olagan-ve-olaganustu-genel-kurul': {
    en: {
      explain: [
        "The ordinary general assembly is the meeting the unit owners' assembly holds once a year at the time stated in the management plan; the manager's report, the auditor's report, release and the operating budget are discussed at this meeting. An extraordinary general assembly is called for urgent or important matters.",
        'The call should be in writing, the agenda written clearly, and the meeting quorum and decision count recorded in the decision book. Keeping call and attendance records reduces later objections.',
      ],
      tips: [
        'Announce the meeting date and agenda in writing in advance.',
        'File the powers of attorney and the attendance register.',
      ],
      faq: [
        ['Who calls the extraordinary meeting?', 'The manager or owners who meet the conditions in the law and the management plan can call it; see the KMK and your plan for details.'],
      ],
    },
    ru: {
      explain: [
        'Очередное общее собрание — это собрание, которое собрание собственников проводит раз в год в срок, указанный в плане управления; на нём рассматриваются отчёт управляющего, отчёт ревизора, освобождение от ответственности и бюджет эксплуатации. Внеочередное общее собрание созывается по срочным или важным вопросам.',
        'Уведомление должно быть письменным, повестка — чётко сформулированной, а кворум и число голосов — внесены в книгу решений. Хранение записей об уведомлении и участии уменьшает последующие возражения.',
      ],
      tips: [
        'Заранее письменно объявите дату собрания и повестку.',
        'Подшейте доверенности и лист регистрации.',
      ],
      faq: [
        ['Кто созывает внеочередное собрание?', 'Управляющий или собственники, соблюдающие условия закона и плана управления; подробности — в KMK и вашем плане.'],
      ],
    },
    ar: {
      explain: [
        'الجمعية العمومية العادية هي الاجتماع الذي تعقده جمعية الملاك مرة سنوياً في الموعد المذكور في خطة الإدارة؛ وفيه يُناقش تقرير المدير وتقرير المراقب والإبراء ومشروع التشغيل. أما الجمعية العمومية الاستثنائية فتُدعى للمسائل العاجلة أو المهمة.',
        'يجب أن تكون الدعوة كتابية وجدول الأعمال واضحاً، وأن يُدوَّن النصاب وعدد الأصوات في دفتر القرارات. والاحتفاظ بسجلات الدعوة والحضور يقلل الاعتراضات اللاحقة.',
      ],
      tips: [
        'أعلنوا موعد الاجتماع وجدول الأعمال كتابةً مسبقاً.',
        'احفظوا الوكالات وسجل الحضور في الملف.',
      ],
      faq: [
        ['من يدعو إلى الاجتماع الاستثنائي؟', 'المدير أو الملاك المستوفون للشروط الواردة في القانون وخطة الإدارة؛ راجعوا KMK وخطتكم للتفاصيل.'],
      ],
    },
  },
  '5188-sayili-kanun': {
    en: {
      explain: [
        'Law No. 5188 on Private Security Services regulates the permits of private security companies, the training, ID cards and powers of security officers. In complexes, security service must be provided by permitted structures and personnel holding ID cards under this law.',
        "A security officer's powers are limited by the law: asking for ID, searching under certain conditions, and apprehension. Exceeding powers can create legal liability; employing a guard outside the job description, for example in cleaning, also causes problems.",
      ],
      tips: [
        "Verify the company's operating permit and the validity of personnel ID cards before the contract.",
        'Follow personal data protection principles in camera recordings.',
      ],
      faq: [
        ['Can a security officer carry out a search?', "Within the conditions and limits of the law; they do not have general law-enforcement powers. Consult a legal advisor for a specific case."],
      ],
    },
    ru: {
      explain: [
        'Закон № 5188 «О частных охранных услугах» регулирует разрешения частных охранных компаний, обучение, удостоверения и полномочия охранников. В комплексах охранные услуги должны оказываться разрешёнными структурами и персоналом с удостоверениями по этому закону.',
        'Полномочия охранника ограничены законом: запрос документов, обыск при определённых условиях, задержание. Превышение полномочий может повлечь юридическую ответственность; привлечение охранника вне должностных обязанностей, например к уборке, также создаёт проблемы.',
      ],
      tips: [
        'До заключения договора проверьте разрешение компании на деятельность и срок действия удостоверений персонала.',
        'При работе с записями камер соблюдайте принципы защиты персональных данных.',
      ],
      faq: [
        ['Может ли охранник проводить обыск?', 'В пределах условий и ограничений закона; общих полномочий правоохранительных органов у него нет. По конкретному случаю обратитесь к юристу.'],
      ],
    },
    ar: {
      explain: [
        'ينظم قانون خدمات الحراسة الخاصة رقم 5188 تراخيص شركات الحراسة الخاصة وتدريب حراس الأمن وبطاقاتهم وصلاحياتهم. وفي المجمعات يجب أن تُقدَّم خدمة الأمن عبر جهات مرخصة وأفراد يحملون بطاقات هوية وفق هذا القانون.',
        'صلاحيات حارس الأمن محدودة بالقانون: طلب الهوية والتفتيش بشروط معينة والقبض. وتجاوز الصلاحيات قد يرتب مسؤولية قانونية؛ كما أن تشغيل الحارس خارج وصف مهامه، كالنظافة مثلاً، يسبب مشكلات.',
      ],
      tips: [
        'تحققوا من ترخيص الشركة وصلاحية بطاقات الأفراد قبل العقد.',
        'التزموا بمبادئ حماية البيانات الشخصية في تسجيلات الكاميرات.',
      ],
      faq: [
        ['هل يستطيع حارس الأمن إجراء تفتيش؟', 'ضمن شروط القانون وحدوده؛ وليست له صلاحيات إنفاذ القانون العامة. وللحالات المحددة استشيروا مستشاراً قانونياً.'],
      ],
    },
  },
  'tesis-yonetimi-entegre-tesis-yonetimi': {
    en: {
      explain: [
        'Integrated facility management is the planning of cleaning, security, technical maintenance, landscaping and administrative/financial work under a single management umbrella. The aim is to reduce the coordination gaps created by separate contractors and to clarify responsibility.',
        'In the integrated model, the scope of service, performance indicators and reporting are defined in writing. Pricing each service as a separate item makes comparison and supervision easier.',
      ],
      tips: [
        'Have the scope of service written item by item.',
        'Clarify the format of monthly reports from the start.',
      ],
      faq: [
        ['Is integrated management suitable for every building?', 'It depends on the size and needs of the building; in small buildings, selecting services item by item may be more suitable.'],
      ],
    },
    ru: {
      explain: [
        'Комплексное управление объектами — это планирование уборки, охраны, технического обслуживания, озеленения и административно-финансовых работ под единым управляющим началом. Цель — сократить пробелы в координации, создаваемые отдельными подрядчиками, и прояснить ответственность.',
        'В комплексной модели объём услуг, показатели эффективности и отчётность определяются письменно. Отдельное ценообразование каждой услуги облегчает сравнение и контроль.',
      ],
      tips: [
        'Попросите прописать объём услуг по статьям.',
        'С самого начала уточните формат ежемесячных отчётов.',
      ],
      faq: [
        ['Подходит ли комплексное управление каждому зданию?', 'Это зависит от размера и потребностей здания; в небольших зданиях может быть уместнее выбор услуг по статьям.'],
      ],
    },
    ar: {
      explain: [
        'إدارة المرافق المتكاملة هي تخطيط أعمال النظافة والأمن والصيانة الفنية وتنسيق الحدائق والأعمال الإدارية والمالية تحت مظلة إدارة واحدة. والهدف تقليل فجوات التنسيق التي يخلقها تعدد المقاولين وتوضيح المسؤولية.',
        'وفي النموذج المتكامل يُحدَّد نطاق الخدمة ومؤشرات الأداء والتقارير كتابةً. وتسعير كل خدمة كبند منفصل يسهّل المقارنة والإشراف.',
      ],
      tips: [
        'اطلبوا كتابة نطاق الخدمة بنداً بنداً.',
        'وضّحوا شكل التقارير الشهرية منذ البداية.',
      ],
      faq: [
        ['هل تناسب الإدارة المتكاملة كل مبنى؟', 'يعتمد ذلك على حجم المبنى واحتياجاته؛ وفي المباني الصغيرة قد يكون اختيار الخدمات بنداً بنداً أنسب.'],
      ],
    },
  },
  'hizmet-seviyesi-taahhudu-sla': {
    en: {
      explain: [
        "A service level agreement (SLA) defines in writing what service a provider will deliver at what quality and in what time. In facility management, indicators such as emergency response time, reporting frequency and keeping fault records are tied to the SLA.",
        "Alo Yönetim's emergency response target under its written SLA is 30 minutes on the Anatolian Side and 1 hour on the European Side; time and scope depend on the contract terms.",
      ],
      tips: [
        'Write the SLA target into the contract together with the measurement method.',
        'Set the sanction that applies if the target is exceeded.',
      ],
      faq: [
        ['What is an SLA, what does SLA time mean?', 'An SLA (Service Level Agreement) defines in writing how quickly a service provider will respond to a request and how quickly it will resolve the work. "SLA time" is this committed response or resolution time; for example, the time to reach the site in an emergency fault.'],
        ['Is an SLA the same as a guarantee?', 'No. An SLA is a target and measurement framework; results depend on the terms in the contract.'],
      ],
    },
    ru: {
      explain: [
        'Соглашение об уровне обслуживания (SLA) письменно определяет, какую услугу, с каким качеством и в какие сроки оказывает поставщик. В управлении объектами с SLA связываются такие показатели, как время экстренного реагирования, периодичность отчётов и ведение записей о неисправностях.',
        'Целевое время экстренного реагирования Alo Yönetim по письменному SLA — 30 минут на азиатской стороне и 1 час на европейской; срок и объём зависят от условий договора.',
      ],
      tips: [
        'Пропишите целевой показатель SLA в договоре вместе с методом измерения.',
        'Определите санкцию, применяемую при превышении срока.',
      ],
      faq: [
        ['Что такое SLA, что означает срок SLA?', 'SLA (Service Level Agreement / соглашение об уровне обслуживания) письменно определяет, как быстро поставщик услуг отреагирует на обращение и как быстро выполнит работу. «Срок SLA» — это обещанный срок реагирования или решения; например, время прибытия на объект при аварийной неисправности.'],
        ['SLA — это то же самое, что гарантия?', 'Нет. SLA — это целевой показатель и рамка измерения; результаты зависят от условий договора.'],
      ],
    },
    ar: {
      explain: [
        'اتفاقية مستوى الخدمة (SLA) تحدد كتابةً ما الخدمة التي سيقدمها المزود وبأي جودة وفي أي زمن. وفي إدارة المرافق تُربط بالاتفاقية مؤشرات مثل زمن الاستجابة للطوارئ وتكرار التقارير ومسك سجلات الأعطال.',
        'هدف Alo Yönetim للاستجابة الطارئة وفق اتفاقية مستوى الخدمة المكتوبة هو 30 دقيقة في الجانب الآسيوي وساعة واحدة في الجانب الأوروبي؛ ويعتمد الزمن والنطاق على شروط العقد.',
      ],
      tips: [
        'اكتبوا هدف SLA في العقد مع طريقة القياس.',
        'حدّدوا الجزاء الذي يسري عند تجاوز الهدف.',
      ],
      faq: [
        ['ما هو SLA وماذا تعني مدة SLA؟', 'يحدد SLA (اتفاقية مستوى الخدمة) كتابياً المدة التي سيستجيب خلالها مقدم الخدمة للطلب والمدة التي سينجز خلالها العمل. و«مدة SLA» هي مدة الاستجابة أو الحل المتعهد بها؛ مثل زمن الوصول إلى الموقع عند عطل طارئ.'],
        ['هل SLA هو نفسه الضمان؟', 'لا. SLA هدف وإطار قياس؛ وتعتمد النتائج على الشروط الواردة في العقد.'],
      ],
    },
  },
  'toplu-yapi-kmk-m66-70': {
    en: {
      explain: [
        'A collective structure (toplu yapı) is a settlement made up of more than one building and managed under a common management plan. Blocks form their own unit owners\' assemblies; shared facilities (security, landscaping, pool, car park, etc.) are run by the collective-structure management.',
        'Law No. 7579 lowered the majority needed to amend the management plan in collective structures from four-fifths to two-thirds in KMK Article 70. It also states that provisions of a plan contrary to this ratio will not be applied.',
      ],
      tips: [
        'Verify from the title deed and project structure whether your complex is a collective structure.',
        'Show block and collective-structure expenses separately in the operating budget.',
      ],
      faq: [
        ['How many votes are needed to amend the plan in a collective structure?', 'Two-thirds under KMK Article 70; in single buildings, four-fifths under Article 28/3.'],
      ],
    },
    ru: {
      explain: [
        'Комплекс из нескольких зданий (toplu yapı) — это застройка, состоящая из нескольких зданий и управляемая по общему плану управления. Блоки образуют собственные собрания собственников; общие объекты (охрана, озеленение, бассейн, парковка и т. д.) эксплуатирует управление комплекса.',
        'Законом № 7579 в ст. 70 KMK большинство, необходимое для изменения плана управления в таких комплексах, снижено с четырёх пятых до двух третей. Также указано, что положения плана, противоречащие этому порогу, применяться не будут.',
      ],
      tips: [
        'Проверьте по правоустанавливающим документам и структуре проекта, является ли ваш комплекс комплексом из нескольких зданий.',
        'Показывайте расходы блока и комплекса отдельно в бюджете эксплуатации.',
      ],
      faq: [
        ['Сколько голосов нужно для изменения плана в комплексе из нескольких зданий?', 'Две трети по ст. 70 KMK; в отдельных зданиях — четыре пятых по ст. 28/3.'],
      ],
    },
    ar: {
      explain: [
        'المبنى الجماعي (toplu yapı) تجمع سكني يتكون من أكثر من مبنى ويُدار بخطة إدارة مشتركة. وتشكل المباني جمعيات ملاك خاصة بها؛ أما المرافق المشتركة (الأمن وتنسيق الحدائق والمسبح والموقف وغيرها) فتديرها إدارة المبنى الجماعي.',
        'وقد خفّض القانون رقم 7579 الأغلبية اللازمة لتعديل خطة الإدارة في المباني الجماعية من أربعة أخماس إلى الثلثين في المادة 70 من KMK. كما نصّ على عدم تطبيق أحكام الخطة المخالفة لهذه النسبة.',
      ],
      tips: [
        'تحققوا من سند الملكية وهيكل المشروع مما إذا كان مجمعكم مبنى جماعياً.',
        'أظهروا مصروفات المبنى ومصروفات المبنى الجماعي بشكل منفصل في مشروع التشغيل.',
      ],
      faq: [
        ['كم صوتاً يلزم لتعديل الخطة في المبنى الجماعي؟', 'الثلثان وفق المادة 70 من KMK؛ وفي المباني المنفردة أربعة أخماس وفق المادة 28/3.'],
      ],
    },
  },
  denetci: {
    en: {
      explain: [
        "The auditor is the person who audits the manager's activities and accounts. They examine the cash and bank accounts, income-expense documents and the decision book, and submit their report to the unit owners' assembly.",
        "The auditor's regular access to documents and bank movements is the basis of transparent management. The management plan can regulate the auditor's election, term of office and fee.",
      ],
      tips: [
        "Put the audit report on the general assembly's agenda.",
        'Take care that there is no conflict of interest between the auditor and the manager.',
      ],
      faq: [
        ['Must the auditor be an owner?', 'It depends on the management plan and the assembly decision; see your plan.'],
      ],
    },
    ru: {
      explain: [
        'Ревизор — лицо, проверяющее деятельность и счета управляющего. Он изучает кассу и банковские счета, документы о доходах и расходах и книгу решений и представляет отчёт собранию собственников.',
        'Регулярный доступ ревизора к документам и движению средств по счетам — основа прозрачного управления. План управления может регулировать избрание ревизора, срок его полномочий и вознаграждение.',
      ],
      tips: [
        'Включайте отчёт ревизора в повестку общего собрания.',
        'Следите за тем, чтобы между ревизором и управляющим не было конфликта интересов.',
      ],
      faq: [
        ['Должен ли ревизор быть собственником?', 'Это зависит от плана управления и решения собрания; смотрите ваш план.'],
      ],
    },
    ar: {
      explain: [
        'المراقب (Denetçi) هو الشخص الذي يدقق في أنشطة المدير وحساباته. فيفحص الصندوق والحسابات البنكية ومستندات الإيرادات والمصروفات ودفتر القرارات ويقدم تقريره إلى جمعية الملاك.',
        'واطلاع المراقب المنتظم على المستندات وحركات الحساب هو أساس الإدارة الشفافة. ويجوز لخطة الإدارة أن تنظم انتخاب المراقب ومدة ولايته وأجره.',
      ],
      tips: [
        'أدرجوا تقرير التدقيق في جدول أعمال الجمعية العمومية.',
        'احرصوا على ألا يوجد تضارب مصالح بين المراقب والمدير.',
      ],
      faq: [
        ['هل يجب أن يكون المراقب مالكاً؟', 'يعتمد ذلك على خطة الإدارة وقرار الجمعية؛ راجعوا خطتكم.'],
      ],
    },
  },
};
