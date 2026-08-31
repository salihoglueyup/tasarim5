import React from 'react';
import {
  generateSpeakableJsonLd,
  generateVoiceFaqPageJsonLd,
  VOICE_SEARCH_KNOWLEDGE_BASE,
  VoiceSearchTopic,
} from '@/lib/ai/voiceSearchFaqEngine';
import { BASE_URL } from '@/lib/seo';

export interface VoiceSearchSpeakableSeoProps {
  pageUrl?: string;
  cssSelectors?: string[];
  includeVoiceFaq?: boolean;
  customTopics?: VoiceSearchTopic[];
  /** Tekil soru & nokta atışı sesli yanıt modu */
  question?: string;
  directAnswer?: string;
  lang?: string;
}

export function VoiceSearchSpeakableSeo({
  pageUrl,
  cssSelectors = ['h1', '.tldr', '.voice-answer', 'article p:first-of-type'],
  includeVoiceFaq = true,
  customTopics,
  question,
  directAnswer,
  lang = 'tr',
}: VoiceSearchSpeakableSeoProps) {
  // Eğer doğrudan tekil soru & yanıt verilmişse onu da kapsayan özel şema üret
  if (question && directAnswer) {
    const singleFaqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
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
    };

    const singleSpeakableSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      inLanguage: lang,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2', '.tldr', '.voice-answer', 'p'],
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(singleSpeakableSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(singleFaqSchema),
          }}
        />
      </>
    );
  }

  // Varsayılan global / topic tabanlı mod
  const speakableSchema = generateSpeakableJsonLd({
    pageUrl,
    cssSelectors,
  });

  const voiceFaqSchema = includeVoiceFaq
    ? generateVoiceFaqPageJsonLd(customTopics || VOICE_SEARCH_KNOWLEDGE_BASE)
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableSchema),
        }}
      />
      {voiceFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(voiceFaqSchema),
          }}
        />
      )}
    </>
  );
}

export default VoiceSearchSpeakableSeo;
