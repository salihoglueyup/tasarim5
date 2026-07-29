import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/layout/PageHeader';
import { JsonLd } from '@/components';
import { generateBreadcrumbs, webPageSchema } from '@/lib/schemas';
import ReferencesClient from './ReferencesClient';

// Server Component
export default async function ReferanslarPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // DB'den verileri çek
  const [projects, partners] = await Promise.all([
    prisma.reference.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    }),
    prisma.partner.findMany({
      orderBy: { order: 'asc' },
    }),
  ]);

  const breadcrumbLd = generateBreadcrumbs([
    { name: 'Anasayfa', url: '/' },
    { name: 'Referanslarımız', url: '/referanslar' }
  ]);

  const pageLd = webPageSchema({
    type: 'CollectionPage',
    name: 'Referanslarımız',
    path: '/referanslar',
  });

  return (
    <>
      <JsonLd data={[pageLd, breadcrumbLd]} />
      <PageHeader 
        title="Referanslarımız" 
        description="İstanbul genelinde başarıyla yönettiğimiz seçkin siteler, plazalar ve rezidanslar." 
      />

      <ReferencesClient 
        initialProjects={projects} 
        partners={partners} 
        lang={lang}
      />
    </>
  );
}
