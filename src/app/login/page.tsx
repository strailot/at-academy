'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); }
      else {
        // Return to the page that asked us to sign in (course, checkout, lesson…).
        const requested = new URLSearchParams(window.location.search).get('callbackUrl');
        const callback = requested && requested.startsWith('/') && !requested.startsWith('//') ? requested : '/dashboard';
        router.push(callback);
        router.refresh();
      }
    } catch { setError('Unexpected error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-md px-6 py-24">
        <h1 className="font-display text-3xl font-bold text-navy-900">Login</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
          <div><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-navy-900">{loading ? 'Signing in...' : 'Sign In'}</Button>
        </form>
        <div className="mt-4 text-center text-sm"><Link href="/register" className="text-cyan-500 hover:underline">Create account</Link> · <Link href="/forgot-password" className="text-cyan-500 hover:underline">Forgot password?</Link></div>
      </main><Footer /></div>
  );
}