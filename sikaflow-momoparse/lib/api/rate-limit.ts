const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 1000;
const MAX_BUCKETS = 500; // Prevent unbounded memory growth

type Bucket = { count: number; resetAt: number };

// Use globalThis to persist across warm lambdas, survives cold starts better than module scope
// Note: Vercel serverless cold starts may still reset this, so don't rely on it for strict limits
const getBuckets = () => {
  if (!globalThis.__sikaRateLimitBuckets) {
    globalThis.__sikaRateLimitBuckets = new Map<string, Bucket>();
  }
  return globalThis.__sikaRateLimitBuckets as Map<string, Bucket>;
};

declare global {
  var __sikaRateLimitBuckets: Map<string, Bucket> | undefined;
}

function pruneExpiredBuckets(buckets: Map<string, Bucket>) {
  const now = Date.now();
  for (const [key, bucket] of buckets.entries()) {
    if (now > bucket.resetAt) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(apiKey: string): { ok: boolean; remaining: number; resetAt: number } {
  const buckets = getBuckets();
  const now = Date.now();
  
  let b = buckets.get(apiKey);
  if (!b || now > b.resetAt) {
    b = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(apiKey, b);
  }
  
  // Prune expired buckets when map gets too large to prevent memory leak
  if (buckets.size > MAX_BUCKETS) {
    pruneExpiredBuckets(buckets);
  }
  
  if (b.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0, resetAt: b.resetAt };
  }
  b.count += 1;
  return { ok: true, remaining: MAX_REQUESTS - b.count, resetAt: b.resetAt };
}
