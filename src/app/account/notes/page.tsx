import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-navy-900">My Notes</h1>
        <div className="mt-6 rounded-2xl bg-card border p-6 text-sm text-foreground/60">No notes yet. Notes are private to your account and linked to lessons you access.</div>
      </main><Footer /></div>
  );
}