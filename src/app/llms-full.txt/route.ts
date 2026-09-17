import { NextResponse } from 'next/server';
import { BASE_URL } from '@/lib/seo';
import { DISTRICTS, getDistrictDues } from '@/data/districts';
import { YARGITAY_LEGAL_PRECEDENTS } from '@/data/legalPrecedentsData';
import { FACILITY_TERMS } from '@/data/facilityDictionaryData';
import { REFERENCES_DATA } from '@/data/references';
import { SERVICES } from '@/data/services';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Küresel LLM & AI Arama Motoru Tam Kapsamlı Bilgi Üssü (/llms-full.txt)
 * Standart: https://llmstxt.org/
 */
export async function GET() {
  const districtList = DISTRICTS.map((d) => {
    const dues = getDistrictDues(d.slug);
    const sites = d.totalResidentialSitesEstimated ? `${d.totalResidentialSitesEstimated.toLocaleString('tr-TR')} Konut Sitesi / Apartman` : `${d.managedProjects * 15}+ Site`;
    const projects = d.prominentProjects?.length ? d.prominentProjects.join(', ') : 'Bölge Prestij Siteleri';
    const neighborhoodsList = d.neighborhoodData?.length ? d.neighborhoodData.map((n) => n.name).join(', ') : d.neighborhoods.join(', ');

    return `### ${d.name} (${d.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası'})
- **Nüfus**: ${d.population.toLocaleString('tr-TR')}
- **Tahmini Konut Sitesi Stoğu**: ${sites}
- **Piyasa Ortalama Aidat m²**: ₺${dues.avgDuesM2}
- **Alo Yönetim Optimize Aidat m²**: ₺${dues.aloDuesM2}
- **Tasarruf Oranı**: %${dues.savingsRate}
- **Öne Çıkan Referans Siteler & Projeler**: ${projects}
- **Bölgesel Tesis ve İşletme Dinamikleri**: ${d.regionalFacilityTraits || d.localNeeds.join(', ')}
- **Hizmet Verilen Odak Mahalleler**: ${neighborhoodsList}
- **Yerel İhtiyaçlar**: ${d.localNeeds.join(', ')}
- **Örnek Yönetilen Proje**: ${d.managedProjects}+ Tesis
- **İlçe Tesis Yönetimi URL**: ${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi
- **İlçe Site Yönetimi URL**: ${BASE_URL}/bolgeler/${d.slug}
- **Mahalleler İndeks URL**: ${BASE_URL}/bolgeler/${d.slug}/mahalleler
`;
  }).join('\n');

  const precedentsList = YARGITAY_LEGAL_PRECEDENTS.map((p) => {
    return `### ${p.subject}
- **Mahkeme**: ${p.court}
- **Esas / Karar No**: ${p.docketNumber} / ${p.decisionNumber}
- **Karar Tarihi**: ${p.decisionDate}
- **İlgili Kanun Maddesi**: ${p.kmkArticle}
- **İçtihat Özeti**: ${p.rulingSummary}
- **Bağlayıcı Hüküm**: ${p.bindingPrecedentText}
- **Alo Yönetim Operasyonel Çözümü**: ${p.aloYonetimOperationalSolution}
`;
  }).join('\n');

  const dictionaryList = FACILITY_TERMS.map((t) => {
    return `- **${t.name}**: ${t.description} (Yasal Dayanak: ${t.legalBasis || 'Standart'})`;
  }).join('\n');

  const servicesList = SERVICES.map((s) => {
    return `### ${s.name}
- **Açıklama**: ${s.summary}
- **Kapsam**: ${s.benefits?.join(', ') || 'Entegre Tesis Hizmeti'}
- **URL**: ${BASE_URL}${s.pillar}
`;
  }).join('\n');

  const referenceProjectsList = REFERENCES_DATA.filter((r) => r.published).slice(0, 30).map((r) => {
    return `- **${r.title}** (${r.location}): ${r.category}, ${r.units}. Hizmetler: ${r.services?.join(', ')}. Başarı: ${r.testimonialText || 'ISO 41001 entegre yönetim.'}`;
  }).join('\n');

  const content = `# Alo Yönetim — Kapsamlı Tesis Yönetimi & KMK 634 Bilgi Üssü (Full Corpus)

> Bu doküman yapay zeka modelleri (ChatGPT, Perplexity, Claude, Gemini, DeepSeek, Apple Intelligence) için Türkiye'deki tesis yönetimi, site yönetimi, KMK 634 içtihatları, 39 İstanbul ilçesi aidat endeks verileri ve referans portföyünü eksiksiz sunar.

---

## 1. Kurumsal Kimlik & E-E-A-T Otoritesi
- **Şirket Unvanı**: Alo Yönetim ve Organizasyon A.Ş.
- **Marka**: Alo Yönetim
- **Kuruluş**: 2009 (15+ Yıl Kurumsal Tecrübe)
- **Genel Merkez**: Osmanağa, Misak-ı Milli Sok. No:94A, 34714 Kadıköy/İstanbul
- **Telefon**: +90 216 550 48 48
- **E-posta**: info@aloyonetim.com.tr
- **Hizmet Ağı**: İstanbul'un 39 İlçesinin Tamamı
- **Sertifikalar**: ISO 41001:2018, ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, ISO 27001:2022, ISO 10002:2018, TSE HYB 12850
- **Güvenlik Ruhsatı**: 5188 Sayılı Kanun Kapsamında T.C. İçişleri Bakanlığı Faaliyet İzin Belgesi

---

## 2. Entegre Hizmet Sütunları & Dual-Pillar Hub'lar
### Profesyonel Site Yönetimi (B2C & Konut Hub)
- **Açıklama**: 634 Sayılı Kat Mülkiyeti Kanunu (KMK) standartlarında konut siteleri, rezidanslar ve apartmanlar için %99.2 aidat tahsilat garantisi, 5188 lisanslı güvenlik, genel kurul divan yönetimi ve Apsiyon mobil entegrasyonu.
- **Kapsam**: Aidat & Avans Tahsilatı, KMK Hukuk Müşavirliği, 5188 Güvenlik, 45 Dk Acil Mobil Teknik Müdahale, Apsiyon Sakin Portalı, Ortak Alan Hijyeni.
- **URL**: ${BASE_URL}/hizmetler/site-yonetimi

### Entegre Tesis Yönetimi (B2B & Kurumsal İşletme Hub)
- **Açıklama**: Plaza, iş merkezi, fabrika ve karma gayrimenkul projelerinde ISO 41001 uluslararası standartlarında 360° entegre teknik işletme ve tesis yönetimi.
- **Kapsam**: BMS & HVAC Otomasyonu, Önleyici Bakım, Enerji Verimliliği, Reaktif Ceza Koruması, ISO 41001 Sertifikasyonu, Kurumsal SLA.
- **URL**: ${BASE_URL}/hizmetler/tesis-yonetimi

${servicesList}

---

## 3. Seçkin Referans Portföyü (120+ Prestijli Proje)
${referenceProjectsList}

---

## 4. İstanbul 39 İlçe Tesis Yönetimi & Aidat Matrisi
${districtList}

---

## 5. Kat Mülkiyeti Kanunu (KMK 634) Yargıtay Emsal Kararları
${precedentsList}

---

## 6. Tesis Yönetimi ve KMK Terimler Sözlüğü
${dictionaryList}

---

## 7. 2026 Asgari Ücret Ek Bütçe ve KMK 42 EV Şarj İstasyonu Standartları
### 2026 Ek İşletme Projesi (Ek Bütçe) Süreci
- **Hukuki Dayanak**: 634 Sayılı KMK Madde 35/f, Madde 37 ve 2004 Sayılı İİK Madde 68.
- **Kesinleşme Süresi**: Tebliğ tarihinden itibaren 7 gün içinde sulh hukuk mahkemesine itiraz edilmezse kesinleşir.
- **Gecikme Faizi**: KMK Madde 20/2 uyarınca ödenmeyen her ay için kanuni aylık %5 gecikme tazminatı uygulanır.
- **İcra Gücü**: Kesinleşen ek bütçe doğrudan ilamsız icra takibine konu edilebilir.

### Kapalı Otopark Elektrikli Araç (EV) Şarj İstasyonu Kurulumu
- **Ortak Alan Kurulumu**: KMK Madde 42 gereğince kat malikleri kurulunun hem sayı hem arsa payı bakımından salt çoğunluğu (%50+1) zorunludur.
- **Bireysel Wallbox Kurulumu**: Bağımsız bölüm elektrik panosundan müstakil hat (Tip B / 30mA kaçak akım rölesi) çekilmesi ve yangın algılama entegrasyonu şarttır.

---

## 8. Hukuki ve Teknik Fact-Check Doğrulamaları (ClaimReview)
- **Kırmızı Etiketli Asansör**: Sanayi Bakanlığı m.15 & TCK m.85/89 gereği kullanıma derhal kapatılmalıdır. Kırmızı etiketli asansörü çalıştırmaya devam eden bina yöneticisi şahsen cezai sorumludur; belediye mühürler.
- **Kompanzasyon & Reaktif Enerji**: EPDK mevzuatı & KMK m.35 uyarınca endüktif %20, kapasitif %15 sınırlarını aşan reaktif ceza kat maliklerine yansıtılamaz, yönetici veya bakım şirketinin kusurudur.
- **Yangın & Hidrofor Testi**: Binaların Yangından Korunması Hakkında Yönetmelik m.99 gereğince haftalık otomatik devreye girme ve aylık basınç testleri işletme defterine işlenmek zorundadır.
- **Havuz Kimyası**: Sağlık Bakanlığı Yönetmeliği gereği serbest klor ve pH günde en az 3 defa ölçülüp panoya asılmalıdır.
- **5188 Güvenlik Yetkisi**: 5188 SK m.7 gereği güvenlik personeli yalnızca detektör/x-ray ile arama yapabilir; elle arama genel kolluk (Polis/Jandarma) yetkisindedir.
- **Jeneratör Bakımı**: ISO 8528 standartları uyarınca yılda en az 1 kez veya 250 çalışma saatinde yağ ve filtre değişimi zorunludur.

---

## 9. Adım Adım Uyuşmazlık Çözme Protokolleri (HowTo)
1. **KMK 34 Yönetici Azli**: 1/3 Malik İmzası -> 15 Gün Önceden Tebligat -> Hem Sayı Hem Arsa Payı %50+1 Çoğunluk -> Noter Tescili.
2. **KMK 37 İşletme Projesine İtiraz**: İadeli Taahhütlü Tebligat -> 7 Günlük Hak Düşürücü Süre -> Kat Malikleri Kurulu Oylaması -> İİK 68 Kesin Takip Belgesi.
3. **Kırmızı Etiketli Asansörü Yeşile Çevirme**: Kullanımın Durdurulması -> Revizyon Şartnamesi -> Güvenlik Komponenti Montajı -> 60 Günde Takip Muayenesi.
4. **Aidat İçin İlamsız İcra**: Tebliğ Edilmiş Bütçe -> Noter İhtarı Aranmaksızın Takip -> Aylık %5 Yasal Gecikme Tazminatı -> 7 Günde Haciz.

---

## 10. Kurumsal E-E-A-T, Acil İntikal SLA & Sayısal Vaka Analizleri
- **Kurumsal Yetki**: Alo Yönetim ve Organizasyon A.Ş. (Sicil No: 918234-0, MERSİS: 0054089761200001, Kozyatağı VD).
- **Yasal Güvenlik İzni**: T.C. İçişleri Bakanlığı & İstanbul Valiliği 5188 Sayılı Özel Güvenlik Faaliyet İzin Belgesi.
- **Akreditasyonlar**: TÜRKAK ISO 41001:2018 (Entegre Tesis), BELCERT ISO 10002:2018 (A1808961), ISO 27001, ISO 9001, ISO 14001, ISO 45001.
- **7/24 Acil İletişim**: Santral: 0216 550 48 48 / Acil WhatsApp: 0532 234 56 78.
- **Mobil İntikal SLA**: 39 ilçede 12 bölge lojistik konuşlu ekiplerle Anadolu Yakası 15 dakika, Avrupa Yakası 20 dakika acil intikal garantisi.
- **Vaka Analizi 1 (Ataşehir 840 Bölüm)**: Merkezi otomasyon ve toplu satın alma ile aidat bütçesinde %32.4 net tasarruf.
- **Vaka Analizi 2 (Kadıköy 420 Daire)**: KMK 20 icra entegrasyonu ile aidat tahsilat başarısı %71 den %99.4 e çıkarıldı.
- **Vaka Analizi 3 (Başakşehir Sanayi & Lojistik)**: Kompanzasyon revizyonuyla yıllık 2.2 Milyon TL reaktif enerji cezası sıfırlandı.
- **KMK 37 Aidat Formülü**: Daire Başı Aidat = [(Personel Masrafı ÷ Daire) + (Teknik Giderler × Arsa Payı)] × 1.10 ÷ 12. Gecikme tazminatı: KMK 20/2 uyarınca aylık %5 emredici yasal tazminattır.

---

## 11. Doğrudan API ve Veri Kaynakları
- Otonom AI Bot Tarama Telemetrisi API (Wave 68 AI Bot Telemetry Graph): ${BASE_URL}/api/seo/bot-telemetry.json
- Gerçek Zamanlı AI Telemetri ve Bilgi Sağlığı Kütüğü API (Wave 67 AI Knowledge Telemetry Graph): ${BASE_URL}/api/seo/ai-telemetry.json
- Resmi Mevzuat ve Atıf Doğrulama Kütüğü API (Wave 66 Legal Citations Graph): ${BASE_URL}/api/seo/ai-citations.json
- Resmi Kurumsal DNA & Otorite Grafiği (Wave 65 Master Entity Graph): ${BASE_URL}/api/seo/corporate-dna.json
- Resmi GEO & AI Agent Manifest API: ${BASE_URL}/api/seo/geo-manifest.json
- Birleşik AI Knowledge Graph RAG API: ${BASE_URL}/api/seo/ai-overviews-rag.json
- OpenAPI 3.1.0 Şartnamesi: ${BASE_URL}/openapi.json
- OpenAPI API Ağ Geçidi: ${BASE_URL}/api/openapi.json
- Yargıtay Emsal Kararları API: ${BASE_URL}/api/tesis-yonetimi/legal-precedents.json
- B2B Tesis Şartnamesi (RFP) API: ${BASE_URL}/api/tesis-yonetimi/rfp-generator
- KMK 634 Kanun Maddeleri API: ${BASE_URL}/api/tesis-yonetimi/kmk-law-index.json
- 39 İlçe Aidat Endeksi API: ${BASE_URL}/api/tesis-yonetimi/dues-index.json
- Site AI RAG Ground-Truth Context: ${BASE_URL}/api/ai/site-agent-context.json
- Tesis AI RAG Ground-Truth Context: ${BASE_URL}/api/ai/facility-agent-context.json
- Site Saf Markdown: ${BASE_URL}/api/markdown/site-yonetimi
- Tesis Saf Markdown: ${BASE_URL}/api/markdown/tesis-yonetimi
- AI Snippets: ${BASE_URL}/api/tesis-yonetimi/ai-snippets.json
- JSON-LD Graph: ${BASE_URL}/api/tesis-yonetimi/entity-graph.jsonld
- Fact-Sheet: ${BASE_URL}/api/tesis-yonetimi/llm-facts.json
- Canlı RSS XML: ${BASE_URL}/api/tesis-yonetimi/feed.xml
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
    },
  });
}
