import { auth } from './auth';
import { prisma } from './prisma';

export async function requireCourseAccess(courseId: string, userId?: string) {
  const session = await auth();
  const id = userId || session?.user?.id;
  if (!id) throw new Error('Unauthorized');
  const enrollment = await (prisma as any).enrollment.findFirst({
    where: { userId: id, courseId, status: 'ACTIVE' },
  });
  if (!enrollment) throw new Error('Access denied — not enrolled');
  return { userId: id, enrollment };
}