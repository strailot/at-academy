import { prisma } from './prisma';

export async function logAudit({ userId, action, entity, entityId, changes, ipAddress, userAgent }: {
  userId?: string; action: string; entity: string; entityId?: string; changes?: object; ipAddress?: string; userAgent?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: { userId, action, entity, entityId, changes: changes ? JSON.stringify(changes) : undefined, ipAddress, userAgent },
    });
  } catch {}
}