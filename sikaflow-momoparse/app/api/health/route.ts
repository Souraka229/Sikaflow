import { NextResponse } from "next/server";

/** Santé légère pour load balancer / monitoring (sans auth). */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "Sika FLOW",
      time: new Date().toISOString(),
    },
    { status: 200 }
  );
}
