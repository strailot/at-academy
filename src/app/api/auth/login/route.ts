import { NextResponse } from 'next/server';
import { z } from 'zod';
import { signIn } from '@/lib/auth';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.parse(body);
    
    const user = await prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isValid = await compare(parsed.password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    await signIn('credentials', {
      email: parsed.email,
      password: parsed.password,
      redirect: false,
    });

    return NextResponse.json(
      { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}