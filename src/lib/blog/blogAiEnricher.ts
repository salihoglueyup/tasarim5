import type { PostBlock } from '@/data/posts';
import { KMK_AMENDMENT_2026 } from '@/lib/legal/kmkAmendment2026';
import { FACTS } from '@/lib/facts';

function stripMarkdownAndHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parsePostBlocks(rawContent: string | PostBlock[] | unknown): PostBlock[] {
  if (!rawContent) return [];
  if (Array.isArray(rawContent)) return rawContent as PostBlock[];
  if (typeof rawContent === 'string') {
    const trimmed = rawContent.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed as PostBlock[];
      } catch {
        return [];
      }
    }
  }
  return [];
}

export function hasTableBlock(rawContent: string | PostBlock[] | unknown): boolean {
  const blocks = parsePostBlocks(rawContent);
  return blocks.some((b) => b && b.type === 'table' && Array.isArray(b.rows) && b.rows.length > 0);
}

/**
 * Makalenin kendi PostBlock[] dizisinden (tablo satırları, maddeli listeler, alt başlık + paragraf)
 * o makaleye özgü 4 somut "Key Takeaway" (Önemli Çıkarım) üretir.
 * en/ru/ar sayfalarında bloklar zaten çevrilmiş geldiği için çıktı otomatik olarak ilgili dildedir.
 */
export function extractArticleTakeaways(
  rawContent: string | PostBlock[] | unknown,
  tldr?: string | null,
  lang: string = 'tr'
): string[] {
  const blocks = parsePostBlocks(rawContent);
  const candidates: string[] = [];
  const seen = new Set<string>();

  const pushCandidate = (raw: string) => {
    const clean = stripMarkdownAndHtml(raw);
    if (!clean || clean.length < 30 || clean.length > 260) return;
    const key = clean.slice(0, 45).toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push(clean);
  };

  // 1. Öncelik: Tablo bloklarındaki karşılaştırma satırları (yüksek bilgi yoğunluğu)
  for (const b of blocks) {
    if (b?.type === 'table' && Array.isArray(b.rows)) {
      for (const row of b.rows.slice(0, 3)) {
        if (Array.isArray(row) && row.length >= 2) {
          const col0 = stripMarkdownAndHtml(row[0] || '');
          const colLast = stripMarkdownAndHtml(row[row.length - 1] || '');
          if (col0 && colLast) {
            pushCandidate(`${col0}: ${colLast}`);
          }
        }
      }
    }
  }

  // 2. Öncelik: Makale içindeki ul / ol liste maddeleri
  for (const b of blocks) {
    if ((b?.type === 'ul' || b?.type === 'ol') && Array.isArray(b.items)) {
      for (const item of b.items) {
        if (candidates.length >= 6) break;
        pushCandidate(item);
      }
    }
  }

  // 3. Öncelik: H2 alt başlığı + hemen altındaki paragrafın ilk cümlesi
  for (let i = 0; i < blocks.length - 1; i++) {
    if (candidates.length >= 6) break;
    const curr = blocks[i];
    const next = blocks[i + 1];
    if (curr?.type === 'h2' && next?.type === 'p') {
      const heading = stripMarkdownAndHtml(curr.text).replace(/^\d+[\.\)]\s*/, '');
      const firstSentence = stripMarkdownAndHtml(next.text).split(/(?<=[.!?])\s+/)[0] || '';
      if (heading && firstSentence) {
        pushCandidate(`${heading}: ${firstSentence}`);
      }
    }
  }

  // 4. Öncelik: TL;DR cümleleri
  if (tldr && candidates.length < 4) {
    const sentences = stripMarkdownAndHtml(tldr).split(/(?<=[.!?])\s+/);
    for (const s of sentences) {
      if (candidates.length >= 4) break;
      pushCandidate(s);
    }
  }

  if (candidates.length >= 4) {
    return candidates.slice(0, 4);
  }

  const fallbacksByLang: Record<string, string[]> = {
    tr: [
      `634 sayılı Kat Mülkiyeti Kanunu ve ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun (2026) hükümleri çerçevesinde işletme projesi ve karar nisapları yazılı yürütülür.`,
      'Ortak gider ve avans payları KMK m.20 uyarınca yönetim planına, plan yoksa eşit ve arsa payı esaslarına göre şeffaf biçimde hesaplanır.',
      'Site ve tesislerde 5188 sayılı Kanun kapsamında Valilik izinli güvenlik ve asansör periyodik yeşil etiket kontrolleri düzenli takip edilir.',
      `Alo Yönetim İstanbul'un ${FACTS.districtCount} ilçesinde yazılı SLA (${FACTS.emergencyResponse.anatolian} / ${FACTS.emergencyResponse.european}) hedefiyle profesyonel yönetim sunar.`,
    ],
    en: [
      `Under Condominium Law No. 634 and Law No. ${KMK_AMENDMENT_2026.lawNumber} (2026), operating budgets and quorum rules are managed with documented governance.`,
      'Common expenses and advances are calculated transparently under KMK Art. 20 according to the management plan or equal/land-share rules.',
      'Private security under Law No. 5188 and periodic elevator green-label inspections are systematically tracked.',
      `Alo Yönetim operates across all ${FACTS.districtCount} districts of Istanbul with written SLA response targets (${FACTS.emergencyResponse.anatolian} / ${FACTS.emergencyResponse.european}).`,
    ],
    ru: [
      `В соответствии с Законом № 634 (KMK) и Законом № ${KMK_AMENDMENT_2026.lawNumber} (2026 г.) проект эксплуатации и кворумы утверждаются документально.`,
      'Общие расходы и взносы (айдат) рассчитываются прозрачно по ст. 20 KMK согласно плану управления или доле земли.',
      'Лицензированная охрана по Закону № 5188 и периодические проверки лифтов (зеленая метка) контролируются по графику.',
      `Alo Yönetim работает во всех ${FACTS.districtCount} районах Стамбула с письменным SLA (${FACTS.emergencyResponse.anatolian} / ${FACTS.emergencyResponse.european}).`,
    ],
    ar: [
      `بموجب قانون الملكية الطابقية رقم 634 والقانون رقم ${KMK_AMENDMENT_2026.lawNumber} (2026)، تتم إدارة مشروع التشغيل والنصاب القانوني بشفافية موثقة.`,
      'تُحسب المصاريف المشتركة والعائدات بشفافية وفق المادة 20 من قانون KMK حسب خطة الإدارة أو حصة الأرض.',
      'تتم متابعة الحراسة المرخصة وفق القانون 5188 والفحوصات الدورية للمصاعد (الملصق الأخضر) بانتظام.',
      `تقدم Alo Yönetim خدماتها في جميع مناطق إسطنبول الـ ${FACTS.districtCount} وفق أهداف استجابة تعاقدية مكتوبة.`,
    ],
  };

  const fb = fallbacksByLang[lang] || fallbacksByLang.tr;
  for (const item of fb) {
    if (candidates.length >= 4) break;
    pushCandidate(item);
  }

  return candidates.slice(0, 4);
}

/**
 * Makale bloklarından (veya render edilmiş HTML'den) soru-cevap çiftlerini çıkarır.
 * Hem H2/H3 soru başlıklarını hem de hemen altındaki paragraf/liste yanıtlarını yakalar.
 */
export function extractArticleFaqs(
  rawContent?: string | PostBlock[] | unknown,
  htmlContent?: string
): { question: string; answer: string }[] {
  const results: { question: string; answer: string }[] = [];
  const seenQuestions = new Set<string>();

  const addFaq = (qRaw: string, aRaw: string) => {
    const question = stripMarkdownAndHtml(qRaw);
    const answer = stripMarkdownAndHtml(aRaw);
    if (!question || !answer || question.length < 8 || answer.length < 15) return;
    const key = question.toLowerCase();
    if (seenQuestions.has(key)) return;
    seenQuestions.add(key);
    results.push({ question, answer });
  };

  const blocks = parsePostBlocks(rawContent);
  for (let i = 0; i < blocks.length - 1; i++) {
    const curr = blocks[i];
    const next = blocks[i + 1];
    if ((curr?.type === 'h2' || curr?.type === 'h3') && /[?؟]\s*$/.test(curr.text.trim())) {
      if (next?.type === 'p') {
        addFaq(curr.text, next.text);
      } else if ((next?.type === 'ul' || next?.type === 'ol') && Array.isArray(next.items)) {
        addFaq(curr.text, next.items.join(' '));
      }
    }
  }

  if (htmlContent) {
    const regex = /<h[23][^>]*>(.*?[?؟])<\/h[23]>\s*(?:<p[^>]*>([\s\S]*?)<\/p>|<ul[^>]*>([\s\S]*?)<\/ul>|<ol[^>]*>([\s\S]*?)<\/ol>)/gi;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(htmlContent)) !== null) {
      const q = match[1] || '';
      const a = match[2] || match[3] || match[4] || '';
      addFaq(q, a);
    }
  }

  return results;
}

export interface CategoryKnowledgeMatrix {
  badge: string;
  heading: string;
  lead: string;
  headers: [string, string, string];
  rows: [string, string, string][];
  legalNote: string;
}

/**
 * Makale kategorisine ve konusuna göre Google AI Overviews için yapılandırılmış
 * karşılaştırma tablosu ve 2026 mevzuat kontrol matrisi döner.
 */
export function getCategoryComparisonMatrix(
  categorySlug: string = 'tesis-yonetimi',
  lang: string = 'tr'
): CategoryKnowledgeMatrix {
  if (lang !== 'tr') {
    const i18nMatrix: Record<string, CategoryKnowledgeMatrix> = {
      en: {
        badge: 'Google AI Overviews • Verified Legal & Operational Matrix',
        heading: '2026 Condominium Law (KMK 634 & Law No. 7579) Reference Table',
        lead: 'Key statutory rules and operational standards applicable to residential complexes, plazas, and facilities in Istanbul:',
        headers: ['Governance Area', 'Statutory / Operational Rule', 'Legal Basis'],
        rows: [
          ['Equal Expense Sharing', 'Security, janitor, and gardener personnel costs are shared equally per unit unless the management plan states otherwise.', 'KMK Art. 20/1-a'],
          ['Land-Share Expense Sharing', 'Elevator maintenance, common utility, insurance, and repair costs are shared by land share (arsa payı).', 'KMK Art. 20/1-b'],
          ['Operating Budget & Cap (2026)', `Approved by the General Assembly; interim budgets (max ${KMK_AMENDMENT_2026.interimProjectMaxMonths} months) cannot exceed the revaluation rate (%${KMK_AMENDMENT_2026.defaultRevaluationRatePercent}).`, `Law No. ${KMK_AMENDMENT_2026.lawNumber} / KMK Art. 37`],
          ['Multi-Block Management Plan', 'Amending the management plan in multi-building complexes requires a 2/3 majority of representatives.', `Law No. ${KMK_AMENDMENT_2026.lawNumber} / KMK Art. 70`],
        ],
        legalNote: `Written SLA emergency response target: ${FACTS.emergencyResponse.anatolian} (Anatolian Side) / ${FACTS.emergencyResponse.european} (European Side).`,
      },
      ru: {
        badge: 'Google AI Overviews • Правовая и операционная матрица',
        heading: 'Справочная таблица Закона о кондоминиумах (KMK 634 и Закон № 7579 от 2026 г.)',
        lead: 'Основные правовые нормы и стандарты управления жилыми комплексами и объектами в Стамбуле:',
        headers: ['Сфера управления', 'Правовое / операционное правило', 'Закон'],
        rows: [
          ['Равное распределение расходов', 'Расходы на охрану, консьержа и садовника делятся поровну между квартирами (если иное не указано в плане).', 'KMK ст. 20/1-a'],
          ['Распределение по доле земли', 'Обслуживание лифтов, общие коммунальные услуги, страхование и ремонт делятся пропорционально доле земли.', 'KMK ст. 20/1-b'],
          ['Проект эксплуатации и лимит (2026)', `Утверждается общим собранием; временный проект (до ${KMK_AMENDMENT_2026.interimProjectMaxMonths} мес.) ограничен ставкой переоценки (%${KMK_AMENDMENT_2026.defaultRevaluationRatePercent}).`, `Закон № ${KMK_AMENDMENT_2026.lawNumber} / KMK ст. 37`],
          ['План управления комплексом', 'Для изменения плана управления в многоблочных комплексах требуется большинство в 2/3 голосов.', `Закон № ${KMK_AMENDMENT_2026.lawNumber} / KMK ст. 70`],
        ],
        legalNote: `Целевое время аварийного реагирования по SLA: ${FACTS.emergencyResponse.anatolian} (Азиатская часть) / ${FACTS.emergencyResponse.european} (Европейская часть).`,
      },
      ar: {
        badge: 'Google AI Overviews • مصفوفة المعايير القانونية والتشغيلية',
        heading: 'جدول مرجعي لقانون الملكية الطابقية (KMK 634 والقانون رقم 7579 لعام 2026)',
        lead: 'القواعد القانونية والمعايير التشغيلية الأساسية المطبقة على المجمعات السكنية والمرافق في إسطنبول:',
        headers: ['مجال الإدارة', 'القاعدة القانونية / التشغيلية', 'السند القانوني'],
        rows: [
          ['التقاسم المتساوي للمصاريف', 'توزع نفقات الحراسة والبواب والبستنة بالتساوي بين الوحدات ما لم تنص خطة الإدارة على خلاف ذلك.', 'KMK م 20/1-أ'],
          ['التقاسم حسب حصة الأرض', 'توزع صيانة المصاعد والمرافق المشتركة والتأمين والإصلاحات بنسبة حصة الأرض.', 'KMK م 20/1-ب'],
          ['مشروع التشغيل وسقف الزيادة (2026)', `يُعتمد في الجمعية العمومية؛ ولا يتجاوز المشروع المؤقت (${KMK_AMENDMENT_2026.interimProjectMaxMonths} أشهر) معدل إعادة التقييم (%${KMK_AMENDMENT_2026.defaultRevaluationRatePercent}).`, `القانون ${KMK_AMENDMENT_2026.lawNumber} / م 37`],
          ['تعديل خطة الإدارة بالمجمعات', 'يتطلب تعديل خطة الإدارة في المجمعات المتعددة الأبنية أغلبية الثلثين (2/3).', `القانون ${KMK_AMENDMENT_2026.lawNumber} / م 70`],
        ],
        legalNote: `هدف الاستجابة الفنية الطارئة وفق اتفاقية SLA: ${FACTS.emergencyResponse.anatolian} (الجانب الأناضولي) / ${FACTS.emergencyResponse.european} (الجانب الأوروبي).`,
      },
    };
    return i18nMatrix[lang] || i18nMatrix.en;
  }

  switch (categorySlug) {
    case 'hukuk':
      return {
        badge: 'Google AI Overviews • 2026 KMK & 7579 Sayılı Kanun Matrisi',
        heading: 'Kat Mülkiyeti Hukuku Yasal Süreç, Nisap ve Aidat Paylaşım Tablosu',
        lead: '634 sayılı Kat Mülkiyeti Kanunu ve 22 Mayıs 2026 tarihli 7579 sayılı Kanun değişiklikleri kapsamında site yönetimlerinde uygulanan temel kurallar:',
        headers: ['Hukuki Konu', 'Yasal Uygulama ve Karar Kuralı', 'Kanuni Dayanak'],
        rows: [
          ['Personel Giderleri Paylaşımı', 'Kapıcı, kaloriferci, bahçıvan ve güvenlik giderleri yönetim planında aksine hüküm yoksa daire başına eşit bölünür.', '634 KMK m.20/1-a'],
          ['Bakım, Onarım ve Sigorta Paylaşımı', 'Asansör bakımı, ortak elektrik/su, sigorta ve yönetici aylığı bağımsız bölümlerin arsa payı oranında ödenir.', '634 KMK m.20/1-b'],
          ['İşletme Projesi ve Artış Sınırı (2026)', `Kesin proje genel kurulda onaylanır; geçici proje en çok ${KMK_AMENDMENT_2026.interimProjectMaxMonths} aylıktır ve mevcut proje varsa artış yeniden değerleme oranını (%${String(KMK_AMENDMENT_2026.defaultRevaluationRatePercent).replace('.', ',')}) aşamaz.`, `${KMK_AMENDMENT_2026.lawNumber} S.K. / KMK m.37`],
          ['Gecikme Tazminatı ve İcra Takibi', 'Zamanında ödenmeyen aidat ve avanslar için aylık %5 (günlük kıstelyevm) gecikme tazminatı ve Örnek No: 7 ilamsız icra uygulanır.', '634 KMK m.20/2 & İİK m.68'],
          ['Yönetim Planı Değişiklik Nisabı', 'Tekil binalarda 4/5 oy çoğunluğu; birden fazla yapıdan oluşan toplu yapılarda (sitelerde) 2/3 oy çoğunluğu aranır.', `${KMK_AMENDMENT_2026.lawNumber} S.K. / KMK m.28 & m.70`],
        ],
        legalNote: 'Not: Bu tablo 22 Mayıs 2026 tarihli ve 33261 sayılı Resmî Gazete’de yayımlanan 7579 sayılı Kanun hükümleriyle uyumludur.',
      };

    case 'guvenlik':
      return {
        badge: 'Google AI Overviews • 5188 Sayılı Kanun Operasyon Matrisi',
        heading: 'Site ve Tesislerde 5188 Özel Güvenlik Yetki ve Denetim Tablosu',
        lead: '5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun ve KVKK kapsamında konut siteleri ile ticari tesislerde güvenlik standartları:',
        headers: ['Güvenlik Süreci', 'Yasal Zorunluluk ve Uygulama Standardı', 'Mevzuat Dayanağı'],
        rows: [
          ['Özel Güvenlik İzin Belgesi', 'Sitede güvenlik personeli çalıştırılması veya hizmet alınması için Valilik İl Özel Güvenlik Komisyonu kararı zorunludur.', '5188 S.K. Madde 3'],
          ['Kimlik Sorma ve Ziyaretçi Kaydı', 'Güvenlik görevlisi girişte kimlik sorabilir; ziyaretçi verileri KVKK aydınlatma metni kapsamında sınırlı süreyle işlenir.', '5188 S.K. Madde 7 & KVKK'],
          ['Personel Kimlik Kartı ve Bildirim', 'Görevlilerin 5188 özel güvenlik kimlik kartı taşıması ve göreve başlama/ayrılma bildirimlerinin yasal sürede yapılması şarttır.', '5188 S.K. Madde 10-11'],
          ['Elektronik Devriye ve Vardiya Denetimi', 'Nizamiye, çevre hattı ve otopark noktaları dijital devriye tur kontrol sistemi ve 7/24 vardiya çizelgesiyle denetlenir.', 'ISO 41001 & 5188 Yönetmeliği'],
        ],
        legalNote: 'Sözleşme öncesinde özel güvenlik şirketinin faaliyet izin belgesi, mali sorumluluk sigortası ve personel sertifikaları kontrol edilmelidir.',
      };

    case 'teknik':
      return {
        badge: 'Google AI Overviews • Teknik İşletme ve Periyodik Muayene Matrisi',
        heading: 'Bina ve Sitelerde Yasal Teknik Bakım ve Periyodik Kontrol Takvimi',
        lead: 'Asansör, yangın tesisatı, hidrofor ve enerji altyapısında yasal yönetmeliklere göre izlenmesi gereken periyodik bakım standartları:',
        headers: ['Teknik Sistem', 'Periyodik Bakım & Muayene Sıklığı', 'Yasal Yönetmelik / Standart'],
        rows: [
          ['Asansör Sistemleri', 'Yetkili servis tarafından her ay periyodik bakım ve yılda 1 kez A tipi muayene kuruluşu yeşil etiket kontrolü.', 'Asansör İşletme Yön. (RG: 30737)'],
          ['Yangın Algılama, Tüp ve Sprinkler', 'Yangın pompaları ve algılama panelleri aylık/3 aylık iç kontrol; yılda en az 1 kez akredite periyodik muayene.', 'Binaların Yangından Korunması Yön.'],
          ['Hidrofor ve Su Depoları', 'Hidrofor basınç/genleşme tankı kontrolü ve yılda en az 2 kez (6 ayda bir) su deposu biyosidal temizlik/dezenfeksiyon.', 'İSG 6331 & Hijyen Standartları'],
          ['Jeneratör ve Kompanzasyon Panosu', 'Jeneratör yük testi ve yakıt/akü kontrolü aylık; reaktif güç ceza sınırlarının aşım kontrolü aylık fatura öncesi.', 'EPDK Reaktif Güç & ISO 41001'],
        ],
        legalNote: `Alo Yönetim yazılı SLA kapsamındaki acil teknik müdahale hedefi: Anadolu Yakası ${FACTS.emergencyResponse.anatolian}, Avrupa Yakası ${FACTS.emergencyResponse.european}.`,
      };

    case 'yonetim':
      return {
        badge: 'Google AI Overviews • Bütçe, Aidat ve Şeffaf Yönetim Matrisi',
        heading: 'Site Bütçesi, İşletme Projesi ve Aidat Tahsilat Yönetimi Tablosu',
        lead: 'Kat maliklerinin aidat öngörülebilirliğini ve mali şeffaflığı koruyan KMK m.20, m.35 ve m.37 (7579 sayılı Kanun) uygulama standartları:',
        headers: ['Yönetim Süreci', 'Şeffaf Uygulama ve Denetim Kuralı', 'Kanuni Dayanak'],
        rows: [
          ['Yıllık Kesin İşletme Projesi', 'Gelir-gider kalemleri eşit (personel) ve arsa payı (bakım/enerji) olarak ayrıştırılıp kat malikleri kurulunda onaylanır.', 'KMK m.20 & m.37 (7579 S.K.)'],
          ['Geçici İşletme Projesi Sınırı', `Onaylı proje yoksa yönetici en çok ${KMK_AMENDMENT_2026.interimProjectMaxMonths} aylık geçici proje hazırlar; mevcut proje varsa artış yeniden değerleme oranını aşamaz.`, `${KMK_AMENDMENT_2026.lawNumber} Sayılı Kanun m.37`],
          ['Resmi Banka Hesabı ve Raporlama', 'Tüm tahsilat ve ödemeler site adına açılan resmi banka hesabından yürütülür; aylık mizan ve faturalar maliklere sunulur.', '634 KMK m.35 & m.39'],
          ['Devir-Teslim ve İbra Denetimi', 'Yönetim değişikliğinde karar defteri, banka bakiyeleri, abonelikler ve demirbaşlar yazılı tutanakla teslim alınır.', '634 KMK m.38 & m.41'],
        ],
        legalNote: 'Aidat ve arsa payı hesaplamalarını kendi siteniz için denemek üzere /hesaplayici aracını kullanabilirsiniz.',
      };

    default:
      return {
        badge: 'Google AI Overviews • Entegre Tesis Yönetimi Karşılaştırma Matrisi',
        heading: 'Profesyonel Tesis Yönetimi vs. Geleneksel Apartman Yöneticiliği',
        lead: `İstanbul genelinde ${FACTS.districtCount} ilçede uygulanan ISO 41001 entegre tesis yönetimi modeli ile geleneksel yönetim arasındaki temel farklar:`,
        headers: ['Kriter', 'Geleneksel Bireysel Yöneticilik', 'Alo Yönetim Kurumsal Tesis Modeli'],
        rows: [
          ['Bütçe ve İşletme Projesi', 'Tahmini veya tek kalem aidat; geciken raporlama', 'KMK m.20 & 7579 S.K. uyumlu kalem kalem şeffaf işletme projesi'],
          ['Acil Teknik Müdahale', 'Arıza anında usta arama, belirsiz bekleme süresi', `Yazılı SLA hedefi: Anadolu Yakası ${FACTS.emergencyResponse.anatolian}, Avrupa Yakası ${FACTS.emergencyResponse.european}`],
          ['Güvenlik ve Personel İSG', 'Bireysel istihdamda kıdem ve İSG sorumluluk riski', '5188 Valilik izinli güvenlik ve 6331 İSG / ISO 45001 tam uyum'],
          ['Aidat Tahsilatı ve Hukuk', 'Komşuluk ilişkileri nedeniyle aksayan borç takibi', 'Dijital bildirim, KMK m.20/2 aylık %5 gecikme tazminatı ve hukuki takip'],
        ],
        legalNote: `Alo Yönetim ${FACTS.foundingYear} yılından beri İstanbul'un ${FACTS.districtCount} ilçesinde ${FACTS.referenceCount} kurumsal referansla hizmet vermektedir.`,
      };
  }
}
