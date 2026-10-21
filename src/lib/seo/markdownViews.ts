import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';
import { CERTIFICATES } from '@/data/certificates';
import { DISTRICTS, getDistrict } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { TERMS, termToSlug, slugToTerm } from '@/data/dictionary';
import { REAL_REFERENCES, SECTORS, SECTOR_LABELS_TR } from '@/data/realReferences';
import { POSTS, CATEGORIES, type PostBlock } from '@/data/posts';
import { FACTS, RESPONSE_TARGET_TEXT } from '@/lib/facts';
import { KMK_AMENDMENT_2026 } from '@/lib/legal/kmkAmendment2026';
import { buildLlmsFullText } from '@/lib/seo/llmsContent';

/** AI arama motorları için saf Markdown görünümleri. YALNIZCA doğrulanmış bilgiler (src/lib/facts.ts). */

const CONTACT = `## İletişim ve Ücretsiz Keşif Talebi
- **Şirket**: ${CANONICAL_NAP.legal.legalName}
- **Telefon**: ${CANONICAL_NAP.contact.phoneDisplay}
- **E-posta**: ${CANONICAL_NAP.contact.email}
- **Adres**: ${CANONICAL_NAP.address.fullDisplayAddress}
- **Teklif Portalı**: ${BASE_URL}/teklif-al
- **Referanslar**: ${BASE_URL}/referanslar
`;

const CERT_LINE = CERTIFICATES.map((c) => c.name).join(', ');

function renderPostBlocksToMarkdown(blocks: PostBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'h2':
          return `## ${b.text}`;
        case 'h3':
          return `### ${b.text}`;
        case 'p':
          return b.text;
        case 'quote':
          return `> ${b.text}`;
        case 'ul':
          return b.items.map((item) => `- ${item}`).join('\n');
        case 'ol':
          return b.items.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
        case 'cta': {
          const fullHref = b.href.startsWith('http') ? b.href : `${BASE_URL}${b.href}`;
          return `**${b.text}** — [${b.label}](${fullHref})`;
        }
        case 'table': {
          const lines: string[] = [];
          if (b.caption) lines.push(`**${b.caption}**\n`);
          if (b.headers && b.headers.length > 0) {
            lines.push(`| ${b.headers.join(' | ')} |`);
            lines.push(`| ${b.headers.map(() => '---').join(' | ')} |`);
          }
          if (b.rows && b.rows.length > 0) {
            for (const row of b.rows) {
              lines.push(`| ${row.join(' | ')} |`);
            }
          }
          return lines.join('\n');
        }
        default:
          return '';
      }
    })
    .filter(Boolean)
    .join('\n\n');
}

function buildLocalizedExecutiveBanner(lang: 'en' | 'ru' | 'ar', cleanPath: string): string {
  const canonicalUrl = `${BASE_URL}/${lang}${cleanPath === '/' ? '' : cleanPath}`;
  if (lang === 'en') {
    return `# ${CANONICAL_NAP.legal.legalName} — Istanbul Facility & Residential Property Management

> **Canonical URL**: ${canonicalUrl}
> **Language**: English (\`en-US\`)
> **Operating Since**: ${FACTS.foundingYear} (~${FACTS.teamSize} office and field staff)
> **Coverage**: All ${FACTS.districtCount} districts of Istanbul (${FACTS.referenceCount} verified institutional references)
> **Emergency SLA Target**: ${RESPONSE_TARGET_TEXT.en}
> **Legal Framework**: Turkish Condominium Law No. 634 (KMK), Law No. ${KMK_AMENDMENT_2026.lawNumber} (2026 amendments), and Private Security Law No. 5188 (${CANONICAL_NAP.legal.securityPermitNumber})
> **Certifications**: ${CERT_LINE} (BELCERT / ILAS)

---
`;
  }
  if (lang === 'ru') {
    return `# ${CANONICAL_NAP.legal.legalName} — Профессиональное управление объектами и жилыми комплексами в Стамбуле

> **Канонический URL**: ${canonicalUrl}
> **Язык**: Русский (\`ru-RU\`)
> **Год основания**: ${FACTS.foundingYear} (~${FACTS.teamSize} сотрудников в офисе и на объектах)
> **Охват**: Все ${FACTS.districtCount} районов Стамбула (${FACTS.referenceCount} подтвержденных корпоративных объектов)
> **Целевое время аварийного реагирования (SLA)**: ${RESPONSE_TARGET_TEXT.ru}
> **Правовая база**: Закон Турции о кондоминиумах № 634 (KMK), Закон № ${KMK_AMENDMENT_2026.lawNumber} (поправки 2026 г.) и Закон о частной охране № 5188 (${CANONICAL_NAP.legal.securityPermitNumber})
> **Сертификаты**: ${CERT_LINE} (BELCERT / ILAS)

---
`;
  }
  return `# ${CANONICAL_NAP.legal.legalName} — إدارة المرافق والمجمعات السكنية في إسطنبول

> **الرابط الأساسي**: ${canonicalUrl}
> **اللغة**: العربية (\`ar-SA\`)
> **تاريخ التأسيس**: ${FACTS.foundingYear} (~${FACTS.teamSize} موظفاً في المكتب والميدان)
> **نطاق التغطية**: جميع مقاطعات إسطنبول الـ ${FACTS.districtCount} (${FACTS.referenceCount} مرجعاً مؤسسياً موثقاً)
> **هدف الاستجابة الطارئة (SLA)**: ${RESPONSE_TARGET_TEXT.ar}
> **الإطار القانوني**: قانون الملكية الطابقية التركي رقم 634 (KMK)، القانون رقم ${KMK_AMENDMENT_2026.lawNumber} (تعديلات 2026)، وقانون الأمن الخاص رقم 5188 (${CANONICAL_NAP.legal.securityPermitNumber})
> **الشهادات**: ${CERT_LINE} (BELCERT / ILAS)

---
`;
}

export function buildSiteManagementMarkdown(): string {
  return `# Alo Yönetim — Profesyonel Site Yönetimi

> **Kanonik URL**: ${BASE_URL}/hizmetler/site-yonetimi
> **Yasal Dayanak**: 634 sayılı Kat Mülkiyeti Kanunu (KMK) ve 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun
> **Hizmet Kapsamı**: İstanbul'un ${FACTS.districtCount} ilçesinde apartman, site, rezidans ve toplu konut yönetimi

---

## Özet
Alo Yönetim, ${FACTS.foundingYear}'dan beri İstanbul'da konut siteleri, apartmanlar ve rezidanslar için profesyonel site yönetimi hizmeti sunar. Yaklaşık ${FACTS.teamSize} kişilik ekibi ofis ve saha çalışanlarından oluşur. Referans listesinde ${FACTS.referenceCount} kurum ve tesis yer alır.

${RESPONSE_TARGET_TEXT.tr}

## Hizmetler
- **Mali ve idari yönetim**: KMK m.37 kapsamında işletme projesi hazırlığı, aidat takibi ve raporlama.
- **Özel güvenlik**: 5188 sayılı Kanun kapsamında izinli ve lisanslı güvenlik görevlileri.
- **Teknik bakım**: asansör, hidrofor, jeneratör ve ortak sistemlerin periyodik bakımı.
- **Temizlik ve hijyen**: ortak alan temizliği ve haşere kontrolü.
- **Peyzaj ve havuz bakımı**.
- **Hukuk ve icra danışmanlığı**: aidat alacakları için ihtar ve icra takibi desteği.

## Mevzuat Notları
- **Gecikme tazminatı (KMK m.20)**: Ödenmeyen gider ve avans paylarına aylık yüzde beş gecikme tazminatı işler.
- **Yönetim planı değişikliği**: Genel yapılarda KMK m.28/3 uyarınca kat maliklerinin beşte dördü; toplu yapılarda ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun'la değişen KMK m.70 uyarınca üçte ikisi aranır.
- **${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun**: ${KMK_AMENDMENT_2026.gazetteDateTr} tarihli ve ${KMK_AMENDMENT_2026.gazetteNumber} sayılı Resmî Gazete'de yayımlandı; ayrıntılar ${BASE_URL}/kmk-2026-degisiklikleri adresindedir.

Bu bilgiler genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.

---

${CONTACT}`;
}

export function buildFacilityManagementMarkdown(): string {
  return `# Alo Yönetim — Entegre Tesis Yönetimi

> **Kanonik URL**: ${BASE_URL}/hizmetler/tesis-yonetimi
> **Hizmet Kapsamı**: İstanbul genelinde plazalar, iş merkezleri, sanayi tesisleri ve karma projeler
> **Belgeler**: ${CERT_LINE} (BELCERT) ve 5188 sayılı Kanun kapsamında özel güvenlik faaliyet izni

---

## Özet
Alo Yönetim, ${FACTS.foundingYear}'dan beri plaza, iş merkezi, sanayi tesisi ve karma projeler için tesis yönetimi hizmeti sunar: teknik bakım, enerji ve sistem takibi, güvenlik, temizlik ve idari işletme tek çatı altında yürütülür. Yaklaşık ${FACTS.teamSize} kişilik ekibi ofis ve saha çalışanlarından oluşur.

${RESPONSE_TARGET_TEXT.tr}

## Alt Sektörler
- [Rezidans ve Site Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi)
- [Plaza ve İş Merkezi Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/plaza-yonetimi)
- [Toplu Konut Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi)
- [Sanayi Tesisi Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi)

---

${CONTACT}`;
}

export function detectMarkdownLocale(rawPath: string): 'tr' | 'en' | 'ru' | 'ar' {
  const m = (rawPath || '').match(/^\/(en|ru|ar)(?=\/|$)/i);
  if (!m) return 'tr';
  return m[1].toLowerCase() as 'en' | 'ru' | 'ar';
}

/**
 * Rota-Duyarlı (Route-Aware) ve Çok Dilli (tr/en/ru/ar) Markdown Üretici:
 * İlçe (/bolgeler/[ilce]/*), Hizmet (/hizmetler/[slug]), Rehber (/hizmetler/tesis-yonetimi/rehber),
 * Blog (/blog/[slug]), Hesaplayıcı (/hesaplayici), Sözlük (/sozluk/[terim]),
 * KMK 2026 (/kmk-2026-degisiklikleri), Referanslar (/referanslar) ve Kalite Belgeleri
 * rotaları için sayfaya özgü doğrulanmış Markdown üretir.
 */
export function buildRouteAwareMarkdown(rawPath: string): string {
  const detectedLang = detectMarkdownLocale(rawPath);
  const langPrefix = detectedLang === 'tr' ? '' : `/${detectedLang}`;
  const cleanPath =
    (rawPath || '/')
      .split('?')[0]
      .replace(/^\/(tr|en|ru|ar)(?=\/|$)/i, '')
      .replace(/\/+$/, '') || '/';

  const withLocaleBanner = (body: string) =>
    detectedLang !== 'tr' ? `${buildLocalizedExecutiveBanner(detectedLang, cleanPath)}\n${body}` : body;

  // 0. Blog Yazısı Detay Rotaları (/blog/[slug] ve /en|ru|ar/blog/[slug])
  const blogMatch = cleanPath.match(/^\/blog\/([^/]+)$/);
  if (blogMatch && blogMatch[1] !== 'kategori' && blogMatch[1] !== 'etiket' && blogMatch[1] !== 'yazar') {
    const slug = blogMatch[1];
    const trPost = POSTS.find((p) => p.slug === slug);
    if (trPost) {
      const cat = CATEGORIES.find((c) => c.slug === trPost.category);
      const bodyMd = renderPostBlocksToMarkdown(trPost.content);
      return withLocaleBanner(`# ${trPost.title}

> **Kanonik URL**: ${BASE_URL}${langPrefix}/blog/${trPost.slug}
> **Yayım Tarihi**: ${trPost.datePublished}
> **Güncelleme Tarihi**: ${trPost.dateModified || trPost.datePublished}
> **Kategori**: ${cat?.name || trPost.category}
> **Ana Hizmet Bağlantısı**: ${BASE_URL}${trPost.pillar}

## Özet (TL;DR)
${trPost.tldr}

---

${bodyMd}

---

${CONTACT}`);
    }
  }

  // 0B. Blog Kategori Rotaları (/blog/kategori/[kategori])
  const blogCatMatch = cleanPath.match(/^\/blog\/kategori\/([^/]+)$/);
  if (blogCatMatch) {
    const catSlug = blogCatMatch[1];
    const cat = CATEGORIES.find((c) => c.slug === catSlug);
    if (cat) {
      const catPosts = POSTS.filter((p) => p.category === cat.slug);
      const postLines = catPosts
        .map((p) => `- **[${p.title}](${BASE_URL}${langPrefix}/blog/${p.slug})** (${p.datePublished}): ${p.tldr}`)
        .join('\n');
      return withLocaleBanner(`# ${cat.name} — Alo Yönetim Bilgi Merkezi

> **Kanonik URL**: ${BASE_URL}${langPrefix}/blog/kategori/${cat.slug}
> **Kategori Açıklaması**: ${cat.description}
> **Makale Sayısı**: ${catPosts.length}

---

## Bu Kategorideki Rehber ve Makaleler
${postLines}

---

${CONTACT}`);
    }
  }
  const neighborhoodMatch = cleanPath.match(/^\/bolgeler\/([^/]+)\/mahalleler\/([^/]+)$/);
  if (neighborhoodMatch) {
    const [, districtSlug, mahalleSlug] = neighborhoodMatch;
    const district = getDistrict(districtSlug);
    const neighborhood = district?.neighborhoodData?.find((n) => n.slug === mahalleSlug);
    if (district && neighborhood) {
      const sideLabel = district.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası';
      const slaTarget =
        district.side === 'Anadolu'
          ? FACTS.emergencyResponse.anatolian
          : FACTS.emergencyResponse.european;
      const geo = neighborhood.geo || district.geo;
      const chars = neighborhood.characteristics?.length
        ? neighborhood.characteristics.join(', ')
        : 'Konut sitesi ve apartman yerleşimi';

      return withLocaleBanner(`# Alo Yönetim — ${neighborhood.name}, ${district.name} Site ve Tesis Yönetimi

> **Kanonik URL**: ${BASE_URL}${langPrefix}/bolgeler/${district.slug}/mahalleler/${neighborhood.slug}
> **Mahalle / İlçe**: ${neighborhood.name}, ${district.name}, İstanbul (${sideLabel})
> **Koordinatlar**: ${geo.lat}, ${geo.lng}
> **Acil Teknik Müdahale Hedefi (Yazılı SLA)**: ${slaTarget}
> **Yasal Çerçeve**: 634 sayılı Kat Mülkiyeti Kanunu, ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun (2026) ve 5188 sayılı Özel Güvenlik Kanunu

---

## ${neighborhood.name} Mahallesi Operasyon Özeti
${neighborhood.intro}

- **Bölgesel Yapı Karakteristiği**: ${chars}
- **Acil Müdahale Hedefi**: ${slaTarget} (${RESPONSE_TARGET_TEXT.tr})
- **Bağlı Olduğu İlçe Merkezi**: [${district.name} Tesis Yönetimi](${BASE_URL}/bolgeler/${district.slug})
- **Tüm ${district.name} Mahalleleri**: [Mahalle Listesi](${BASE_URL}/bolgeler/${district.slug}/mahalleler)

## ${neighborhood.name} Bölgesinde Sunulan Başlıca Hizmetler
- **Site ve Apartman Yönetimi**: KMK m.20 ve m.37 uyumlu işletme projesi hazırlığı, genel kurul organizasyonu ve şeffaf aidat takibi (${BASE_URL}/bolgeler/${district.slug}/site-yonetimi)
- **Entegre Tesis Yönetimi**: Teknik bakım, enerji izleme, temizlik ve idari yönetim (${BASE_URL}/bolgeler/${district.slug}/tesis-yonetimi)
- **5188 Sayılı Kanun Özel Güvenlik**: Valilik izinli site ve rezidans güvenliği (${BASE_URL}/bolgeler/${district.slug}/guvenlik-yonetimi)
- **Teknik Bakım ve Onarım**: Asansör, hidrofor, kazan ve jeneratör periyodik kontrolleri (${BASE_URL}/bolgeler/${district.slug}/teknik-bakim)

---

${CONTACT}`);
    }
  }

  // 1B. İlçe ve İlçe×Hizmet Alt Rotaları (/bolgeler/[ilce], /bolgeler/[ilce]/[hizmet], /bolgeler/[ilce]/mahalleler)
  const districtMatch = cleanPath.match(/^\/bolgeler\/([^/]+)(?:\/([^/]+))?$/);
  if (districtMatch) {
    const districtSlug = districtMatch[1];
    const subRoute = districtMatch[2];
    const district = getDistrict(districtSlug);
    const matchedService = subRoute ? SERVICES.find((s) => s.slug === subRoute) : undefined;
    if (district && (!subRoute || subRoute === 'mahalleler' || subRoute === 'site-yonetimi' || matchedService)) {
      const sideLabel = district.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası';
      const slaTarget =
        district.side === 'Anadolu'
          ? FACTS.emergencyResponse.anatolian
          : FACTS.emergencyResponse.european;
      const localRefs = REAL_REFERENCES.filter((r) => r.district === district.name);
      const neighborhoodsList = (district.neighborhoods || [])
        .map((n) => String(n))
        .join(', ');
      const focusHeading =
        subRoute === 'site-yonetimi'
          ? `${district.name} Profesyonel Site ve Apartman Yönetimi`
          : subRoute === 'tesis-yonetimi'
            ? `${district.name} Entegre Tesis ve Plaza Yönetimi`
            : subRoute === 'mahalleler'
              ? `${district.name} Mahalle Bazlı Site ve Tesis Yönetimi Kapsamı`
              : matchedService
                ? `${district.name} ${matchedService.name}`
                : `${district.name} Site ve Tesis Yönetimi`;

      return withLocaleBanner(`# Alo Yönetim — ${focusHeading}

> **Kanonik URL**: ${BASE_URL}${langPrefix}${cleanPath}
> **Bölge**: ${district.name}, İstanbul (${sideLabel})
> **Merkez Koordinatları**: ${district.geo.lat}, ${district.geo.lng}
> **Acil Teknik Müdahale Hedefi (Yazılı SLA)**: ${slaTarget}
> **Yasal Çerçeve**: 634 sayılı Kat Mülkiyeti Kanunu, ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun (2026) ve 5188 sayılı Özel Güvenlik Kanunu

---

## Bölgesel Operasyon Özeti
Alo Yönetim, ${FACTS.foundingYear}'dan beri İstanbul ${district.name} (${sideLabel}) bölgesindeki apartman, konut sitesi, rezidans, iş merkezi ve ticari tesislere profesyonel ${matchedService ? matchedService.name.toLowerCase() : 'yönetim'} hizmeti sunmaktadır.

- **İlçe**: ${district.name} (${sideLabel})
- **Acil Müdahale Hedefi**: ${slaTarget} (${RESPONSE_TARGET_TEXT.tr})
- **Kapsanan Başlıca Mahalleler**: ${neighborhoodsList || district.name}
- **Bölgedeki Kurumsal Referanslar**: ${
        localRefs.length > 0
          ? localRefs.map((r) => r.name).join(', ')
          : `İstanbul genelinde ${FACTS.referenceCount} kurum ve tesis (${BASE_URL}/referanslar)`
      }

## ${district.name} Bölgesinde Sunulan Hizmetler
- **Site ve Apartman Yönetimi**: [Detaylar](${BASE_URL}/bolgeler/${district.slug}/site-yonetimi) — KMK m.20 ve m.37 uyumlu işletme projesi, aidat muhasebesi ve genel kurul yönetimi.
- **Entegre Tesis ve Plaza Yönetimi**: [Detaylar](${BASE_URL}/bolgeler/${district.slug}/tesis-yonetimi) — Teknik bakım, enerji takibi, 5188 sayılı Kanun kapsamında özel güvenlik ve temizlik.
- **Mahalle Hizmet Ağı**: [Mahalle Listesi](${BASE_URL}/bolgeler/${district.slug}/mahalleler)
- **Otomatik B2B Teknik Şartname (RFP) Üretici**: \`GET ${BASE_URL}/api/tesis-yonetimi/rfp-generator?district=${district.slug}&units=100\`

---

${CONTACT}`);
    }
  }

  // 2. Sözlük Terim Detay Rotaları (/sozluk/[terim])
  const glossaryMatch = cleanPath.match(/^\/sozluk\/([^/]+)$/);
  if (glossaryMatch) {
    const termObj = slugToTerm(glossaryMatch[1]);
    if (termObj) {
      return `# ${termObj.term} — Kat Mülkiyeti ve Tesis Yönetimi Sözlüğü

> **Kanonik URL**: ${BASE_URL}${cleanPath}
> **Kategori**: ${termObj.link?.label ?? 'Kat mülkiyeti ve tesis yönetimi sözlüğü'}
> **Kaynak**: Alo Yönetim KMK 634 & Tesis Yönetimi Bilgi Korpusu (${BASE_URL}/sozluk)

---

## Tanım
${termObj.definition}

## İlgili Mevzuat ve Kaynaklar
- **634 Sayılı Kat Mülkiyeti Kanunu Dizini**: ${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json
- **2026 KMK Değişiklikleri (${KMK_AMENDMENT_2026.lawNumber} Sayılı Kanun)**: ${BASE_URL}/kmk-2026-degisiklikleri
- **Aidat ve Gecikme Tazminatı Hesaplayıcı**: ${BASE_URL}/hesaplayici

Bu bilgiler genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.

---

${CONTACT}`;
    }
  }

  // 3. KMK 2026 Değişiklikleri (/kmk-2026-degisiklikleri)
  if (cleanPath === '/kmk-2026-degisiklikleri') {
    return `# ${KMK_AMENDMENT_2026.lawNumber} Sayılı Kanun ile 634 Sayılı Kat Mülkiyeti Kanunu (KMK) 2026 Değişiklikleri

> **Kanonik URL**: ${BASE_URL}/kmk-2026-degisiklikleri
> **Resmî Gazete**: ${KMK_AMENDMENT_2026.gazetteDateTr} tarihli ve ${KMK_AMENDMENT_2026.gazetteNumber} sayılı Resmî Gazete (${KMK_AMENDMENT_2026.gazetteUrl})

---

## Değişen Maddeler Özeti
1. **KMK Madde 35 (Yöneticinin Görevleri)**: Yöneticinin işletme projesi hazırlama, kat malikleri kurulunun onayına sunma ve kurul kararlarını uygulama sorumlulukları netleştirilmiştir.
2. **KMK Madde 37 (İşletme Projesi ve Yeniden Değerleme Oranı Sınırı)**: İşletme projesi kat malikleri kurulunda onaylanır. Onaylı proje yoksa yönetici en geç ${KMK_AMENDMENT_2026.interimProjectMaxMonths} ay içinde onaylanacak geçici işletme projesi hazırlar; mevcut projesi olan sitelerde geçici projedeki bedel bir önceki yılın yeniden değerleme oranını aşamaz.
3. **KMK Madde 70 (Toplu Yapılarda Yönetim Planı Değişikliği)**: Toplu yapılarda yönetim planı değişikliği için gereken çoğunluk 4/5'ten 2/3'e (${KMK_AMENDMENT_2026.managementPlanQuorum.multiBuildingComplexes.fraction}) indirilmiştir. Tekil yapılarda KMK m.28/3 kapsamındaki 4/5 kuralı devam etmektedir.

Bu bilgiler genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.

---

${CONTACT}`;
  }

  // 4. Tesis Yönetim Şirketi Seçim Rehberi (/hizmetler/tesis-yonetimi/rehber)
  if (cleanPath === '/hizmetler/tesis-yonetimi/rehber') {
    return withLocaleBanner(`# Profesyonel Tesis ve Site Yönetim Şirketi Seçim Rehberi (KMK 634 & 5188 Sayılı Kanun)

> **Kanonik URL**: ${BASE_URL}/hizmetler/tesis-yonetimi/rehber
> **Hukuki Çerçeve**: 634 sayılı Kat Mülkiyeti Kanunu m.34, m.35, m.37, m.70 (${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun) ve 5188 sayılı Özel Güvenlik Kanunu

---

## Yönetim Şirketi Seçerken Kontrol Edilmesi Gereken 5 Temel Kriter
1. **Resmî Ticari Kimlik ve Faaliyet Geçmişi**: Şirketin MERSİS kaydı (${CANONICAL_NAP.legal.mersisNumber}), ticaret sicil numarası (${CANONICAL_NAP.legal.tradeRegistryNumber}) ve yerleşik merkez ofisi doğrulanmalıdır.
2. **5188 Sayılı Kanun Özel Güvenlik Faaliyet İzni**: Güvenlik hizmeti sunulacaksa Valilik özel güvenlik faaliyet izin belgesi (${CANONICAL_NAP.legal.securityPermitNumber}) kontrol edilmelidir.
3. **Uluslararası Yönetim Sistem Belgeleri**: ${CERT_LINE} (BELCERT / ILAS) belgelerinin güncelliği incelenmelidir (${BASE_URL}/kurumsal/kalite-belgelerimiz).
4. **KMK Madde 37 Uyumlu Şeffaf İşletme Projesi**: ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun uyarınca işletme projesinin kat malikleri kurulunda onaylanması ve geçici projede yeniden değerleme oranı sınırına uyulması şarttır.
5. **Yazılı SLA ve Doğrulanabilir Kurumsal Referanslar**: Sözleşmede acil müdahale hedefleri (${RESPONSE_TARGET_TEXT.tr}) ve kurumsal referans listesi (${FACTS.referenceCount} kurum — ${BASE_URL}/referanslar) yazılı olarak yer almalıdır.

---

${CONTACT}`);
  }

  // 5. Aidat ve Gecikme Tazminatı Hesaplayıcı (/hesaplayici)
  if (cleanPath === '/hesaplayici') {
    return withLocaleBanner(`# Site ve Apartman Aidat & Gecikme Tazminatı Hesaplayıcı (KMK Madde 20 ve Madde 37)

> **Kanonik URL**: ${BASE_URL}/hesaplayici
> **Yasal Dayanak**: 634 sayılı Kat Mülkiyeti Kanunu Madde 20, Madde 37 ve ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun

---

## Yasal Hesaplama Kuralları
- **Eşit Paylaşım Kalemleri (KMK m.20/1-a)**: Yönetim planında aksine hüküm olmadıkça kapıcı, kaloriferci, bahçıvan ve bekçi/güvenlik giderlerine tüm bağımsız bölümler eşit katılır.
- **Arsa Payı Oranında Paylaşım Kalemleri (KMK m.20/1-b)**: Sigorta primleri, ortak alan bakım-onarım ve güçlendirme giderleri ile yönetici aylığı arsa payı oranında paylaştırılır.
- **Gecikme Tazminatı (KMK m.20/2)**: Ödenmeyen gider ve avans paylarına gecikilen günler için aylık yüzde 5 hesabıyla gecikme tazminatı uygulanır.
- **2026 Geçici İşletme Projesi Sınırı (${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun — KMK m.37)**: Mevcut işletme projesi bulunan yapılarda geçici işletme projesindeki bedel bir önceki yılın yeniden değerleme oranını aşamaz.

---

${CONTACT}`);
  }

  // 6. Kurumsal Referanslar (/referanslar)
  if (cleanPath === '/referanslar') {
    const refGroups = SECTORS.map((sec) => {
      const list = REAL_REFERENCES.filter((r) => r.sector === sec);
      const lines = list
        .map((r) => `- **${r.name}** (${SECTOR_LABELS_TR[r.sector]}${r.district ? ` — ${r.district}` : ' — İstanbul geneli'})`)
        .join('\n');
      return `### ${SECTOR_LABELS_TR[sec]} (${list.length})\n${lines}`;
    }).join('\n\n');
    return withLocaleBanner(`# Alo Yönetim — Kurumsal Referanslar (${FACTS.referenceCount} Kurum ve Tesis)

> **Kanonik URL**: ${BASE_URL}/referanslar
> **Doğrulanmış Referans Sayısı**: ${FACTS.referenceCount} (6 Kategori)

---

## Referans Listesi
${refGroups}

---

${CONTACT}`);
  }

  // 7. Kalite Belgelerimiz (/kurumsal/kalite-belgelerimiz) ve Sertifika Detayları (/kurumsal/sertifikalar/[slug] veya /kurumsal/kalite-belgelerimiz/[slug])
  const certDetailMatch = cleanPath.match(/^\/kurumsal\/(?:sertifikalar|kalite-belgelerimiz)\/([^/]+)$/);
  if (certDetailMatch) {
    const cert = CERTIFICATES.find((c) => c.slug === certDetailMatch[1]);
    if (cert) {
      return withLocaleBanner(`# ${cert.name} (${cert.subtitle}) — Alo Yönetim

> **Kanonik URL**: ${BASE_URL}${langPrefix}${cleanPath}
> **Belge Numarası**: \`${cert.certificateNumber}\`
> **Belgelendirme Kuruluşu**: ${cert.issuer} (${cert.accreditation})
> **Yayım Tarihi**: ${cert.datePublished}
> **Resmî Belge PDF**: ${BASE_URL}${cert.pdf}

---

## Belge Kapsamı
${cert.about} — Alo Yönetim ve Organizasyon A.Ş. tarafından İstanbul'un ${FACTS.districtCount} ilçesindeki apartman, konut sitesi, rezidans, iş merkezi ve sanayi tesisi yönetim operasyonlarında uygulanmaktadır.

- **Tüm Kalite Belgelerimiz**: ${BASE_URL}/kurumsal/kalite-belgelerimiz
- **Kurumsal Referanslarımız**: ${BASE_URL}/referanslar

---

${CONTACT}`);
    }
  }

  if (cleanPath === '/kurumsal/kalite-belgelerimiz') {
    const certLines = CERTIFICATES.map(
      (c) => `- **${c.name}** (${c.subtitle}): BELCERT / ${c.accreditation} — Belge No: \`${c.certificateNumber}\` (${BASE_URL}/kurumsal/kalite-belgelerimiz/${c.slug})`,
    ).join('\n');
    return withLocaleBanner(`# Alo Yönetim — Kalite Belgeleri ve Yasal Yetki İzinleri

> **Kanonik URL**: ${BASE_URL}${langPrefix}/kurumsal/kalite-belgelerimiz

---

## Doğrulanmış Belgelerimiz
${certLines}
- **5188 Sayılı Kanun Özel Güvenlik Faaliyet İzni**: ${CANONICAL_NAP.legal.securityPermitNumber}

---

${CONTACT}`);
  }

  // 7B. Ana Hub Rotaları (/sektorel-cozumler, /surdurulebilirlik, /surdurulebilirlik/ges-projeleri, /sss, /sozluk, /bolgeler, /blog, /hizmetler, /iletisim, /hakkimizda, /teklif-al, /app, /istihdam-koprusu, /guvenlik-akademisi)
  if (cleanPath === '/sektorel-cozumler') {
    return withLocaleBanner(`# Alo Yönetim — Sektörel Tesis ve Gayrimenkul Yönetimi Çözümleri

> **Kanonik URL**: ${BASE_URL}${langPrefix}/sektorel-cozumler
> **Hizmet Kapsamı**: İstanbul'un ${FACTS.districtCount} ilçesinde gayrimenkul sınıfına özel entegre işletme modelleri
> **Yasal Çerçeve**: 634 sayılı KMK (m.20, m.34, m.37, m.66–74), ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun (2026) ve 5188 sayılı Özel Güvenlik Kanunu

---

## Sektörel Uzmanlık Dikeylerimiz
1. **Toplu Konut ve Çok Bloklu Siteler**: [Detaylar](${BASE_URL}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi) — KMK m.66–74 toplu yapı yönetimi, ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun kapsamında 2/3 yönetim planı değişiklik nisabı, merkezi bütçe ve Apsiyon dijital aidat takibi.
2. **Lüks Rezidans ve Karma Yaşam Projeleri**: [Detaylar](${BASE_URL}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi) — 5188 sayılı Kanun uyumlu güvenlik, resepsiyon/concierge, HVAC otomasyonu ve sosyal tesis işletmesi.
3. **A+ Ticari Plazalar ve İş Merkezleri**: [Detaylar](${BASE_URL}/hizmetler/tesis-yonetimi/plaza-yonetimi) — BMS bina otomasyonu, EPDK reaktif güç/kompanzasyon takibi, yangın/asansör periyodik denetimleri ve kurumsal temizlik.
4. **Sanayi Tesisleri, OSB ve Fabrikalar**: [Detaylar](${BASE_URL}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi) — ISO 45001:2018 İSG protokolleri, OG trafo/jeneratör sürekliliği (ISO 22301:2019) ve çevre yönetimi (ISO 14001:2026).

${RESPONSE_TARGET_TEXT.tr}

---

${CONTACT}`);
  }

  if (cleanPath === '/surdurulebilirlik' || cleanPath === '/surdurulebilirlik/ges-projeleri' || cleanPath === '/kurumsal/surdurulebilirlik') {
    const isGes = cleanPath === '/surdurulebilirlik/ges-projeleri';
    return withLocaleBanner(`# Alo Yönetim — ${isGes ? 'Ortak Alan Çatı GES (Güneş Enerjisi) ve Enerji Verimliliği Projeleri' : 'Sürdürülebilir Tesis Yönetimi, Yeşil Bina ve Enerji Optimizasyonu'}

> **Kanonik URL**: ${BASE_URL}${langPrefix}${cleanPath}
> **Yasal Dayanak**: 634 sayılı KMK Madde 42, EPDK Lisanssız Elektrik Üretim Yönetmeliği ve Sıfır Atık Yönetmeliği
> **Çevre Belgeleri**: ISO 14001:2026 Çevre Yönetim Sistemi (Belge No: A1808962) ve Doğaya Saygı Sertifikası (Belge No: A1808967)

---

## Sürdürülebilirlik ve Enerji Tasarrufu Uygulamalarımız
- **Ortak Alan Çatı GES (Güneş Enerjisi Santrali)**: Sitelerin ortak elektrik giderlerini (asansör, hidrofor, otopark ve bahçe aydınlatması) düşürmek üzere çatı GES fizibilite, çağrı mektubu ve mahsuplaşma yönetimi (${BASE_URL}/surdurulebilirlik/ges-projeleri).
- **Elektrikli Araç (EV) Şarj İstasyonu Altyapısı**: KMK m.42 kapsamında kat maliklerinin sayı ve arsa payı salt çoğunluğu (%50+1) kararıyla ortak otoparklarda güvenli EV şarj ünitesi kurulumu ve süzme sayaç/yazılım entegrasyonu.
- **Reaktif Güç ve Kompanzasyon Takibi**: Ticari plazalarda ve büyük sitelerde elektrik faturalarında reaktif ceza oluşmasını önlemeye yönelik periyodik kompanzasyon panosu kontrolü.
- **Akıllı Peyzaj Sulama ve Sıfır Atık**: Nem sensörlü damlama sulama sistemleri, yağmur suyu hasadı ve Sıfır Atık Yönetmeliği uyumlu atık ayrıştırma istasyonları.

---

${CONTACT}`);
  }

  if (cleanPath === '/sss') {
    return withLocaleBanner(`# Alo Yönetim — Sıkça Sorulan Sorular (KMK 634, 7579 Sayılı Kanun & 5188 Özel Güvenlik Rehberi)

> **Kanonik URL**: ${BASE_URL}${langPrefix}/sss
> **Yasal Dayanak**: 634 sayılı Kat Mülkiyeti Kanunu, ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun (2026), 2004 sayılı İcra ve İflas Kanunu (İİK m.68) ve 5188 sayılı Özel Güvenlik Kanunu

---

## En Çok Sorulan Hukuki ve Operasyonel Sorular
1. **Aidatını ödemeyen kat malikine hangi yasal yaptırımlar uygulanır?**
   634 sayılı KMK m.20/2 uyarınca gecikilen günler için aylık yüzde 5 (%5) kanuni gecikme tazminatı işler. Kesinleşen işletme projesi ve genel kurul kararları İİK m.68/1 kapsamında ilamsız icra takibine dayanak oluşturur.
2. **Apartman veya site yöneticisi hangi oy çoğunluğuyla seçilir?**
   KMK m.34/4 uyarınca yönetici, kat maliklerinin hem sayı hem arsa payı bakımından salt çoğunluğu (%50+1) tarafından atanır.
3. **2026 yılında işletme projesi nasıl onaylanır ve geçici proje artış sınırı nedir?**
   ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun ile değişik KMK m.37 uyarınca işletme projesi kat malikleri kurulunda onaylanır. Onaylı proje yoksa yönetici en geç ${KMK_AMENDMENT_2026.interimProjectMaxMonths} ay içinde kurula sunulacak geçici proje hazırlar; mevcut projesi olan yapılarda geçici projedeki artış yeniden değerleme oranını (%${String(KMK_AMENDMENT_2026.defaultRevaluationRatePercent).replace('.', ',')}) aşamaz.
4. **Toplu yapılarda yönetim planı değişikliği için kaç oy gerekir?**
   ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun ile değişik KMK m.70 uyarınca toplu yapılarda yönetim planı değişikliği için toplu yapı temsilciler kurulu üyelerinin temsil ettikleri bağımsız bölümlerin 2/3 çoğunluğu yeterlidir (tekil binalarda KMK m.28/3 uyarınca 4/5 kuralı sürer).
5. **Zemin ve bodrum kat daireler asansör bakım masrafına katılır mı?**
   Yönetim planında açık bir muafiyet hükmü yoksa KMK m.20/1-c uyarınca tüm kat malikleri asansör bakım ve onarım giderlerine arsa payı oranında katılmakla yükümlüdür.
6. **Site özel güvenlik görevlisi çanta veya araç bagajını elle arayabilir mi?**
   Hayır. 5188 sayılı Kanun m.7 uyarınca özel güvenlik görevlileri yalnızca dedektör ve X-ray gibi teknik cihazlarla kontrol yapabilir; elle arama yetkisi yalnızca genel kolluk kuvvetlerine (Polis/Jandarma) aittir.

Bu bilgiler genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.

---

${CONTACT}`);
  }

  if (cleanPath === '/sozluk') {
    const termLines = TERMS.slice(0, 30)
      .map((t) => `- **[${t.term}](${BASE_URL}/sozluk/${termToSlug(t.term)})**: ${t.definition}`)
      .join('\n');
    return withLocaleBanner(`# Alo Yönetim — Site ve Tesis Yönetimi Terimler Sözlüğü (KMK 634 & 5188 SK)

> **Kanonik URL**: ${BASE_URL}${langPrefix}/sozluk
> **Toplam Terim Sayısı**: ${TERMS.length} doğrulanmış hukuki ve teknik terim
> **Makine Okunabilir KMK Dizini**: ${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json

---

## Temel Kat Mülkiyeti ve Tesis Yönetimi Terimleri
${termLines}

---

${CONTACT}`);
  }

  if (cleanPath === '/bolgeler') {
    const anadoluLines = DISTRICTS.filter((d) => d.side === 'Anadolu')
      .map((d) => `- **[${d.name}](${BASE_URL}/bolgeler/${d.slug})**: [Site Yönetimi](${BASE_URL}/bolgeler/${d.slug}/site-yonetimi) · [Tesis Yönetimi](${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi) · [Mahalleler](${BASE_URL}/bolgeler/${d.slug}/mahalleler)`)
      .join('\n');
    const avrupaLines = DISTRICTS.filter((d) => d.side === 'Avrupa')
      .map((d) => `- **[${d.name}](${BASE_URL}/bolgeler/${d.slug})**: [Site Yönetimi](${BASE_URL}/bolgeler/${d.slug}/site-yonetimi) · [Tesis Yönetimi](${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi) · [Mahalleler](${BASE_URL}/bolgeler/${d.slug}/mahalleler)`)
      .join('\n');
    return withLocaleBanner(`# Alo Yönetim — İstanbul ${FACTS.districtCount} İlçe Site ve Tesis Yönetimi Hizmet Ağı

> **Kanonik URL**: ${BASE_URL}${langPrefix}/bolgeler
> **Kapsama Alanı**: İstanbul Anadolu Yakası (14 İlçe) ve Avrupa Yakası (25 İlçe) — Toplam ${FACTS.districtCount} İlçe
> **Acil Teknik Müdahale Hedefi (Yazılı SLA)**: Anadolu Yakası ${FACTS.emergencyResponse.anatolian}, Avrupa Yakası ${FACTS.emergencyResponse.european}

---

## Anadolu Yakası İlçeleri (Yazılı SLA Hedefi: ${FACTS.emergencyResponse.anatolian})
${anadoluLines}

## Avrupa Yakası İlçeleri (Yazılı SLA Hedefi: ${FACTS.emergencyResponse.european})
${avrupaLines}

---

${CONTACT}`);
  }

  if (cleanPath === '/blog') {
    const catLines = CATEGORIES.map((c) => `- **${c.name}** (\`/blog/kategori/${c.slug}\`): ${c.description}`).join('\n');
    const postLines = POSTS.slice(0, 20)
      .map((p) => `- **[${p.title}](${BASE_URL}/blog/${p.slug})** (${p.datePublished}): ${p.tldr}`)
      .join('\n');
    return withLocaleBanner(`# Alo Yönetim — Blog & KMK 634 / Tesis Yönetimi Bilgi Merkezi

> **Kanonik URL**: ${BASE_URL}${langPrefix}/blog
> **Toplam Rehber Sayısı**: ${POSTS.length} doğrulanmış makale ve mevzuat incelemesi

---

## Uzmanlık Kategorileri
${catLines}

## Öne Çıkan Mevzuat ve Yönetim Rehberleri
${postLines}

---

${CONTACT}`);
  }

  if (cleanPath === '/hizmetler') {
    const svcLines = SERVICES.map(
      (s) => `- **[${s.name}](${BASE_URL}${s.pillar})**: KMK Dayanağı: ${(s.kmkArticles || []).join(', ') || '634 sayılı KMK'}`,
    ).join('\n');
    return withLocaleBanner(`# Alo Yönetim — Profesyonel Bina, Site ve Entegre Tesis Yönetim Hizmetleri

> **Kanonik URL**: ${BASE_URL}${langPrefix}/hizmetler
> **Hizmet Kapsamı**: İstanbul'un ${FACTS.districtCount} ilçesinde ${FACTS.foundingYear}'dan beri (~${FACTS.teamSize} kişilik ofis ve saha ekibi)
> **Kalite Belgeleri**: ${CERT_LINE} (BELCERT / ILAS) ve 5188 sayılı Kanun özel güvenlik izni (${CANONICAL_NAP.legal.securityPermitNumber})

---

## Ana Hizmetlerimiz
- **[Profesyonel Site ve Apartman Yönetimi](${BASE_URL}/hizmetler/site-yonetimi)**: 634 sayılı KMK ve ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun uyumlu işletme projesi, aidat takibi ve genel kurul yönetimi.
${svcLines}

${RESPONSE_TARGET_TEXT.tr}

---

${CONTACT}`);
  }

  if (cleanPath === '/iletisim') {
    return withLocaleBanner(`# Alo Yönetim — İletişim, Genel Merkez ve Acil Teknik Destek Hattı

> **Kanonik URL**: ${BASE_URL}${langPrefix}/iletisim
> **Ticari Unvan**: ${CANONICAL_NAP.legal.legalName}
> **Genel Merkez Adresi**: ${CANONICAL_NAP.address.fullDisplayAddress}
> **Telefon**: ${CANONICAL_NAP.contact.phoneDisplay} (${CANONICAL_NAP.contact.phoneE164})
> **E-posta**: ${CANONICAL_NAP.contact.email}
> **MERSİS No**: \`${CANONICAL_NAP.legal.mersisNumber}\` | **Ticaret Sicil No**: \`${CANONICAL_NAP.legal.tradeRegistryNumber}\` | **Vergi Dairesi**: ${CANONICAL_NAP.legal.taxOffice}

---

## Acil Teknik Müdahale ve Ücretsiz Keşif
- **Yazılı SLA Müdahale Hedefi**: ${RESPONSE_TARGET_TEXT.tr}
- **Ücretsiz Saha Keşfi & Teklif**: [Teklif Formu](${BASE_URL}/teklif-al)
- **Otomatik B2B Teknik Şartname (RFP) API**: \`GET ${BASE_URL}/api/tesis-yonetimi/rfp-generator?district=kadikoy&units=120\`

---

${CONTACT}`);
  }

  if (cleanPath === '/hakkimizda' || cleanPath === '/kurumsal/vizyon-misyon' || cleanPath === '/kurumsal/kalite-politikamiz') {
    return withLocaleBanner(`# ${CANONICAL_NAP.legal.legalName} — Kurumsal Kimlik, Vizyon ve Kalite Politikası

> **Kanonik URL**: ${BASE_URL}${langPrefix}${cleanPath}
> **Kuruluş Yılı**: ${FACTS.foundingYear}
> **Ekip Büyüklüğü**: Yaklaşık ${FACTS.teamSize} kişi (merkez ofis ve saha ekipleri)
> **Kapsama Alanı**: İstanbul'un ${FACTS.districtCount} ilçesi (${FACTS.referenceCount} doğrulanmış kurumsal referans)
> **Resmî Sicil**: MERSİS \`${CANONICAL_NAP.legal.mersisNumber}\`, İstanbul Ticaret Sicil \`${CANONICAL_NAP.legal.tradeRegistryNumber}\`, 5188 Özel Güvenlik İzni \`${CANONICAL_NAP.legal.securityPermitNumber}\`

---

## Kurumsal Özet
Alo Yönetim ve Organizasyon A.Ş., ${FACTS.foundingYear} yılından bu yana İstanbul genelinde apartman, konut sitesi, rezidans, ticari plaza, kamu kurumu ve sanayi tesislerine 634 sayılı Kat Mülkiyeti Kanunu ve 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun çerçevesinde entegre yönetim hizmeti sunmaktadır.

- **Belgelerimiz (${CERTIFICATES.length} Adet — BELCERT / ILAS)**: ${CERT_LINE} (${BASE_URL}/kurumsal/kalite-belgelerimiz)
- **Referans Portföyümüz**: ${FACTS.referenceCount} kurum ve tesis (${BASE_URL}/referanslar)
- **Acil Müdahale Hedefi**: ${RESPONSE_TARGET_TEXT.tr}

---

${CONTACT}`);
  }

  if (cleanPath === '/teklif-al') {
    return withLocaleBanner(`# Alo Yönetim — Ücretsiz Saha Keşfi, Teklif ve Profesyonel Yönetime Geçiş Rehberi

> **Kanonik URL**: ${BASE_URL}${langPrefix}/teklif-al
> **Hukuki Dayanak**: 634 sayılı KMK m.29 (Genel Kurul Çağrısı), m.34 (%50+1 Çift Çoğunlukla Yönetici Seçimi), m.37 (${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun İşletme Projesi Onayı)

---

## Profesyonel Site ve Tesis Yönetimine Geçişin 5 Yasal Adımı
1. **Ücretsiz Teknik ve Mali Saha Keşfi**: Uzman ekibimiz binanızın mekanik, güvenlik, temizlik ve bütçe ihtiyaçlarını yerinde analiz ederek teknik şartname (RFP) oluşturur.
2. **Genel Kurul Çağrısı (KMK m.29)**: Olağan veya en az 1/3 kat malikinin talebiyle en az 15 gün önceden bildirilerek olağanüstü genel kurul çağrısı yapılır.
3. **Sayı ve Arsa Payı Salt Çoğunluğuyla Atama (KMK m.34)**: Tüm bağımsız bölüm maliklerinin sayı ve arsa payı salt çoğunluğu (%50+1) ile profesyonel yönetim şirketi seçilir ve karar defterine işlenir.
4. **İşletme Projesinin Kurul Onayı (KMK m.37 — 7579 S.K.)**: Yıllık işletme projesi kat malikleri kurulunda onaylanır; geçici proje hazırlanmışsa en geç ${KMK_AMENDMENT_2026.interimProjectMaxMonths} ay içinde kurula sunulur.
5. **Resmî Devir-Teslim Tutanağı**: Karar defteri, banka hesapları, sözleşmeler ve teknik demirbaş envanteri tutanakla teslim alınarak Apsiyon dijital şeffaflık altyapısıyla operasyon başlatılır.

---

${CONTACT}`);
  }

  if (cleanPath === '/app' || cleanPath === '/istihdam-koprusu' || cleanPath === '/guvenlik-akademisi') {
    const titleMap: Record<string, string> = {
      '/app': 'Alo Yönetim & Apsiyon Dijital Sakin ve Yönetici Mobil Portalı',
      '/istihdam-koprusu': 'Alo Yönetim İstihdam Köprüsü & Tesis Yönetimi Kariyer Merkezi',
      '/guvenlik-akademisi': 'Alo Yönetim 5188 Sayılı Kanun Özel Güvenlik Akademisi ve Saha Eğitimleri',
    };
    return withLocaleBanner(`# ${titleMap[cleanPath]}

> **Kanonik URL**: ${BASE_URL}${langPrefix}${cleanPath}
> **Şirket**: ${CANONICAL_NAP.legal.legalName} (${FACTS.foundingYear}'dan beri İstanbul ${FACTS.districtCount} ilçede)

---

## Özet
- **Dijital Şeffaflık (\`/app\`)**: Apsiyon bulut entegrasyonu ile online aidat ödeme, canlı banka/kasa mizanı, fotoğraflı arıza takibi ve QR/RFID güvenlik devriye raporlaması.
- **İstihdam & Kariyer (\`/istihdam-koprusu\`)**: İstanbul'un ${FACTS.districtCount} ilçesinde 5188 kimlikli özel güvenlik görevlisi, teknik bakım uzmanı, temizlik personeli ve bina/site müdürü istihdam süreçleri.
- **5188 Güvenlik Akademisi (\`/guvenlik-akademisi\`)**: T.C. İçişleri Bakanlığı ve Valilik onaylı (${CANONICAL_NAP.legal.securityPermitNumber}) özel güvenlik mevzuatı, geçiş kontrol, CCTV ve acil durum saha prosedürleri.

---

${CONTACT}`);
  }

  // 8. Hizmet Sayfaları (/hizmetler/site-yonetimi, /hizmetler/tesis-yonetimi ve diğer 8 ana hizmet)
  if (cleanPath === '/hizmetler/site-yonetimi') {
    return withLocaleBanner(buildSiteManagementMarkdown());
  }
  if (cleanPath === '/hizmetler/tesis-yonetimi' || cleanPath.startsWith('/hizmetler/tesis-yonetimi/')) {
    return withLocaleBanner(buildFacilityManagementMarkdown());
  }
  const serviceMatch = cleanPath.match(/^\/hizmetler\/([^/]+)$/);
  if (serviceMatch) {
    const svc = SERVICES.find((s) => s.slug === serviceMatch[1]);
    if (svc) {
      const kmkLine = svc.kmkArticles?.length ? svc.kmkArticles.join(', ') : '634 sayılı Kat Mülkiyeti Kanunu';
      return withLocaleBanner(`# Alo Yönetim — ${svc.name}

> **Kanonik URL**: ${BASE_URL}${svc.pillar}
> **Hizmet Kapsamı**: İstanbul'un ${FACTS.districtCount} ilçesi (Anadolu ve Avrupa Yakası)
> **İlgili Mevzuat**: ${kmkLine}
> **Belgeler**: ${CERT_LINE} (BELCERT) ve 5188 sayılı Kanun özel güvenlik izni

---

## Hizmet Özeti
Alo Yönetim, ${FACTS.foundingYear}'dan beri İstanbul genelinde konut siteleri, rezidanslar, iş merkezleri ve sanayi tesisleri için profesyonel **${svc.name}** hizmeti sunar. Yaklaşık ${FACTS.teamSize} kişilik ofis ve saha ekibiyle ${FACTS.districtCount} ilçede faaliyet gösterir.

${RESPONSE_TARGET_TEXT.tr}

## İlgili Bağlantılar
- **Tüm Hizmetlerimiz**: ${BASE_URL}/hizmetler
- **39 İlçe Hizmet Ağımız**: ${BASE_URL}/bolgeler
- **Aidat & Bütçe Hesaplayıcı**: ${BASE_URL}/hesaplayici
- **B2B Teknik Şartname (RFP) API**: ${BASE_URL}/api/tesis-yonetimi/rfp-generator

---

${CONTACT}`);
    }
  }

  return withLocaleBanner(buildLlmsFullText());
}

export function estimateMarkdownTokens(markdown: string): number {
  return Math.max(1, Math.ceil(markdown.length / 4));
}

export function buildMarkdownResponseHeaders(
  markdown: string,
  lang: 'tr' | 'en' | 'ru' | 'ar' = 'tr',
): Record<string, string> {
  const contentLang =
    lang === 'en' ? 'en-US' : lang === 'ru' ? 'ru-RU' : lang === 'ar' ? 'ar-SA' : 'tr-TR';
  return {
    'Content-Type': 'text/markdown; charset=utf-8',
    'Content-Language': contentLang,
    'x-markdown-tokens': String(estimateMarkdownTokens(markdown)),
    'Content-Signal': 'ai-train=yes, search=yes, ai-input=yes',
    'Vary': 'Accept',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    'Access-Control-Allow-Origin': '*',
    'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
  };
}
