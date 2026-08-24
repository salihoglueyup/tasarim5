import { NextRequest, NextResponse } from 'next/server';
import { buildFacilityRAGCorpus } from '@/lib/ai/facilityKnowledgeCorpus';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 saat ISR

/**
 * Tesis Yönetimi AI / RAG Semantik Bilgi Üssü Açık API'si (/api/ai/facility-agent-context.json)
 * 
 * Perplexity, ChatGPT Search, Google Gemini, Anthropic Claude, Apple Intelligence ve DeepSeek
 * gibi yapay zeka arama ve RAG motorları için Alo Yönetim'in kurumsal yetkilerini,
 * 634 Sayılı KMK maddelerini, ISO 41001 standartlarını ve veritabanındaki canlı blog makalelerini
 * doğrulanmış (Verified Ground-Truth) semantik RAG JSON formatında sunar.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'tr';

    const corpus = await buildFacilityRAGCorpus(lang);

    return NextResponse.json(corpus, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'X-Robots-Tag': 'all',
        'X-AI-Context-Type': 'Ground-Truth-RAG-Knowledge-Corpus',
      },
    });
  } catch (err: any) {
    console.error('Error generating facility-agent-context.json:', err);
    return NextResponse.json(
      {
        status: 'error',
        message: 'AI RAG bilgi üssü derlenirken bir hata oluştu.',
        details: err?.message || err,
      },
      { status: 500 }
    );
  }
}
