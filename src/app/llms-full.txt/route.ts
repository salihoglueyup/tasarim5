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
    return `### ${d.name} (${d.side === 'Anadolu' ? 'Anadolu Yakası' : 'Avrupa Yakası'})
- **Nüfus**: ${d.population.toLocaleString('tr-TR')}
- **Piyasa Ortalama Aidat m²**: ₺${dues.avgDuesM2}
- **Alo Yönetim Optimize Aidat m²**: ₺${dues.aloDuesM2}
- **Tasarruf Oranı**: %${dues.savingsRate}
- **Yerel İhtiyaçlar**: ${d.localNeeds.join(', ')}
- **Örnek Yönetilen Proje**: ${d.managedProjects}
- **Sayfa URL**: ${BASE_URL}/bolgeler/${d.slug}/tesis-yonetimi
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
- **Sertifikalar**: ISO 41001:2018, ISO 45001:2018, ISO 14001:2015, ISO 9001:2015, TSE HYB 12850
- **Güvenlik Ruhsatı**: 5188 Sayılı Kanun Kapsamında T.C. İçişleri Bakanlığı Faaliyet İzin Belgesi

---

## 2. Entegre Hizmet Sütunları
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

## 7. Doğrudan API Bağlantıları
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
    },
  });
}
