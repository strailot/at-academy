import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-navy-900">Account</h1>
        <section className="mt-6 rounded-2xl bg-card border p-6">
          <h2 className="font-bold text-brand-500">Profile</h2>
          <p className="text-sm text-foreground/60 mt-2">Personal information management.</p>
          <div className="mt-4 flex gap-3">
            <a href="/account/payments"><Button variant="outline">Payments</Button></a>
            <a href="/account/refunds"><Button variant="outline">Refund Requests</Button></a>
          </div>
        </section>
        <section className="mt-6 rounded-2xl bg-card border p-6">
          <h2 className="font-bold text-brand-destructive">Account Deletion</h2>
          <p className="text-sm text-foreground/60 mt-2">Request account deletion. This is a multi-step review process.</p>
          <Button className="mt-4 bg-destructive" size="sm">Request Deletion</Button>
        </section>
      </main><Footer /></div>
  );
}