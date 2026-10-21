import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
export default function NotificationsCenterPage() {
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-3xl px-6 py-12"><h1 className="font-display text-3xl font-bold text-navy-900">Notifications</h1>
        <div className="mt-6 space-y-3"><div className="rounded-xl bg-card border p-4"><h3 className="font-bold">Enrollment Confirmed</h3><p className="text-sm text-foreground/60">Your enrollment is active.</p></div></div>
      </main><Footer /></div>
  );
}