import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';
import { CERTIFICATES } from '@/data/certificates';
import { FACTS, RESPONSE_TARGET_TEXT } from '@/lib/facts';
import { KMK_AMENDMENT_2026 } from '@/lib/legal/kmkAmendment2026';

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

export function estimateMarkdownTokens(markdown: string): number {
  return Math.max(1, Math.ceil(markdown.length / 4));
}

export function buildMarkdownResponseHeaders(markdown: string): Record<string, string> {
  return {
    'Content-Type': 'text/markdown; charset=utf-8',
    'x-markdown-tokens': String(estimateMarkdownTokens(markdown)),
    'Vary': 'Accept',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    'Access-Control-Allow-Origin': '*',
    'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
  };
}

