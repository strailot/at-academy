'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-md px-6 py-24">
        <h1 className="font-display text-3xl font-bold text-navy-900">Reset Password</h1>
        {!sent ? (
          <form className="mt-6 space-y-4" onSubmit={e => { e.preventDefault(); setSent(true); }}>
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <Button type="submit" className="w-full bg-navy-900">Send Reset Link</Button>
          </form>
        ) : (
          <div className="mt-6 rounded-2xl bg-card border p-6 text-sm">
            <p className="text-cyan-500 font-bold">Check your inbox.</p>
            <p className="text-foreground/60 mt-2">Reset link sent to <strong>{email}</strong>. If nothing arrives, verify the address or check spam.</p>
            <p className="text-xs text-foreground/40 mt-4">Requires RESEND_API_KEY in production.</p>
          </div>
        )}
      </main><Footer /></div>
  );
}