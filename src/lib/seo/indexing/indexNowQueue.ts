import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { POSTS_META } from '@/data/posts';
import { CERTIFICATES } from '@/data/certificates';
import { submitUrlsToIndexNow } from '@/lib/indexnow';

export interface BulkIndexNowResult {
  totalUrlsCollected: number;
  batchesSent: number;
  success: boolean;
  messages: string[];
  urlSamples: string[];
}

/**
 * Tüm Tesis Yönetimi, 39 İlçe, 169 Mahalle, 57 Blog ve AI RAG URL'lerini toplayıp
 * IndexNow API'ye toplu (Batch) olarak gönderir.
 */
export async function pushFacilityUrlsBulkToIndexNow(): Promise<BulkIndexNowResult> {
  const urlSet = new Set<string>();

  // 1. Ana sayfalar & Amiral gemisi (İlk 15 örnek içinde yer alır)
  urlSet.add(`${BASE_URL}/`);
  urlSet.add(`${BASE_URL}/hizmetler`);
  urlSet.add(`${BASE_URL}/hizmetler/tesis-yonetimi`);
  urlSet.add(`${BASE_URL}/hizmetler/site-yonetimi`);
  urlSet.add(`${BASE_URL}/kmk-2026-degisiklikleri`);
  urlSet.add(`${BASE_URL}/hesaplayici`);
  urlSet.add(`${BASE_URL}/sektorel-cozumler`);
  urlSet.add(`${BASE_URL}/sozluk`);
  urlSet.add(`${BASE_URL}/sss`);
  urlSet.add(`${BASE_URL}/blog`);
  urlSet.add(`${BASE_URL}/bolgeler`);
  urlSet.add(`${BASE_URL}/api/ai/facility-agent-context.json`);
  urlSet.add(`${BASE_URL}/api/tesis-yonetimi/dictionary.json`);
  urlSet.add(`${BASE_URL}/feed/tesis-yonetimi.xml`);

  // 2. Hizmet Sayfaları
  for (const service of SERVICES) {
    urlSet.add(`${BASE_URL}${service.pillar}`);
  }

  // 3. Kanonik Tesis Yönetimi Alt Sektör Sayfaları (Redirect olmayan nihai hedefler)
  const canonicalSubSectors = [
    'rezidans-site-yonetimi',
    'plaza-yonetimi',
    'toplu-konut-yonetimi',
    'sanayi-tesisi-yonetimi',
    'rehber',
  ];
  for (const slug of canonicalSubSectors) {
    urlSet.add(`${BASE_URL}/hizmetler/tesis-yonetimi/${slug}`);
  }

  // 4. 39 İlçe Tesis/Site Yönetimi, İlçe Hub ve 169 Mahalle Sayfaları
  for (const district of DISTRICTS) {
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}`);
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/tesis-yonetimi`);
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/site-yonetimi`);
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/guvenlik-yonetimi`);
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/teknik-bakim`);
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/temizlik-ve-hijyen`);
    if (district.neighborhoodData && district.neighborhoodData.length > 0) {
      urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/mahalleler`);
      for (const n of district.neighborhoodData) {
        urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/mahalleler/${n.slug}`);
      }
    }
  }

  // 5. 57 Blog Makalesi ve 7 Resmi Kalite Sertifikası
  for (const post of POSTS_META) {
    urlSet.add(`${BASE_URL}/blog/${post.slug}`);
  }
  for (const cert of CERTIFICATES) {
    urlSet.add(`${BASE_URL}/kurumsal/sertifikalar/${cert.slug}`);
  }

  // 6. AI & Agent Discovery Uç Noktaları
  urlSet.add(`${BASE_URL}/.well-known/llms.txt`);
  urlSet.add(`${BASE_URL}/llms-full.txt`);
  urlSet.add(`${BASE_URL}/.well-known/agent-card.json`);
  urlSet.add(`${BASE_URL}/.well-known/acp.json`);
  urlSet.add(`${BASE_URL}/.well-known/ucp`);
  urlSet.add(`${BASE_URL}/.well-known/api-catalog`);
  urlSet.add(`${BASE_URL}/openapi.json`);

  const allUrls = Array.from(urlSet);
  const messages: string[] = [];
  let overallSuccess = true;

  // IndexNow API her istekte en fazla 10,000 URL kabul eder.
  const BATCH_SIZE = 500;
  let batchesSent = 0;

  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const batch = allUrls.slice(i, i + BATCH_SIZE);
    batchesSent++;
    const res = await submitUrlsToIndexNow(batch);
    if (!res.success) {
      overallSuccess = false;
    }
    messages.push(`Paket ${batchesSent} (${batch.length} URL): ${res.message}`);
  }

  return {
    totalUrlsCollected: allUrls.length,
    batchesSent,
    success: overallSuccess,
    messages,
    urlSamples: allUrls.slice(0, 15),
  };
}
