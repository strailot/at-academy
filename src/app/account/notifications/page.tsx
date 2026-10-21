import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-navy-900">Notifications</h1>
        <div className="mt-6 rounded-2xl bg-card border p-6 space-y-4">
          <div className="flex items-center justify-between"><span>Registration confirmed</span><Badge>NEW</Badge></div>
          <div className="flex items-center justify-between"><span>Enrollment activated</span><Badge>NEW</Badge></div>
          <div className="flex items-center justify-between"><span>Payment successful</span><Badge>READ</Badge></div>
        </div>
      </main><Footer /></div>
  );
}