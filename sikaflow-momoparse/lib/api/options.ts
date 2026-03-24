import { NextResponse } from "next/server";
import { withCors } from "@/lib/api/response";

export function apiOptionsResponse() {
  return withCors(new NextResponse(null, { status: 204 }));
}
