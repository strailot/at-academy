'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8">Terms of Service</h1>
        <div className="prose prose-lg text-foreground/70 leading-relaxed space-y-6">
          <h2 className="text-xl font-bold text-navy-900">1. Acceptance of Terms</h2>
          <p>By accessing and using AT Academy platform, you agree to be bound by these terms of service. If you do not agree, please discontinue use of the platform.</p>
          
          <h2 className="text-xl font-bold text-navy-900">2. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information when registering for an account.</p>
          
          <h2 className="text-xl font-bold text-navy-900">3. Course Access</h2>
          <p>Course content is provided for personal, educational use only. Redistribution, reproduction, or commercial use is strictly prohibited.</p>
          
          <h2 className="text-xl font-bold text-navy-900">4. Payments & Refunds</h2>
          <p>All payments are processed securely. Refund policies are governed by our refund policy page. Refunds must be requested within 7 days of enrollment.</p>
          
          <h2 className="text-xl font-bold text-navy-900">5. Intellectual Property</h2>
          <p>All content on AT Academy, including but not limited to course materials, videos, quizzes, and branding, is the property of AT Academy.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}