const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 1000;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(apiKey: string): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  let b = buckets.get(apiKey);
  if (!b || now > b.resetAt) {
    b = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(apiKey, b);
  }
  if (b.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0, resetAt: b.resetAt };
  }
  b.count += 1;
  return { ok: true, remaining: MAX_REQUESTS - b.count, resetAt: b.resetAt };
}
