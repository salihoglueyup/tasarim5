import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';
import { CERTIFICATES } from '@/data/certificates';
import { getDistrict } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { slugToTerm } from '@/data/dictionary';
import { REAL_REFERENCES } from '@/data/realReferences';
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

/**
 * Rota-Duyarlı (Route-Aware) Markdown Üretici:
 * İlçe (/bolgeler/[ilce]/*), Hizmet (/hizmetler/[slug]), Sözlük (/sozluk/[terim]),
 * KMK 2026 (/kmk-2026-degisiklikleri), Referanslar (/referanslar) ve Kalite Belgeleri
 * rotaları için sayfaya özgü doğrulanmış Markdown üretir.
 */
export function buildRouteAwareMarkdown(rawPath: string): string {
  const cleanPath =
    (rawPath || '/')
      .split('?')[0]
      .replace(/^\/(tr|en|ru|ar)(?=\/|$)/i, '')
      .replace(/\/+$/, '') || '/';

  // 1. İlçe ve İlçe Alt Rotaları (/bolgeler/[ilce], /bolgeler/[ilce]/site-yonetimi, /bolgeler/[ilce]/tesis-yonetimi, /bolgeler/[ilce]/mahalleler)
  const districtMatch = cleanPath.match(/^\/bolgeler\/([^/]+)(?:\/(site-yonetimi|tesis-yonetimi|mahalleler))?$/);
  if (districtMatch) {
    const districtSlug = districtMatch[1];
    const subRoute = districtMatch[2];
    const district = getDistrict(districtSlug);
    if (district) {
      const sideLabel = district.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası';
      const slaTarget =
        district.side === 'Anadolu'
          ? FACTS.emergencyResponse.anatolian
          : FACTS.emergencyResponse.european;
      const localRefs = REAL_REFERENCES.filter((r) => r.district === district.name);
      const neighborhoodsList = (district.neighborhoods || [])
        .map((n) => (typeof n === 'string' ? n : n.name))
        .join(', ');
      const focusHeading =
        subRoute === 'site-yonetimi'
          ? `${district.name} Profesyonel Site ve Apartman Yönetimi`
          : subRoute === 'tesis-yonetimi'
            ? `${district.name} Entegre Tesis ve Plaza Yönetimi`
            : subRoute === 'mahalleler'
              ? `${district.name} Mahalle Bazlı Site ve Tesis Yönetimi Kapsamı`
              : `${district.name} Site ve Tesis Yönetimi`;

      return `# Alo Yönetim — ${focusHeading}

> **Kanonik URL**: ${BASE_URL}${cleanPath}
> **Bölge**: ${district.name}, İstanbul (${sideLabel})
> **Merkez Koordinatları**: ${district.geo.lat}, ${district.geo.lng}
> **Acil Teknik Müdahale Hedefi (Yazılı SLA)**: ${slaTarget}
> **Yasal Çerçeve**: 634 sayılı Kat Mülkiyeti Kanunu, ${KMK_AMENDMENT_2026.lawNumber} sayılı Kanun (2026) ve 5188 sayılı Özel Güvenlik Kanunu

---

## Bölgesel Operasyon Özeti
Alo Yönetim, ${FACTS.foundingYear}'dan beri İstanbul ${district.name} (${sideLabel}) bölgesindeki apartman, konut sitesi, rezidans, iş merkezi ve ticari tesislere profesyonel yönetim hizmeti sunmaktadır.

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

${CONTACT}`;
    }
  }

  // 2. Sözlük Terim Detay Rotaları (/sozluk/[terim])
  const glossaryMatch = cleanPath.match(/^\/sozluk\/([^/]+)$/);
  if (glossaryMatch) {
    const termObj = slugToTerm(glossaryMatch[1]);
    if (termObj) {
      return `# ${termObj.term} — Kat Mülkiyeti ve Tesis Yönetimi Sözlüğü

> **Kanonik URL**: ${BASE_URL}${cleanPath}
> **Kategori**: ${termObj.category}
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

  // 4. Kurumsal Referanslar (/referanslar)
  if (cleanPath === '/referanslar') {
    const refLines = REAL_REFERENCES.map(
      (r) => `- **${r.name}** (${r.sector}${r.district ? ` — ${r.district}` : ''})`,
    ).join('\n');
    return `# Alo Yönetim — Kurumsal Referanslar (${FACTS.referenceCount} Kurum ve Tesis)

> **Kanonik URL**: ${BASE_URL}/referanslar
> **Doğrulanmış Referans Sayısı**: ${FACTS.referenceCount}

---

## Referans Listesi
${refLines}

---

${CONTACT}`;
  }

  // 5. Kalite Belgelerimiz (/kurumsal/kalite-belgelerimiz)
  if (cleanPath === '/kurumsal/kalite-belgelerimiz') {
    const certLines = CERTIFICATES.map(
      (c) => `- **${c.name}** (${c.subtitle}): BELCERT / ${c.accreditation} — Belge No: \`${c.certificateNumber}\` (${BASE_URL}/kurumsal/kalite-belgelerimiz/${c.slug})`,
    ).join('\n');
    return `# Alo Yönetim — Kalite Belgeleri ve Yasal Yetki İzinleri

> **Kanonik URL**: ${BASE_URL}/kurumsal/kalite-belgelerimiz

---

## Doğrulanmış Belgelerimiz
${certLines}
- **5188 Sayılı Kanun Özel Güvenlik Faaliyet İzni**: ${CANONICAL_NAP.legal.securityPermitNumber}

---

${CONTACT}`;
  }

  // 6. Hizmet Sayfaları (/hizmetler/site-yonetimi, /hizmetler/tesis-yonetimi ve diğer 8 ana hizmet)
  if (cleanPath === '/hizmetler/site-yonetimi') {
    return buildSiteManagementMarkdown();
  }
  if (cleanPath === '/hizmetler/tesis-yonetimi' || cleanPath.startsWith('/hizmetler/tesis-yonetimi/')) {
    return buildFacilityManagementMarkdown();
  }
  const serviceMatch = cleanPath.match(/^\/hizmetler\/([^/]+)$/);
  if (serviceMatch) {
    const svc = SERVICES.find((s) => s.slug === serviceMatch[1]);
    if (svc) {
      const kmkLine = svc.kmkArticles?.length ? svc.kmkArticles.join(', ') : '634 sayılı Kat Mülkiyeti Kanunu';
      return `# Alo Yönetim — ${svc.name}

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

${CONTACT}`;
    }
  }

  return buildLlmsFullText();
}

export function estimateMarkdownTokens(markdown: string): number {
  return Math.max(1, Math.ceil(markdown.length / 4));
}

export function buildMarkdownResponseHeaders(markdown: string): Record<string, string> {
  return {
    'Content-Type': 'text/markdown; charset=utf-8',
    'x-markdown-tokens': String(estimateMarkdownTokens(markdown)),
    'Content-Signal': 'ai-train=yes, search=yes, ai-input=yes',
    'Vary': 'Accept',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    'Access-Control-Allow-Origin': '*',
    'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
  };
}
