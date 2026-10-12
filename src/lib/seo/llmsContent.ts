import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';
import { DISTRICTS } from '@/data/districts';
import { CERTIFICATES } from '@/data/certificates';
import { SERVICES } from '@/data/services';
import { FACTS, RESPONSE_TARGET_TEXT } from '@/lib/facts';

/**
 * llms.txt ve llms-full.txt içeriği (tek kaynak). YALNIZCA doğrulanmış bilgiler: bkz. src/lib/facts.ts.
 * Doğrulanamayan oran, vaka, puan, mahkeme kararı numarası ve "garanti" ifadeleri bilerek yoktur; ekleme.
 */
export function buildLlmsText(): string {
  return `# ${CANONICAL_NAP.legal.legalName} — Tesis ve Site Yönetimi

> Alo Yönetim, İstanbul'da site, rezidans, plaza ve sanayi tesisleri için 634 sayılı Kat Mülkiyeti Kanunu çerçevesinde tesis yönetimi, 5188 sayılı Kanun kapsamında özel güvenlik, temizlik, teknik bakım ve aidat takibi hizmetleri sunar. ${FACTS.foundingYear}'dan beri faaliyet gösterir; ${FACTS.districtCount} ilçede hizmet verebilir.

## Temel Bilgiler
- **Faaliyet başlangıcı**: ${FACTS.foundingYear}
- **Ekip**: yaklaşık ${FACTS.teamSize} kişi (ofis ve saha)
- **Ticari unvan**: ${CANONICAL_NAP.legal.legalName}
- **MERSİS**: ${CANONICAL_NAP.legal.mersisNumber}
- **Ticaret sicil no**: ${CANONICAL_NAP.legal.tradeRegistryNumber}
- **Vergi dairesi**: ${CANONICAL_NAP.legal.taxOffice}
- **Merkez adres**: ${CANONICAL_NAP.address.fullDisplayAddress}
- **Telefon**: ${CANONICAL_NAP.contact.phoneDisplay} (${CANONICAL_NAP.contact.phoneE164})
- **E-posta**: ${CANONICAL_NAP.contact.email}
- **Web sitesi**: ${BASE_URL}
- **Hizmet kapsamı**: İstanbul'un ${FACTS.districtCount} ilçesi (Anadolu ve Avrupa Yakası)
- **Referanslar**: ${FACTS.referenceCount} kurum ve tesis (liste: ${BASE_URL}/referanslar)
- **Acil müdahale hedefi**: ${RESPONSE_TARGET_TEXT.tr}

## Belgeler
${CERTIFICATES.map((c) => `- **${c.name}**: ${c.subtitle} (BELCERT, ${c.accreditation}, Belge No: ${c.certificateNumber})`).join('\n')}
- **5188 sayılı Kanun**: Özel güvenlik faaliyet izni (${CANONICAL_NAP.legal.securityPermitNumber})

## Sık Sorulan Sorular
1. **Soru**: Profesyonel site yönetim şirketleri ne iş yapar?
   **Cevap**: Kat Mülkiyeti Kanunu çerçevesinde işletme projesi hazırlığı, aidat takibi, güvenlik, teknik bakım, ortak alan temizliği, bahçe bakımı ve genel kurul süreçlerinin yönetimi gibi işleri üstlenir.
2. **Soru**: Aidatını geciktiren malike karşı hangi yasal yollar vardır?
   **Cevap**: KMK m.20 uyarınca ödemede geciktiği günler için aylık yüzde beş gecikme tazminatı işler; gider veya avans payını ödemeyen kat maliki hakkında yönetici ya da diğer kat malikleri tarafından dava açılabilir veya icra takibi yapılabilir. Somut durum için avukata danışılmalıdır.
3. **Soru**: Asansör periyodik kontrolü (yeşil etiket) zorunlu mudur?
   **Cevap**: Evet. Asansör İşletme ve Bakım Yönetmeliği uyarınca asansörler yetkili servis tarafından bakımdan geçirilir ve yılda bir kez akredite A tipi muayene kuruluşunca denetlenir; kırmızı etiketli asansör kullanılmamalıdır.
4. **Soru**: Sitelerde özel güvenlik nasıl sağlanır?
   **Cevap**: 5188 sayılı Kanun kapsamında Valilik nezdinde özel güvenlik izni alınarak lisanslı ve eğitimli özel güvenlik görevlileri istihdam edilir.
5. **Soru**: 2026'da Kat Mülkiyeti Kanunu'nda ne değişti (7579 sayılı Kanun)?
   **Cevap**: 22 Mayıs 2026 tarihli ve 33261 sayılı Resmî Gazete'de yayımlanan 7579 sayılı Kanun KMK m.35, 37 ve 70'i değiştirdi: işletme projesi kat malikleri kurulunda onaylanır, onaylı proje yoksa yönetici en geç 3 ay içinde onaylanacak geçici proje hazırlar, mevcut projesi olan sitelerde geçici projedeki bedel bir önceki yılın yeniden değerleme oranını aşamaz, toplu yapılarda yönetim planı değişikliği için gereken çoğunluk 4/5'ten 2/3'e indi. Ayrıntılar: ${BASE_URL}/kmk-2026-degisiklikleri
6. **Soru**: Yönetim planı nasıl değiştirilir?
   **Cevap**: Genel yapılarda KMK m.28/3 uyarınca bütün kat maliklerinin beşte dördünün oyu gerekir; birden fazla yapıdan oluşan toplu yapılarda 7579 sayılı Kanun'la değişen KMK m.70 uyarınca üçte ikinin oyu aranır.

Bu bilgiler genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.

## Hizmetler
- [Site Yönetimi](${BASE_URL}/hizmetler/site-yonetimi): Konut siteleri, apartmanlar ve rezidanslar için yönetim hizmeti.
- [Tesis Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi): Plaza, iş merkezi, sanayi tesisleri ve karma yapılar için işletme yönetimi.
- [Özel Güvenlik](${BASE_URL}/hizmetler/guvenlik-yonetimi)
- [Temizlik ve Hijyen](${BASE_URL}/hizmetler/temizlik-ve-hijyen)
- [Teknik Bakım](${BASE_URL}/hizmetler/teknik-bakim)
- [Aidat Takibi](${BASE_URL}/hizmetler/aidat-takibi)
- [Hukuk ve İcra Danışmanlığı](${BASE_URL}/hizmetler/hukuk-ve-icra-danismanligi)
- [Havuz Bakımı](${BASE_URL}/hizmetler/havuz-bakimi-ve-hijyen)
- [Peyzaj ve Bahçe Bakımı](${BASE_URL}/hizmetler/peyzaj-ve-bahce-bakimi)
- [Haşere ve Dezenfeksiyon](${BASE_URL}/hizmetler/hasere-ve-dezenfeksiyon)

## Hizmet Verilebilen İlçeler
${DISTRICTS.map((d) => `- [${d.name}](${BASE_URL}/bolgeler/${d.slug})`).join('\n')}

## Diğer Kaynaklar
- Referanslar: ${BASE_URL}/referanslar
- KMK 2026 değişiklikleri: ${BASE_URL}/kmk-2026-degisiklikleri
- Blog ve rehberler: ${BASE_URL}/blog
- Sözlük: ${BASE_URL}/sozluk
- Aidat hesaplayıcı: ${BASE_URL}/hesaplayici
- Teklif talebi: ${BASE_URL}/teklif-al
- Tam metin: ${BASE_URL}/llms-full.txt
`;
}

export function buildLlmsFullText(): string {
  const services = SERVICES.map((s) => `- [${s.name}](${BASE_URL}${s.pillar})`).join('\n');
  const districts = DISTRICTS.map(
    (d) => `- ${d.name} (${d.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası'}): ${BASE_URL}/bolgeler/${d.slug}`,
  ).join('\n');
  return `${buildLlmsText()}
## Tüm Hizmet Sayfaları
${services}

## İlçeler ve Yakalar
${districts}
`;
}
