import { NextResponse } from "next/server";
import {
  getResolvedSupabasePublicAnonKey,
  getResolvedSupabasePublicUrl,
} from "@/lib/supabase/env-resolve";

/**
 * Expose URL + clé **publique** Supabase au navigateur (équivalent au bundle NEXT_PUBLIC_*).
 * La clé anon / publishable est conçue pour le client ; ne jamais y mettre la service_role.
 */
export async function GET() {
  const url = getResolvedSupabasePublicUrl();
  const anonKey = getResolvedSupabasePublicAnonKey();

  if (!url || !anonKey) {
    return NextResponse.json(
      { ok: false as const },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  return NextResponse.json(
    { ok: true as const, url, anonKey },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
