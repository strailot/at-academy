import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { auth } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth().catch(() => null);

  // Not signed in at all — send to login with a way back here afterwards.
  if (!session?.user) {
    redirect('/login?callbackUrl=%2Fadmin%2Fdashboard');
  }

  // Signed in, but not an administrator. Session roles have arrived as both
  // "admin" and "ADMIN" depending on the provider, so compare case-insensitively.
  const role = String((session.user as { role?: string }).role ?? '').toUpperCase();
  if (role !== 'ADMIN') {
    return (
      <div className="grid min-h-screen place-items-center bg-navy-950 px-6 py-16 text-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">403</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-white">Admins only</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Your account does not have administrator access, so this area stays locked. If you believe
            that is a mistake, contact the team and we will review your role.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="/dashboard"
              className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              Go to my dashboard
            </a>
            <a
              href="/contact"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white/90 transition hover:bg-white/10"
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="p-5 md:ml-64 md:p-8">{children}</main>
    </div>
  );
}
