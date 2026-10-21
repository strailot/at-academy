'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8">Refund Policy</h1>
        <div className="prose prose-lg text-foreground/70 leading-relaxed space-y-6">
          <p>AT Academy aims to provide high-quality education. We understand circumstances may change, so we offer a fair refund policy.</p>
          
          <h2 className="text-xl font-bold text-navy-900">Eligibility</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refund requests must be made within 7 days of enrollment</li>
            <li>Course must not have been accessed for more than 2 lessons</li>
            <li>Live class attendance must not exceed 3 sessions</li>
            <li>Refunds apply to the original payment method</li>
          </ul>
          
          <h2 className="text-xl font-bold text-navy-900">Processing Time</h2>
          <p>Refunds are processed within 7-10 business days after approval. You will receive confirmation via email.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}