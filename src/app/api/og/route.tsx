import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Dinamik Edge OpenGraph & Twitter Card Görsel Motoru (/api/og)
 * 
 * 39 ilçe, 8 hizmet, blog yazıları ve kurumsal sayfalar için
 * 1200x630px çözünürlüğünde kurumsal, ultra-premium sosyal medya kartları üretir.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title') || 'Alo Yönetim';
    const subtitle = searchParams.get('subtitle') || 'İstanbul Genelinde Profesyonel Tesis ve Site Yönetimi';
    const badge = searchParams.get('badge') || 'ISO 41001 · 5188 Özel Güvenlik · TSE HYB';
    const district = searchParams.get('district');
    const service = searchParams.get('service');
    const rating = searchParams.get('rating') || '★ 4.9 (340+ Tesis Referansı)';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#0A0E17',
            backgroundImage: 'radial-gradient(circle at 85% 15%, rgba(6, 182, 212, 0.22) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(37, 99, 235, 0.18) 0%, transparent 40%)',
            padding: '56px 64px',
            fontFamily: 'sans-serif',
            color: '#FFFFFF',
            position: 'relative',
          }}
        >
          {/* Üst Header: Logo + Rating */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '26px',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(2, 132, 199, 0.4)',
                }}
              >
                A
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                  Alo Yönetim
                </span>
                <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>
                  Entegre Tesis ve Mülk Yönetimi
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#FCD34D',
              }}
            >
              {rating}
            </div>
          </div>

          {/* Orta Gövde: Başlık & Konum/Hizmet Detayı */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '980px' }}>
            {(district || service) && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {district && (
                  <span
                    style={{
                      backgroundColor: 'rgba(14, 165, 233, 0.2)',
                      border: '1px solid rgba(14, 165, 233, 0.4)',
                      color: '#38BDF8',
                      fontSize: '15px',
                      fontWeight: 700,
                      padding: '6px 16px',
                      borderRadius: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    📍 {district}
                  </span>
                )}
                {service && (
                  <span
                    style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.15)',
                      border: '1px solid rgba(34, 197, 94, 0.35)',
                      color: '#4ADE80',
                      fontSize: '15px',
                      fontWeight: 700,
                      padding: '6px 16px',
                      borderRadius: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    ⚡ {service}
                  </span>
                )}
              </div>
            )}

            <h1
              style={{
                fontSize: title.length > 50 ? '44px' : '54px',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-1.5px',
                margin: 0,
                color: '#FFFFFF',
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: '22px',
                color: '#CBD5E1',
                lineHeight: 1.4,
                margin: 0,
                fontWeight: 400,
                maxWidth: '880px',
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Alt Footer: Rozetler & Web Adresi */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: '24px',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#94A3B8',
                  letterSpacing: '0.5px',
                }}
              >
                {badge}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '17px',
                fontWeight: 700,
                color: '#38BDF8',
              }}
            >
              <span>aloyonetim.com.tr</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
        },
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
