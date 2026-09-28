import React from 'react';
import JsonLd from '@/components/seo/schema/JsonLd';
import { generateSpeakableJsonLd } from '@/lib/ai/voiceSearchFaqEngine';

export interface VoiceSearchSpeakableSeoProps {
  pageUrl?: string;
  cssSelectors?: string[];
}

// Yalnızca `speakable` (sesli okunabilir bölümler) işaretini basar. Bu bileşen eskiden sayfada
// görünmeyen soruları FAQPage olarak da basıyordu; görünmeyen içerik şemaya konmaz.
export function VoiceSearchSpeakableSeo({
  pageUrl,
  cssSelectors = ['h1', '.tldr', '.voice-answer', 'article p:first-of-type'],
}: VoiceSearchSpeakableSeoProps) {
  return <JsonLd data={generateSpeakableJsonLd({ pageUrl, cssSelectors })} />;
}

export default VoiceSearchSpeakableSeo;
