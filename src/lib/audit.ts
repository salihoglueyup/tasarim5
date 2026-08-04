import { prisma } from './prisma';

export async function logAction(
  userId: string,
  action: string,
  entity: string,
  entityId?: string,
  details?: Record<string, any>
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        details: details ? JSON.stringify(details) : null,
      },
    });
  } catch (error) {
    console.error('AuditLog failed to write:', error);
  }
}
