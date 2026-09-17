"use client";

import dynamic from "next/dynamic";

const NavigationProgress = dynamic(() => import("@/components/ui/effects/NavigationProgress"), { ssr: false });
const NoiseOverlay = dynamic(() => import("@/components/ui/effects/NoiseOverlay"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/effects/CustomCursor"), { ssr: false });
const QuickCallWidget = dynamic(() => import("@/components/ui/widgets/QuickCallWidget"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/ui/widgets/CookieConsent"), { ssr: false });
const SpotlightSearchModal = dynamic(() => import("@/components/modals/SpotlightSearchModal"), { ssr: false });
const PwaInstallPrompt = dynamic(() => import("@/components/ui/widgets/PwaInstallPrompt"), { ssr: false });

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
