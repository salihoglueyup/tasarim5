"use client";

import ReferenceBand from '@/components/sections/references/ReferenceBand';

/**
 * Ana sayfadaki müşteri yorumu bölümü. Uydurma yorumlar kaldırıldı; gerçek referans şeridi gösterilir.
 * `dbReferences` geriye dönük uyumluluk için kabul edilir ve kullanılmaz.
 */
export default function TestimonialSlider(_props: { dbReferences?: unknown[] }) {
  return (
    <div className="mx-auto max-w-[var(--spacing-container-max)] px-[var(--spacing-gutter)] py-12">
      <ReferenceBand limit={8} />
    </div>
  );
}
