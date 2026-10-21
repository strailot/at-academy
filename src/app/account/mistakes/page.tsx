import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MistakesPage() {
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-3xl px-6 py-12"><h1 className="font-display text-3xl font-bold text-navy-900">Mistake Notebook</h1>
        <p className="text-foreground/60 mt-4">Incorrect answers automatically collected. Review, retry, and mark mastered.</p>
      </main><Footer /></div>
  );
}