import { NextRequest, NextResponse } from 'next/server';
import { auditFullPageSeo } from '@/lib/seoEngine';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Sayfa ve İçerik SEO Teşhis API'si (Alo Yönetim Real-Time SEO Engine).
 *
 * GET /api/seo/audit-page?keyword=tesis+yonetimi
 * POST /api/seo/audit-page { title, description, content, targetKeyword, currentPath }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title = 'Profesyonel Tesis Yönetimi İstanbul | Alo Yönetim',
      description = 'İstanbul genelinde apartman, site, plaza ve tesis yönetimi hizmetleri.',
      content = '',
      targetKeyword = 'tesis yönetimi',
      currentPath = '/',
    } = body;

    const audit = auditFullPageSeo({
      title,
      description,
      content,
      targetKeyword,
      currentPath,
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      audit,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'SEO denetimi sırasında bir hata oluştu.',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword') || 'tesis yönetimi';
  const path = searchParams.get('path') || '/hizmetler/tesis-yonetimi';

  const demoContent = `
# İstanbul Profesyonel Tesis Yönetimi ve İşletmeciliği
Alo Yönetim, 634 Sayılı Kat Mülkiyeti Kanunu (KMK) kapsamında entegre tesis yönetimi ve site yönetimi hizmetleri sunar.
Operasyonlarımızda %30 oranına varan enerji ve aidat tasarrufu sağlanmaktadır.
5188 Sayılı Kanun lisanslı özel güvenlik ekiplerimiz 7/24 kesintisiz hizmet vermektedir.
TSE 13811 hijyen standartlarında merdiven ve ortak alan temizliği gerçekleştirilir.

## Tesis Yönetimi Nedir?
Tesis yönetimi, binaların teknik, güvenlik, temizlik ve idari süreçlerinin tek bir çatı altında profesyonelce koordine edilmesidir.

## İşletme Projesi Zorunlu mu?
KMK 37. maddesi gereğince her yıl kat malikleri kurulu öncesinde işletme projesinin hazırlanması yasal zorunluluktur.
  `;

  const audit = auditFullPageSeo({
    title: 'Profesyonel Tesis Yönetimi İstanbul | 7/24 Alo Yönetim',
    description: 'İstanbul genelinde profesyonel tesis yönetimi, 5188 güvenlik ve şeffaf KMK aidat takibi. Ücretsiz keşif için hemen arayın.',
    content: demoContent,
    targetKeyword: keyword,
    currentPath: path,
  });

  return NextResponse.json({
    success: true,
    message: 'Canlı Tesis Yönetimi SEO Teşhis Raporu',
    timestamp: new Date().toISOString(),
    audit,
  });
}
