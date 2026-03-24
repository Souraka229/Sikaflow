import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAdminProjectUrl } from "@/lib/supabase/auth-env";

let cached: SupabaseClient | null = null;

/** Client service role : uniquement côté serveur, jamais exposé au navigateur. */
export function getSupabaseAdmin(): SupabaseClient {
  const url = getSupabaseAdminProjectUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
    throw new Error(
      "Supabase (service role) : définissez SUPABASE_SERVICE_ROLE_KEY et l’URL du projet " +
        "(SUPABASE_URL recommandé, ou NEXT_PUBLIC_SUPABASE_URL comme repli)."
    );
  }

  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}
