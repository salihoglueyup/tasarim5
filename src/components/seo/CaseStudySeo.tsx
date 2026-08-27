import JsonLd from '@/components/seo/JsonLd';
import { caseStudySchema } from '@/lib/schemas';

const CASES = [
  {
    name: '200 Daireli Rezidans — Kadıköy',
    description: 'İstanbul Kadıköy\'de 200 daireli lüks rezidansta kapsamlı yönetim devri ve aidat optimizasyonu projesi.',
    result: 'Profesyonel tesis yönetimine geçişin ardından 14 ay içinde aylık aidat giderleri %31 azaldı.',
    metric: 'Aidat Azaltım Oranı',
    value: '%31',
  },
  {
    name: '15.000 m² Plaza — Şişli',
    description: 'Şişli\'de 45 ofis kiracılı karma kullanımlı plaza için entegre enerji ve teknik bakım yönetimi.',
    result: 'ISO 41001 uyumlu enerji yönetimi protokolü ile yıllık elektrik tüketiminde %28 tasarruf sağlandı.',
    metric: 'Enerji Tasarruf Oranı',
    value: '%28',
  },
  {
    name: '420 Daireli Toplu Konut — Başakşehir',
    description: 'Başakşehir\'de 420 daireli ve 3 bloklu toplu konut projesinde yönetim devri ve süreç standardizasyonu.',
    result: 'Mevcut yönetimden 48 saat içinde sorunsuz devir tamamlandı; %26 daha düşük işletme maliyetiyle sözleşme imzalandı.',
    metric: 'İşletme Maliyeti Azaltımı',
    value: '%26',
  },
];

export default function CaseStudySeo() {
  const schema = caseStudySchema(CASES);

  return (
    <>
      <JsonLd data={[schema]} />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-2xl" aria-hidden="true">
            workspace_premium
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[var(--color-primary)]">
            Kanıtlanmış Sonuçlar
          </h2>
        </div>
        <p className="text-[var(--color-secondary)] max-w-2xl text-sm md:text-base font-light">
          Ölçülebilir tasarruf ve verimlilik artışı sağlayan gerçek başarı hikayelerimizden seçkiler.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASES.map((c) => (
            <div
              key={c.name}
              className="flex flex-col gap-4 p-7 bg-[var(--color-surface)] border border-[var(--color-outline)]/80 rounded-[2rem] hover:border-slate-400 dark:hover:border-slate-500 transition-colors shadow-2xs hover:shadow-sm"
            >
              <div className="flex flex-col gap-1">
                <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {c.value}
                </div>
                <div className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider">
                  {c.metric}
                </div>
              </div>
              <div className="h-px bg-[var(--color-outline)]/50" />
              <div>
                <div className="font-bold text-sm text-[var(--color-primary)] mb-1">{c.name}</div>
                <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{c.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
