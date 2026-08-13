import { ImageResponse } from 'next/og';
import { prisma } from '@/lib/prisma';

export const alt = 'Alo Yönetim Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { category: true, author: true }
  });

  const title = post?.title ?? 'Alo Yönetim Blog';
  const categoryName = post?.category?.name ?? 'Rehber';
  const authorName = post?.author?.name ?? 'Alo Yönetim';

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
            {categoryName}
          </div>
        </div>

        {/* Middle: Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom: Author & Brand */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid rgba(255,255,255,0.1)',
            paddingTop: '30px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', // Amber/Gold
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              {authorName.charAt(0)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 28, color: '#f8fafc', fontWeight: 'bold' }}>{authorName}</span>
              <span style={{ fontSize: 20, color: '#94a3b8' }}>İçerik Editörü</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#fbbf24', fontSize: 32, fontWeight: 900, letterSpacing: '-1px' }}>ALO YÖNETİM</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
