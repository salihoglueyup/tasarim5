// Blog çeviri belleği (translation memory) yardımcıları.
// Yazı metinleri Türkçe kaynakta tutulur; en/ru/ar çevirileri src/i18n/blog/{lang}.json dosyalarında
// "kaynak metnin kimliği -> çeviri" olarak saklanır. İlçe adları {d}, {d2}... yer tutucularına
// indirgenir, böylece 39 ilçe için aynı şablon yazıları tek kez çevrilir.
// Bu modül saf veri/işlevdir (server-only değil): script'ler ve testler de kullanır.

export type BlogLang = 'en' | 'ru' | 'ar';
export type TranslationMemory = Record<string, string>;

export const DISTRICTS = [
  'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir',
  'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy',
  'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane',
  'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli',
  'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu',
] as const;

export const DISTRICT_NAMES: Record<BlogLang, Record<string, string>> = {
  en: Object.fromEntries(DISTRICTS.map((d) => [d, d])),
  ru: {
    Adalar: 'Адалар', Arnavutköy: 'Арнавуткёй', Ataşehir: 'Аташехир', Avcılar: 'Авджылар', Bağcılar: 'Баджылар',
    Bahçelievler: 'Бахчелиевлер', Bakırköy: 'Бакыркёй', Başakşehir: 'Башакшехир', Bayrampaşa: 'Байрампаша',
    Beşiktaş: 'Бешикташ', Beykoz: 'Бейкоз', Beylikdüzü: 'Бейликдюзю', Beyoğlu: 'Бейоглу', Büyükçekmece: 'Бююкчекмедже',
    Çatalca: 'Чаталджа', Çekmeköy: 'Чекмекёй', Esenler: 'Эсенлер', Esenyurt: 'Эсенюрт', Eyüpsultan: 'Эюпсултан',
    Fatih: 'Фатих', Gaziosmanpaşa: 'Газиосманпаша', Güngören: 'Гюнгёрен', Kadıköy: 'Кадыкёй', Kağıthane: 'Кягытхане',
    Kartal: 'Картал', Küçükçekmece: 'Кючюкчекмедже', Maltepe: 'Мальтепе', Pendik: 'Пендик', Sancaktepe: 'Санджактепе',
    Sarıyer: 'Сарыер', Silivri: 'Силиври', Sultanbeyli: 'Султанбейли', Sultangazi: 'Султангази', Şile: 'Шиле',
    Şişli: 'Шишли', Tuzla: 'Тузла', Ümraniye: 'Умрание', Üsküdar: 'Ускюдар', Zeytinburnu: 'Зейтинбурну',
  },
  ar: {
    Adalar: 'أدالار', Arnavutköy: 'أرناؤوطكوي', Ataşehir: 'أتاشهير', Avcılar: 'أفجيلار', Bağcılar: 'باغجيلار',
    Bahçelievler: 'باهتشلي إيفلر', Bakırköy: 'باكيركوي', Başakşehir: 'باشاك شهير', Bayrampaşa: 'بيرم باشا',
    Beşiktaş: 'بشيكتاش', Beykoz: 'بيكوز', Beylikdüzü: 'بيليك دوزو', Beyoğlu: 'بيوغلو', Büyükçekmece: 'بويوك تشكمجة',
    Çatalca: 'تشاتالجا', Çekmeköy: 'تشكمكوي', Esenler: 'إسنلر', Esenyurt: 'إسنيورت', Eyüpsultan: 'أيوب سلطان',
    Fatih: 'الفاتح', Gaziosmanpaşa: 'غازي عثمان باشا', Güngören: 'غونغوران', Kadıköy: 'قاضي كوي', Kağıthane: 'كاغيت هانه',
    Kartal: 'كارتال', Küçükçekmece: 'كوتشوك تشكمجة', Maltepe: 'مالتبه', Pendik: 'بنديك', Sancaktepe: 'سنجق تبه',
    Sarıyer: 'صاري يير', Silivri: 'سيليفري', Sultanbeyli: 'سلطان بيلي', Sultangazi: 'سلطان غازي', Şile: 'شيلة',
    Şişli: 'شيشلي', Tuzla: 'توزلا', Ümraniye: 'أمرانية', Üsküdar: 'أسكودار', Zeytinburnu: 'زيتين بورنو',
  },
};

const DISTRICT_RE = new RegExp(`(${DISTRICTS.join('|')})(?:'[a-zçğıöşü]+)?`, 'g');

/** 32 bitlik FNV-1a; kimlik = sekiz haneli hex + uzunluk (base36). */
export function hashString(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `${h.toString(16).padStart(8, '0')}${s.length.toString(36)}`;
}

/** İlçe adlarını {d}, {d2}... yer tutucularına indirger (ek 'de/'daki vb. şablonda kalır). */
export function normalizeForMemory(s: string): { template: string; districts: string[] } {
  const districts: string[] = [];
  const template = s.replace(DISTRICT_RE, (match, d: string) => {
    districts.push(d);
    const tag = districts.length === 1 ? '{d}' : `{d${districts.length}}`;
    return tag + match.slice(d.length);
  });
  return { template, districts };
}

export function memoryId(s: string): string {
  return hashString(normalizeForMemory(s).template);
}

function fillDistricts(translation: string, districts: string[], lang: BlogLang): string {
  let out = translation;
  districts.forEach((d, i) => {
    const tag = i === 0 ? '{d}' : `{d${i + 1}}`;
    out = out.split(tag).join(DISTRICT_NAMES[lang][d] ?? d);
  });
  return out;
}

/** Bellekte çeviri yoksa null döner. */
export function translateString(s: string, lang: BlogLang, memory: TranslationMemory): string | null {
  if (!s || !s.trim()) return s;
  const { template, districts } = normalizeForMemory(s);
  const hit = memory[hashString(template)];
  return hit === undefined ? null : fillDistricts(hit, districts, lang);
}

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'cta'; text: string; href: string; label: string }
  | { type: 'table'; headers?: string[]; rows?: string[][]; caption?: string };

/** Bir yazının çevrilebilir tüm metinlerini sırayla döndürür. */
export function collectBlockStrings(blocks: PostBlock[]): string[] {
  const out: string[] = [];
  for (const b of blocks) {
    if (b.type === 'ul' || b.type === 'ol') out.push(...b.items);
    else if (b.type === 'cta') out.push(b.text, b.label);
    else if (b.type === 'table') {
      if (b.caption) out.push(b.caption);
      if (b.headers) out.push(...b.headers);
      if (b.rows) for (const r of b.rows) out.push(...r);
    } else out.push(b.text);
  }
  return out.filter((x) => typeof x === 'string' && x.trim() !== '');
}

export function collectPostStrings(post: { title: string; description: string; tldr?: string | null; content: PostBlock[] }): string[] {
  return [post.title, post.description, ...(post.tldr ? [post.tldr] : []), ...collectBlockStrings(post.content)];
}

export interface LocalizeResult<T> {
  value: T;
  /** Bellekte karşılığı bulunamayıp Türkçe bırakılan metin sayısı */
  missing: number;
}

export function localizeText(s: string, lang: BlogLang, memory: TranslationMemory): LocalizeResult<string> {
  const t = translateString(s, lang, memory);
  return t === null ? { value: s, missing: 1 } : { value: t, missing: 0 };
}

export function localizeBlocks(blocks: PostBlock[], lang: BlogLang, memory: TranslationMemory): LocalizeResult<PostBlock[]> {
  let missing = 0;
  const tr = (s: string) => {
    if (!s || !s.trim()) return s;
    const r = localizeText(s, lang, memory);
    missing += r.missing;
    return r.value;
  };
  const value = blocks.map((b): PostBlock => {
    if (b.type === 'ul' || b.type === 'ol') return { ...b, items: b.items.map(tr) };
    if (b.type === 'cta') return { ...b, text: tr(b.text), label: tr(b.label) };
    if (b.type === 'table') {
      return {
        ...b,
        caption: b.caption ? tr(b.caption) : b.caption,
        headers: b.headers?.map(tr),
        rows: b.rows?.map((row) => row.map(tr)),
      };
    }
    return { ...b, text: tr(b.text) };
  });
  return { value, missing };
}

export interface LocalizedPostFields {
  title: string;
  description: string;
  tldr: string | null;
  content: PostBlock[];
  missing: number;
}

export function localizePostFields(
  post: { title: string; description: string; tldr?: string | null; content: PostBlock[] },
  lang: BlogLang,
  memory: TranslationMemory,
): LocalizedPostFields {
  const title = localizeText(post.title, lang, memory);
  const description = localizeText(post.description, lang, memory);
  const tldr = post.tldr ? localizeText(post.tldr, lang, memory) : null;
  const content = localizeBlocks(post.content, lang, memory);
  return {
    title: title.value,
    description: description.value,
    tldr: tldr ? tldr.value : null,
    content: content.value,
    missing: title.missing + description.missing + (tldr ? tldr.missing : 0) + content.missing,
  };
}
