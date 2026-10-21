import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { logAudit } from "@/lib/audit-logger";
import { rateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Invalid email address").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Subject is required").max(200),
  message: z.string().trim().min(10, "Please write at least a sentence").max(4000),
});

/**
 * Public contact form handler.
 *
 * Messages are validated server-side and written to the audit log so they are
 * retained and reviewable. A real deployment can additionally forward them to
 * an email or CRM provider via the configured email provider abstraction in
 * src/lib/email-provider.ts — no credentials are required in the client.
 */
export async function POST(request: Request) {
  const limited = rateLimit(request as never, "contact", 5, 60_000);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: `Too many messages. Please wait ${limited.retryAfter}s and try again.` },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.parse(body);

    await logAudit({
      action: "CONTACT_MESSAGE",
      entity: "ContactMessage",
      changes: {
        name: parsed.name,
        email: parsed.email,
        subject: parsed.subject,
        message: parsed.message,
        phone: parsed.phone || undefined,
      },
      ipAddress: (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thanks — your message has been received. Our team replies within one working day.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }
}
