import type { NextRequest } from "next/server";

import { getContactPage } from "@/content/contact";
import {
  hasContactSubmissionErrors,
  normalizeContactSubmission,
  toSerializableContactSubmissionErrors,
  type ContactSubmissionInput,
  validateContactSubmission,
} from "@/lib/contact-submission";
import { canStoreContactSubmissions, saveContactSubmission } from "@/lib/contact-submissions";

export const runtime = "nodejs";

interface ContactSubmissionRequestBody extends Partial<ContactSubmissionInput> {
  sourcePath?: string;
}

function getClientIpAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (!forwardedFor) {
    return undefined;
  }

  const firstIp = forwardedFor.split(",")[0]?.trim();

  return firstIp && firstIp.length > 0 ? firstIp : undefined;
}

export async function POST(request: NextRequest) {
  let body: ContactSubmissionRequestBody | null = null;

  try {
    body = (await request.json()) as ContactSubmissionRequestBody;
  } catch {
    return Response.json(
      {
        message: "Invalid form payload.",
      },
      { status: 400 },
    );
  }

  const contactPage = getContactPage();
  const submission = normalizeContactSubmission(body);
  const errors = validateContactSubmission(submission, contactPage.form.serviceOptions);

  if (hasContactSubmissionErrors(errors)) {
    return Response.json(
      {
        errors: toSerializableContactSubmissionErrors(errors),
        message: "Please correct the highlighted fields and try again.",
      },
      { status: 400 },
    );
  }

  if (!canStoreContactSubmissions()) {
    return Response.json(
      {
        message: "Contact form storage is not configured on the server yet.",
      },
      { status: 503 },
    );
  }

  try {
    const savedSubmission = await saveContactSubmission({
      submission,
      sourcePath: body?.sourcePath,
      ipAddress: getClientIpAddress(request),
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    return Response.json(
      {
        id: savedSubmission.id,
        message: contactPage.form.successMessage,
        submittedAt: savedSubmission.submittedAt,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to store contact submission", error);

    return Response.json(
      {
        message: "Unable to submit your enquiry right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
