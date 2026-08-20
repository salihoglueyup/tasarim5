'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { assertAdmin } from '@/lib/auth';
import { notifyIndexNow } from '@/lib/indexnow-auto';

export async function saveReference(id: string | 'new', data: {
  title: string;
  slug: string;
  category: string;
  location: string;
  units: string;
  image?: string;
  published: boolean;
  order: number;
  content?: string | null;
  services?: string | null;
  gallery?: string | null;
  testimonialText?: string | null;
  testimonialAuthor?: string | null;
  stats?: string | null;
  coordinates?: string | null;
  isSuccessStory?: boolean;
}) {
  try {
    const session = await assertAdmin();
    if (!session) return { success: false, error: 'Yetkisiz işlem.' };

    if (id !== 'new') {
      await prisma.reference.update({
        where: { id },
        data,
      });
    } else {
      await prisma.reference.create({
        data,
      });
    }

    revalidatePath('/referanslar');
    revalidatePath('/admin/references');
    revalidatePath('/[lang]/referanslar', 'page');
    if (data.isSuccessStory) {
      revalidatePath('/basari-hikayeleri');
    }

    // Arama motorlarına anlık ping gönder
    if (data.published) {
      notifyIndexNow([
        '/referanslar',
        `/referanslar/${data.slug}`,
        ...(data.isSuccessStory ? ['/basari-hikayeleri'] : []),
        '/sitemap.xml',
        '/llms.txt',
        '/api/ai-knowledge',
        '/api/knowledge-graph'
      ]);
    }

    return { success: true };
  } catch (error: any) {
    console.error('saveReference error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteReference(id: string) {
  try {
    const session = await assertAdmin();
    if (!session) return { success: false, error: 'Yetkisiz işlem.' };

    const targetRef = await prisma.reference.findUnique({
      where: { id },
      select: { slug: true }
    });

    await prisma.reference.delete({
      where: { id },
    });
    revalidatePath('/referanslar');
    revalidatePath('/admin/references');
    revalidatePath('/[lang]/referanslar', 'page');

    if (targetRef?.slug) {
      notifyIndexNow([
        '/referanslar',
        `/referanslar/${targetRef.slug}`,
        '/sitemap.xml',
        '/llms.txt'
      ]);
    }

    return { success: true };
  } catch (error: any) {
    console.error('deleteReference error:', error);
    return { success: false, error: error.message };
  }
}
