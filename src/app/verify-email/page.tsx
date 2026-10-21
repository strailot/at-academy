'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function VerifyPage() {
  const [status, setStatus] = useState<'pending' | 'success' | 'expired'>('pending');
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-navy-900">Verify Email</h1>
        <p className="mt-4 text-foreground/70">Check your inbox. If the link is invalid or expired, request a new one.</p>
        <div className="mt-8 bg-card rounded-2xl border p-6">
          {status === 'pending' && <Button onClick={() => setStatus('success')}>Simulate verification (dev only)</Button>}
          {status === 'success' && <p className="text-cyan-500 font-bold">Email verified successfully.</p>}
          {status === 'expired' && <p className="text-destructive">Token expired. Resend verification.</p>}
        </div>
        <p className="mt-4 text-xs text-foreground/40">Requires RESEND_API_KEY for production email delivery.</p>
      </main><Footer /></div>
  );
}