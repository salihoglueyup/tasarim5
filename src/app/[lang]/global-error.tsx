'use client';
import { useEffect } from 'react';

// global-error, root layout'un kendisi çökerse çalışır; bu yüzden LanguageProvider
// ve globals.css KULLANILAMAZ. Bağımsız (inline stilli) ve iki dilli (TR + EN) tutulur.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') console.error(error);
  }, [error]);

  return (
    <html lang="tr">
      <body style={{ margin: 0 }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            background: 'linear-gradient(135deg, #1e293b 0%, #2D2D3A 55%, #0f172a 100%)',
            color: '#ffffff',
          }}
        >
          <div style={{ fontSize: '72px', fontWeight: 800, color: '#3B82F6', lineHeight: 1 }}>
            500
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '20px 0 8px' }}>
            Beklenmeyen bir hata oluştu
          </h1>
          <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '480px', margin: '0 0 8px' }}>
            Bir sorun oluştu. Lütfen tekrar deneyin.
          </p>
          <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '480px', margin: '0 0 28px' }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '12px 28px',
              cursor: 'pointer',
              background: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            Tekrar Dene · Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
