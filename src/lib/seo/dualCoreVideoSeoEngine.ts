/**
 * Çift Çekirdekli Video SEO & YouTube Optimizasyon Motoru (dualCoreVideoSeoEngine.ts)
 * 
 * Web sitesindeki videolar ve YouTube kanalı için VideoObject Schema.org JSON-LD,
 * Google Key Moments (Clip) işaretleyicileri, Video Sitemap XML parçaları,
 * zaman damgalı bölüm (Chapter) metinleri ve transkript tabanlı SEO motoru.
 * 
 * 500 Faz Master Planı — Bölüm K (Faz 236 - 270)
 */

import { BASE_URL } from '@/lib/seo';
import { DomainPillar } from './domainKeywordsTaxonomy';
import { CANONICAL_NAP } from './napGuardEngine';

/* =========================================================================
 * K1 — VIDEOOBJECT ŞEMA MOTORU (Faz 236-255)
 * ========================================================================= */

export interface VideoChapter {
  title: string;
  startOffsetSeconds: number;
  endOffsetSeconds: number;
  url?: string;
}

export interface VideoSeoSpec {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  embedUrl: string;
  platform: 'youtube' | 'self-hosted' | 'vimeo';
  durationISO: string; // ISO 8601, ör. "PT8M45S"
  uploadDate: string;  // YYYY-MM-DD
  thumbnailUrl: string;
  chapters: VideoChapter[];
  transcript?: string;
  keywords: string[];
  pillar: DomainPillar;
}

/**
 * 10 Temel Sektörel Video İçerik Planı
 */
export const VIDEO_CONTENT_CATALOG: VideoSeoSpec[] = [
  {
    id: 'site-yonetimi-nedir',
    title: 'Site Yönetimi Nedir? Profesyonel Site Yönetimi Nasıl Yapılır?',
    description: '634 sayılı Kat Mülkiyeti Kanunu kapsamında profesyonel site yönetimi, aidat tahsilatı, karar defteri ve teknik işletim süreçlerinin detaylı rehberi.',
    videoUrl: 'https://www.youtube.com/watch?v=aloyonetim01',
    embedUrl: 'https://www.youtube.com/embed/aloyonetim01',
    platform: 'youtube',
    durationISO: 'PT6M30S',
    uploadDate: '2026-01-15',
    thumbnailUrl: `${BASE_URL}/images/videos/site-yonetimi-thumb.jpg`,
    pillar: 'site',
    keywords: ['site yönetimi', 'profesyonel apartman yönetimi', 'kmk 634', 'aidat takibi'],
    chapters: [
      { title: 'Giriş ve Site Yönetimi Tanımı', startOffsetSeconds: 0, endOffsetSeconds: 65 },
      { title: 'Yönetici ve Denetçi Nasıl Seçilir?', startOffsetSeconds: 65, endOffsetSeconds: 180 },
      { title: 'İşletme Projesi ve Aidat Belirleme', startOffsetSeconds: 180, endOffsetSeconds: 275 },
      { title: 'Alo Yönetim Dijital Yönetim Sistemi', startOffsetSeconds: 275, endOffsetSeconds: 390 },
    ],
  },
  {
    id: 'tesis-yonetimi-nedir',
    title: 'Entegre Tesis Yönetimi Nedir? (ISO 41001 Standardı)',
    description: 'Plazalar, iş merkezleri ve ticari gayrimenkullerde BMS otomasyonu, 5188 güvenlik, teknik bakım ve enerji tasarrufu süreçleri.',
    videoUrl: 'https://www.youtube.com/watch?v=aloyonetim02',
    embedUrl: 'https://www.youtube.com/embed/aloyonetim02',
    platform: 'youtube',
    durationISO: 'PT8M15S',
    uploadDate: '2026-01-22',
    thumbnailUrl: `${BASE_URL}/images/videos/tesis-yonetimi-thumb.jpg`,
    pillar: 'facility',
    keywords: ['tesis yönetimi', 'plaza yönetimi', 'iso 41001', 'bms otomasyon'],
    chapters: [
      { title: 'Entegre Tesis Yönetimi Kapsamı', startOffsetSeconds: 0, endOffsetSeconds: 90 },
      { title: 'ISO 41001 Standart Gereksinimleri', startOffsetSeconds: 90, endOffsetSeconds: 240 },
      { title: 'BMS ve CMMS ile Enerji Tasarrufu', startOffsetSeconds: 240, endOffsetSeconds: 380 },
      { title: 'Kurumsal SLA ve Bütçe Modeli', startOffsetSeconds: 380, endOffsetSeconds: 495 },
    ],
  },
  {
    id: 'aidat-hesaplama-rehberi',
    title: 'Apartman ve Site Aidatı Nasıl Hesaplanır? (Adım Adım)',
    description: 'Arsa payı ve eşit dağıtım modelleriyle yıllık işletme projesi hazırlama ve aidat hesaplama formülü.',
    videoUrl: 'https://www.youtube.com/watch?v=aloyonetim03',
    embedUrl: 'https://www.youtube.com/embed/aloyonetim03',
    platform: 'youtube',
    durationISO: 'PT5M45S',
    uploadDate: '2026-02-05',
    thumbnailUrl: `${BASE_URL}/images/videos/aidat-hesaplama-thumb.jpg`,
    pillar: 'site',
    keywords: ['aidat hesaplama', 'apartman aidatı', 'işletme projesi', 'arsa payı'],
    chapters: [
      { title: 'Aidat Kalemleri Nelerdir?', startOffsetSeconds: 0, endOffsetSeconds: 80 },
      { title: 'Arsa Payına Göre Dağıtım', startOffsetSeconds: 80, endOffsetSeconds: 200 },
      { title: 'Gecikme Tazminatı Kuralları', startOffsetSeconds: 200, endOffsetSeconds: 345 },
    ],
  },
];

/**
 * Schema.org VideoObject JSON-LD üretir.
 */
export function buildVideoObjectSchema(video: VideoSeoSpec) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${video.videoUrl}#videoobject`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: video.uploadDate,
    duration: video.durationISO,
    contentUrl: video.videoUrl,
    embedUrl: video.embedUrl,
    publisher: {
      '@type': 'Organization',
      name: CANONICAL_NAP.legal.brandName,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
      },
    },
  };

  // Google Key Moments (Clip) desteği
  if (video.chapters && video.chapters.length > 0) {
    schema.hasPart = video.chapters.map((ch, idx) => ({
      '@type': 'Clip',
      name: ch.title,
      startOffset: ch.startOffsetSeconds,
      endOffset: ch.endOffsetSeconds,
      url: `${video.videoUrl}&t=${ch.startOffsetSeconds}s`,
    }));
  }

  return schema;
}

/**
 * YouTube Açıklaması için Zaman Damgalı Bölüm Formatı üretir.
 */
export function buildVideoChapterMarkup(chapters: VideoChapter[]): string {
  return chapters
    .map((ch) => {
      const minutes = Math.floor(ch.startOffsetSeconds / 60);
      const seconds = ch.startOffsetSeconds % 60;
      const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      return `${timeStr} - ${ch.title}`;
    })
    .join('\n');
}

/**
 * Video Sitemap XML Kaydı üretir.
 */
export function buildVideoSiteMapEntry(video: VideoSeoSpec): string {
  return `  <url>
    <loc>${BASE_URL}/videolar/${video.id}</loc>
    <video:video>
      <video:thumbnail_loc>${video.thumbnailUrl}</video:thumbnail_loc>
      <video:title><![CDATA[${video.title}]]></video:title>
      <video:description><![CDATA[${video.description}]]></video:description>
      <video:content_loc>${video.videoUrl}</video:content_loc>
      <video:player_loc allow_embed="yes">${video.embedUrl}</video:player_loc>
      <video:duration>${parseDurationToSeconds(video.durationISO)}</video:duration>
      <video:publication_date>${video.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:tag>${video.keywords.join('</video:tag>\n      <video:tag>')}</video:tag>
    </video:video>
  </url>`;
}

/**
 * ISO 8601 duration (PT8M15S) değerini saniyeye çevirir.
 */
function parseDurationToSeconds(isoDuration: string): number {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 300;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Çoklu videolar için Video Carousel Schema.org JSON-LD üretir.
 */
export function buildVideoCarouselSchema(videos: VideoSeoSpec[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: videos.map((v, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: buildVideoObjectSchema(v),
    })),
  };
}

/* =========================================================================
 * K2 — YOUTUBE ANALYTICS & OPTİMİZASYON (Faz 253-270)
 * ========================================================================= */

/**
 * YouTube Videosu İçin Optimize Edilmiş 500+ Karakter Açıklama Şablonu üretir.
 */
export function buildYouTubeDescriptionTemplate(video: VideoSeoSpec): string {
  const chapterText = buildVideoChapterMarkup(video.chapters);
  const isFacility = video.pillar === 'facility';

  return `${video.title}

${video.description}

📌 BÖLÜMLER (TIMESTAMPS):
${chapterText}

🏢 ALO YÖNETİM HAKKINDA:
Alo Yönetim; İstanbul genelinde 39 ilçede 28.000'den fazla bağımsız bölüm ve 1.200.000 m² ticari alanda KMK 634 ve ISO 41001 standartlarında profesyonel site, plaza ve tesis yönetimi hizmeti sunmaktadır.

📞 İLETİŞİM & ÜCRETSİZ TEKLİF ALIN:
👉 Web Sitemiz: ${BASE_URL}
👉 ${isFacility ? 'Plaza Tesis Yönetimi Teklifi' : 'Site Yönetimi Teklifi'}: ${BASE_URL}/teklif-al
👉 Telefon: ${CANONICAL_NAP.contact.phoneDisplay} (7/24 Kesintisiz)
👉 E-posta: ${CANONICAL_NAP.contact.email}

🔗 BİZİ SOSYAL MEDYADA TAKİP EDİN:
LinkedIn: https://www.linkedin.com/company/aloyonetim
Instagram: https://www.instagram.com/aloyonetim
Twitter / X: https://twitter.com/aloyonetim

#aloyonetim #siteyonetimi #tesisyonetimi #apartmanyonetimi #kmk634 #iso41001 #aidattakibi`;
}

/**
 * YouTube Video Etiket Listesi döner (10+ tag).
 */
export function buildYouTubeTagList(video: VideoSeoSpec): string[] {
  const baseTags = [
    'alo yönetim',
    'site yönetimi',
    'tesis yönetimi',
    'profesyonel site yönetimi',
    'apartman yönetimi istanbul',
    'kmk 634 kat mülkiyeti',
    'aidat hesaplama',
    'plaza yönetimi',
    'iso 41001',
    'bina yönetimi',
  ];

  return Array.from(new Set([...video.keywords, ...baseTags]));
}
