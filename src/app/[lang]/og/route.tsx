import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

// SEO Master Plan V4 — Faz 4 (güncellenmiş): Dinamik Open Graph görsel üreteci.
// ?title=, ?type=(default|service|local|article) query param'larını destekler.
// buildMetadata (src/lib/seo.ts) her sayfa için title'ı otomatik olarak geçirir.


const TYPE_CONFIG = {
  service: { badge: 'Hizmet', color: '#3B82F6' },
  local:   { badge: 'Bölge',  color: '#10B981' },
  article: { badge: 'Blog',   color: '#8B5CF6' },
  default: { badge: '',       color: '#3B82F6' },
} as const;

type OgType = keyof typeof TYPE_CONFIG;

async function loadInter(text: string, weight: 400 | 700): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src:\s*url\((.+?)\)\s*format/)?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawTitle = searchParams.get('title') ?? '';
  const type = (searchParams.get('type') ?? 'default') as OgType;

  const brand = 'Alo Yönetim';
  const headline = rawTitle || 'Profesyonel Mülk ve Tesis Yönetimi';
  const sub = rawTitle ? 'Profesyonel Tesis ve Mülk Yönetimi' : '7/24 Güvenlik · Temizlik · Teknik Bakım';
  const siteUrl = 'aloyonetim.com.tr';
  const region = 'İstanbul · Kadıköy';

  const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.default;

  const allText = brand + headline + sub + siteUrl + region + 'A' + cfg.badge;
  const [regular, bold] = await Promise.all([
    loadInter(allText, 400),
    loadInter(allText, 700),
  ]);

  const fonts = [
    ...(regular ? [{ name: 'Inter', data: regular, weight: 400 as const, style: 'normal' as const }] : []),
    ...(bold   ? [{ name: 'Inter', data: bold,    weight: 700 as const, style: 'normal' as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #1e293b 0%, #2D2D3A 55%, #0f172a 100%)',
          padding: '80px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Üst: marka + tip rozeti */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            <div
              style={{
                display: 'flex',
                width: '76px',
                height: '76px',
                borderRadius: '18px',
                background: cfg.color,
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '44px',
                fontWeight: 700,
                color: 'white',
              }}
            >
              A
            </div>
            <div style={{ display: 'flex', fontSize: '36px', fontWeight: 700, color: 'white' }}>
              {brand}
            </div>
          </div>
          {cfg.badge ? (
            <div
              style={{
                display: 'flex',
                background: cfg.color + '33',
                border: `2px solid ${cfg.color}`,
                borderRadius: '999px',
                padding: '10px 28px',
                fontSize: '26px',
                fontWeight: 700,
                color: cfg.color,
              }}
            >
              {cfg.badge}
            </div>
          ) : null}
        </div>

        {/* Orta: başlık */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: headline.length > 50 ? '52px' : '68px',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.15,
              maxWidth: '1040px',
            }}
          >
            {headline}
          </div>
          <div style={{ display: 'flex', fontSize: '30px', color: '#94a3b8' }}>{sub}</div>
        </div>

        {/* Alt: url + bölge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: '26px', color: '#e2e8f0', fontWeight: 700 }}>
            {siteUrl}
          </div>
          <div style={{ display: 'flex', fontSize: '24px', color: cfg.color, fontWeight: 700 }}>
            {region}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, ...(fonts.length ? { fonts } : {}) },
  );
}
