import { NextRequest, NextResponse } from 'next/server';

const requests = new Map<string, { count: number; reset: number }>();

export function rateLimit(req: NextRequest, keyPrefix: string, max = 10, windowMs = 60000): { allowed: boolean; retryAfter?: number } {
  const key = keyPrefix + ':' + (req.headers.get('x-forwarded-for') || req.ip || 'anon');
  const now = Date.now();
  const entry = requests.get(key);
  if (!entry || now > entry.reset) {
    requests.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true };
  }
  if (entry.count >= max) return { allowed: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  entry.count += 1;
  return { allowed: true };
}