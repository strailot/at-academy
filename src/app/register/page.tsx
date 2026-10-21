'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', class: '', school: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    setLoading(true); setError('');
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Registration failed'); }
    else {
      // Carry the original destination through sign-in so the student lands
      // back on the lesson or checkout they came from.
      const requested = new URLSearchParams(window.location.search).get('callbackUrl');
      const callback = requested && requested.startsWith('/') && !requested.startsWith('//') ? requested : '';
      router.push(callback ? `/login?callbackUrl=${encodeURIComponent(callback)}` : '/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="mx-auto max-w-md px-6 py-16">
        <h1 className="font-display text-3xl font-bold text-navy-900">Create Account</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {[
            { id: 'name', label: 'Full Name', type: 'text', value: 'name' },
            { id: 'email', label: 'Email', type: 'email', value: 'email' },
            { id: 'phone', label: 'Phone', type: 'tel', value: 'phone' },
            { id: 'class', label: 'Class', type: 'text', value: 'class' },
            { id: 'school', label: 'School', type: 'text', value: 'school' },
          ].map(f => <div key={f.id}><Label htmlFor={f.id}>{f.label}</Label><Input id={f.id} type={f.type} value={form[f.value as keyof typeof form]} onChange={e => setForm({ ...form, [f.value]: e.target.value })} /></div>)}
          <div><Label htmlFor="password">Password</Label><Input id="password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
          <div><Label htmlFor="confirm">Confirm Password</Label><Input id="confirm" type="password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} /></div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-navy-900">{loading ? 'Creating account...' : 'Register'}</Button>
        </form>
      </main><Footer /></div>
  );
}