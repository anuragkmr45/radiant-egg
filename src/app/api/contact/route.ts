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
import { checkContactSubmissionRateLimit, contactRateLimitHeaders } from "@/lib/contact-rate-limit";

export const runtime = "nodejs";

interface ContactSubmissionRequestBody extends Partial<ContactSubmissionInput> {
  sourcePath?: string;
}

function getFirstHeaderValue(value: string | null) {
  const firstValue = value?.split(",")[0]?.trim();

  return firstValue && firstValue.length > 0 ? firstValue : undefined;
}

function getClientIpAddress(request: NextRequest) {
  return (
    getFirstHeaderValue(request.headers.get("x-forwarded-for")) ??
    getFirstHeaderValue(request.headers.get("x-real-ip")) ??
    getFirstHeaderValue(request.headers.get("cf-connecting-ip")) ??
    getFirstHeaderValue(request.headers.get("true-client-ip"))
  );
}

export async function POST(request: NextRequest) {
  const ipAddress = getClientIpAddress(request);
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const rateLimit = checkContactSubmissionRateLimit({
    ipAddress,
    userAgent,
  });

  if (!rateLimit.allowed) {
    return Response.json(
      {
        message: "Too many enquiry attempts. Please wait a few minutes before trying again.",
      },
      {
        headers: contactRateLimitHeaders(rateLimit),
        status: 429,
      },
    );
  }

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

  const contactPage = await getContactPage();
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
      ipAddress,
      userAgent,
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
