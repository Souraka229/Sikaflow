import { NextResponse } from "next/server";
import { getCorsAllowOrigin } from "@/lib/env/server";

export function withCors<T>(res: NextResponse<T>): NextResponse<T> {
  const origin = getCorsAllowOrigin();
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "X-Api-Key, Content-Type, Authorization"
  );
  if (origin !== "*") {
    res.headers.set("Vary", "Origin");
  }
  return res;
}

export function jsonError(message: string, status: number) {
  return withCors(
    NextResponse.json({ success: false as const, error: message }, { status })
  );
}

export function jsonSuccess<T>(body: T, init?: { status?: number; headers?: Record<string, string> }) {
  const res = NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: init?.headers,
  });
  return withCors(res);
}
