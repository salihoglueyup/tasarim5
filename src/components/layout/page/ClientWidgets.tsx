"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const NavigationProgress = dynamic(() => import("@/components/ui/effects/NavigationProgress"), { ssr: false });
const NoiseOverlay = dynamic(() => import("@/components/ui/effects/NoiseOverlay"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/effects/CustomCursor"), { ssr: false });
const QuickCallWidget = dynamic(() => import("@/components/ui/widgets/QuickCallWidget"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/ui/widgets/CookieConsent"), { ssr: false });
const SpotlightSearchModal = dynamic(() => import("@/components/modals/SpotlightSearchModal"), { ssr: false });

export default function ClientWidgets() {
  // Gerçek sakin uygulaması Apsiyon'dur; sitenin kendi PWA yükleme istemi gösterilmez
  // ve tarayıcının otomatik "uygulamayı yükle" mini-infobar'ı bastırılır.
  useEffect(() => {
    const suppress = (e: Event) => e.preventDefault();
    window.addEventListener("beforeinstallprompt", suppress);
    return () => window.removeEventListener("beforeinstallprompt", suppress);
  }, []);

  return (
    <>
      <NavigationProgress />
      <NoiseOverlay />
      <CustomCursor />
      <QuickCallWidget />
      <CookieConsent />
      <SpotlightSearchModal />
    </>
  );
}
