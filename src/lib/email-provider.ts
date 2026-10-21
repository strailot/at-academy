/**
 * Email provider abstraction for Phase 6 notifications.
 */
export interface EmailProviderInterface {
  send(to: string, subject: string, body: string, type?: 'transactional' | 'marketing'): Promise<boolean>;
  sendTemplate(to: string, templateId: string, data?: Record<string, unknown>): Promise<boolean>;
}

export abstract class EmailProvider implements EmailProviderInterface {
  abstract send(to: string, subject: string, body: string, type?: string): Promise<boolean>;
  abstract sendTemplate(to: string, templateId: string, data?: Record<string, unknown>): Promise<boolean>;
}

export class ResendEmailProvider extends EmailProvider {
  async send() { return true; }
  async sendTemplate() { return true; }
}

export class SMTPEmailProvider extends EmailProvider {
  async send() { return true; }
  async sendTemplate() { return true; }
}

export function getEmailProvider(): EmailProvider {
  return new SMTPEmailProvider(); // Replace with ResendEmailProvider when RESEND_API_KEY configured
}
