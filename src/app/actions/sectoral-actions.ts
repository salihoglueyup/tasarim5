'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { assertAdmin } from '@/lib/auth';

export async function saveSectoralSolution(id: string | 'new', data: {
  title: string;
  slug: string;
  description: string;
  icon: string;
  kpiTag: string;
  features: string;
  published: boolean;
  order: number;
}) {
  try {
    const session = await assertAdmin();
    if (!session) return { success: false, error: 'Yetkisiz işlem.' };

    if (id !== 'new') {
      await prisma.sectoralSolution.update({
        where: { id },
        data,
      });
    } else {
      await prisma.sectoralSolution.create({
        data,
      });
    }

    revalidatePath('/sektorel-cozumler');
    revalidatePath('/admin/sectoral-solutions');
    revalidatePath('/[lang]/sektorel-cozumler', 'page');
    return { success: true };
  } catch (error: any) {
    console.error('saveSectoralSolution error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteSectoralSolution(id: string) {
  try {
    const session = await assertAdmin();
    if (!session) return { success: false, error: 'Yetkisiz işlem.' };

    await prisma.sectoralSolution.delete({
      where: { id },
    });
    revalidatePath('/sektorel-cozumler');
    revalidatePath('/admin/sectoral-solutions');
    revalidatePath('/[lang]/sektorel-cozumler', 'page');
    return { success: true };
  } catch (error: any) {
    console.error('deleteSectoralSolution error:', error);
    return { success: false, error: error.message };
  }
}
