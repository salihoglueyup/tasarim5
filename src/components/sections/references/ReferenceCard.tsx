import Icon from '@/components/ui/branding/Icon';
import { DISTRICT_NAMES } from '@/lib/blog/blogI18n';
import { monogram, type RealReference } from '@/data/realReferences';
import logos from '@/data/referenceLogos.json';

const LOGOS = logos as Record<string, string>;

/** Referans kartı: logo varsa logo, yoksa baş harflerden monogram. Yalnızca gerçek (izinli) bilgiler gösterilir. */
export default function ReferenceCard({
  reference,
  lang,
  istanbulWideLabel,
}: {
  reference: RealReference;
  lang: string;
  istanbulWideLabel: string;
}) {
  const logo = LOGOS[reference.slug];
  const tableLang = lang === 'ru' || lang === 'ar' || lang === 'en' ? lang : null;
  const district = reference.district
    ? tableLang ? DISTRICT_NAMES[tableLang][reference.district] ?? reference.district : reference.district
    : istanbulWideLabel;

  return (
    <li className="flex items-center gap-4 rounded-2xl border border-[var(--color-outline)]/70 bg-[var(--color-surface)] p-4 shadow-xs transition-shadow hover:shadow-md dark:border-white/10">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200/70 bg-white dark:border-white/10 dark:bg-white/5">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={reference.name} width={64} height={64} loading="lazy" decoding="async" className="h-full w-full object-contain p-1.5" />
        ) : (
          <span aria-hidden="true" className="text-lg font-extrabold tracking-tight text-slate-500 dark:text-slate-300">
            {monogram(reference.name)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-bold leading-snug text-slate-900 dark:text-white">{reference.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Icon name="location_on" className="text-sm" />
          <span>{district}</span>
        </p>
      </div>
    </li>
  );
}
