import { BASE_URL } from '@/lib/seo';
import { DISTRICTS } from '@/data/districts';
import { SERVICES } from '@/data/services';
import { submitUrlsToIndexNow } from '@/lib/indexnow';

export interface BulkIndexNowResult {
  totalUrlsCollected: number;
  batchesSent: number;
  success: boolean;
  messages: string[];
  urlSamples: string[];
}

/**
 * Tüm Tesis Yönetimi, 39 İlçe, Sektörel ve AI RAG URL'lerini toplayıp
 * IndexNow API'ye toplu (Batch) olarak gönderir.
 */
export async function pushFacilityUrlsBulkToIndexNow(): Promise<BulkIndexNowResult> {
  const urlSet = new Set<string>();

  // 1. Ana sayfalar & Amiral gemisi
  urlSet.add(`${BASE_URL}/`);
  urlSet.add(`${BASE_URL}/hizmetler`);
  urlSet.add(`${BASE_URL}/hizmetler/tesis-yonetimi`);
  urlSet.add(`${BASE_URL}/sektorel-cozumler`);
  urlSet.add(`${BASE_URL}/sozluk`);
  urlSet.add(`${BASE_URL}/api/ai/facility-agent-context.json`);
  urlSet.add(`${BASE_URL}/api/tesis-yonetimi/calculate-budget`);
  urlSet.add(`${BASE_URL}/api/tesis-yonetimi/dictionary.json`);
  urlSet.add(`${BASE_URL}/api/tesis-yonetimi/legal-precedents.json`);
  urlSet.add(`${BASE_URL}/feed/tesis-yonetimi.xml`);

  // 2. 8 Hizmet Sayfası
  for (const service of SERVICES) {
    urlSet.add(`${BASE_URL}${service.pillar}`);
  }

  // 3. 5 Sektörel Çözüm
  const sectoralSlugs = [
    'rezidans-yonetimi',
    'plaza-ve-is-merkezi-yonetimi',
    'site-ve-toplu-konut-yonetimi',
    'avm-yonetimi',
    'sanayi-ve-lojistik-tesis-yonetimi',
  ];
  for (const slug of sectoralSlugs) {
    urlSet.add(`${BASE_URL}/sektorel-cozumler/${slug}`);
  }

  // 4. 39 İlçe Tesis Yönetimi ve İlçe Hub Sayfaları
  for (const district of DISTRICTS) {
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}`);
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/tesis-yonetimi`);
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/guvenlik-yonetimi`);
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/teknik-bakim`);
    urlSet.add(`${BASE_URL}/bolgeler/${district.slug}/temizlik-ve-hijyen`);
  }

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
