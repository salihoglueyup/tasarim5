import { ImageResponse } from 'next/og';
import { BASE_URL } from '@/lib/seo';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Alo Yönetim';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'linear-gradient(135deg, #0a192f 0%, #172a45 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={`${BASE_URL}/icon.png`} 
            alt="Logo" 
            width={120} 
            height={120} 
            style={{ borderRadius: '24px', marginRight: '30px' }} 
          />
          <h1 style={{ fontSize: '80px', fontWeight: 'bold', margin: 0, color: '#f5d547' }}>
            Alo Yönetim
          </h1>
        </div>
        
        <p style={{ fontSize: '40px', fontWeight: '500', color: '#e2e8f0', textAlign: 'center', padding: '0 40px', margin: 0 }}>
          Profesyonel Mülk ve Tesis Yönetimi
        </p>

        <div style={{ display: 'flex', position: 'absolute', bottom: '40px', gap: '30px', color: '#94a3b8', fontSize: '24px' }}>
          <span>aloyonetim.com.tr</span>
          <span>•</span>
          <span>7/24 Güvenlik & Temizlik & Teknik Bakım</span>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
