import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AdminCoursesPage() {
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-navy-900">Course Management</h1>
        <div className="mt-6 rounded-2xl bg-card border p-6">Course table and builder interface.</div>
      </main><Footer /></div>
  );
}