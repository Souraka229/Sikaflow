import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/env/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-env";

/** Santé légère pour load balancer / monitoring (sans auth, sans secrets). */
export async function GET() {
  const supabaseAuth = isSupabaseAuthConfigured();
  const supabaseAdmin = isSupabaseConfigured();
  return NextResponse.json(
    {
      ok: true,
      service: "Sika FLOW",
      time: new Date().toISOString(),
      supabase: {
        /** Auth navigateur (NEXT_PUBLIC_* URL + clé publique) */
        auth: supabaseAuth,
        /** Persistance API serveur (service role + URL projet) */
        adminPersistence: supabaseAdmin,
      },
    },
    { status: 200 }
  );
}
