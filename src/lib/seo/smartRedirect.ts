import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';

/**
 * Akıllı Semantik 301 Yönlendirme ve 404 Önleme Motoru (Alo Yönetim - Smart Self-Healing Redirects).
 *
 * Kullanıcı veya arama motoru botları yanlış, eski veya eksik bir URL girdiğinde
 * (ör. /kadikoy-temizlik, /etiler-guvenlik, /bahcesehir-site-yonetimi, /florya-havuz),
 * 404 hatası vermek yerine semantik benzerlik, mahalle-ilçe haritası ve hizmet eşanlamlıları
 * üzerinden en doğru kanonik sayfaya HTTP 301 yönlendirmesi üretir.
 */

// 1. Popüler Mahalle -> İlçe Eşleştirme Sözlüğü (Near-Me & Micro-Location)
export const NEIGHBORHOOD_TO_DISTRICT: Record<string, string> = {
  // Kadıköy
  'moda': 'kadikoy',
  'caddebostan': 'kadikoy',
  'fenerbahce': 'kadikoy',
  'suadiye': 'kadikoy',
  'bostanci': 'kadikoy',
  'goztepe': 'kadikoy',
  'kozyatagi': 'kadikoy',
  'erenkoy': 'kadikoy',
  'feneryolu': 'kadikoy',

  // Beşiktaş
  'etiler': 'besiktas',
  'levent': 'besiktas',
  'bebek': 'besiktas',
  'ortakoy': 'besiktas',
  'arnavutkoy-sahil': 'besiktas',
  'ulus': 'besiktas',
  'gayrettepe': 'besiktas',
  'balmumcu': 'besiktas',
  'dikilitas': 'besiktas',

  // Sarıyer
  'maslak': 'sariyer',
  'tarabya': 'sariyer',
  'istinye': 'sariyer',
  'zekeriyakoy': 'sariyer',
  'bahcekoy': 'sariyer',
  'yenikoy': 'sariyer',
  'emirgan': 'sariyer',
  'uskumrukoy': 'sariyer',

  // Bakırköy
  'atakoy': 'bakirkoy',
  'florya': 'bakirkoy',
  'yesilkoy': 'bakirkoy',
  'yesilyurt': 'bakirkoy',
  'senlikkoy': 'bakirkoy',

  // Başakşehir
  'bahcesehir': 'basaksehir',
  'kayasehir': 'basaksehir',
  'ispartakule': 'basaksehir',

  // Pendik
  'kurtkoy': 'pendik',
  'yenisehir': 'pendik',
  'guzelyali': 'pendik',

  // Eyüpsultan
  'gokturk': 'eyupsultan',
  'kemerburgaz': 'eyupsultan',
  'alibeykoy': 'eyupsultan',

  // Beykoz
  'acarkent': 'beykoz',
  'kavacik': 'beykoz',
  'kanlica': 'beykoz',
  'goksu': 'beykoz',
  'cavusbasi': 'beykoz',

  // Çekmeköy
  'tasdelen': 'cekmekoy',
  'omerli': 'cekmekoy',
  'alemdag': 'cekmekoy',

  // Tuzla
  'mercan': 'tuzla',
  'tepeoren': 'tuzla',
  'aydinli': 'tuzla',

  // Ataşehir
  'bati-atasehir': 'atasehir',
  'finanskent': 'atasehir',
  'kucukbakkalkoy': 'atasehir',
  'icerenkoy': 'atasehir',

  // Şişli
  'nisantasi': 'sisli',
  'mecidiyekoy': 'sisli',
  'fulya': 'sisli',
  'bomonti': 'sisli',
  'tesvikiye': 'sisli',

  // Büyükçekmece
  'alkent-2000': 'buyukcekmece',
  'alkent': 'buyukcekmece',
  'mimaroba': 'buyukcekmece',
  'sinanoba': 'buyukcekmece',
  'kumburgaz': 'buyukcekmece',

  // Beylikdüzü
  'adnan-kahveci': 'beylikduzu',
  'gurpinar': 'beylikduzu',
  'yakuplu': 'beylikduzu',

  // Üsküdar
  'acibadem': 'uskudar',
  'altunizade': 'uskudar',
  'kuzguncuk': 'uskudar',
  'cengelkoy': 'uskudar',
  'kisikli': 'uskudar',
  'kandilli': 'uskudar',

  // Küçükçekmece
  'atakent': 'kucukcekmece',
  'halkali': 'kucukcekmece',
  'cennet': 'kucukcekmece',
};

// 2. Hizmet Eşanlamlıları ve Arama Niyetleri
export const SERVICE_SYNONYMS: Record<string, string> = {
  // Temizlik
  'temizlik': 'temizlik-ve-hijyen',
  'temizligi': 'temizlik-ve-hijyen',
  'cleaning': 'temizlik-ve-hijyen',
  'hijyen': 'temizlik-ve-hijyen',
  'ortak-alan-temizligi': 'temizlik-ve-hijyen',
  'merdiven-temizligi': 'temizlik-ve-hijyen',
  'ofis-temizligi': 'temizlik-ve-hijyen',
  'bina-temizligi': 'temizlik-ve-hijyen',
  'site-temizligi': 'temizlik-ve-hijyen',

  // Güvenlik
  'guvenlik': 'guvenlik-yonetimi',
  'guvenligi': 'guvenlik-yonetimi',
  'security': 'guvenlik-yonetimi',
  'ozel-guvenlik': 'guvenlik-yonetimi',
  '5188': 'guvenlik-yonetimi',
  'kamera-sistemi': 'guvenlik-yonetimi',
  'cctv': 'guvenlik-yonetimi',
  'bekci': 'guvenlik-yonetimi',
  'site-guvenligi': 'guvenlik-yonetimi',
  'apartman-guvenligi': 'guvenlik-yonetimi',

  // Tesis & Site Yönetimi
  'yonetim': 'tesis-yonetimi',
  'yonetimi': 'tesis-yonetimi',
  'management': 'tesis-yonetimi',
  'facility': 'tesis-yonetimi',
  'tesis-yonetimi': 'tesis-yonetimi',
  'site-yonetimi': 'tesis-yonetimi',
  'apartman-yonetimi': 'tesis-yonetimi',
  'bina-yonetimi': 'tesis-yonetimi',
  'mulk-yonetimi': 'tesis-yonetimi',
  'rezidans-yonetimi': 'tesis-yonetimi',
  'plaza-yonetimi': 'tesis-yonetimi',
  'yonetim-sirketi': 'tesis-yonetimi',
  'yonetim-firmasi': 'tesis-yonetimi',
  'profesyonel-yonetim': 'tesis-yonetimi',

  // Aidat & Muhasebe
  'aidat': 'aidat-takibi',
  'aidat-takibi': 'aidat-takibi',
  'aidat-yonetimi': 'aidat-takibi',
  'aidat-odemesi': 'aidat-takibi',
  'aidat-hesaplama': 'aidat-takibi',
  'site-muhasebesi': 'aidat-takibi',
  'dues': 'aidat-takibi',

  // Teknik Bakım
  'teknik': 'teknik-bakim',
  'teknik-bakim': 'teknik-bakim',
  'bakim': 'teknik-bakim',
  'maintenance': 'teknik-bakim',
  'asansor-bakimi': 'teknik-bakim',
  'jenerator-bakimi': 'teknik-bakim',
  'hidrofor-bakimi': 'teknik-bakim',
  'kazan-dairesi': 'teknik-bakim',

  // Peyzaj
  'peyzaj': 'peyzaj-ve-bahce-bakimi',
  'peyzaj-bakimi': 'peyzaj-ve-bahce-bakimi',
  'bahce-bakimi': 'peyzaj-ve-bahce-bakimi',
  'landscaping': 'peyzaj-ve-bahce-bakimi',
  'cim-bicme': 'peyzaj-ve-bahce-bakimi',
  'bahcivan': 'peyzaj-ve-bahce-bakimi',

  // Havuz
  'havuz': 'havuz-bakimi-ve-hijyen',
  'havuz-bakimi': 'havuz-bakimi-ve-hijyen',
  'pool': 'havuz-bakimi-ve-hijyen',
  'havuz-temizligi': 'havuz-bakimi-ve-hijyen',
  'havuz-klorlama': 'havuz-bakimi-ve-hijyen',

  // Haşere
  'hasere': 'hasere-ve-dezenfeksiyon',
  'hasere-ilaclama': 'hasere-ve-dezenfeksiyon',
  'bocek-ilaclama': 'hasere-ve-dezenfeksiyon',
  'pest-control': 'hasere-ve-dezenfeksiyon',
  'ilaclama': 'hasere-ve-dezenfeksiyon',
  'dezenfeksiyon': 'hasere-ve-dezenfeksiyon',

  // Hukuk & İcra
  'hukuk': 'hukuk-ve-icra-danismanligi',
  'legal': 'hukuk-ve-icra-danismanligi',
  'icra': 'hukuk-ve-icra-danismanligi',
  'icra-takibi': 'hukuk-ve-icra-danismanligi',
  'avukat': 'hukuk-ve-icra-danismanligi',
  'kmk': 'hukuk-ve-icra-danismanligi',
  'kmk-hukuku': 'hukuk-ve-icra-danismanligi',
  'ihtarname': 'hukuk-ve-icra-danismanligi',
};

// 3. Statik Rota Eşanlamlıları
export const STATIC_ROUTE_SYNONYMS: Record<string, string> = {
  // Site Yönetimi Statik Rotaları
  'site-yonetimi': '/hizmetler/tesis-yonetimi',
  'apartman-yonetimi': '/hizmetler/tesis-yonetimi',
  'site-yonetim-sirketleri': '/hizmetler/tesis-yonetimi',
  'site-yonetim-firmalari': '/hizmetler/tesis-yonetimi',
  'profesyonel-site-yonetimi': '/hizmetler/tesis-yonetimi',
  'hizmetler/site-yonetimi': '/hizmetler/tesis-yonetimi',
  'hizmetler/apartman-yonetimi': '/hizmetler/tesis-yonetimi',
  'toplu-konut-yonetimi': '/hizmetler/tesis-yonetimi/toplu-konut-yonetimi',
  'rezidans-yonetimi': '/hizmetler/tesis-yonetimi/rezidans-site-yonetimi',
  'plaza-yonetimi': '/hizmetler/tesis-yonetimi/plaza-yonetimi',
  'teklif': '/teklif-al',
  'teklif-iste': '/teklif-al',
  'get-quote': '/teklif-al',
  'quote': '/teklif-al',
  'fiyat-al': '/teklif-al',
  'ucretler': '/teklif-al',
  'iletisime-gec': '/iletisim',
  'bize-ulasin': '/iletisim',
  'contact': '/iletisim',
  'adres': '/iletisim',
  'telefon': '/iletisim',
  'hesaplayici': '/hesaplayici',
  'calculator': '/hesaplayici',
  'aidat-hesaplayici': '/hesaplayici',
  'butce-hesapla': '/hesaplayici',
  'guvenlik-kursu': '/guvenlik-akademisi',
  'guvenlik-egitimi': '/guvenlik-akademisi',
  'ogi-egitimi': '/guvenlik-akademisi',
  'kalite-belgeleri': '/kurumsal/kalite-belgelerimiz',
  'iso-belgeleri': '/kurumsal/kalite-belgelerimiz',
  'sertifikalar': '/kurumsal/kalite-belgelerimiz',
  'projelerimiz': '/referanslar',
  'referanslarimiz': '/referanslar',
  'musteri-yorumlari': '/referanslar',
  'sozluk': '/sozluk',
  'terimler': '/sozluk',
  'kmk-maddeleri': '/sozluk',
  'sikca-sorulan-sorular': '/sss',
  'soru-cevap': '/sss',
  'surdurulebilirlik': '/surdurulebilirlik',
  'ges': '/surdurulebilirlik/ges-projeleri',
  'kariyer': '/istihdam-koprusu',
  'is-ilanlari': '/istihdam-koprusu',
  'personel-alimi': '/istihdam-koprusu',
};

export interface SmartRedirectResult {
  targetUrl: string;
  confidence: number;
  matchedDistrict?: string;
  matchedService?: string;
  reason: string;
}

/**
 * Verilen bozuk/eski URL yolunu analiz ederek en uygun 301 yönlendirme hedefini bulur.
 */
export function resolveSmartRedirect(pathname: string, lang = 'tr'): SmartRedirectResult | null {
  // Temizle: baştaki/sondaki slash'ler, dosya uzantıları (.html, .php)
  let clean = pathname
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/\.(html|php|htm|asp|aspx)$/, '');

  // Eğer dil prefix'i varsa ayıkla
  const langPrefixMatch = clean.match(/^(tr|en|ru|ar)\/?(.*)$/);
  let effectiveLang = lang;
  if (langPrefixMatch) {
    effectiveLang = langPrefixMatch[1];
    clean = langPrefixMatch[2];
  }

  if (!clean) return null;

  const langPrefix = effectiveLang === 'tr' ? '' : `/${effectiveLang}`;

  // 1. Statik Rota Doğrudan Eşleşmesi
  if (STATIC_ROUTE_SYNONYMS[clean]) {
    return {
      targetUrl: `${langPrefix}${STATIC_ROUTE_SYNONYMS[clean]}`,
      confidence: 1.0,
      reason: 'Statik rota eşanlamlısı eşleşti',
    };
  }

  // Token'lara ayır (tire, altçizgi, boşluk, slash)
  const tokens = clean.split(/[-_/ ]+/).filter(Boolean);

  let detectedDistrictSlug: string | undefined;
  let detectedServiceSlug: string | undefined;

  // A. Token'lar içinde İlçe veya Mahalle ara
  for (const token of tokens) {
    // 39 İlçe kontrolü
    const matchedDistrict = DISTRICTS.find(
      (d) => d.slug === token || normalizeText(d.name) === token
    );
    if (matchedDistrict) {
      detectedDistrictSlug = matchedDistrict.slug;
      break;
    }

    // Mahalle kontrolü
    if (NEIGHBORHOOD_TO_DISTRICT[token]) {
      detectedDistrictSlug = NEIGHBORHOOD_TO_DISTRICT[token];
      break;
    }
  }

  // B. Token'lar içinde Hizmet ara
  for (let i = 0; i < tokens.length; i++) {
    const singleToken = tokens[i];
    if (SERVICE_SYNONYMS[singleToken]) {
      detectedServiceSlug = SERVICE_SYNONYMS[singleToken];
      break;
    }

    // İki kelimelik kombinasyon (örn. "guvenlik-yonetimi", "site-temizligi")
    if (i < tokens.length - 1) {
      const doubleToken = `${tokens[i]}-${tokens[i + 1]}`;
      if (SERVICE_SYNONYMS[doubleToken]) {
        detectedServiceSlug = SERVICE_SYNONYMS[doubleToken];
        break;
      }
    }
  }

  // C. Eşleşme Değerlendirmesi

  // 1. Hem İlçe hem Hizmet bulundu -> /bolgeler/[ilce]/[hizmet]
  if (detectedDistrictSlug && detectedServiceSlug) {
    return {
      targetUrl: `${langPrefix}/bolgeler/${detectedDistrictSlug}/${detectedServiceSlug}`,
      confidence: 0.95,
      matchedDistrict: detectedDistrictSlug,
      matchedService: detectedServiceSlug,
      reason: 'İlçe ve hizmet semantik kombinasyonu tespit edildi',
    };
  }

  // 2. Yalnızca İlçe bulundu -> /bolgeler/[ilce]
  if (detectedDistrictSlug && !detectedServiceSlug) {
    return {
      targetUrl: `${langPrefix}/bolgeler/${detectedDistrictSlug}`,
      confidence: 0.85,
      matchedDistrict: detectedDistrictSlug,
      reason: 'İlçe ana sayfası tespit edildi',
    };
  }

  // 3. Yalnızca Hizmet bulundu -> /hizmetler/[hizmet]
  if (!detectedDistrictSlug && detectedServiceSlug) {
    return {
      targetUrl: `${langPrefix}/hizmetler/${detectedServiceSlug}`,
      confidence: 0.85,
      matchedService: detectedServiceSlug,
      reason: 'Ana hizmet pillar sayfası tespit edildi',
    };
  }

  // 4. Blog yazısı benzerliği (Kelime araması)
  if (clean.includes('aidat') || clean.includes('zam') || clean.includes('artis')) {
    return {
      targetUrl: `${langPrefix}/blog`,
      confidence: 0.6,
      reason: 'Blog ve rehber kategorisine yönlendirildi',
    };
  }

  return null;
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
}
