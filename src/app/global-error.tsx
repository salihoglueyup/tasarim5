'use client';

import { useEffect } from 'react';

/**
 * Faz 86: Next.js Root `global-error.tsx`.
 * Root layout veya HTML kabuğu çöktüğünde bile çalışan, harici CSS/JS bağımlılığı
 * olmayan, inline stilli ve iki dilli (TR/EN) korumalı kurtarma ekranı.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[Global Error Caught]:', error);
    }
  }, [error]);

  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sistem Hatası - Alo Yönetim</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#090d16', color: '#ffffff', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: '72px', fontWeight: 900, color: '#38bdf8', lineHeight: 1, letterSpacing: '-0.05em' }}>
            500
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '20px 0 10px' }}>
            Kritik Bir Hata Oluştu
          </h1>
          <p style={{ fontSize: '15px', color: '#94a3b8', maxWidth: '500px', margin: '0 0 6px', lineHeight: 1.5 }}>
            Sistemde geçici bir kesinti yaşandı. Mühendislerimiz durumdan haberdar edildi.
          </p>
          <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '500px', margin: '0 0 24px' }}>
            A critical system error occurred. Please try refreshing the page.
          </p>

          {error.digest && (
            <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#7dd3fc', backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '6px 14px', borderRadius: '8px', marginBottom: '24px' }}>
              Ref: {error.digest}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => reset()}
              style={{
                padding: '12px 28px',
                cursor: 'pointer',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
              }}
            >
              Tekrar Dene · Try Again
            </button>
            <a
              href="/"
              style={{
                padding: '12px 24px',
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Ana Sayfa · Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
