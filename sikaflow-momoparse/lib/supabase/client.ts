import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicAnonKey, getSupabasePublicUrl } from "@/lib/supabase/auth-env";

/**
 * Client navigateur si les vars sont dans le bundle (NEXT_PUBLIC_* / pont next.config).
 * En prod, préférez `useSupabaseBrowser()` qui charge la config via `/api/config/supabase-public`.
 */
export function createClient() {
  const url = getSupabasePublicUrl();
  const anon = getSupabasePublicAnonKey();
  if (!url || !anon) {
    throw new Error(
      "Client Supabase indisponible dans ce contexte — utilisez useSupabaseBrowser() depuis un composant client.",
    );
  }
  return createBrowserClient(url, anon);
}
