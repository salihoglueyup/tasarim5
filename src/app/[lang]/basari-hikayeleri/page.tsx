import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import BasariHikayeleriClient from './BasariHikayeleriClient';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 3600;

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
  let stories: any[] = [];
  const cacheKeyStories = 'success_stories_list_v2';

  try {
    const cached = await redis.get(cacheKeyStories);
    if (cached) stories = JSON.parse(cached);
  } catch {
    // Redis fallback
  }

  if (stories.length === 0) {
    stories = await prisma.reference.findMany({
      where: {
        isSuccessStory: true,
        published: true
      },
      orderBy: { order: 'asc' }
    }).catch(() => []);

    if (stories.length > 0) {
      redis.setex(cacheKeyStories, 3600, JSON.stringify(stories)).catch(() => {});
    }
  }

  return (
    <BasariHikayeleriClient stories={stories} />
  );
}
