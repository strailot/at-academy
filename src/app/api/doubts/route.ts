import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { logAudit } from "@/lib/audit-logger";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

const doubtSchema = z.object({
  course: z.string().trim().min(1).max(120),
  chapter: z.string().trim().max(160).optional().or(z.literal("")),
  question: z.string().trim().min(15, "Please describe your doubt in a little more detail").max(2000),
});

/** Submit a doubt for teacher review. Requires an authenticated student. */
export async function POST(request: NextRequest) {
  const limited = rateLimit(request, "doubt", 5, 60_000);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: `Too many submissions. Please wait ${limited.retryAfter}s and try again.` },
      { status: 429 }
    );
  }

  const session = await auth().catch(() => null);
  if (!session?.user) {
    return NextResponse.json({ error: "Please sign in to ask a doubt." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = doubtSchema.parse(body);

    const doubt = await prisma.doubt.create({
      data: {
        id: `doubt_${Date.now()}`,
        userId: session.user.id,
        course: parsed.course,
        chapter: parsed.chapter || "",
        question: parsed.question,
        status: "OPEN",
        createdAt: new Date(),
      },
    });

    await logAudit({
      userId: session.user.id,
      action: "DOUBT_CREATED",
      entity: "Doubt",
      entityId: (doubt as { id?: string })?.id,
      changes: { course: parsed.course, chapter: parsed.chapter },
      ipAddress: (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        id: (doubt as { id?: string })?.id,
        message: "Your doubt has been submitted. A teacher will reply in your dashboard.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Please check your question and try again." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Could not submit your doubt. Please try again." }, { status: 500 });
  }
}
