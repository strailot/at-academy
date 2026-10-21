import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-5xl px-6 py-12"><h1 className="font-display text-3xl font-bold text-navy-900">Leads / CRM</h1>
        <div className="mt-6 rounded-2xl bg-card border p-6"><p className="text-foreground/60">Lead capture and conversion tracking architecture.</p></div>
      </main><Footer /></div>
  );
}