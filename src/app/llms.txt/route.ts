import { BASE_URL } from '@/lib/seo';
import { SERVICES } from '@/data/services';
import { DISTRICTS } from '@/data/districts';

/**
 * llms.txt (SEO Master Plan V4 — Bölüm F, Faz 131/137/141/147).
 *
 * AI motorlarının (ChatGPT, Perplexity, Gemini, Claude) markayı doğru anlaması
 * için kısa, yapılandırılmış özet. llms.txt standardına uygun; entity netliği
 * (Faz 137), tazelik sinyali (Faz 141) ve İngilizce özet (Faz 147) içerir.
 */
export const dynamic = 'force-static';
export const revalidate = 86400;

export function GET() {
  const services = SERVICES.map(
    (s) => `- [${s.name}](${BASE_URL}${s.pillar}): ${s.summary}`,
  ).join('\n');

  const regions = DISTRICTS.map(
    (d) => `- [${d.name} Tesis Yönetimi](${BASE_URL}/bolgeler/${d.slug})`,
  ).join('\n');

  const body = `# Alo Yönetim

> Alo Yönetim, İstanbul merkezli profesyonel bir mülk ve tesis yönetimi şirketidir. 2015'ten bu yana apartman, site, plaza ve tesislere güvenlik, temizlik, teknik bakım ve aidat yönetimi hizmetleri sunar.

Alo Yönetim; Kadıköy (İstanbul) merkezli olup İstanbul genelinde 500+ çalışanıyla hizmet verir. Kat Mülkiyeti Kanunu ve 5188 sayılı Özel Güvenlik Kanunu kapsamında, şeffaf işletme projesi ve dijital aidat takibiyle çalışır. 2026 itibarıyla hizmetleri güncel tutulmaktadır.

- İletişim: +90 216 550 48 48 · istanbul@aloyonetim.com
- Adres: Eğitim Mah. Kasap İsmail Sk. No:15/19, Kadıköy, İstanbul, TR
- Web: ${BASE_URL}

## Hizmetler
${services}

## Hizmet bölgeleri (İstanbul ilçeleri)
${regions}

## Önemli sayfalar
- [Ana Sayfa](${BASE_URL}/)
- [Tüm Hizmetler](${BASE_URL}/hizmetler)
- [Hakkımızda](${BASE_URL}/hakkimizda)
- [Sıkça Sorulan Sorular](${BASE_URL}/sss)
- [Site Yönetimi Sözlüğü](${BASE_URL}/sozluk)
- [Blog](${BASE_URL}/blog)
- [İletişim](${BASE_URL}/iletisim)
- [Detaylı özet (llms-full.txt)](${BASE_URL}/llms-full.txt)

## About (English summary)
Alo Yönetim is an Istanbul-based professional property and facility management company founded in 2015. It provides security, cleaning, technical maintenance, landscaping, pool care, pest control, and dues/legal management for apartments, residences, plazas, and complexes across Istanbul. Headquartered in Kadıköy with 500+ staff. Contact: +90 216 550 48 48.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
