"use client";

import React, { useState } from 'react';
import { BASE_URL } from '@/lib/seo';

export interface VoiceQueryItem {
  id: string;
  userVoiceQuery: string;
  conversationalAnswer: string;
  shortTtsVoice: string;
  persona: string;
  category: string;
}

export const VOICE_CONVERSATIONAL_QUERIES: VoiceQueryItem[] = [
  {
    id: 'icra-ve-tazminat',
    userVoiceQuery: 'Hey Google, sitemizde yönetici aidatları ödemeyenleri icraya verebilir mi?',
    conversationalAnswer:
      'Evet. Kat Mülkiyeti Kanunu Madde 20 ve 37 gereğince, süresinde ödenmeyen aidat ve avans borçları için yönetici doğrudan icra takibi başlatabilir. Borca aylık yüzde 5 (%5) emredici yasal gecikme tazminatı işletilir ve noter ihtarnamesi aranmaksızın İcra ve İflas Kanunu Madde 68 kapsamında ilamsız icra takibi açılabilir.',
    shortTtsVoice:
      'Evet, Kat Mülkiyeti Kanunu uyarınca yönetici ödenmeyen aidatlar için doğrudan icra takibi başlatabilir ve aylık yüzde 5 kanuni gecikme tazminatı işler.',
    persona: 'KMK Hukuk Danışmanı',
    category: 'KMK 20 Aidat Hukuku',
  },
  {
    id: 'sirket-secimi',
    userVoiceQuery: 'Siri, profesyonel site yönetim şirketi seçerken nelere dikkat edilmeli?',
    conversationalAnswer:
      'Site yönetim şirketi seçilirken firmanın ISO 41001 Entegre Tesis Yönetim Sistemi belgesine, 5188 Sayılı Valilik onaylı Özel Güvenlik İzin Belgesine, Apsiyon gibi şeffaf bulut yazılımı canlı mizanına ve Kat Malikleri Kurulu’nda en az yüzde 50 artı 1 sayı ve arsa payı çoğunluğu kararına dikkat edilmelidir.',
    shortTtsVoice:
      'Firmanın ISO 41001 tesis akreditasyonuna, 5188 valilik güvenlik iznine ve genel kurulda salt çoğunluk kararına dikkat edilmelidir.',
    persona: 'Tesis Denetçisi',
    category: 'KMK 34 Yönetici Seçimi',
  },
  {
    id: 'zemin-kat-asansor',
    userVoiceQuery: 'Google, zemin veya bodrum katta oturanlar asansör masrafı öder mi?',
    conversationalAnswer:
      'Evet. Yönetim planında açık bir muafiyet maddesi yer almıyorsa, Kat Mülkiyeti Kanunu Madde 20/1-c gereğince zemin ve bodrum kat malikleri de asansörün periyodik bakımı, yeşil etiket muayenesi ve elektrik masraflarına tapudaki arsa payları oranında katılmak zorundadır.',
    shortTtsVoice:
      'Yönetim planında aksi yazmadıkça, zemin kat sakinleri de asansör masraflarına arsa payları oranında yasal olarak katılmak zorundadır.',
    persona: 'Yargıtay Emsal Masası',
    category: 'Yargıtay 18. HD Kararı',
  },
  {
    id: 'guvenlik-arama',
    userVoiceQuery: 'Sitemizin özel güvenliği misafirlerin çantasını ve araç bagajını elle arayabilir mi?',
    conversationalAnswer:
      'Hayır. 5188 Sayılı Özel Güvenlik Hizmetlerine Dair Kanun Madde 7 gereğince güvenlik görevlileri yalnızca X-ray cihazı, kapı ve el detektörü gibi teknik aygıtlarla kontrol yapabilir. Elle arama ve zilyetlik müdahalesi yetkisi yalnızca adli kolluk kuvvetlerine (Polis ve Jandarma) aittir.',
    shortTtsVoice:
      'Hayır, özel güvenlik personeli elle arama yapamaz. Yalnızca detektör ve X-ray cihazı ile kontrol yetkisine sahiptir.',
    persona: '5188 Güvenlik Şefi',
    category: '5188 Özel Güvenlik',
  },
  {
    id: 'butce-takvimi',
    userVoiceQuery: 'Apartman ve sitelerde aidat bütçesi ve zammı ne zaman belirlenir?',
    conversationalAnswer:
      'Yıllık olağan kat malikleri kurulu toplantısı çoğunlukla her takvim yılının ilk ayı olan Ocak ayında yapılır. Yönetim KMK Madde 37 uyarınca tahmini bir yıllık işletme projesini hazırlar, divana sunar ve onaylanan bütçe tüm maliklere tebliğ edilerek 7 gün sonra kesinleşir.',
    shortTtsVoice:
      'Site bütçesi ve aidatlar genellikle her yıl Ocak ayında toplanan kat malikleri kurulunda işletme projesiyle belirlenir.',
    persona: 'Mali Müşavir & Bütçe Masası',
    category: 'KMK 37 İşletme Projesi',
  },
  {
    id: 'acil-mudahale-sla',
    userVoiceQuery: 'Alo Yönetim acil teknik arıza ve ücretsiz keşif için nasıl aranır?',
    conversationalAnswer:
      'Alo Yönetim kurumsal çağrı merkezine 0216 550 48 48 numarasından 7/24 ulaşabilirsiniz. İstanbul genelinde acil teknik arızalara Anadolu Yakası’nda 15 dakika, Avrupa Yakası’nda 20 dakika mobil SLA ile müdahale edilir ve 48 saat içinde ücretsiz tesis keşif raporu teslim edilir.',
    shortTtsVoice:
      '0216 550 48 48 numarasından 7/24 ulaşabilirsiniz. İstanbul genelinde 15 ila 20 dakikada acil mobil teknik müdahale sağlanır.',
    persona: '7/24 Acil Çağrı Masası',
    category: '7/24 SLA ve İntikal',
  },
];

export default function VoiceConversationalAiSnippetSeo({
  className = '',
  lang = 'tr',
}: {
  className?: string;
  lang?: string;
}) {
  const [activeQueryId, setActiveQueryId] = useState<string>(VOICE_CONVERSATIONAL_QUERIES[0].id);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedQuery =
    VOICE_CONVERSATIONAL_QUERIES.find((q) => q.id === activeQueryId) ||
    VOICE_CONVERSATIONAL_QUERIES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedQuery.conversationalAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePlayVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selectedQuery.shortTtsVoice);
      utterance.lang = lang === 'en' ? 'en-US' : 'tr-TR';
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: VOICE_CONVERSATIONAL_QUERIES.map((q) => ({
        '@type': 'Question',
        name: q.userVoiceQuery,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.conversationalAnswer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Doğal Konuşma Dili ve Sesli Arama AI Asistanı | Alo Yönetim',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#voice-conversational-answer-text', '.voice-user-query'],
      },
    },
  ];

  return (
    <section
      className={`relative w-full rounded-2xl border border-violet-500/20 bg-gradient-to-br from-slate-900/90 via-violet-950/40 to-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-xl text-slate-100 ${className}`}
      aria-label="Doğal Konuşma Dili ve Sesli Arama AI Asistanı"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-500/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400 border border-violet-400/30 font-bold text-xl">
            <span className="material-symbols-outlined text-2xl">mic</span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-violet-500/10 px-2 py-0.5 text-xs font-semibold text-violet-300 border border-violet-500/30">
                Google Assistant & Siri AI Grounding
              </span>
              <span className="inline-flex items-center rounded-md bg-pink-500/10 px-2 py-0.5 text-xs font-semibold text-pink-300 border border-pink-500/30">
                Speakable Voice Snippets
              </span>
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-white tracking-tight">
              Doğal Konuşma Dili & Sesli Arama Asistanı
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayVoice}
            type="button"
            aria-label="Sesli dinle"
            className="inline-flex items-center gap-1.5 rounded-lg border border-violet-400/40 bg-violet-600/30 px-3 py-1.5 text-xs font-semibold text-violet-200 transition-all hover:bg-violet-600/50 active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">
              {isPlaying ? 'stop_circle' : 'volume_up'}
            </span>
            {isPlaying ? 'Durdur' : 'Sesli Dinle'}
          </button>

          <button
            onClick={handleCopy}
            type="button"
            aria-label="AI yanıtını kopyala"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">
              {copied ? 'done' : 'content_copy'}
            </span>
            {copied ? 'Kopyalandı' : 'Kopyala'}
          </button>
        </div>
      </div>

      {/* Voice Query Selector Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {VOICE_CONVERSATIONAL_QUERIES.map((q) => (
          <button
            key={q.id}
            type="button"
            onClick={() => {
              setActiveQueryId(q.id);
              if (isPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                setIsPlaying(false);
              }
            }}
            className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
              activeQueryId === q.id
                ? 'border-violet-400 bg-violet-950/60 shadow-lg shadow-violet-900/30 ring-1 ring-violet-400/50'
                : 'border-slate-800 bg-slate-900/50 hover:bg-slate-850 hover:border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-violet-400">
                {q.category}
              </span>
              <span className="material-symbols-outlined text-sm text-slate-500">
                graphic_eq
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-200 line-clamp-2">
              "{q.userVoiceQuery}"
            </span>
          </button>
        ))}
      </div>

      {/* Active Conversation Detail Card */}
      <div className="mt-6 rounded-xl border border-violet-500/30 bg-slate-950/70 p-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-violet-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-violet-300">
              Kullanıcı Sesli Sorgusu:
            </span>
            <span className="voice-user-query text-xs sm:text-sm font-bold text-white italic">
              "{selectedQuery.userVoiceQuery}"
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
            {selectedQuery.persona}
          </span>
        </div>

        {/* Audio Waveform Simulation Bar */}
        {isPlaying && (
          <div className="flex items-center gap-1 my-3 py-2 px-3 rounded-lg bg-violet-900/30 border border-violet-500/30">
            <span className="text-xs text-violet-300 font-mono mr-2">Ses Sentezi Aktif:</span>
            <div className="flex items-end gap-0.5 h-4">
              <div className="w-1 bg-violet-400 h-2 animate-bounce"></div>
              <div className="w-1 bg-violet-400 h-4 animate-bounce delay-75"></div>
              <div className="w-1 bg-violet-400 h-3 animate-bounce delay-150"></div>
              <div className="w-1 bg-violet-400 h-4 animate-bounce delay-100"></div>
              <div className="w-1 bg-violet-400 h-1 animate-bounce"></div>
            </div>
          </div>
        )}

        {/* Direct Answer Box for Speakable */}
        <div className="rounded-lg bg-violet-950/30 border border-violet-400/20 p-4">
          <p
            id="voice-conversational-answer-text"
            className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal"
          >
            {selectedQuery.conversationalAnswer}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>
            Google Assistant & Siri için <code className="text-violet-300">#voice-conversational-answer-text</code> olarak etiketlenmiştir.
          </span>
          <span className="text-violet-300 font-semibold">
            TTS Süresi: ~12-15 saniye (Optimal Sesli Yanıt Boyutu)
          </span>
        </div>
      </div>
    </section>
  );
}
