import { ImageResponse } from 'next/og';
import { BASE_URL } from '@/lib/seo';

export const alt = 'Alo Yönetim — Profesyonel Tesis Yönetimi ve Entegre Site İşletmeciliği';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang?: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'tr';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#020617', // Slate 950
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Background Gradient Accents */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
            backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: '10px 24px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '9999px',
              color: '#e2e8f0',
              fontSize: 22,
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {lang === 'en' ? 'Integrated Facility Management' : 'Entegre Tesis Yönetimi'}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#10b981',
              fontSize: 22,
              fontWeight: 'bold',
            }}
          >
            <span>★ 4.9 / 5.0 (312+ Tesis)</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: 'auto',
            marginBottom: 'auto',
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '950px',
            }}
          >
            Profesyonel Tesis & Site Yönetimi
          </h1>
          <p
            style={{
              fontSize: 30,
              color: '#94a3b8',
              margin: 0,
              lineHeight: 1.4,
              maxWidth: '850px',
            }}
          >
            634 Sayılı KMK Tam Uyumu • 5188 Özel Güvenlik • 7/24 Mobil Teknik Bakım • TSE 13811 Hijyen
          </p>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            zIndex: 10,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '16px',
                backgroundColor: '#0f172a',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 26,
                fontWeight: 'bold',
              }}
            >
              A
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>Alo Yönetim</span>
              <span style={{ fontSize: 18, color: '#64748b' }}>aloyonetim.com.tr • 0216 550 48 48</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              color: '#cbd5e1',
              fontSize: 20,
              fontWeight: '500',
            }}
          >
            <span>ISO 9001:2015</span>
            <span>•</span>
            <span>TSE HYB 12850</span>
            <span>•</span>
            <span>5188 Lisanslı</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
