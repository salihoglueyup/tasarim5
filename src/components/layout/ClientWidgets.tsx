"use client";

import dynamic from "next/dynamic";

const NavigationProgress = dynamic(() => import("@/components/ui/NavigationProgress"), { ssr: false });
const NoiseOverlay = dynamic(() => import("@/components/ui/NoiseOverlay"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const QuickCallWidget = dynamic(() => import("@/components/ui/QuickCallWidget"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent"), { ssr: false });
const SpotlightSearchModal = dynamic(() => import("@/components/ui/SpotlightSearchModal"), { ssr: false });
const PwaInstallPrompt = dynamic(() => import("@/components/ui/PwaInstallPrompt"), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <NavigationProgress />
      <NoiseOverlay />
      <CustomCursor />
      <QuickCallWidget />
      <CookieConsent />
      <SpotlightSearchModal />
      <PwaInstallPrompt />
    </>
  );
}
