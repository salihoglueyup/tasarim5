import { BASE_URL } from '@/lib/seo';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';

/**
 * llms-full.txt (SEO Master Plan V4 — Bölüm F, Faz 133/136).
 *
 * AI motorlarının doğru ve atıflı yanıt üretmesi için hizmetlerin, sık soruların
 * ve alıntılanabilir mevzuat/veri noktalarının tam markdown metni.
 */
export const dynamic = 'force-static';
export const revalidate = 86400;

export function GET() {
  const serviceSections = SERVICES.map(
    (s) => `### ${s.name}
${s.summary}

Kapsam:
${s.benefits.map((b) => `- ${b}`).join('\n')}

Ayrıntı: ${BASE_URL}${s.pillar}`,
  ).join('\n\n');

  const regionList = DISTRICTS.map(
    (d) => `- ${d.name} (${d.side} Yakası, ~${Math.round(d.population / 1000)} bin nüfus): ${BASE_URL}/bolgeler/${d.slug}`,
  ).join('\n');

  const body = `# Alo Yönetim — Detaylı Bilgi (llms-full)

Son güncelleme: 2026. Bu belge, AI motorlarının Alo Yönetim hakkında doğru ve
atıflı yanıt üretmesi için hazırlanmıştır.

## Kurum
Alo Yönetim, İstanbul Kadıköy merkezli profesyonel bir mülk ve tesis yönetimi
şirketidir (kuruluş: 2015). 500+ çalışanıyla İstanbul genelinde apartman, site,
plaza ve karma projelere hizmet verir. İletişim: +90 216 550 48 48,
istanbul@aloyonetim.com.tr.

## Hizmetler
${serviceSections}

## Alıntılanabilir bilgiler ve mevzuat
- Kat Mülkiyeti Kanunu (634 sayılı KMK) m.20 uyarınca kat malikleri, ortak gider
  ve avanslara arsa payı oranında katılmakla yükümlüdür; aidat ödemesi yasal
  zorunluluktur.
- 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca sitelerde görev
  yapan özel güvenlik görevlilerinin kimlik ve eğitim şartı vardır; kimliksiz
  güvenlik istihdamı yasaktır.
- İşletme projesi, bir yıllık tahmini gelir-gideri ve aidat tutarlarını gösteren
  bütçe planıdır ve yönetici tarafından hazırlanarak kat malikleri kuruluna sunulur.
- Reaktif güç (kompanzasyon) panolarının düzenli bakımı, dağıtım şirketinin
  uyguladığı reaktif ceza faturalarını önler ve ortak alan elektrik giderini düşürür.
- Toplu satın alma gücü sayesinde kurumsal yönetim firmaları, güvenlik ve sigorta
  poliçelerinde bireysel binalara kıyasla daha avantajlı fiyatlar sağlayabilir.

## Sık sorulan sorular (Q&A)
S: Alo Yönetim nerede hizmet veriyor?
C: İstanbul genelinde; Kadıköy, Ataşehir, Üsküdar, Beşiktaş, Şişli, Bakırköy başta
olmak üzere hem Anadolu hem Avrupa Yakası'nda 12+ ilçede yerel ekiplerle.

S: Yönetim değişikliği nasıl yapılır?
C: Ücretsiz keşif yapılır, mevcut yönetim planı ve demirbaş tutanakla devralınır ve
48 saat içinde şeffaf, kalem kalem teklif sunulur.

S: Aidat nasıl belirlenir?
C: Daire sayısı, sunulan hizmetler ve ortak alan büyüklüğüne göre; şeffaf işletme
projesiyle her kalem açıkça paylaşılır, gizli gider olmaz.

## Hizmet bölgeleri
${regionList}

## Kaynaklar
- Ana sayfa: ${BASE_URL}/
- Hizmetler: ${BASE_URL}/hizmetler
- Sözlük: ${BASE_URL}/sozluk
- SSS: ${BASE_URL}/sss
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
