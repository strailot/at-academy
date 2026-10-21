import { NextResponse } from 'next/server';
import { signOut } from '@/lib/auth';

export async function POST(request: Request) {
  await signOut({ redirect: false });
  return NextResponse.json({ success: true }, { status: 200 });
}