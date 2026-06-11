interface ContactRateLimitInput {
  ipAddress: string | undefined;
  userAgent: string | undefined;
}

interface ContactRateLimitBucket {
  count: number;
  resetAt: number;
}

export interface ContactRateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
  retryAfterSeconds: number;
}

export interface ContactRateLimitSettings {
  limit: number;
  windowSeconds: number;
}

const DEFAULT_CONTACT_RATE_LIMIT_ATTEMPTS = 5;
const DEFAULT_CONTACT_RATE_LIMIT_WINDOW_SECONDS = 15 * 60;
const MAX_CONTACT_RATE_LIMIT_BUCKETS = 1_000;

const contactRateLimitBuckets = new Map<string, ContactRateLimitBucket>();

function parsePositiveInteger(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsedValue = Number.parseInt(value, 10);

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
}

export function getContactRateLimitSettings(): ContactRateLimitSettings {
  return {
    limit: parsePositiveInteger(
      process.env.CONTACT_RATE_LIMIT_MAX_ATTEMPTS,
      DEFAULT_CONTACT_RATE_LIMIT_ATTEMPTS,
    ),
    windowSeconds: parsePositiveInteger(
      process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS,
      DEFAULT_CONTACT_RATE_LIMIT_WINDOW_SECONDS,
    ),
  };
}

function getContactRateLimitConfig() {
  const settings = getContactRateLimitSettings();

  return {
    limit: settings.limit,
    windowMs: settings.windowSeconds * 1_000,
  };
}

function hashValue(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16);
}

function getRateLimitKey({ ipAddress, userAgent }: ContactRateLimitInput) {
  if (ipAddress) {
    return `ip:${ipAddress}`;
  }

  if (userAgent) {
    return `ua:${hashValue(userAgent)}`;
  }

  return "unknown";
}

function pruneExpiredBuckets(now: number) {
  for (const [key, bucket] of contactRateLimitBuckets) {
    if (bucket.resetAt <= now) {
      contactRateLimitBuckets.delete(key);
    }
  }

  while (contactRateLimitBuckets.size > MAX_CONTACT_RATE_LIMIT_BUCKETS) {
    const oldestKey = contactRateLimitBuckets.keys().next().value;

    if (typeof oldestKey !== "string") {
      return;
    }

    contactRateLimitBuckets.delete(oldestKey);
  }
}

function createRateLimitResult({
  allowed,
  bucket,
  limit,
  now,
}: {
  allowed: boolean;
  bucket: ContactRateLimitBucket;
  limit: number;
  now: number;
}): ContactRateLimitResult {
  const resetSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1_000));

  return {
    allowed,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    resetSeconds,
    retryAfterSeconds: allowed ? 0 : resetSeconds,
  };
}

export function checkContactSubmissionRateLimit(input: ContactRateLimitInput): ContactRateLimitResult {
  const now = Date.now();
  const { limit, windowMs } = getContactRateLimitConfig();
  const key = getRateLimitKey(input);

  pruneExpiredBuckets(now);

  const existingBucket = contactRateLimitBuckets.get(key);

  if (!existingBucket || existingBucket.resetAt <= now) {
    const bucket = {
      count: 1,
      resetAt: now + windowMs,
    };

    contactRateLimitBuckets.set(key, bucket);

    return createRateLimitResult({
      allowed: true,
      bucket,
      limit,
      now,
    });
  }

  if (existingBucket.count >= limit) {
    return createRateLimitResult({
      allowed: false,
      bucket: existingBucket,
      limit,
      now,
    });
  }

  existingBucket.count += 1;

  return createRateLimitResult({
    allowed: true,
    bucket: existingBucket,
    limit,
    now,
  });
}

export function contactRateLimitHeaders(result: ContactRateLimitResult) {
  const headers = new Headers({
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(result.remaining),
    "RateLimit-Reset": String(result.resetSeconds),
  });

  if (!result.allowed) {
    headers.set("Retry-After", String(result.retryAfterSeconds));
  }

  return headers;
}
