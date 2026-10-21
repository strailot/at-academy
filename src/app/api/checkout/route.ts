import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { logAudit } from "@/lib/audit-logger";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import { getCourse } from "@/lib/site";

const checkoutSchema = z.object({
  /** Course slug — the server resolves the authoritative price from it. */
  course: z.string().trim().min(1).max(120),
  method: z.enum(["bkash", "nagad", "card", "bank"]),
  /** Sender number for mobile financial services, last 4 digits for cards. */
  reference: z.string().trim().min(4).max(60),
  coupon: z.string().trim().max(40).optional().or(z.literal("")),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Please accept the terms to continue" }),
  }),
});

/**
 * Creates an enrolment request.
 *
 * The amount is never taken from the client: it is resolved server-side from
 * the published catalogue so a tampered payload cannot change what is charged.
 * Payment providers are not connected yet, so the order is created in
 * "pending" state and access is granted once an admin verifies the payment —
 * which is also how the current admin payment screens already work.
 */
export async function POST(request: NextRequest) {
  const limited = rateLimit(request, "checkout", 5, 60_000);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Please wait ${limited.retryAfter}s and try again.` },
      { status: 429 }
    );
  }

  const session = await auth().catch(() => null);
  if (!session?.user) {
    return NextResponse.json({ error: "Please sign in before enrolling." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = checkoutSchema.parse(body);

    const course = getCourse(parsed.course);
    if (!course) {
      return NextResponse.json({ error: "That course could not be found." }, { status: 404 });
    }

    const orderId = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    // Persist the enrolment request so it shows up in account/admin payment
    // screens; access stays locked until an admin marks it verified (which is
    // what creates the ACTIVE enrolment row the learning routes check).
    await prisma.order.create({
      data: {
        id: orderId,
        userId: session.user.id,
        courseId: course.slug,
        courseSlug: course.slug,
        courseTitle: course.title,
        amount: course.price,
        currency: "BDT",
        method: parsed.method,
        reference: parsed.reference,
        coupon: parsed.coupon || null,
        status: "PENDING_VERIFICATION",
      },
    });

    await logAudit({
      userId: session.user.id,
      action: "CHECKOUT_REQUESTED",
      entity: "Order",
      entityId: orderId,
      changes: {
        course: course.slug,
        amount: course.price,
        method: parsed.method,
        reference: parsed.reference,
        coupon: parsed.coupon || undefined,
      },
      ipAddress: (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        orderId,
        status: "pending",
        amount: course.price,
        course: course.title,
        message:
          "Enrolment request received. Once your payment is verified, your course and live class links will unlock in your dashboard.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Please check the form and try again." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
