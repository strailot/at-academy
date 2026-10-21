import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PaymentsHistoryPage() {
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-navy-900">Payment History</h1>
        <div className="mt-6 rounded-2xl bg-card border p-6 text-sm text-foreground/60">No payments found yet. Once a course purchase is completed, receipt and transaction details appear here.</div>
      </main><Footer /></div>
  );
}