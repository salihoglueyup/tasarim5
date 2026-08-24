import { NextRequest, NextResponse } from 'next/server';
import {
  analyzeContentSeo,
  calculateTurkishReadabilityScore,
  analyzeHeadingStructure,
  classifySearchIntent,
  evaluateSnippetHealth,
  extractFaqCandidatesFromContent,
  resolveTopicalEntityGraph,
  extractKeyFactsAndKpis,
  auditFullPageSeo,
} from '@/lib/seoEngine';

export const dynamic = 'force-dynamic';

/**
 * Headless Content Intelligence & Topikal Otorite Analiz API'si (/api/seo/analyze-content)
 * 
 * Admin panelinde veya dış CMS sistemlerinde içerik girilirken backend düzeyinde
 * semantik derinlik, Ateşman Türkçe okunabilirlik indeksi, başlık hiyerarşisi,
 * arama niyeti (Search Intent), eksik entity önerileri ve otomatik FAQ şeması üretir.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, title = '', description = '', targetKeyword = 'tesis yönetimi', path = '/' } = body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { status: 'error', message: 'Analiz edilecek "content" (metin/HTML) alanı zorunludur.' },
        { status: 400 }
      );
    }

    // Tam sayfa ve içerik SEO teşhis motorunu çalıştır
    const fullAudit = auditFullPageSeo({
      title: title || 'Alo Yönetim Tesis ve Site Yönetimi',
      description: description || 'İstanbul genelinde profesyonel tesis yönetimi ve 5188 güvenlik.',
      content,
      targetKeyword,
      currentPath: path,
    });

    return NextResponse.json({
      status: 'success',
      overallSeoScore: fullAudit.overallScore,
      data: fullAudit,
      analyzedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Content analysis API error:', err);
    return NextResponse.json(
      { status: 'error', message: err?.message || 'İçerik analizi sırasında bir hata oluştu.' },
      { status: 500 }
    );
  }
}
