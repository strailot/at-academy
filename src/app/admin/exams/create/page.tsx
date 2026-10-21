import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function AdminExamCreate() {
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-navy-900">Create Exam</h1>
        <div className="mt-6 rounded-2xl bg-card border p-6 space-y-4">
          <p><strong>Exam Title</strong></p>
          <input className="w-full rounded-md border px-3 py-2" placeholder="Chapter 3 Model Test" />
          <p><strong>Duration (min)</strong></p>
          <input className="w-full rounded-md border px-3 py-2" placeholder="90" />
          <p><strong>Negative Marking</strong></p>
          <input type="checkbox" />
          <p><strong>Attempt Limit</strong></p>
          <input className="w-full rounded-md border px-3 py-2" placeholder="1" />
          <Button className="w-full bg-navy-900">Save Exam</Button>
        </div>
      </main><Footer /></div>
  );
}