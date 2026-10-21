import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = { title: 'Privacy Policy', description: 'AT Academy privacy policy.' };
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background"><Header /><main className="mx-auto max-w-3xl px-6 py-24"><h1 className="font-display text-3xl font-extrabold text-navy-900">Privacy Policy</h1><p className="mt-6 text-foreground/70">We respect your privacy. Your data is secured and never sold to third parties. We collect only essential information to provide our educational services.</p></main><Footer /></div>
  );
}