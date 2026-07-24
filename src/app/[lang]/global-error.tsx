'use client';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: 'red' }}>500 - Server Error</h2>
          <p>We are sorry, an unexpected error occurred.</p>
          <button onClick={() => reset()} style={{ padding: '10px 20px', cursor: 'pointer', background: '#2D2D3A', color: 'white', border: 'none', borderRadius: '5px' }}>
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
