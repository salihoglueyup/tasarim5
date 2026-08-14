import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import BasariHikayeleriClient from './BasariHikayeleriClient';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    title: 'Başarı Hikayelerimiz — Mutlu Sakin ve Yöneticiler',
    description:
      'Alo Yönetim ile çalışan site sakinlerinin ve yöneticilerinin gerçek deneyimleri. Kanıtlanmış sonuçlar, şeffaf yönetim anlayışı.',
    path: '/basari-hikayeleri',
    lang,
    keywords: ['site yönetimi deneyimler', 'tesis yönetimi başarı', 'apartman yönetimi müşteri görüşleri'],
  });
}

export default async function BasariHikayeleriPage() {
  const stories = await prisma.reference.findMany({
    where: {
      isSuccessStory: true,
      published: true
    },
    orderBy: { order: 'asc' }
  });

  return (
    <BasariHikayeleriClient stories={stories} />
  );
}
