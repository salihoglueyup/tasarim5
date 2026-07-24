import { ImageResponse } from 'next/og';

// SEO Master Plan V4 — Faz 4: Dinamik Open Graph görsel üreteci.
// Route handler olarak yazıldı; her sayfa buildMetadata (src/lib/seo.ts)
// üzerinden bu görsele açıkça referans verir. Böylece tüm sayfalar (ana sayfa
// dahil) tek ve markalı OG görselini kopya olmadan kullanır.

export const contentType = 'image/png';

// Türkçe karakterlerin doğru render edilmesi için Inter fontunu Google Fonts'tan
// yükler. Ağ hatası durumunda null döner ve varsayılan font kullanılır.
async function loadInter(text: string, weight: 400 | 700): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(
      text,
    )}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src:\s*url\((.+?)\)\s*format/)?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

export async function GET() {
  const brand = 'Alo Yönetim';
  const headline = 'Profesyonel Mülk ve Tesis Yönetimi';
  const sub = '7/24 Güvenlik · Temizlik · Teknik Bakım · Yönetim';
  const url = 'aloyonetim.com';
  const region = 'İstanbul · Kadıköy';

  const allText = brand + headline + sub + url + region + 'A';
  const [regular, bold] = await Promise.all([
    loadInter(allText, 400),
    loadInter(allText, 700),
  ]);

  const fonts = [
    ...(regular ? [{ name: 'Inter', data: regular, weight: 400 as const, style: 'normal' as const }] : []),
    ...(bold ? [{ name: 'Inter', data: bold, weight: 700 as const, style: 'normal' as const }] : []),
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
        {/* Üst: marka işareti */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <div
            style={{
              display: 'flex',
              width: '76px',
              height: '76px',
              borderRadius: '18px',
              background: '#3B82F6',
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

        {/* Orta: başlık */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '70px',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              maxWidth: '940px',
            }}
          >
            {headline}
          </div>
          <div style={{ display: 'flex', fontSize: '32px', color: '#94a3b8' }}>{sub}</div>
        </div>

        {/* Alt: url + bölge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: '28px', color: '#e2e8f0', fontWeight: 700 }}>
            {url}
          </div>
          <div style={{ display: 'flex', fontSize: '26px', color: '#3B82F6', fontWeight: 700 }}>
            {region}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, ...(fonts.length ? { fonts } : {}) },
  );
}
