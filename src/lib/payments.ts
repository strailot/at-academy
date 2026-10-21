export interface PaymentProviderInterface {
  createPayment(orderId: string, amount: number, currency: string): Promise<{ paymentUrl?: string; transactionId?: string; status: string }>;
  verifyPayment(transactionId: string): Promise<{ verified: boolean; amount?: number; currency?: string; status: string }>;
  getStatus(transactionId: string): Promise<string>;
  refundPayment(transactionId: string, amount?: number): Promise<{ success: boolean; status: string }>;
}

export abstract class PaymentProvider implements PaymentProviderInterface {
  abstract createPayment(orderId: string, amount: number, currency: string): Promise<{ paymentUrl?: string; transactionId?: string; status: string }>;
  abstract verifyPayment(transactionId: string): Promise<{ verified: boolean; amount?: number; currency?: string; status: string }>;
  abstract getStatus(transactionId: string): Promise<string>;
  abstract refundPayment(transactionId: string, amount?: number): Promise<{ success: boolean; status: string }>;
}

// Development / sandbox adapter for bKash / Nagad / Card
export class SandboxPaymentProvider extends PaymentProvider {
  async createPayment() { return { status: 'pending', transactionId: 'txn-dev-' + Date.now() }; }
  async verifyPayment() { return { verified: true, status: 'successful' }; }
  async getStatus() { return 'successful'; }
  async refundPayment() { return { success: true, status: 'refunded' }; }
}

export const getPaymentProvider = (): PaymentProvider => {
  if (process.env.BKASH_APP_KEY) { /* production bKash */ }
  return new SandboxPaymentProvider();
};