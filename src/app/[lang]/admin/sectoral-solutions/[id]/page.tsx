import { prisma } from '@/lib/prisma';
import SectoralForm from './SectoralForm';
import Link from 'next/link';

export default async function EditSectoralSolutionPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  const isNew = id === 'new';

  let solution = null;
  if (!isNew) {
    solution = await prisma.sectoralSolution.findUnique({
      where: { id }
    });
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link 
          href={`/${lang}/admin/sectoral-solutions`}
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isNew ? 'Yeni Sektörel Çözüm Ekle' : 'Çözümü Düzenle'}
          </h1>
        </div>
      </div>

      <SectoralForm solution={solution} lang={lang} isNew={isNew} />
    </div>
  );
}
