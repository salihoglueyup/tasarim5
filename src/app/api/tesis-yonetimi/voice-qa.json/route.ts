import { NextResponse } from 'next/server';
import { synthesizeFacilityVoiceQA } from '@/lib/seo/facilityVoiceAiSynthesizer';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

/**
 * Sesli Arama & Voice AI Soru-Cevap API'si (/api/tesis-yonetimi/voice-qa.json)
 * Google Assistant, Siri ve Alexa için Speakable JSON-LD verileri sunar.
 */
export async function GET(req: Request) {
  try {
    let lang: 'tr' | 'en' | 'ru' | 'ar' = 'tr';
    if (req && req.url) {
      try {
        const { searchParams } = new URL(req.url);
        const l = searchParams.get('lang');
        if (l && ['tr', 'en', 'ru', 'ar'].includes(l.toLowerCase())) {
          lang = l.toLowerCase() as any;
        }
      } catch {
        // noop
      }
    }

    const payload = synthesizeFacilityVoiceQA(lang);
    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'all',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Voice QA synthesis failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
