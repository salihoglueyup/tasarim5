"use client";

import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

interface AnalyticsScriptsProps {
  gaId?: string;
  clarityId?: string;
  fbPixelId?: string;
  gtmId?: string;
}

export default function AnalyticsScripts({ gaId, clarityId, fbPixelId, gtmId }: AnalyticsScriptsProps) {
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

  if (!shouldLoad && !gaId && !clarityId && !fbPixelId && !gtmId) return null;

  return (
    <>
      {/* Google Tag Manager - DataLayer Initializer & Script */}
      {shouldLoad && gtmId && (
        <Script id="gtm-script" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}

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
