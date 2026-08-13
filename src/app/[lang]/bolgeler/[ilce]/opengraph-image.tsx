import { ImageResponse } from 'next/og';
import { DISTRICTS } from '@/data/districts';

export const alt = 'Alo Yönetim Tesis Yönetimi';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ ilce: string }> }) {
  const { ilce } = await params;
  
  const district = DISTRICTS.find((d) => d.slug === ilce);
  const districtName = district?.name ?? 'İstanbul';

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
        }}
      >
        {/* Decorative Grid / Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Top bar: Category */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ padding: '8px 16px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '20px', color: '#cbd5e1', fontSize: 24, fontWeight: 'bold' }}>
            Profesyonel Tesis Yönetimi
          </div>
        </div>

        {/* Middle: Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        >
          <h1
            style={{
              fontSize: 84,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {districtName}&apos;a Özel Profesyonel Site ve Tesis Yönetimi
          </h1>
          <p style={{ fontSize: 32, color: '#94a3b8', margin: 0, marginTop: '20px' }}>
            Güvenlik • Temizlik • Teknik Bakım • Aidat Takibi
          </p>
        </div>

        {/* Bottom bar: Logo and Author */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 28, fontWeight: 'bold' }}>
              A
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>Alo Yönetim</span>
              <span style={{ fontSize: 20, color: '#94a3b8' }}>Türkiye&apos;nin En Prestijli Mülk Yönetimi</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
