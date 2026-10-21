import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const parsed = loginSchema.parse(credentials);
          const user = await prisma.user.findUnique({
            where: { email: parsed.email },
          });
          if (!user || !user.password) {
            throw new Error('Invalid email or password');
          }
          const isValid = await compare(parsed.password, user.password);
          if (!isValid) {
            throw new Error('Invalid email or password');
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
          };
        } catch (err) {
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  // Auth.js v5 refuses requests unless the host is explicitly trusted on
  // self-hosted deployments (the site runs on its own domain / localhost).
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as 'student' | 'teacher' | 'admin' | 'moderator' | 'support';
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});