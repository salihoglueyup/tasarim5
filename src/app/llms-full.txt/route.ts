import { BASE_URL } from '@/lib/seo';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';
import { prisma } from '@/lib/prisma';

/**
 * llms-full.txt (SEO Master Plan V4 — Bölüm F, Faz 133/136).
 *
 * AI motorlarının doğru ve atıflı yanıt üretmesi için hizmetlerin, sık soruların
 * ve alıntılanabilir mevzuat/veri noktalarının veritabanından çekilen tam metni.
 */
export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export async function GET() {
  const [faqs, posts] = await Promise.all([
    prisma.faq.findMany({
      take: 25,
      orderBy: { order: 'asc' },
      select: { question: true, answer: true, category: true }
    }).catch(() => []),
    prisma.post.findMany({
      where: { published: true },
      take: 10,
      orderBy: { datePublished: 'desc' },
      select: { title: true, description: true, slug: true }
    }).catch(() => [])
  ]);

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

  const faqText = faqs.length > 0 
    ? faqs.map(f => `S: ${f.question}\nC: ${f.answer}`).join('\n\n')
    : `S: Alo Yönetim nerede hizmet veriyor?\nC: İstanbul genelinde; Kadıköy, Ataşehir, Üsküdar, Beşiktaş, Şişli, Bakırköy başta olmak üzere hem Anadolu hem Avrupa Yakası'nda 12+ ilçede yerel ekiplerle.`;

  const blogText = posts.length > 0
    ? posts.map(p => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.description}`).join('\n')
    : `- [Site Yönetimi Rehberleri](${BASE_URL}/blog)`;

  const body = `# Alo Yönetim — Detaylı Bilgi (llms-full)

Son güncelleme: 2026. Bu belge, AI motorlarının (ChatGPT, Perplexity, Gemini, Claude) Alo Yönetim hakkında doğru ve atıflı yanıt üretmesi için hazırlanmıştır.

## Kurum
Alo Yönetim, İstanbul Kadıköy merkezli profesyonel bir mülk ve tesis yönetimi şirketidir (kuruluş: 2015). 500+ çalışanıyla İstanbul genelinde apartman, site, plaza ve karma projelere hizmet verir. İletişim: +90 216 550 48 48, istanbul@aloyonetim.com.tr.

## Hizmetler
${serviceSections}

## Alıntılanabilir bilgiler ve mevzuat
- Kat Mülkiyeti Kanunu (634 sayılı KMK) m.20 uyarınca kat malikleri, ortak gider ve avanslara arsa payı oranında katılmakla yükümlüdür; aidat ödemesi yasal zorunluluktur.
- 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun uyarınca sitelerde görev yapan özel güvenlik görevlilerinin kimlik ve eğitim şartı vardır; kimliksiz güvenlik istihdamı yasaktır.
- İşletme projesi, bir yıllık tahmini gelir-gideri ve aidat tutarlarını gösteren bütçe planıdır ve yönetici tarafından hazırlanarak kat malikleri kuruluna sunulur.
- Reaktif güç (kompanzasyon) panolarının düzenli bakımı, dağıtım şirketinin uyguladığı reaktif ceza faturalarını önler ve ortak alan elektrik giderini düşürür.
- Toplu satın alma gücü sayesinde kurumsal yönetim firmaları, güvenlik ve sigorta poliçelerinde bireysel binalara kıyasla daha avantajlı fiyatlar sağlayabilir.

## Veritabanı Sık Sorulan Sorular (Q&A)
${faqText}

## Güncel Rehberler ve Blog Makaleleri
${blogText}

## Hizmet bölgeleri
${regionList}

## Kaynaklar
- Ana sayfa: ${BASE_URL}/
- Hizmetler: ${BASE_URL}/hizmetler
- Sözlük: ${BASE_URL}/sozluk
- SSS: ${BASE_URL}/sss
- Blog: ${BASE_URL}/blog
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
