import { prisma } from './prisma';

export async function applyCoupon(code: string, courseIds?: string[]): Promise<{ valid: boolean; discount?: number; message?: string }> {
  const coupon = await (prisma as any).coupon.findUnique({ where: { code } });
  if (!coupon || coupon.status !== 'ACTIVE') return { valid: false, message: 'Invalid or inactive coupon' };
  if (coupon.validUntil && new Date() > coupon.validUntil) return { valid: false, message: 'Coupon expired' };
  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) return { valid: false, message: 'Coupon usage limit reached' };
  return { valid: true, discount: coupon.value };
}

export function calculatePrice(original: number, discount: number, type: 'PERCENTAGE' | 'FIXED'): number {
  if (type === 'PERCENTAGE') return Math.max(0, original - Math.round(original * discount / 100));
  return Math.max(0, original - discount);
}