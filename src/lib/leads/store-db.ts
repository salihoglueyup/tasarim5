import type { Lead, ChannelResult } from './types';
import { prisma } from '@/lib/prisma';

/**
 * Veritabanı kaydı — Prisma ile yerel DB'ye kaydedilir.
 */

export async function storeLead(lead: Lead): Promise<ChannelResult> {
  try {
    await prisma.lead.create({
      data: {
        type: lead.type,
        name: lead.name ?? null,
        phone: lead.phone ?? null,
        email: lead.email ?? null,
        subject: lead.subject ?? null,
        message: lead.message ?? null,
        meta: lead.meta ? JSON.stringify(lead.meta) : null,
      },
    });

    return { channel: 'database', status: 'ok' };
  } catch (err) {
    console.error('Lead store error:', err);
    return { channel: 'database', status: 'error', detail: (err as Error).message };
  }
}
