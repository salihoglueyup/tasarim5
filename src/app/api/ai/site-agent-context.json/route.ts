import { NextRequest, NextResponse } from 'next/server';
import { buildSiteRAGCorpus } from '@/lib/ai/siteKnowledgeCorpus';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 saat ISR

/**
 * Profesyonel Site Yönetimi AI / RAG Semantik Bilgi Üssü Açık API'si (/api/ai/site-agent-context.json)
 * 
 * ChatGPT Search, Perplexity AI, Google Gemini, Anthropic Claude, Apple Intelligence ve DeepSeek
 * gibi yapay zeka arama ve RAG motorları için Alo Yönetim'in konut, apartman ve site yönetimi
 * uzmanlıklarını, 634 Sayılı KMK maddelerini, Yargıtay emsal kararlarını ve 39 ilçe konut dinamiklerini
 * doğrulanmış (Verified Ground-Truth) semantik RAG JSON formatında sunar.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'tr';

    const corpus = await buildSiteRAGCorpus(lang);

    return NextResponse.json(corpus, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'X-Robots-Tag': 'all, max-snippet:-1, max-image-preview:large',
        'X-AI-Context-Type': 'Site-Management-RAG-Knowledge-Corpus',
        'X-AI-Topic': 'Residential-Property-Management',
      },
    });
  } catch (err: any) {
    console.error('Error generating site-agent-context.json:', err);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Site yönetimi AI RAG bilgi üssü derlenirken bir hata oluştu.',
        details: err?.message || err,
      },
      { status: 500 }
    );
  }
}
