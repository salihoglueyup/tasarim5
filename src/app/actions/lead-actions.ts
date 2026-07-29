'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteLead(id: string, lang: string) {
  try {
    await prisma.lead.delete({ where: { id } });
    revalidatePath(`/${lang}/admin/leads`);
    return { success: true };
  } catch (error) {
    console.error('Lead deletion failed:', error);
    return { error: 'Mesaj silinemedi.' };
  }
}

export async function markLeadAsRead(id: string, isRead: boolean, lang: string) {
  try {
    await prisma.lead.update({
      where: { id },
      data: { isRead }
    });
    revalidatePath(`/${lang}/admin/leads`);
    return { success: true };
  } catch (error) {
    console.error('Lead mark read failed:', error);
    return { error: 'Durum güncellenemedi.' };
  }
}
