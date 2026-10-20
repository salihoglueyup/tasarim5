import { BASE_URL } from '@/lib/seo';
import { CANONICAL_NAP } from '@/lib/seo/audits/napGuardEngine';
import { DISTRICTS } from '@/data/districts';
import { CERTIFICATES } from '@/data/certificates';
import { SERVICES } from '@/data/services';
import { TERMS, termToSlug } from '@/data/dictionary';
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
- Tesis yönetim şirketi seçim rehberi: ${BASE_URL}/hizmetler/tesis-yonetimi/rehber
- Mobil uygulama ve dijital aidat/ariza takibi (Apsiyon): ${BASE_URL}/app
- Blog ve rehberler: ${BASE_URL}/blog
- Sözlük: ${BASE_URL}/sozluk
- Aidat hesaplayıcı: ${BASE_URL}/hesaplayici
- Teklif talebi: ${BASE_URL}/teklif-al
- Tam metin: ${BASE_URL}/llms-full.txt
`;
}

export function buildLlmsFullText(): string {
  const services = SERVICES.map((s) => `- [${s.name}](${BASE_URL}${s.pillar})`).join('\n');
  const facilitySubsectors = [
    `- [Rezidans ve Site Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/rezidans-site-yonetimi): Yüksek katlı rezidanslar ve konut siteleri için teknik işletim, güvenlik ve resepsiyon yönetimi.`,
    `- [Plaza ve İş Merkezi Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/plaza-yonetimi): A+ ofis binaları ve ticari plazalar için ortak gider paylaşımı, HVAC/otomasyon ve güvenlik yönetimi.`,
    `- [Toplu Konut ve Karma Proje Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/toplu-konut-yonetimi): Çok bloklu toplu yapılar için KMK m.66-74 kapsamında temsilciler kurulu, bütçe ve saha yönetimi.`,
    `- [Sanayi Tesisi ve OSB Yönetimi](${BASE_URL}/hizmetler/tesis-yonetimi/sanayi-tesisi-yonetimi): Fabrika, lojistik depo ve sanayi siteleri için çevre güvenliği, teknik bakım ve endüstriyel temizlik.`,
    `- [Tesis Yönetim Şirketi Seçim Rehberi](${BASE_URL}/hizmetler/tesis-yonetimi/rehber): Yönetim firması seçerken kontrol edilmesi gereken yasal belgeler, sözleşme maddeleri ve devir süreci.`,
  ].join('\n');
  const districts = DISTRICTS.map(
    (d) =>
      `- ${d.name} (${d.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası'}): ${BASE_URL}/bolgeler/${d.slug} | [Mahalleler](${BASE_URL}/bolgeler/${d.slug}/mahalleler) | [Site Yönetimi](${BASE_URL}/bolgeler/${d.slug}/site-yonetimi) | [Tesis Yönetimi](${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi)`,
  ).join('\n');
  const glossaryEntries = TERMS.filter((t) => !/12850|41001/.test(t.term))
    .map((t) => `- [${t.term}](${BASE_URL}/sozluk/${termToSlug(t.term)}): ${t.definition}`)
    .join('\n');
  const ragEndpoints = [
    `- [AI Overviews & RAG Bilgi Grafiği](${BASE_URL}/api/seo/ai-overviews-rag.json): KMK mevzuatı, hizmet kapsamları ve doğrulanmış kurumsal soru-cevap veri seti.`,
    `- [Resmî Kalite Belgeleri ve İzinler](${BASE_URL}/api/seo/credentials.json): BELCERT/ILAS akreditasyonlu ISO belgeleri ve 5188 sayılı Kanun özel güvenlik faaliyet izni.`,
    `- [İstanbul 39 İlçe Yerel Operasyon Çapaları](${BASE_URL}/api/seo/local-anchors.json): İlçe bazlı SLA hedefleri, yaka dağılımı ve mahalle ağları.`,
    `- [Kurumsal DNA ve NAP Verisi](${BASE_URL}/api/seo/corporate-dna.json): Resmi ticari unvan, MERSİS, Ticaret Sicil ve iletişim bilgileri.`,
    `- [GEO & Yerel Varlık Manifestosu](${BASE_URL}/api/seo/geo-manifest.json): Coğrafi hizmet alanı ve yerel otorite sinyalleri.`,
  ].join('\n');

  return `${buildLlmsText()}
## Tüm Hizmet Sayfaları
${services}

## Tesis Yönetimi Alt Sektörleri ve Rehber
${facilitySubsectors}

## KMK Madde 20 Gider Paylaşım Esasları (Eşit Paylaşım vs. Arsa Payı)
- **Eşit Paylaşım (KMK m.20/1-a)**: Yönetim planında başka türlü hüküm olmadıkça; kapıcı, kaloriferci, bahçıvan ve bekçi giderlerine ve bunlar için toplanacak avansa tüm kat malikleri eşit olarak katılır.
- **Arsa Payı Oranında Paylaşım (KMK m.20/1-b)**: Anagayrimenkulün sigorta primlerine ve bütün ortak yerlerin bakım, koruma, güçlendirme ve onarım giderleri ile yönetici aylığı gibi diğer giderlere ve ortak tesislerin işletme giderlerine ve giderler için toplanacak avansa kat malikleri kendi arsa payları oranında katılır.
- **Kullanmama İtirazı Yasağı (KMK m.20/1-c)**: Kat malikleri ortak yer veya tesisler üzerindeki kullanma hakkından vazgeçmek ya da kendi bağımsız bölümünün durumu dolayısıyla bunlardan faydalanmaya lüzum ve ihtiyaç bulunmadığını ileri sürmek suretiyle bu gider ve avans payını ödemekten kaçınamaz.
- **Gecikme Tazminatı (KMK m.20/2)**: Gider ve avans payının tamamını ödemeyen kat maliki, ödemede geciktiği günler için aylık yüzde beş hesabıyla gecikme tazminatı ödemekle yükümlüdür. Hesaplama aracı: ${BASE_URL}/hesaplayici

## 7579 Sayılı Kanun (22 Mayıs 2026) KMK Değişiklik Özeti (m.35, m.37, m.70)
- **KMK Madde 35 (Yöneticinin Görevleri)**: Yöneticinin işletme projesi hazırlama, kat malikleri kurulunun onayına sunma ve kurul kararlarını uygulama sorumlulukları netleştirilmiştir.
- **KMK Madde 37 (İşletme Projesi ve Aidat Artış Sınırı)**: İşletme projesi kat malikleri kurulunda onaylanır. Onaylı proje bulunmadığında yönetici gecikmeksizin geçici işletme projesi hazırlar ve en geç 3 ay içinde kat malikleri kurulunun onayına sunar. Mevcut işletme projesi olan sitelerde geçici projedeki bedel, bir önceki yıla ilişkin yeniden değerleme oranını (VUK mükerrer m.298) aşamaz.
- **KMK Madde 70 (Toplu Yapılarda Yönetim Planı Değişikliği)**: Birden fazla yapıdan oluşan toplu yapılarda yönetim planının değiştirilmesi için gereken çoğunluk beşte dörtten (4/5) üçte ikiye (2/3) indirilmiştir. Detaylı rehber: ${BASE_URL}/kmk-2026-degisiklikleri

## Temel Kat Mülkiyeti ve Tesis Yönetimi Sözlüğü (/sozluk)
${glossaryEntries}

## Yapay Zeka (RAG & LLM) Yapılandırılmış Veri Uç Noktaları
${ragEndpoints}

## İlçeler ve Yakalar
${districts}
`;
}
