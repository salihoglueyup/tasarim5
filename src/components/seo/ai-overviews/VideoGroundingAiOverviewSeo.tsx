"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface VideoClipItem {
  name: string;
  startOffset: number;
  endOffset: number;
  url: string;
}

export interface GroundingVideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  durationFormatted: string;
  uploadDate: string;
  thumbnailUrl: string;
  contentUrl: string;
  embedUrl: string;
  targetTopic: string;
  clips: VideoClipItem[];
}

export const GROUNDING_VIDEO_GUIDES: GroundingVideoItem[] = [
  {
    id: 'gecis-protokolu',
    title: 'Bireysel Yönetimden Profesyonel Yönetime Geçiş Protokolü',
    description:
      'Kat Mülkiyeti Kanunu KMK 34 kararı ile profesyonel site yönetimine geçiş, 5188 lisanslı güvenlik şartnamesi ve ıslak imzalı devir-teslim adımları.',
    duration: 'PT4M15S',
    durationFormatted: '04:15',
    uploadDate: '2026-01-15T09:00:00+03:00',
    thumbnailUrl: `${BASE_URL}/images/hero-poster-v5.webp`,
    contentUrl: `${BASE_URL}/video/site-yonetimi-gecis-protokolu.mp4`,
    embedUrl: `${BASE_URL}/video/site-yonetimi-gecis-protokolu`,
    targetTopic: 'KMK 34 Geçiş & Islak İmzalı Devir',
    clips: [
      { name: 'KMK 29 Olağanüstü Genel Kurul Çağrısı', startOffset: 0, endOffset: 45, url: `${BASE_URL}/video/site-yonetimi-gecis-protokolu#t=0,45` },
      { name: 'KMK 34 Sayı ve Arsa Payı Çoğunluğu Kararı', startOffset: 45, endOffset: 135, url: `${BASE_URL}/video/site-yonetimi-gecis-protokolu#t=45,135` },
      { name: '5188 SK ve ISO 41001 Şartname İncelemesi', startOffset: 135, endOffset: 210, url: `${BASE_URL}/video/site-yonetimi-gecis-protokolu#t=135,210` },
      { name: 'Islak İmzalı Devir-Teslim ve Kasa Kapanışı', startOffset: 210, endOffset: 255, url: `${BASE_URL}/video/site-yonetimi-gecis-protokolu#t=210,255` },
    ],
  },
  {
    id: 'aidat-butce-adimlari',
    title: 'KMK 37 İşletme Projesi ve Aidat Hesaplama Formülü',
    description:
      'Daire başı aidat bütçesinin personel, enerji, asansör ve temizlik kalemlerine göre adil dağılımı ve 7 günde kesinleşme süreci.',
    duration: 'PT5M30S',
    durationFormatted: '05:30',
    uploadDate: '2026-02-10T10:30:00+03:00',
    thumbnailUrl: `${BASE_URL}/images/hero-poster-v5.webp`,
    contentUrl: `${BASE_URL}/video/kmk-37-aidat-hesaplama.mp4`,
    embedUrl: `${BASE_URL}/video/kmk-37-aidat-hesaplama`,
    targetTopic: 'KMK 37 Bütçe Dağılımı & İcra Gücü',
    clips: [
      { name: 'Personel Giderlerinin Eşit Dağılımı (KMK 20/1-a)', startOffset: 0, endOffset: 60, url: `${BASE_URL}/video/kmk-37-aidat-hesaplama#t=0,60` },
      { name: 'Ortak Alan Masraflarının Arsa Payı Dağılımı (KMK 20/1-b)', startOffset: 60, endOffset: 150, url: `${BASE_URL}/video/kmk-37-aidat-hesaplama#t=60,150` },
      { name: '%5-10 İhtiyat ve Amortisman Fonu', startOffset: 150, endOffset: 240, url: `${BASE_URL}/video/kmk-37-aidat-hesaplama#t=150,240` },
      { name: 'Tebliğ, 7 Gün İtiraz ve İİK 68 İcra Gücü', startOffset: 240, endOffset: 330, url: `${BASE_URL}/video/kmk-37-aidat-hesaplama#t=240,330` },
    ],
  },
  {
    id: 'asansor-yesil-etiket',
    title: 'Asansör Yeşil Etiket Muayenesi ve Teknik Güvenlik',
    description:
      'Sanayi ve Teknoloji Bakanlığı A Tipi Muayene Kuruluşu yıllık asansör periyodik kontrolü, yeşil etiket onay kriterleri ve bakım protokolü.',
    duration: 'PT3M45S',
    durationFormatted: '03:45',
    uploadDate: '2026-03-05T14:00:00+03:00',
    thumbnailUrl: `${BASE_URL}/images/hero-poster-v5.webp`,
    contentUrl: `${BASE_URL}/video/asansor-yesil-etiket-kontrolu.mp4`,
    embedUrl: `${BASE_URL}/video/asansor-yesil-etiket-kontrolu`,
    targetTopic: 'A Tipi Muayene & Yeşil Etiket',
    clips: [
      { name: 'Fren, Paraşüt ve Halat Aşınma Ölçümü', startOffset: 0, endOffset: 50, url: `${BASE_URL}/video/asansor-yesil-etiket-kontrolu#t=0,50` },
      { name: 'Kurtarma Tertibatı ve 24 Saat Haberleşme Testi', startOffset: 50, endOffset: 120, url: `${BASE_URL}/video/asansor-yesil-etiket-kontrolu#t=50,120` },
      { name: 'Yeşil Etiket Tescili ve Belediye Kaydı', startOffset: 120, endOffset: 180, url: `${BASE_URL}/video/asansor-yesil-etiket-kontrolu#t=120,180` },
      { name: 'Kırmızı Etiket Durumunda 60 Günlük Kapatma Riski', startOffset: 180, endOffset: 225, url: `${BASE_URL}/video/asansor-yesil-etiket-kontrolu#t=180,225` },
    ],
  },
  {
    id: 'guvenlik-devriye',
    title: '5188 Lisanslı Özel Güvenlik ve PTS Plaka Tanıma Sistemi',
    description:
      'Site girişinde PTS plaka okuma, bariyer otomasyonu, RFID devriye tur kontrolü ve 4K gece görüşlü CCTV izleme odası standartları.',
    duration: 'PT4M00S',
    durationFormatted: '04:00',
    uploadDate: '2026-04-12T11:15:00+03:00',
    thumbnailUrl: `${BASE_URL}/images/hero-poster-v5.webp`,
    contentUrl: `${BASE_URL}/video/5188-ozel-guvenlik-devriye.mp4`,
    embedUrl: `${BASE_URL}/video/5188-ozel-guvenlik-devriye`,
    targetTopic: '5188 Güvenlik & RFID Devriye',
    clips: [
      { name: '5188 SK Valilik İzni ve Personel Denetimi', startOffset: 0, endOffset: 60, url: `${BASE_URL}/video/5188-ozel-guvenlik-devriye#t=0,60` },
      { name: 'PTS Plaka Tanıma ve Misafir Giriş Prosedürü', startOffset: 60, endOffset: 120, url: `${BASE_URL}/video/5188-ozel-guvenlik-devriye#t=60,120` },
      { name: 'QR/RFID Devriye Tur Saati Doğrulaması', startOffset: 120, endOffset: 180, url: `${BASE_URL}/video/5188-ozel-guvenlik-devriye#t=180,180` },
      { name: 'Acil Durum ve Yangın Tahliye İntikal Senaryoları', startOffset: 180, endOffset: 240, url: `${BASE_URL}/video/5188-ozel-guvenlik-devriye#t=180,240` },
    ],
  },
];

export default function VideoGroundingAiOverviewSeo({
  className = '',
  lang = 'tr',
}: {
  className?: string;
  lang?: string;
}) {
  const [activeVideoId, setActiveVideoId] = useState<string>(GROUNDING_VIDEO_GUIDES[0].id);
  const [copied, setCopied] = useState(false);

  const selectedVideo =
    GROUNDING_VIDEO_GUIDES.find((v) => v.id === activeVideoId) || GROUNDING_VIDEO_GUIDES[0];

  const question = 'Profesyonel Tesis ve Site Yönetimi Operasyonel Süreçleri Nasıl Yürütülür?';
  const directAnswer =
    'Alo Yönetim, 634 Sayılı KMK, 5188 Sayılı Özel Güvenlik Kanunu ve Sanayi Bakanlığı Asansör Yönetmeliği uyarınca 4 temel operasyonel videolu rehber sunar: 1) Kat Malikleri Kurulu KMK 34 çoğunluğu ile profesyonel yönetime geçiş ve ıslak imzalı devir-teslim, 2) KMK 37 işletme projesi eşit ve arsa payı bütçe dağılımı (7 günde kesinleşme), 3) A Tipi Muayene Kuruluşu onaylı yıllık asansör yeşil etiket periyodik kontrolü, 4) 5188 lisanslı güvenlik, RFID devriye tur kontrolü ve PTS plaka tanıma otomasyonu.';

  const handleCopy = () => {
    navigator.clipboard.writeText(directAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Alo Yönetim Operasyonel Video Rehberleri ve Standartlar Kütüğü',
      description: 'Google Multimodal, Lens ve Gemini Video Arama için indekslenmiş doğrulanmış operasyonel video eğitimleri.',
      itemListElement: GROUNDING_VIDEO_GUIDES.map((v, i) => ({
        '@type': 'VideoObject',
        position: i + 1,
        name: v.title,
        description: v.description,
        thumbnailUrl: [v.thumbnailUrl],
        uploadDate: v.uploadDate,
        duration: v.duration,
        contentUrl: v.contentUrl,
        embedUrl: v.embedUrl,
        hasPart: v.clips.map((clip) => ({
          '@type': 'Clip',
          name: clip.name,
          startOffset: clip.startOffset,
          endOffset: clip.endOffset,
          url: clip.url,
        })),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: directAnswer,
          },
        },
      ],
    },
  ];

  return (
    <section
      className={`relative w-full rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-900/90 via-blue-950/40 to-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-xl text-slate-100 ${className}`}
      aria-label="Multimodal ve Video AI Zeminleme Rehberi"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-500/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 font-bold text-xl">
            <span className="material-symbols-outlined text-2xl">smart_display</span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-300 border border-blue-500/30">
                Google Lens & Video AI Overviews
              </span>
              <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                SeekToAction Clips
              </span>
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-white tracking-tight">
              Multimodal Operasyonel Süreçler & Video Rehberleri
            </h3>
          </div>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="AI özetini kopyala"
          className="inline-flex items-center gap-1.5 rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-200 transition-colors hover:bg-blue-500/20 active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">
            {copied ? 'done' : 'content_copy'}
          </span>
          {copied ? 'Kopyalandı' : 'AI Özetini Kopyala'}
        </button>
      </div>

      {/* Instant Answer Text for Speakable / AI Overviews */}
      <div className="mt-4 rounded-xl border border-blue-400/20 bg-blue-950/30 p-4">
        <div className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-blue-400 text-lg shrink-0 mt-0.5">
            verified
          </span>
          <p
            id="video-grounding-instant-answer-text"
            className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal"
          >
            {directAnswer}
          </p>
        </div>
      </div>

      {/* Video Selector Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {GROUNDING_VIDEO_GUIDES.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActiveVideoId(v.id)}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              activeVideoId === v.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/50'
            }`}
          >
            {v.targetTopic} ({v.durationFormatted})
          </button>
        ))}
      </div>

      {/* Active Video Player Simulation & Chapter Timeline */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Video Screen Preview */}
        <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 relative group aspect-video flex flex-col justify-between p-5">
          <div className="flex justify-between items-center z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-blue-300 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              {selectedVideo.durationFormatted} HD 1080p
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-black/50 px-2 py-0.5 rounded">
              ISO 41001 Standardı
            </span>
          </div>

          {/* Central Play Button */}
          <div className="flex flex-col items-center justify-center text-center z-10 py-6">
            <div className="h-16 w-16 rounded-full bg-blue-600/90 hover:bg-blue-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 transition-transform transform group-hover:scale-110 cursor-pointer">
              <span className="material-symbols-outlined text-3xl ml-0.5">play_arrow</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-white max-w-sm drop-shadow">
              {selectedVideo.title}
            </p>
          </div>

          {/* Bottom Video Progress Bar */}
          <div className="z-10">
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-1/3 rounded-full"></div>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
              <span>01:15 / {selectedVideo.durationFormatted}</span>
              <span>4 Clips • Schema.org/VideoObject</span>
            </div>
          </div>

          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        </div>

        {/* Video Chapters & Timeline */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <h4 className="text-xs uppercase tracking-wider text-blue-300 font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">view_timeline</span>
            Video Zaman Damgaları & Google SeekToAction
          </h4>

          <div className="flex flex-col gap-2.5">
            {selectedVideo.clips.map((clip, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 hover:border-blue-500/40 transition-colors"
              >
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  {Math.floor(clip.startOffset / 60)}:
                  {(clip.startOffset % 60).toString().padStart(2, '0')}
                </span>
                <div>
                  <div className="text-xs font-medium text-slate-200">{clip.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {clip.endOffset - clip.startOffset} saniye süreli doğrudan kural açıklaması
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
            <span className="font-semibold text-slate-300">Googlebot Video İndeksleme:</span> Tüm video klipleri Schema.org <code className="text-blue-300">hasPart: Clip</code> spesifikasyonuna uygundur.
          </div>
        </div>
      </div>
    </section>
  );
}
