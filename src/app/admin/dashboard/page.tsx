import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'ADMIN') redirect('/login');
  const students = await prisma.user.count({ where: { role: 'STUDENT' } });
  const courses = await prisma.course.count({ where: { status: 'PUBLISHED' } });
  const enrollments = await prisma.enrollment.count({ where: { status: 'ACTIVE' } });
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-navy-900">Admin Dashboard</h1>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-card border p-6"><h3 className="font-bold">Students</h3><p className="text-3xl font-extrabold text-cyan-500">{students}</p></div>
        <div className="rounded-2xl bg-card border p-6"><h3 className="font-bold">Courses</h3><p className="text-3xl font-extrabold text-cyan-500">{courses}</p></div>
        <div className="rounded-2xl bg-card border p-6"><h3 className="font-bold">Active Enrollments</h3><p className="text-3xl font-extrabold text-cyan-500">{enrollments}</p></div>
        <div className="rounded-2xl bg-card border p-6"><h3 className="font-bold">Revenue</h3><p className="text-3xl font-extrabold text-cyan-500">BDT 2,450,000</p></div>
      </div>
    </div>
  );
}