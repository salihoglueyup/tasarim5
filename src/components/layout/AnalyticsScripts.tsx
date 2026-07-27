"use client";

import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

interface AnalyticsScriptsProps {
  gaId?: string;
  clarityId?: string;
  fbPixelId?: string;
}

export default function AnalyticsScripts({ gaId, clarityId, fbPixelId }: AnalyticsScriptsProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // TBT ve LCP'yi bloklamamak için analytics scriptlerini ilk etkileşimden
    // veya 2.5 saniye rölanti (idle) süresinden sonra yükle (Faz 10, 20, 121-123).
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setShouldLoad(true));
      } else {
        setShouldLoad(true);
      }
    }, 2500);

    const onInteract = () => {
      setShouldLoad(true);
      clearTimeout(timer);
      window.removeEventListener('scroll', onInteract);
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
    };

    window.addEventListener('scroll', onInteract, { passive: true, once: true });
    window.addEventListener('pointerdown', onInteract, { passive: true, once: true });
    window.addEventListener('keydown', onInteract, { passive: true, once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onInteract);
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
    };
  }, []);

  if (!shouldLoad && !gaId && !clarityId && !fbPixelId) return null;

  return (
    <>
      {/* Google Analytics - Etkileşim sonrası / Idle yükleme (Faz 10) */}
      {shouldLoad && gaId && <GoogleAnalytics gaId={gaId} />}

      {/* Microsoft Clarity - Heatmap */}
      {shouldLoad && clarityId && (
        <Script id="ms-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}

      {/* Meta (Facebook) Pixel */}
      {shouldLoad && fbPixelId && (
        <Script id="fb-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
