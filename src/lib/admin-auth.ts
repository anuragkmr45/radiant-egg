import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "rediant_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

interface AdminCredentials {
  email: string;
  password: string;
  sessionSecret: string;
}

function getAdminCredentials(): AdminCredentials | null {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim() || password;

  if (!email || !password || !sessionSecret) {
    return null;
  }

  return {
    email,
    password,
    sessionSecret,
  };
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function signPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function isAdminAuthConfigured() {
  return Boolean(getAdminCredentials());
}

export function verifyAdminCredentials(email: string, password: string) {
  const credentials = getAdminCredentials();

  if (!credentials) {
    return false;
  }

  return safeCompare(email.trim().toLowerCase(), credentials.email.toLowerCase())
    && safeCompare(password, credentials.password);
}

export function createAdminSession(email: string) {
  const credentials = getAdminCredentials();

  if (!credentials) {
    throw new Error("Admin credentials are not configured.");
  }

  const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
  const normalizedEmail = email.trim().toLowerCase();
  const payload = `${normalizedEmail}.${expiresAt}`;
  const signature = signPayload(payload, credentials.sessionSecret);

  return `${payload}.${signature}`;
}

export function verifyAdminSession(token: string | undefined) {
  const credentials = getAdminCredentials();

  if (!credentials || !token) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length < 3) {
    return false;
  }

  const signature = parts.pop();
  const expiresAt = Number(parts.pop());
  const email = parts.join(".");

  if (!signature || !email || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false;
  }

  if (!safeCompare(email.toLowerCase(), credentials.email.toLowerCase())) {
    return false;
  }

  const payload = `${email}.${expiresAt}`;
  const expectedSignature = signPayload(payload, credentials.sessionSecret);

  return safeCompare(signature, expectedSignature);
}

export function getAdminSessionMaxAge() {
  return SESSION_DURATION_SECONDS;
}

export function sanitizeAdminRedirect(redirectTo: string | null | undefined) {
  if (!redirectTo || !redirectTo.startsWith("/admin")) {
    return "/admin";
  }

  if (redirectTo.startsWith("/admin/login") || redirectTo.startsWith("/api/admin")) {
    return "/admin";
  }

  return redirectTo;
}
